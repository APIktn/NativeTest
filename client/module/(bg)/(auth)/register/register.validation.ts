import type { RegisterForm, RegisterErrors } from './register.types'

export function validateRegister(form: RegisterForm): RegisterErrors {
  const errors: RegisterErrors = {}

  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required'
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required'
  }

  if (!form.userEmail.trim()) {
    errors.userEmail = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.userEmail)) {
    errors.userEmail = 'Invalid email format'
  }

  if (!form.password) {
    errors.password = 'Password is required'
  } else if (form.password.length < 10) {
    errors.password = 'Password must be at least 10 characters'
  }

  return errors
}