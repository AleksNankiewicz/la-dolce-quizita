import EditableProfile from '@/components/editables/EditableProfile'
import { getUserBySlug } from '@/lib/actions'
import React from 'react'

const SingleProfilePage = async ({ params }: { params: any }) => {
  const { slug } = params

  const user = await getUserBySlug(slug)

  console.log(slug)

  return <EditableProfile user={user} />
}

export default SingleProfilePage
