import type { MinnaWord } from "../../../constants/minna";
import type { MinnaLang } from "../../../hooks/use-minna-lang";

export interface ExerciseProps {
  words: MinnaWord[];
  lang: MinnaLang;
  onExit: () => void;
  onRestart: () => void;
  exitLabel?: string;
}
