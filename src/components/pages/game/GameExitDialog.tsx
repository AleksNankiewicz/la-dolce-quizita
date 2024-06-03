import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { LogOut } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
const GameExitDialog = () => {
  const router = useRouter()
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <LogOut />
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[80%] rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Czy jesteś pewny?</AlertDialogTitle>
          <AlertDialogDescription>
            Gdy wyjdziesz z quizu twój wynik będzie utracony.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-4 ">
          <AlertDialogAction onClick={() => router.back()}>
            Wyjdź
          </AlertDialogAction>
          <AlertDialogCancel
            className={buttonVariants({
              variant: 'secondary',
            })}
          >
            Anuluj
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default GameExitDialog
