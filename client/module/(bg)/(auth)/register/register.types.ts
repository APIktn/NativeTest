export type RegisterForm = {
  firstName: string
  lastName: string
  userEmail: string
  password: string
}

export type RegisterErrors = Partial<RegisterForm>