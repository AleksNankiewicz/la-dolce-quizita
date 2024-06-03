import React, { useState } from 'react'
import { Button } from '../ui/button'
import { getSubCategories, setUserPermisson } from '@/lib/actions'
import { X } from 'lucide-react'

const EditablePermissions = ({
  userPermission,
  userEmail,
}: {
  userPermission: any
  userEmail: string
}) => {
  const [allPermisions, setAllPermisions] = useState<any>()
  const [permissions, setPermisssions] = useState(userPermission)
  const [isPermissionsModal, setPermissionsModal] = useState(false)
  const [isAbleToSave, setIsAbleToSave] = useState(false)

  const savePerms = async () => {
    const selectedPerms = allPermisions.filter((perm: any) => perm.isSelected)

    const userPermissions = selectedPerms.map((perm: any) => ({
      title: perm.title,
      slug: perm.slug,
    }))
    console.log(userPermissions)

    await setUserPermisson(userEmail, userPermissions)

    window.location.reload()
  }

  const fetchCategories = async () => {
    try {
      const cats = await getSubCategories()
      console.log(userPermission)

      const updatedCategories = cats.map((cat) => {
        return {
          ...cat,
          isSelected: userPermission.some(
            (permission: any) => permission.title == cat.title
          ),
        }
      })

      setAllPermisions(updatedCategories)
    } catch (error) {
      console.error('Wystąpił błąd podczas pobierania kategorii:', error)
    }
  }

  const editPermissions = () => {
    fetchCategories()
    setPermissionsModal(true)
  }

  const handleAllPerms = (index: number) => {
    setIsAbleToSave(true)
    // const resetedCats = allPermisions.map(
    //   (cat: any) => (cat.isSelected = false)
    // )
    // setAllPermisions(resetedCats)
    const updatedCats = [...allPermisions]

    if (updatedCats[index].isSelected == true) {
      updatedCats[index].isSelected = false
    } else updatedCats[index].isSelected = true

    console.log(updatedCats)
    setAllPermisions(updatedCats)
  }

  return (
    <>
      <div>
        {permissions[0] !== 'Any' && (
          <Button onClick={editPermissions}>Zmień zezwolenia</Button>
        )}
        {permissions[0] == 'Any' && <Button disabled>Admin</Button>}
      </div>

      {isPermissionsModal && (
        <div className="fixed left-0 top-0 py-16 w-full h-screen z-50 bg-black/85 flex flex-col items-center gap-2">
          <X
            className="absolute right-4 top-4 text-red-400 hover:text-red-300 cursor-pointer"
            onClick={() => {
              setPermissionsModal(false)
              setIsAbleToSave(false)
            }}
          />
          <div className="flex justify-center gap-2 flex-wrap">
            {allPermisions &&
              allPermisions.map((perm: any, index: number) => (
                <Button
                  onClick={() => handleAllPerms(index)}
                  key={perm.title}
                  className={`border ${perm.color} ${
                    perm.isSelected && 'border-4'
                  }`}
                >
                  {perm.title}
                </Button>
              ))}
          </div>
          {isAbleToSave && (
            <Button
              className="bg-red-500 hover:bg-red-400 w-1/2"
              onClick={() => savePerms()}
            >
              Zapisz
            </Button>
          )}
        </div>
      )}
    </>
  )
}

export default EditablePermissions
