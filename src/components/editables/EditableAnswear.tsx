import React, { useState } from 'react'

const EditableAnswear = ({ answear }: { answear: any }) => {
  const [correct, setCorrect] = useState(answear.isCorrect)

  return (
    <div
      contentEditable
      suppressContentEditableWarning={true}
      className={`break-words  border-2 p-3 text-center rounded-xl flex justify-center items-center editableAnswears ${
        !correct ? 'incorrect bg-red-500' : 'correct bg-green-400'
      } `}
      onClick={() => {
        setCorrect(!correct)
      }}
    >
      {answear.title}
    </div>
  )
}

export default EditableAnswear
