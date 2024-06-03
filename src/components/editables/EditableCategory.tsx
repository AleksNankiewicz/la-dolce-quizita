import { categoryProps } from '@/types/data'
import { Pen, X } from 'lucide-react'
import Image from 'next/image'
import React, { ChangeEvent, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { setCategory, uploadFilesToFirebase, uploadImages } from '@/lib/actions'

const EditableCategoryModal = ({
  category,
  setIsModalOpen,
}: {
  category: categoryProps
  setIsModalOpen: (value: boolean) => void
}) => {
  //console.log(category)

  const titleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  const [image, setImage] = useState(category.img)
  console.log(image)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const handleTitleChange = () => {
    const titleText = titleRef.current?.innerText ?? ''
    setIsAbleToSave(!!titleText.trim())
  }

  const handleDescriptionChange = () => {
    const descriptionText = descriptionRef.current?.innerText ?? ''
    setIsAbleToSave(!!descriptionText.trim())
  }

  const showImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      setImage(URL.createObjectURL(file))
      setSelectedFile(file)
      setIsAbleToSave(true)
    }
  }

  const saveCategory = async () => {
    try {
      const title = titleRef.current?.innerText || ''
      const desc = descriptionRef.current?.innerText || ''
      const slug = category.slug || Math.floor(Math.random() * 9999999) + ''

      console.log(title)
      console.log(desc)
      console.log(selectedFile)

      let imageRefs: any[] = []

      if (selectedFile) {
        const formData = new FormData()
        formData.append('imgMain', selectedFile)

        try {
          imageRefs = await uploadImages(formData)
          console.log(imageRefs)
        } catch {
          console.log('err')
        }
      } else {
        imageRefs = [category.img]
      }

      const newCategory = await setCategory(title, desc, imageRefs[0], slug)

      console.log('success')
      window.location.reload()
    } catch (error) {
      console.error('Error:', error)
      // Handle error here
    }
  }

  const [isAbleToSave, setIsAbleToSave] = useState(false)
  return (
    <div className="fixed left-0 top-0 bg-black  w-full h-full  z-50 flex flex-col items-center gap-3 p-4 md:px-28">
      <X
        className="text-red-500 hover:text-red-400 absolute right-2 top-4 "
        size={40}
        onClick={() => setIsModalOpen(false)}
      />
      <p
        className="w-[80%] text-center "
        contentEditable
        suppressContentEditableWarning={true}
        ref={titleRef}
        onInput={handleTitleChange}
      >
        {category.title}
      </p>

      <div className="md:flex gap-3">
        <div className="w-2/3 md:w-full mx-auto relative">
          {image ? (
            <Image
              alt="quizphoto"
              src={image}
              width={400}
              height={400}
              className="rounded-tr-xl"
            />
          ) : (
            <div className="md:w-[300px] w-full h-[200px] bg-slate-950 col-span-2  border  text-white  flex justify-center items-center ">
              <p>Zdjęcie</p>
            </div>
          )}

          <div className="absolute bg-red-500 flex p-1   right-0 top-0 text-white rounded-tr-xl">
            <Input
              type="file"
              id="imgInputmain"
              name={`file-main`}
              className="hidden "
              onChange={(e) => showImage(e)}
            />
            <label htmlFor={`imgInputmain`} className="cursor-pointer ">
              <Pen size={20} />{' '}
            </label>
          </div>
        </div>

        <p
          contentEditable
          suppressContentEditableWarning={true}
          onInput={handleDescriptionChange}
          dir="ltr"
          ref={descriptionRef}
          className="md:max-w-[500px] md:min-w-[500px] w-full  px-3 mx-auto"
          // className="min-h-[300px]"
        >
          {category.desc}
        </p>
      </div>

      {isAbleToSave && (
        <Button
          className="w-full bg-red-500 hover:bg-red-400"
          onClick={() => saveCategory()}
        >
          Zapisz
        </Button>
      )}
    </div>
  )
}

export default EditableCategoryModal
