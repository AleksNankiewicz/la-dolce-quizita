'use client'
import StatsBlock from '@/components/layouts/StatsBlock'
import { Button } from '@/components/ui/button'
import { sessionUserProps } from '@/types/data'
import { Pen } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { updateUser, uploadImages } from '@/lib/actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Loading from '@/app/loading'
import CustomizablesBlock from '../layouts/blocks/CustomizablesBlock'
import useNavStore from '@/lib/store'

const EditableProfile = ({ user }: { user: any }) => {
  const loggedUser = user
  const session = useSession()

  const [isUserLogged, setIsUserLogged] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const refreshNavbar = useNavStore((state) => state.setRefresh)

  const [slug, setSlug] = useState('')
  useEffect(() => {
    if (session.status == 'loading') {
      setIsLoading(true)
    }
    if (session.status == 'unauthenticated') {
      setIsLoading(false)
      window.location.href = '/'
    }

    if (session.status == 'authenticated') {
      setIsLoading(false)

      const user = session.data.user as sessionUserProps

      setSlug(user.slug)

      if (user.slug == loggedUser.slug) setIsUserLogged(true)
    }
  }, [session?.data, session?.status])

  const editableImage = React.useRef<HTMLInputElement>(null)

  const [image, setImage] = useState(loggedUser.img)
  const [isAbleToSave, setIsAbleToSave] = useState(false)

  const [imageChangeCount, setImageChangeCount] = useState(0)

  useEffect(() => {
    if (imageChangeCount > 0) {
      setIsAbleToSave(true)
    }
  }, [imageChangeCount])

  useEffect(() => {
    setImageChangeCount((prevCount) => prevCount + 1)
  }, [image])

  useEffect(() => {
    setImageChangeCount(0)
  }, [loggedUser.img])

  const showImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }

  const saveProfile = async () => {
    toast.loading('Zapisywanie profilu...')
    const img =
      editableImage.current?.files && editableImage.current?.files.length > 0
        ? editableImage.current?.files[0]
        : loggedUser.img

    const formData = new FormData()
    formData.append('imgMain', img)

    let imageRefs: any[] = []
    try {
      imageRefs = await uploadImages(formData)
      console.log(imageRefs)
    } catch {
      console.log('err')
    }

    const updatedUser = {
      ...loggedUser,
      img: imageRefs[0],
    }

    try {
      await updateUser(updatedUser)
      toast.dismiss()
      toast.success('Profil zapisany')
      refreshNavbar(true)
    } catch (err: any) {
      toast.dismiss()
      toast.success('Nie udało się zapisać profilu')
      console.log(err)
    }
  }

  const handleSignOut = async () => {
    // Redirect to the homepage or any other page
    await signOut()
  }

  if (!isUserLogged) return <Loading />

  return (
    <div className="w-full flex-col items-center text-center space-y-4 px-3">
      <div className="relative w-full flex justify-center p-5">
        <Image
          src={image ? image : '/noavatar.png'}
          width={200}
          height={200}
          alt="profile"
          className="rounded-full w-[170px] h-[170px]"
        />
        <Input
          type="file"
          name={`file-main`}
          id={`imgInputmain`}
          className="hidden "
          onChange={(e) => showImage(e)}
          ref={editableImage}
        />
        <label htmlFor={`imgInputmain`} className="cursor-pointer ">
          <Pen size={20} />{' '}
        </label>
      </div>

      <div className="text-2xl">{loggedUser.username}</div>

      {isAbleToSave && (
        <Button
          className="w-full bg-red-500 col-span-2 hover:bg-red-400 text-xl py-6"
          onClick={() => saveProfile()}
        >
          Zapisz
        </Button>
      )}
      <StatsBlock />
      <CustomizablesBlock user={loggedUser} />
      {loggedUser.isAdmin && (
        <Button
          className="w-full text-2xl py-7 text-purple-400"
          onClick={() => (window.location.href = '/admin')}
        >
          Zarządzaj Stroną
        </Button>
      )}

      <Button onClick={() => handleSignOut()} className="w-full text-2xl py-7">
        Wyloguj się
      </Button>
    </div>
  )
}

export default EditableProfile
