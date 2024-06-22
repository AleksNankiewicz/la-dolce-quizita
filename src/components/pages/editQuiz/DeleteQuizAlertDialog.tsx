import React from "react";
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
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteQuiz } from "@/lib/actions/deleteQuiz";
import { useRouter } from "next/navigation";

const DeleteQuizAlertDialog = ({ quizId }: { quizId: string }) => {
  const router = useRouter();

  const handleDeleteQuiz = async () => {
    await deleteQuiz(quizId);
    router.back();
    router.back();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={buttonVariants({ variant: "destructive" })}
      >
        Usuń
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Czy jesteś pewny?</AlertDialogTitle>
          <AlertDialogDescription>
            Ta akcja nie może być cofnięta. To skutkuje permanentnym usunięceim
            quizu wraz z danymi z naszych serwerów.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteQuiz}
            className={cn(
              buttonVariants({ variant: "destructive" }),
              "shadow-none",
            )}
          >
            Usuń
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteQuizAlertDialog;
