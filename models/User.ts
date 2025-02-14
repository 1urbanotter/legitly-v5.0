// models/User.ts
export interface User {
  id?: string
  firstName: string
  lastName: string
  email: string
  // We don't store passwordHash in the model anymore
}
