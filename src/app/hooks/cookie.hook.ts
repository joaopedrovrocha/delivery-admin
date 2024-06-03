'use client'

import { useCookies } from 'next-client-cookies'

const useCookie = () => {
  const cookies = useCookies()

  const getCookie = (key: string) => cookies.get(key)

  const setCookie = (key: string, value: string) =>
    cookies.set(key, value, {
      expires: 2,
      sameSite: 'none',
      secure: true
    })

  const removeCookie = (key: string) => cookies.remove(key)

  return { getCookie, setCookie, removeCookie }
}

export default useCookie