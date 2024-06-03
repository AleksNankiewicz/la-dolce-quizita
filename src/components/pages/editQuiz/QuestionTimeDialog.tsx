import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '../../ui/badge'
import { Button, buttonVariants } from '../../ui/button'
import { questionTimeLimits } from '@/lib/constants/questionTimeLimits'
import { Separator } from '../../ui/separator'
import { cn } from '@/lib/utils'
import { DialogClose } from '@radix-ui/react-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useMediaQuery from '@/lib/hooks/use-media-querry'

type QuestionTimeDialogProps = {
  time: number
  editTime: (time: number) => void
}

const QuestionTimeDialog = ({ time, editTime }: QuestionTimeDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  return (
    <Dialog open={isOpen && !isMediumScreen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger
            onClick={() => setIsOpen(true)}
            className={cn(buttonVariants(), 'rounded-full')}
          >
            {time} s
          </TooltipTrigger>
          {isMediumScreen && (
            <TooltipContent>
              <p>Zmień limit czasowy</p>
            </TooltipContent>
          )}
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="w-[80%] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-bold">Limit Czasowy</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="grid grid-cols-2 gap-2">
          {questionTimeLimits.map((limit) => (
            <Button
              onClick={() => editTime(limit)}
              className={cn(
                buttonVariants({
                  variant: time == limit ? 'default' : 'secondary',
                })
              )}
              key={limit}
            >
              {limit} s
            </Button>
          ))}
        </div>
        <Separator />
        <DialogFooter>
          <DialogClose>
            <Button className="rounded-full w-full">OK</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default QuestionTimeDialog
