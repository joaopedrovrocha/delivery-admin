'use server'

export interface LoginPayload {
  username: string
  password: string
}

export async function login({ username, password }: LoginPayload) {
  return {
    success: true,
    data: {
      isLoggedIn: true
    }
  }
}