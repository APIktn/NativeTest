import type { LoginForm, LoginErrors } from './login.types'

export function validateLogin(form: LoginForm): LoginErrors {
  const errors: LoginErrors = {}

  if (!form.username.trim()) {
    errors.username = 'Username or email is required'
  }

  if (!form.password) {
    errors.password = 'Password is required'
  }

  return errors
}