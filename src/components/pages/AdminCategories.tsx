'use client'
import EditableCategoryModal from '@/components/editables/EditableCategory'
import EditablePermissions from '@/components/editables/EditablePermissions'
import SearchBar from '@/components/layouts/SearchBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { deleteCategory, getSubCategories } from '@/lib/actions'
import { formatDate } from '@/lib/utils'
import { Pen, Plus, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { unstable_noStore as noStore } from 'next/cache'
const emptyCategory = {
  title: 'tytuł',
  desc: 'opis',
  slug: Math.floor(Math.random() * 9999) + '',
}

const AdminCategories = ({ categoriesData }: { categoriesData: any }) => {
  const [categories, setCategories] = useState<any>(categoriesData)

  const [selectedCategory, setSelectedCategory] = useState<any>()

  const handleDeleteCategory = async (slug: string) => {
    await deleteCategory(slug)
    console.log('category deleted')
    window.location.reload()
  }

  return (
    <div className="flex flex-col">
      <div className="w-full pl-2 pt-2">
        <SearchBar />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-3 w-full  py-2 gap-3 px-2 ">
        {categories &&
          categories.map((category: any) => (
            <div
              className="bg-purple-600 md:col-span-1  flex flex-col justify-center items-center py-6 px-3  rounded-xl relative"
              key={category._id}
            >
              <Image
                width={70}
                height={70}
                src={category.img ? category.img : '/noavatar.png'}
                alt={'categoryProfile'}
              />
              <div className="">{category.title}</div>
              {/* <div className="">{category.email}</div> */}

              <div
                onClick={() => {
                  toast(
                    (t) => (
                      <div className="flex flex-col items-center gap-2 ">
                        <p className="font-bold">Czy napewno chcesz usunąć</p>
                        <div className="font-bold">{category.title}?</div>
                        <div className="flex gap-2">
                          <Button
                            className="bg-green-400 col-span-2 hover:bg-green-300 text-2xl "
                            onClick={() => {
                              toast.dismiss(t.id)

                              handleDeleteCategory(category.slug)
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
                className="absolute right-[10px] top-[10px] cursor-pointer text-purple-900 hover:text-red-600"
              >
                <X />
              </div>
              <div
                onClick={() => setSelectedCategory(category)}
                className="absolute left-[10px] top-[10px] cursor-pointer text-purple-900 hover:text-red-600 -rotate-90"
              >
                <Pen />
              </div>
            </div>
          ))}
        {selectedCategory && (
          <EditableCategoryModal
            category={selectedCategory}
            setIsModalOpen={() => setSelectedCategory(false)}
          />
        )}
        <div className="block text-2xl bg-slate-900 col-span-1 w-full  text-center gap-2 rounded-xl relative group overflow-hidden hover:bg-slate-800 duration-200 cursor-pointer">
          <div
            className="flex justify-center items-center w-full h-full"
            onClick={() => setSelectedCategory(emptyCategory)}
          >
            <Plus size={34} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCategories
