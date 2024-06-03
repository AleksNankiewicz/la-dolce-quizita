import { motion } from 'framer-motion'
import React from 'react'

const Backdrop = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) => {
  return (
    <motion.div
      onClick={onClick}
      className="fixed top-0 left-0 h-full w-full bg-black/90 flex justify-center items-center z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default Backdrop
