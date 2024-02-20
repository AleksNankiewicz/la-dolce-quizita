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
      callbackUrl: '/', // Optional, if you don't want automatic redirection
    })

    console.log(result)

    if (result?.error) {
      // Handle authentication error
      return { error: 'Niepoprawne dane logowania' }
    }

    // Handle successful authentication

    return { success: 'Jesteś zalogowany' }
  } catch (error: any) {
    console.error('Error occurred during sign-in:', error)
    return { error: 'An error occurred during sign-in' }
  }
}
