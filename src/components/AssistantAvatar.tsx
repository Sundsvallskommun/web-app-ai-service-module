import { cx } from "@sk-web-gui/react";
import { SundsvallsKommunLogo } from "./SundsvallsKommunLogo";

export const AssistantAvatar = () => {
  return import.meta.env.VITE_APPLICATION === "VUX" ? (
    <div
      aria-label="Assistent"
      className="w-[32px] h-[32px] bg-vattjom-surface-primary rounded-12 flex items-center justify-center"
    >
      <SundsvallsKommunLogo size={28} bgColor="transparent" />
    </div>
  ) : import.meta.env.VITE_APPLICATION === "SERVANET" ? (
    <div
      aria-label="Assistent"
      className={cx(
        `bg-white rounded-12 border-1 bg-servanetlogo bg-center bg-contain w-[32px] h-32`
      )}
    ></div>
  ) : null;
};
