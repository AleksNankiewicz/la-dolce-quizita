'use client'

import React, { useState, useTransition } from 'react'

import * as z from 'zod'
import CardWrapper from './CardWrapper'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../atoms/FormError'
import FormSuccess from '../atoms/FormSuccess'
import { signIn, signOut, useSession } from 'next-auth/react'
import { login } from '@/actions/login'
import { useRouter } from 'next/navigation'
const LoginForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true)
    setError('')
    setSuccess('')
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
        setIsLoading(false)
      })
    })
  }

  // const router = useRouter()

  // if (success) {
  //   router.push('/')
  // }

  return (
    <CardWrapper
      headerTitle="Logowanie"
      headerLabel="Witaj ponownie"
      backButtonLabel="Nie masz konta? Zarejestruj się"
      backButtonHref="/auth/register"
      // showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      {...field}
                      placeholder="pączek@example.pl"
                      disabled={isLoading}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hasło</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      {...field}
                      placeholder="******"
                      disabled={isLoading}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full bg-green-600  hover:bg-pink-400"
          >
            Zaloguj się
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm
