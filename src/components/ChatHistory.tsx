import { Accordion, Button, Icon, Link, cx } from "@sk-web-gui/react";
import { ChatHeader } from "./ChatHeader";
import { AssistantAvatar } from "./AssistantAvatar";
import { UserAvatar } from "./UserAvatar";
import { MarkdownRendered } from "./MarkdownRendered";
import sanitized from "../services/sanitizer-service";

export const ChatHistory: React.FC<{
  clearHistory;
  history;
  showReferences;
  lastMessage;
  scrollRef;
}> = ({ clearHistory, history, showReferences, lastMessage, scrollRef }) => (
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
      tabIndex={0}
    >
      {history
        .filter((msg) => msg.text !== "")
        .map((msg, idx) => (
          <div key={`history-${idx}`} className="mb-24 flex items-start gap-12">
            <div aria-hidden>
              {msg.origin === "assistant" ? (
                <AssistantAvatar />
              ) : msg.origin === "system" ? (
                <AssistantAvatar />
              ) : (
                <UserAvatar />
              )}
            </div>
            <div className="max-w-[85%]">
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
              >
                <MarkdownRendered text={sanitized(msg.text)} />
              </div>
              {showReferences && msg.references?.length > 0 ? (
                <Accordion size="sm" className="mt-20 p-0">
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
            </div>
          </div>
        ))}
      <div aria-live={"polite"} className="sr-only">
        <MarkdownRendered text={sanitized(lastMessage)} />
      </div>
      <div ref={scrollRef}></div>
    </div>
  </div>
);
