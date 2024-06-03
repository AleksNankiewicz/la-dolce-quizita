'use client'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '../../ui/button'
import { FaRectangleXmark } from 'react-icons/fa6'
import { Separator } from '../../ui/separator'
import { cn } from '@/lib/utils'
import { TbSquareXFilled } from 'react-icons/tb'
import { Switch } from '../../ui/switch'

import { FaCheckSquare, FaXingSquare } from 'react-icons/fa'
import { Answer } from '@prisma/client'
import { TAnswerButtonColors } from '@/lib/constants/answerButtonColors'
import { Trash } from 'lucide-react'
import ContentEditable from '@/components/ui/ContentEditable'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useMediaQuery from '@/lib/hooks/use-media-querry'
type EditableAnswerProps = {
  answer: Answer
  editAnswer: (answer: Answer) => void
  deleteAnswer: (id: string) => void
  color: TAnswerButtonColors
}
const EditAnswerDialog = ({
  answer,
  color,
  editAnswer,
  deleteAnswer,
}: EditableAnswerProps) => {
  const [isCorrect, setIsCorrect] = useState(answer.isCorrect)
  const [title, setTitle] = useState(answer.title)
  const [error, setError] = useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const handleCheckChange = () => {
    setIsCorrect((prevIsCorrect) => !prevIsCorrect)
    if (isMediumScreen) {
      const updatedAnswer = { ...answer, title: title, isCorrect: !isCorrect }
      editAnswer(updatedAnswer)
    }
  }
  const handleTitleChange = (newTilte: string) => {
    setTitle(newTilte)
    if (isMediumScreen) {
      const updatedAnswer = { ...answer, title: newTilte, isCorrect: isCorrect }
      editAnswer(updatedAnswer)
    }
  }

  const saveChanges = () => {
    setError(false)
    const updatedAnswer = { ...answer, title: title, isCorrect: isCorrect }
    editAnswer(updatedAnswer)
  }

  const handleDelete = () => {
    deleteAnswer(answer.id)

    setIsOpen(false)
  }

  return (
    <div className="relative w-full">
      <Dialog open={isOpen && !isMediumScreen} onOpenChange={setIsOpen}>
        <DialogTrigger className="w-full">
          <ContentEditable
            onBlur={handleTitleChange}
            value={answer.title}
            error={error}
            errorMessage="Odpowiedź nie może być pusta"
            placeholder="tu wpisz odpowiedź"
            className={cn(
              `p-7   
               text-center  min-h-[84px]  text-xl  flex sm:justify-center items-center rounded-md shadow-[0px_5px_0px_0px_#00000024] text-white relative`,
              color.background,
              color.shadow
            )}
          ></ContentEditable>
        </DialogTrigger>
        <DialogContent className="w-[80%] rounded-3xl">
          <Trash
            size={20}
            onClick={() => handleDelete()}
            className="absolute left-[20px] top-[20px] sm:top-auto bottom-[30px] text-red-500 cursor-pointer z-50"
          />
          <DialogHeader className="relative">
            <DialogTitle className="font-bold">Edytuj Odpowiedź</DialogTitle>
          </DialogHeader>
          <Separator />
          <ContentEditable
            onBlur={handleTitleChange}
            value={answer.title}
            error={error}
            errorMessage="Odpowiedź nie może być pusta"
            className={cn(
              // buttonVariants(),
              `p-7   
             text-center  min-h-[84px]  text-xl  flex sm:justify-center items-center rounded-md shadow-[0px_5px_0px_0px_#00000024] text-white `,
              color.background,
              color.shadow
            )}
          />
          <div className="flex gap-2 justify-between">
            <p className="font-semibold">Poprawna Odpowiedź</p>
            <Switch
              checked={isCorrect}
              onCheckedChange={handleCheckChange}
              className="bg-blue-500"
            />
          </div>
          <Separator />
          <DialogFooter>
            <DialogClose>
              <Button onClick={saveChanges} className="rounded-full w-full ">
                OK
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {isMediumScreen && (
        <>
          <Tooltip>
            <TooltipTrigger
              onClick={handleDelete}
              className="absolute left-2 top-2 "
            >
              <Trash size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Usuń odpowiedź</p>
            </TooltipContent>
          </Tooltip>
        </>
      )}
      <Tooltip>
        <TooltipTrigger
          onClick={() => {
            isMediumScreen && handleCheckChange()
          }}
          className={cn(
            'absolute right-2 top-2 ',
            !isMediumScreen && 'pointer-events-none'
          )}
        >
          {isCorrect ? <FaCheckSquare /> : <TbSquareXFilled />}
        </TooltipTrigger>
        {isMediumScreen && (
          <TooltipContent>
            <p>Zmień poprawności odpowiedzi</p>
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  )
}

export default EditAnswerDialog
