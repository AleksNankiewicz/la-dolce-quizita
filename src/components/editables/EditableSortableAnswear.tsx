import React, { useState } from 'react'
import { motion } from 'framer-motion'
const EditableSortableAnswear = ({ answear }: { answear: any }) => {
  return (
    <motion.div
      initial={{ scale: 0.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      contentEditable
      suppressContentEditableWarning={true}
      className={`break-words  border-2 p-3 text-center  flex justify-center items-center editableAnswears w-full bg-white text-black md:text-xl `}
    >
      {answear.title}
    </motion.div>
  )
}

export default EditableSortableAnswear
