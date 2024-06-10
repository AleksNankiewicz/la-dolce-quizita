import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import GameSheet from "./GameExitDialog";
import useNavbarStore from "@/lib/store/useNavbarStore";

type GameNavbarProps = {
  currentQuestion: number;
  totalQuestions: number;
  hideAnswerType: boolean;
};

const GameNavbar = ({
  currentQuestion,
  totalQuestions,
  hideAnswerType,
}: GameNavbarProps) => {
  const setNavbarComponents = useNavbarStore(
    (state) => state.setNavbarComponents,
  );

  useEffect(() => {
    setNavbarComponents([
      <div className="flex w-[94vw] flex-1 items-center justify-between gap-4 text-xl font-semibold sm:w-[96.5vw]">
        <GameSheet />
        {!hideAnswerType && <p className="text-center">Wybierz odpowiedź</p>}
        <p className="relative z-40">
          {currentQuestion}/{totalQuestions}
        </p>
      </div>,
    ]);
  }, [currentQuestion, totalQuestions, hideAnswerType, setNavbarComponents]);
  return null;
};

export default GameNavbar;
