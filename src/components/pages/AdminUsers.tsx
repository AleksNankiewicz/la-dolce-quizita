'use client'
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
const AdminUsers = ({ usersData }: { usersData: any }) => {
  const [users, setUsers] = useState<any>(usersData)

  const handleDeleteUser = async (email: string) => {
    await deleteUserByEmail(email)
    window.location.reload()
  }

  return (
    <div className="flex flex-col">
      <div className="w-full pl-2 pt-2">
        <SearchBar />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-3 w-full  py-2 gap-3 px-2">
        {users &&
          users.map((user: any) => (
            <div
              className="bg-purple-600 md:col-span-1  flex flex-col justify-center items-center py-6 px-3  rounded-xl relative"
              key={user._id}
            >
              <Image
                width={70}
                height={70}
                src={user.img ? user.img : '/noavatar.png'}
                alt={'userProfile'}
              />
              <div className="">{user.username}</div>
              <div className="">{user.email}</div>
              <div className="absolute left-[10px] top-[10px]">
                {formatDate(user.createdAt)}
              </div>
              <div
                onClick={() => {
                  toast(
                    (t) => (
                      <div className="flex flex-col items-center gap-2 ">
                        <p className="font-bold">Czy napewno chcesz usunąć</p>
                        <div className="font-bold">{user.username}?</div>
                        <div className="flex gap-2">
                          <Button
                            className="bg-green-400 col-span-2 hover:bg-green-300 text-2xl "
                            onClick={() => {
                              toast.dismiss(t.id)
                              handleDeleteUser(user.email)
                              //Jeśli tak
                            }}
                          >
                            Tak
                          </Button>
                          <Button
                            className="bg-red-500 col-span-2 hover:bg-red-400 text-2xl "
                            onClick={() => toast.dismiss(t.id)}
                          >
                            Nie
                          </Button>
                        </div>
                      </div>
                    ),
                    {
                      duration: 4000,
                    }
                  )
                }}
                className={`absolute right-[10px] top-[10px] cursor-pointer text-purple-900 hover:text-red-600 ${
                  user.permissions[0] == 'Any' && 'hidden'
                }`}
              >
                <X />
              </div>
              {user?.permissions && (
                <EditablePermissions
                  userPermission={user?.permissions}
                  userEmail={user?.email}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default AdminUsers
