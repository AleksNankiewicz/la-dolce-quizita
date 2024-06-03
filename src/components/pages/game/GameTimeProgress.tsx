import React, { useState, useEffect, useRef } from 'react'
import { Progress } from '@/components/ui/progress'

type GameTimeProgressProps = {
  timeToAnswer: number // in seconds
  isGameRunning: boolean
  setIsGameRunning: (isRunning: boolean) => void
  setIsTimeout: (isTimeout: boolean) => void
}

const GameTimeProgress = ({
  timeToAnswer,
  isGameRunning,
  setIsGameRunning,
  setIsTimeout,
}: GameTimeProgressProps) => {
  const [progressValue, setProgressValue] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (isGameRunning) {
      startTimeRef.current = null // Reset startTimeRef
      setProgressValue(0) // Reset progressValue
      const animate = (currentTime: number) => {
        if (!startTimeRef.current) startTimeRef.current = currentTime
        const elapsed = currentTime - startTimeRef.current
        const progress = Math.min((elapsed / (timeToAnswer * 1000)) * 100, 100) // convert timeToAnswer to milliseconds
        setProgressValue(progress)
        if (progress < 100) {
          animationFrameRef.current = requestAnimationFrame(animate)
        } else {
          setIsGameRunning(false)
          setIsTimeout(true)
        }
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isGameRunning, timeToAnswer, setIsGameRunning])

  return (
    <div className="w-full">
      <Progress value={progressValue} />
    </div>
  )
}

export default GameTimeProgress
