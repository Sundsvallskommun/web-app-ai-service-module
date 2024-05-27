import { cx } from "@sk-web-gui/react";
import { Logo } from "./Logo";

export const AssistantAvatar = () => {
  const APP_BASE_URL = new URL(window.location.href).pathname.replace(
    /\/$/,
    ""
  );
  const backgroundImageUrl = `${APP_BASE_URL}/assets/servanetlogo.png`;
  return import.meta.env.VITE_APPLICATION === "VUX" ? (
    <div
      aria-label="Assistent"
      className="w-[32px] h-[32px] bg-gronsta-surface-primary rounded-12 flex items-center justify-center"
    >
      <Logo size={28} bgColor="transparent" />
    </div>
  ) : import.meta.env.VITE_APPLICATION === "SERVANET" ? (
    <div
      aria-label="Assistent"
      className={cx(
        `bg-white rounded-12 border-1 bg-servanetlogo2 bg-center bg-contain w-[32px] h-32`
      )}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    ></div>
  ) : null;
};
