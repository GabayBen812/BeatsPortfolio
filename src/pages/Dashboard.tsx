import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '../services/authService'
import type { User } from '@supabase/supabase-js'
import HeaderOne from '../layouts/headers/HeaderOne'
import FooterOne from '../layouts/footers/FooterOne'
import Wrapper from '../common/Wrapper'

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser()
        setUser(currentUser)
        if (!currentUser) {
          navigate('/login')
        }
      } catch (error) {
        console.error('Error getting current user:', error)
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    getCurrentUser()

    // Listen for auth state changes
    const { data: { subscription } } = AuthService.onAuthStateChange((user) => {
      setUser(user)
      if (!user) {
        navigate('/login')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])

  const handleLogout = async () => {
    try {
      await AuthService.logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return null; // Let AuthGuard handle the loading state
  }

  if (!user) {
    return null
  }

  return (
    <Wrapper>
      <div className="bg-dark">
        <HeaderOne />
        
        <div className="section-space-y">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="bg-dark-gradient p-6 p-xl-8 rounded-5 shadow-lg text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4">
                      <i className="bi bi-person-fill text-white fs-24"></i>
                    </div>
                    <h1 className="text-light mb-3">
                      Welcome to <span className="text-gradient-primary">EchoLab</span>
                    </h1>
                    <p className="text-light text-opacity-75 fs-18">
                      Hello, <strong>{user.email}</strong>!
                    </p>
                  </div>

                  <div className="row g-4 mb-6">
                    <div className="col-md-4">
                      <div className="bg-white/5 p-4 rounded-3 border border-white/10">
                        <i className="bi bi-shield-check text-primary fs-24 mb-3 d-block"></i>
                        <h5 className="text-light mb-2">Secure Access</h5>
                        <p className="text-light text-opacity-75 fs-14 mb-0">
                          Your account is protected with enterprise-grade security
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="bg-white/5 p-4 rounded-3 border border-white/10">
                        <i className="bi bi-lightning text-primary fs-24 mb-3 d-block"></i>
                        <h5 className="text-light mb-2">Fast Performance</h5>
                        <p className="text-light text-opacity-75 fs-14 mb-0">
                          Experience lightning-fast response times
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="bg-white/5 p-4 rounded-3 border border-white/10">
                        <i className="bi bi-gear text-primary fs-24 mb-3 d-block"></i>
                        <h5 className="text-light mb-2">Easy Management</h5>
                        <p className="text-light text-opacity-75 fs-14 mb-0">
                          Manage your settings and preferences easily
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline-light text-white fs-14 border-1 rounded-pill px-4"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                    <button className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill px-4">
                      <i className="bi bi-gear me-2"></i>
                      Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FooterOne />
      </div>
    </Wrapper>
  )
}

export default Dashboard
