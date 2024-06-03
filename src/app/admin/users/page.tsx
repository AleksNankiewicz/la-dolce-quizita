import EditablePermissions from '@/components/editables/EditablePermissions'
import SearchBar from '@/components/layouts/SearchBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { deleteUserByEmail, getUsers } from '@/lib/actions'
import { formatDate } from '@/lib/utils'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { unstable_noStore as noStore } from 'next/cache'
import AdminUsers from '@/components/pages/AdminUsers'
const AdminUsersPage = async () => {
  const users = await getUsers()

  return <AdminUsers usersData={users} />
}

export default AdminUsersPage
