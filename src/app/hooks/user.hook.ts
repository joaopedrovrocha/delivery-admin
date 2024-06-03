'use client'

import { AuthUser, useAuth } from "../contexts/auth.context"
import useCookie from "./cookie.hook"

export const useUser = () => {
  const { user, setUser } = useAuth()
  const { setCookie, removeCookie } = useCookie()

  const setAuthUser = (user: AuthUser) => {
    setUser(user)
    setCookie('user', JSON.stringify(user))
  }

  const removeAuthUser = () => {
    setUser(null)
    removeCookie('user')
  }

  return { user, setAuthUser, removeAuthUser }
}