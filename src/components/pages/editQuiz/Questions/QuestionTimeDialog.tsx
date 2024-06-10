import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { questionTimeLimits } from "@/lib/constants/questionTimeLimits";

import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useMediaQuery from "@/lib/hooks/use-media-querry";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TooltipButton from "@/components/ui/TooltipButton";

type QuestionTimeDialogProps = {
  time: number;
  editTime: (time: number) => void;
};

const QuestionTimeDialog = ({ time, editTime }: QuestionTimeDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TooltipButton content="Zmień limit czasowy">
          <Button
            variant={"outline"}
            onClick={() => setIsOpen(true)}
            className={
              "rounded-full border-2 border-primary px-3 font-bold text-primary"
            }
          >
            {time} s
          </Button>
        </TooltipButton>
      </DialogTrigger>
      <DialogContent className="w-[80%] rounded-3xl sm:w-[30%]">
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
                  variant: time == limit ? "default" : "secondary",
                }),
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
            <Button className="w-full rounded-full">OK</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionTimeDialog;
