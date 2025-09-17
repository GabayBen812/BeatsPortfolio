import { supabase } from '../lib/supabaseClient'
import type { User, AuthError } from '@supabase/supabase-js'

export interface AuthResponse {
  user: User | null
  error: AuthError | null
}

export class AuthService {
  /**
   * Login with email and password
   */
  static async loginWithEmail(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        return { user: null, error }
      }

      // Verify user exists in our users table, create if not exists
      let { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (userError && userError.code === 'PGRST116') {
        // User not found in our users table, create them
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({
            id: data.user.id, // Use the Supabase auth user ID
            email: data.user.email,
            name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'User',
            created_at: new Date().toISOString()
          })
          .select()
          .single()

        if (createError) {
          console.error('Error creating user:', createError)
          await supabase.auth.signOut()
          return { 
            user: null, 
            error: { 
              message: 'Error creating user account. Please try again.', 
              name: 'UserCreationError' 
            } as AuthError 
          }
        }

        userData = newUser
      } else if (userError || !userData) {
        // Other error or no user data
        await supabase.auth.signOut()
        return { 
          user: null, 
          error: { 
            message: 'Error accessing user account. Please try again.', 
            name: 'UserAccessError' 
          } as AuthError 
        }
      }

      return { user: data.user, error: null }
    } catch (error) {
      return { 
        user: null, 
        error: { 
          message: 'An unexpected error occurred', 
          name: 'UnexpectedError' 
        } as AuthError 
      }
    }
  }

  /**
   * Login with Google OAuth
   */
  static async loginWithGoogle(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/user-home`
        }
      })

      if (error) {
        return { user: null, error }
      }

      // Note: For OAuth, we'll handle the user verification in the auth state change listener
      // since the redirect happens immediately. OAuth returns { provider, url }, not { user }
      return { user: null, error: null }
    } catch (error) {
      return { 
        user: null, 
        error: { 
          message: 'Google login failed', 
          name: 'GoogleLoginError' 
        } as AuthError 
      }
    }
  }

  /**
   * Get current authenticated user
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      return session?.user || null
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  /**
   * Get current session
   */
  static async getCurrentSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      return session
    } catch (error) {
      console.error('Error getting current session:', error)
      return null
    }
  }

  /**
   * Logout current user
   */
  static async logout(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { 
        error: { 
          message: 'Logout failed', 
          name: 'LogoutError' 
        } as AuthError 
      }
    }
  }

  /**
   * Verify if user exists in our users table, create if not exists (for OAuth verification)
   */
  static async verifyUserExists(email: string, authUserId?: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single()

      if (error && error.code === 'PGRST116' && authUserId) {
        // User not found, create them
        const { error: createError } = await supabase
          .from('users')
          .insert({
            id: authUserId, // Use the Supabase auth user ID
            email: email,
            name: email.split('@')[0] || 'User',
            created_at: new Date().toISOString()
          })

        if (createError) {
          console.error('Error creating user during OAuth:', createError)
          return false
        }
        return true
      }

      return !error && !!data
    } catch (error) {
      console.error('Error verifying user:', error)
      return false
    }
  }

  /**
   * Listen to auth state changes
   */
  static onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // For OAuth users, verify they exist in our users table, create if not exists
        const userExists = await this.verifyUserExists(session.user.email!, session.user.id)
        if (!userExists) {
          // User creation failed, sign them out
          await supabase.auth.signOut()
          // Show error message to user
          alert('Error creating your account. Please try again.')
          callback(null)
          return
        }
      }
      callback(session?.user ?? null)
    })
  }
}
