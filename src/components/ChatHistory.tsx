import { Accordion, Button, Icon, Link, cx } from "@sk-web-gui/react";
import { useEffect, useRef, useState } from "react";
import useChat from "../hooks/useChat";
import { AssistantAvatar } from "./AssistantAvatar";
import { ChatHeader } from "./ChatHeader";
import { Feedback } from "./Feedback";
import { MarkdownRendered } from "./MarkdownRendered";
import { UserAvatar } from "./UserAvatar";

export const ChatHistoryComponent: React.FC<{
  scrollRef;
  inputRef;
}> = ({ scrollRef, inputRef }) => {
  const { history, done, clearHistory } = useChat();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const timeout = useRef(setTimeout(() => {}));
  const showReferences = true;

  useEffect(() => {
    if (!done) {
      timeout.current = setTimeout(() => {
        setShowLoading(true);
      }, 3500);
    } else {
      clearTimeout(timeout.current);
      setShowLoading(false);
    }
  }, [done]);

  const showHistory = history.length > 0;

  const messageIsAriaHidden = (idx, history, done, msg) =>
    idx === history.length - 1 && msg.origin === "assistant" ? !done : false;

  return (
    showHistory && (
      <div className="relative">
        <div className="block sm:hidden">
          <ChatHeader open={open} setOpen={clearHistory} />
        </div>
        <Button
          title="Stäng sökresultat"
          iconButton
          aria-label="Stäng sökresultat"
          size="sm"
          variant="tertiary"
          onClick={clearHistory}
          className="xs:hidden sm:flex absolute right-12 top-12 p-8 rounded-full flex items-center justify-center"
        >
          <Icon name={"x"} />
        </Button>
        <div
          className="mt-sm p-16 pb-24 pr-16 h-[calc(100vh-144px)] sm:h-auto sm:max-h-[50rem] overflow-y-scroll flex flex-col"
          aria-live="polite"
          aria-atomic={false}
        >
          {history.map((msg, idx) => (
            <div
              key={`history-${idx}`}
              className={cx(
                idx === history.length - 1 ? "mb-0" : "mb-24",
                `flex items-start gap-12`
              )}
            >
              <div aria-hidden={true}>
                {msg.origin === "assistant" ? (
                  <AssistantAvatar />
                ) : msg.origin === "system" ? (
                  <AssistantAvatar />
                ) : (
                  <UserAvatar />
                )}
              </div>
              {idx === history.length - 1 &&
              msg.origin === "assistant" &&
              showLoading ? (
                <div className="sr-only" aria-live="polite">
                  Inväntar svar
                </div>
              ) : null}
              <div
                className="max-w-[85%]"
                aria-hidden={messageIsAriaHidden(idx, history, done, msg)}
              >
                {msg.origin === "assistant" || msg.origin === "system" ? (
                  <strong>{import.meta.env.VITE_ASSISTANT_NAME}</strong>
                ) : (
                  <>
                    <span className="sr-only">Du</span>
                  </>
                )}
                <div
                  className={cx(
                    "break-words",
                    "max-w-full w-8/9",
                    msg.origin === "system" ? `text-error` : null
                  )}
                  id="chat-history"
                >
                  <MarkdownRendered
                    text={msg.text}
                    messageId={msg.id}
                    hideElements={messageIsAriaHidden(idx, history, done, msg)}
                  />
                </div>
                {showReferences && msg.references?.length > 0 ? (
                  <Accordion size="sm" className="mt-20 p-0" aria-live="off">
                    <Accordion.Item
                      className="bg-gray-100 border-1 border-gray-100 rounded-12 pl-20 pr-12 dark:text-black"
                      header={
                        <span className="dark:text-black">
                          Kunskapskällor ({msg.references?.length || 0})
                        </span>
                      }
                    >
                      <ul aria-label="Kunskapskällor">
                        {msg.references?.map((r, i) => (
                          <li
                            className="max-w-full w-full my-8 rounded-6 whitespace-normal text-base"
                            key={`ref-${i}-${idx}`}
                          >
                            <small>
                              <Link
                                external
                                href={r.url}
                                className="dark:text-black"
                              >
                                {r.title}
                              </Link>
                            </small>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Item>
                  </Accordion>
                ) : null}
                {done ? (
                  <Feedback
                    history={history}
                    msg={msg}
                    idx={idx}
                    scrollRef={scrollRef}
                    inputRef={inputRef}
                  />
                ) : null}
              </div>
            </div>
          ))}
          <div ref={scrollRef}></div>
        </div>
      </div>
    )
  );
};
