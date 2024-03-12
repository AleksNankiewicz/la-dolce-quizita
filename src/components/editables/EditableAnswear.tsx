import React, { useState } from 'react'

const EditableAnswear = ({ answear }: { answear: any }) => {
  const [correct, setCorrect] = useState(answear.isCorrect)

  return (
    <div
      contentEditable
      suppressContentEditableWarning={true}
      className={`editableAnswears break-words  border-2 p-3 text-center  flex justify-center items-center  ${
        !correct ? 'incorrect bg-red-600' : 'correct bg-green-400'
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
