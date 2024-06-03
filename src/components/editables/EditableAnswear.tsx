import { TAnswearButtonColors } from '@/lib/constants/answearButtonColors'
import { cn } from '@/lib/utils'
import { answearProps } from '@/types/data'
import React, { useState } from 'react'

type EditableAnswearProps = {
  answear: answearProps
  color: TAnswearButtonColors
}

const EditableAnswear = ({ answear, color }: EditableAnswearProps) => {
  const [correct, setCorrect] = useState(answear.isCorrect)

  return (
    <div
      // contentEditable
      // suppressContentEditableWarning={true}
      className={cn(
        `editableAnswears break-words text-background   p-4 sm:text-center    text-xl  flex sm:justify-center items-center rounded-md shadow-[0px_5px_0px_0px_#00000024] ${color.background} ${color.shadow}`,
        !correct ? ' incorrect' : 'correct '
      )}
      onClick={() => {
        setCorrect(!correct)
      }}
    >
      <p>{answear.title}</p>
    </div>
  )
}

export default EditableAnswear
