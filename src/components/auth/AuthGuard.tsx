import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean // true = requires auth, false = requires no auth, undefined = public
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (mounted) {
          setUser(session?.user || null)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
        if (mounted) {
          setUser(null)
          setLoading(false)
        }
      }
    }

    getInitialSession()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user || null)
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Show minimal loading state while checking auth
  if (loading) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#1a1a1a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '3px solid #333',
          borderTop: '3px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  // Handle different auth requirements
  if (requireAuth === true) {
    // Route requires authentication
    if (!user) {
      // Redirect to landing page for unauthenticated users
      return <Navigate to="/" replace />
    }
    return <>{children}</>
  } else if (requireAuth === false) {
    // Route requires NO authentication (like login page)
    if (user) {
      return <Navigate to="/user-home" replace />
    }
    return <>{children}</>
  } else {
    // Public route - always allow access
    return <>{children}</>
  }
}

export default AuthGuard
