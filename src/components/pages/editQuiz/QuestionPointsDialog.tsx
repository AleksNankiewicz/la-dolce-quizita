import React from 'react'
import {
  Dialog,
  DialogContent,
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
import { questionPointsLimits } from '@/lib/constants/questionPointsLimits'
import useMediaQuery from '@/lib/hooks/use-media-querry'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type QuestionPointsDialogProps = {
  points: number
  editPoints: (points: number) => void
}

const QuestionPointsDialog = ({
  points,
  editPoints,
}: QuestionPointsDialogProps) => {
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
            {points} pkt
          </TooltipTrigger>
          {isMediumScreen && (
            <TooltipContent>
              <p>Zmień ilość punktów</p>
            </TooltipContent>
          )}
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="w-[80%] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-bold">Punkty</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="grid grid-cols-2 gap-2">
          {questionPointsLimits.map((limit) => (
            <Button
              onClick={() => editPoints(limit)}
              className={cn(
                buttonVariants({
                  variant: points == limit ? 'default' : 'secondary',
                })
              )}
              key={limit}
            >
              {limit} pkt
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

export default QuestionPointsDialog
