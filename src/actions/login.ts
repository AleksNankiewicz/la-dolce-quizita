import { LoginSchema } from '@/schemas'
import * as z from 'zod'
import { signIn } from 'next-auth/react'
// /import { useRouter } from 'next/router'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  //const router = useRouter()

  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password } = validatedFields.data
  console.log(email, password)
  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // Optional, if you don't want automatic redirection
    })

    console.log(result)

    // Handle authentication error

    if (result?.error) {
      return { error: 'Niepoprawne dane logowania' }
    }
    window.location.href = '/'
    return { success: 'Jesteś zalogowany' }

    // Handle successful authentication
  } catch (error: any) {
    return { error: 'Niepoprawne dane logowania' }
    // console.error('Error occurred during sign-in:', error)
    // return { error: 'An error occurred during sign-in' }
  }
}
