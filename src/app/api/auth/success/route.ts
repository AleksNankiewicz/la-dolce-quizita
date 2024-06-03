import { db } from '@/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user == null || !user.id)
    throw new Error('something went wrong with authentication' + user)

  // db.user.findFirst({
  //   where:
  // })

  let dbUser = await db.user.findUnique({
    where: { kindeId: user.id },
  })

  if (!dbUser) {
    dbUser = await db.user.create({
      data: {
        kindeId: user.id,
        firstName: user.given_name ?? '',
        lastName: user.family_name ?? '',
        email: user.email ?? '', // Using nullish coalescing operator to provide a default empty string value
      },
    })
  }
  const redirectUrl = process.env.KINDE_SITE_URL || 'http://localhost:3000'
  return NextResponse.redirect(redirectUrl)
}
