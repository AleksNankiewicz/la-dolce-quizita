import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
type GameAnswerResultProps = {
  isCorrect: boolean;
  isIncorrect: boolean;
  isTimeout: boolean;
};

const GameAnswerResult = ({
  isCorrect,
  isIncorrect,
  isTimeout,
}: GameAnswerResultProps) => {
  const [resultContent, setResultContent] = useState<React.ReactNode | null>();

  useEffect(() => {
    if (isCorrect) {
      setResultContent(
        <div className="left-0 flex w-full flex-col items-center justify-center gap-4 bg-green-500 py-4">
          <h1 className="text-xl font-semibold">Poprawna odpowiedź!</h1>
          <Badge className="pointer-events-none bg-white text-emerald-500">
            +200
          </Badge>
        </div>,
      );
    }
    if (isIncorrect) {
      setResultContent(
        <div className="left-0 flex w-full flex-col items-center justify-center gap-4 bg-red-500 py-4">
          <h1 className="text-xl font-semibold">Niepoprawna odpowiedź!</h1>
          <Badge className="pointer-events-none bg-white text-red-500">
            Następnym razem się postaraj
          </Badge>
        </div>,
      );
    }
    if (isTimeout) {
      setResultContent(
        <div className="left-0 flex w-full flex-col items-center justify-center gap-4 bg-yellow-500 py-4">
          <h1 className="text-xl font-semibold">Czas minął</h1>
          <Badge className="pointer-events-none bg-white text-yellow-500">
            Postaraj się być szybszy
          </Badge>
        </div>,
      );
    }
  }, [isCorrect, isIncorrect, isTimeout]);

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 w-full bg-black"
      initial={{ y: -400, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {resultContent}
    </motion.div>
  );
};

export default GameAnswerResult;
