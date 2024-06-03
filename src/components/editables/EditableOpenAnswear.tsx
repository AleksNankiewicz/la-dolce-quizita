import React, { useState } from 'react'

const EditableOpenAnswear = ({ answear }: { answear: any }) => {
  return (
    <div
      contentEditable
      suppressContentEditableWarning={true}
      className={`editableAnswears break-words  border-2 p-3 text-center text-black bg-white border-black text-xl flex justify-center items-center   `}
    >
      {answear.title}
    </div>
  )
}

export default EditableOpenAnswear
