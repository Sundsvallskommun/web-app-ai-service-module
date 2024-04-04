import { Button, Icon, cx } from "@sk-web-gui/react";
import { useAppContext } from "../context/app.context";
import { SundsvallsKommunLogo } from "./SundsvallsKommunLogo";

export const ChatHeader = ({ open, setOpen }) => {
  const { assistantId } = useAppContext();
  return (
    <header
      className={cx(
        "flex justify-between items-center gap-5 cursor-default",
        "h-[62px] rounded-0 sm:rounded-tl-16 bg-primitives-gray-900 text-[#E5E5E5]",
        open ? "p-[15px]" : "p-10 cursor-pointer"
      )}
      role="button"
      aria-label={open ? `Stäng assistent` : `Öppna assistent`}
      onClick={() => {
        if (!open && assistantId) {
          setOpen(!open);
        }
      }}
    >
      {import.meta.env.VITE_APPLICATION === "QWERTY" ? (
        <div
          className={cx(
            `bg-[#65b88f] rounded-12 bg-assistant bg-center bg-contain`,
            open ? "w-[32px] h-32" : "w-[40px] h-[40px]"
          )}
        ></div>
      ) : import.meta.env.VITE_APPLICATION === "VUX" ? (
        <div
          className={cx(
            `bg-vattjom-surface-primary rounded-12 flex items-center justify-center`,
            open ? "w-[32px] h-32" : "w-[40px] h-[40px]"
          )}
        >
          <SundsvallsKommunLogo size={28} bgColor="transparent" />
        </div>
      ) : null}
      <div className="h-full flex-grow leading-none flex flex-col justify-around gap-2">
        <p className="font-bold p-0 !m-0 mt-2">
          {import.meta.env.VITE_ASSISTANT_TITLE}
        </p>
        {!open ? (
          <p className="p-0 !m-0">{import.meta.env.VITE_ASSISTANT_SUBTITLE}</p>
        ) : null}
      </div>
      <Button
        aria-label={open ? `Stäng assistent` : `Öppna assistent`}
        disabled={!assistantId}
        iconButton
        variant={"tertiary"}
        inverted={true}
        size="sm"
        onClick={() => {
          setOpen(!open);
        }}
        className={cx(`cursor-pointer flex items-center justify-center`)}
      >
        {open ? (
          <Icon name="x" size={20} />
        ) : (
          <Icon name="chevrons-up" size={20} />
        )}
      </Button>
    </header>
  );
};
