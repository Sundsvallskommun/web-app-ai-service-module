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
      className="w-32 h-32 bg-gronsta-surface-primary rounded-12 flex items-center justify-center"
    >
      <Logo size={28} bgColor="transparent" />
    </div>
  ) : import.meta.env.VITE_APPLICATION === "SERVANET" ? (
    <div
      aria-label="Assistent"
      className="w-32 h-32 bg-gronsta-surface-primary rounded-12 flex items-center justify-center"
    >
      <Logo size={28} bgColor="transparent" />
    </div>
  ) : null;
};
