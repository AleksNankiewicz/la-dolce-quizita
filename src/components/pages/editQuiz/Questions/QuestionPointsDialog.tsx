import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { questionTimeLimits } from "@/lib/constants/questionTimeLimits";

import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { questionPointsLimits } from "@/lib/constants/questionPointsLimits";
import useMediaQuery from "@/lib/hooks/use-media-querry";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Coins } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TooltipButton from "@/components/ui/TooltipButton";

type QuestionPointsDialogProps = {
  points: number;
  editPoints: (points: number) => void;
};

const QuestionPointsDialog = ({
  points,
  editPoints,
}: QuestionPointsDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TooltipButton content="Zmień ilość punktów">
          <Button
            variant={"outline"}
            onClick={() => setIsOpen(true)}
            className={
              "gap-1 rounded-full border-2 border-primary px-3 font-bold text-primary"
            }
          >
            {points} <span className="">pkt</span>{" "}
          </Button>
        </TooltipButton>
      </DialogTrigger>
      <DialogContent className="w-[80%] rounded-3xl sm:w-[30%]">
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
                  variant: points == limit ? "default" : "secondary",
                }),
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
            <Button className="w-full rounded-full">OK</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionPointsDialog;
