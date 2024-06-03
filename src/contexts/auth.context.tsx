'use client'

import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react"
import useCookie from "@/hooks/cookie.hook"

export interface User {
  username: string
  name: string
}

export interface Platform {
  name: string
  uf: string
  logo: string
}

export interface AuthUser {
  token: string
  user: User
  platform: Platform
}

export interface AuthContextType {
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const { getCookie } = useCookie()

  useEffect(() => {
    if (!user) {
      let existingUser = null

      const getFromCookie = async () => (existingUser = getCookie('user'))
      getFromCookie()

      if (existingUser) {
        try {
          setUser(JSON.parse(existingUser))
        } catch (e) {
          console.log(e)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const contextValues = useMemo(() => ({
    user,
    setUser
  }), [user, setUser])

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => useContext(AuthContext)