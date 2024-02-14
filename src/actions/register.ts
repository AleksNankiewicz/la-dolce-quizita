'use server'

import { RegisterSchema } from '@/schemas'
import * as z from 'zod'

import bcrypt from 'bcryptjs'
import { connectToDb } from '@/lib/connectToDb'
import { User } from 'lucide-react'
import { addUser, getUserByEmail } from '@/lib/actions'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Niepoprawne pola' }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Ten e-mail jest już zajęty' }
  }

  await addUser(email, hashedPassword, name)

  return {
    success: 'Konto utworzone!',
  }
}
