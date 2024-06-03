import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayedValue, setDisplayedValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => {
        setDisplayedValue((prevValue) => {
          if (prevValue >= value) {
            clearInterval(interval)
            return value
          }
          return prevValue + 1
        })
      },
      value > 100 ? 5 : 25
    ) // Adjust the interval as needed

    return () => clearInterval(interval)
  }, [value])

  return (
    <motion.span
      className="flex justify-center items-center h-6 mx-auto "
      key={displayedValue}
      // animate={{ opacity: 1 }}
    >
      {displayedValue}
    </motion.span>
  )
}

// Usage example:
