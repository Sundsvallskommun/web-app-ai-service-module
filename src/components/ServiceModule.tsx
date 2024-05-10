import {
  Button,
  cx,
  FormControl,
  FormLabel,
  Input,
  Link,
  Spinner,
} from "@sk-web-gui/react";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/app.context";
import useChat from "../hooks/useChat";
import { getContent, getStyles } from "../services/config-service";
import { ChatHistoryComponent } from "./ChatHistory";

export const ServiceModule = () => {
  const showReferences = true;
  const { assistantId } = useAppContext();
  const { history, sendQuery, addHistoryEntry, clearHistory, done, error } =
    useChat();
  const [lastMessage, setLastMessage] = useState("");

  const [query, setQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const showHistory = history.length > 0;

  const { header, subHeader, secondary, faqs } = getContent();
  const {
    brandColor,
    brandButtonColor,
    brandHeader,
    brandText,
    brandRadius,
    brandWidth,
    brandMaxWidth,
    brandButtons,
  } = getStyles();

  const handleQuerySubmit = (q: string) => {
    if (q.trim() !== "") {
      setLastMessage(`Skickar fråga: ${q}`);
      sendQuery(q);
    }
  };

  useEffect(() => {
    if (done) {
      setQuery("");
      const last = history?.at(-1);
      if (last) {
        const lastText =
          last.origin === "assistant" || last.origin === "system"
            ? `${import.meta.env.VITE_ASSISTANT_NAME} svarar: ${last?.text}`
            : last?.text;
        setLastMessage(lastText);
      }
      // inputRef.current?.focus();
    }
  }, [done]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.parentElement.scrollTop = scrollRef.current.offsetTop;
    }
  }, [history]);

  return (
    <>
      <div
        className={cx(
          `m-0 md:m-16 flex flex-nowrap justify-center font-display text-left`
        )}
      >
        <div
          className={cx(
            `w-11/12 p-24 md:p-40 md:rounded-r-none flex flex-col items-start self-stretch gap-16 md:gap-24 text-white shadow-xl`,
            brandColor,
            brandRadius ? brandRadius : "rounded-18",
            brandWidth,
            brandMaxWidth
          )}
        >
          <h2
            className={cx(
              `text-light-primary w-11/12 md:w-4/5 xl:w-11/12 text-display-3-sm md:text-display-3-sm lg:text-display-3-md m-0`,
              brandHeader ? brandHeader : ""
            )}
          >
            {header}
          </h2>
          <div className="w-full relative">
            <FormLabel
              htmlFor="query"
              id="query-label"
              className={cx(`text-large ${brandText} text-light-primary mb-sm`)}
            >
              {subHeader}
            </FormLabel>
            {secondary ? (
              <p className="text-background-content">{secondary}</p>
            ) : null}
            <div className="h-[4.8rem] flex justify-end">
              <div
                className={cx(
                  `w-full bg-background-content text-primary flex flex-col shadow-lg z-popover`,
                  showHistory
                    ? "transition-all fixed left-0 right-0 bottom-0 top-0 rounded-0 sm:rounded-12 sm:absolute sm:left-[unset] sm:right-[unset] sm:bottom-[unset] sm:top-[unset]"
                    : "relative rounded-12"
                )}
                ref={chatRef}
              >
                <ChatHistoryComponent
                  scrollRef={scrollRef}
                  inputRef={inputRef}
                />
                <div
                  className={cx(
                    "flex items-center justify-center",
                    showHistory ? `p-2 border-t` : "p-0"
                  )}
                >
                  <FormControl
                    id="query"
                    className={cx(
                      "w-full gap-12 md:gap-0",
                      showHistory ? `m-8` : "m-0"
                    )}
                  >
                    <Input.Group
                      size="lg"
                      className="border-solid border-gray-300"
                    >
                      <Input
                        ref={inputRef}
                        className="w-4/5"
                        aria-describedby="query-label"
                        type="text"
                        value={query}
                        onKeyDown={(e) => {
                          if (e.code === "Enter") {
                            handleQuerySubmit(query);
                            setQuery("");
                          }
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setQuery(e.target.value)
                        }
                      />
                      <Input.RightAddin icon className="pr-8">
                        {done ? (
                          <Button
                            className={cx(`flex ${brandButtonColor}`)}
                            disabled={
                              !assistantId || !query || query.trim() === ""
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleQuerySubmit(query);
                            }}
                            size="sm"
                          >
                            <span>Skicka</span>
                          </Button>
                        ) : (
                          <Spinner size={2} />
                        )}
                      </Input.RightAddin>
                    </Input.Group>
                  </FormControl>
                </div>
              </div>
            </div>
            <div
              aria-hidden={showHistory}
              className="text-small font-light mt-sm text-light-primary"
            >
              <Link
                href="https://sundsvall.se/ai"
                className="text-light-primary"
              >
                Hur Sundsvalls kommun använder artificiell intelligens (AI):{" "}
                www.sundsvall.se/AI
              </Link>
            </div>
          </div>
        </div>
        <div
          className={cx(
            `w-[36rem] p-40 bg-background-content rounded-r-18 hidden md:flex flex-col justify-start items-start self-stretch gap-12 shadow-xl`
          )}
        >
          <h3 className={cx(`text-large ${brandText} text-dark-primary`)}>
            Vanliga frågor
          </h3>
          <ul className="md:flex flex-col justify-center items-start self-stretch gap-12">
            {faqs.map((s, idx) => (
              <li key={idx}>
                <Button
                  variant="ghost"
                  disabled={!assistantId}
                  onClick={() => {
                    clearHistory();
                    setQuery(s);
                    handleQuerySubmit(s);
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className={cx(
                    `p-12 font-semibold text-grey-900 text-small flex items-center justify-around gap-12 rounded-bl-0`,
                    brandButtons
                  )}
                >
                  {s}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
