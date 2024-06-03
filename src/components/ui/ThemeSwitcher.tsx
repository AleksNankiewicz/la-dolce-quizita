'use client'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const [isMounted, setIsMounted] = useState(false)
  const handleThemeSwitch = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme"
        checked={theme == 'dark'}
        onCheckedChange={() => handleThemeSwitch()}
        className="scale-110"
      />
    </div>
  )
}
