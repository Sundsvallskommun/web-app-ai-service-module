import { Button, Icon, cx } from "@sk-web-gui/react";
import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/app.context";
import { ChatHistory, ChatHistoryEntry } from "../interfaces/history";
import { giveFeedback } from "../services/query-service";

export const Feedback: React.FC<{
  history: ChatHistory;
  msg: ChatHistoryEntry;
  idx: number;
  scrollRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLDivElement>;
}> = ({ history, msg, idx, scrollRef, inputRef }) => {
  const { assistantId, sessionId, setSessionId, user, hash } = useAppContext();
  const [showFeedbackReason, setShowFeedbackReason] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedback, setFeedback] = useState<-1 | 1 | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const thumbDownButtonRef = useRef<HTMLDivElement>(null);
  const thumbUpButtonRef = useRef<HTMLDivElement>(null);

  const scroll = () =>
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.parentElement.scrollTop = scrollRef.current.offsetTop;
      }
    }, 10);

  const sendFeedback = async (val: -1 | 1, reason?: string) => {
    setShowFeedbackReason(false);
    setShowThanks(false);
    setFeedbackLoading(true);
    scroll();
    setFeedback(val);
    await giveFeedback(
      user,
      assistantId,
      sessionId,
      { value: val, text: reason || null },
      hash
    );
    setFeedbackLoading(false);
    setShowThanks(true);
    setTimeout(() => {
      const ref = val === 1 ? thumbUpButtonRef : thumbDownButtonRef;
      if (ref.current) {
        ref.current.focus();
      }
    }, 10);
    scroll();
  };

  const handleFeedback = (val: -1 | 1) => {
    if (val === -1) {
      setShowFeedbackReason(true);
      setTimeout(() => {
        feedbackRef.current?.focus();
      }, 10);
      scroll();
    } else {
      sendFeedback(val);
    }
  };

  useEffect(() => {
    setShowThanks(false);
    setShowFeedbackReason(false);
  }, [msg]);

  const CloseFeedbackButton = () => (
    <Button
      iconButton
      aria-label="Stäng"
      variant="secondary"
      size="sm"
      className="hover:bg-gray-lighter border-0"
      onClick={() => {
        setShowFeedbackReason(false);
        setShowThanks(false);
        if (showFeedbackReason) {
          if (thumbDownButtonRef.current) {
            thumbDownButtonRef.current.focus();
          }
        } else {
          if (thumbUpButtonRef.current) {
            thumbUpButtonRef.current.focus();
          }
        }
      }}
    >
      <Icon name="x" size={28} />
    </Button>
  );

  return msg.origin === "assistant" &&
    idx === history.filter((msg) => msg.text !== "").length - 1 ? (
    <div
      aria-live={
        showFeedbackReason || feedbackLoading || showThanks ? `polite` : `off`
      }
    >
      <div className="m-lg flex gap-24 justify-end">
        <Button
          ref={thumbUpButtonRef}
          iconButton
          aria-label="Bra svar"
          variant="tertiary"
          size="sm"
          className={cx(
            `hover:bg-background-two bg-background-content`,
            feedback === 1 ? "bg-background-two" : null
          )}
          onClick={() => handleFeedback(1)}
        >
          <Icon size={32} name="thumbs-up" />
        </Button>
        <Button
          ref={thumbDownButtonRef}
          iconButton
          aria-label="Dåligt svar"
          aria-haspopup="true"
          aria-expanded={showFeedbackReason}
          variant="tertiary"
          size="sm"
          className={cx(
            `hover:bg-background-two bg-background-content`,
            feedback === -1 ? "bg-background-two" : null
          )}
          onClick={() => handleFeedback(-1)}
        >
          <Icon size={32} name="thumbs-down" />
        </Button>
      </div>
      {showFeedbackReason || feedbackLoading || showThanks ? (
        <div
          className="flex flex-col gap-8 pl-14 pr-8 pt-8 pb-14 bg-background-color-mixin-1 dark:bg-light text-secondary rounded-12"
          aria-live="polite"
        >
          <>
            <div
              className="flex flex-row items-center justify-between text-sm"
              aria-live="polite"
              aria-atomic="false"
            >
              <span className="text-[1.4rem] font-bold">
                {showFeedbackReason
                  ? "Berätta mer"
                  : feedbackLoading
                  ? "Skickar feedback"
                  : "Tack för din feedback"}
              </span>
              <CloseFeedbackButton />
            </div>
            {showFeedbackReason ? (
              <div
                className="flex flex-row flex-wrap items-center gap-8 justify-start text[1.4rem]"
                role="menu"
              >
                {["Innehåller faktafel", "Inte nöjd med svaret"].map(
                  (reason, idx) => (
                    <Button
                      key={`reason-${idx}`}
                      role="menuitem"
                      ref={idx === 0 ? feedbackRef : null}
                      variant="secondary"
                      size="sm"
                      onClick={() => sendFeedback(-1, reason)}
                    >
                      {reason}
                    </Button>
                  )
                )}
              </div>
            ) : null}
          </>
        </div>
      ) : null}
    </div>
  ) : (
    <></>
  );
};
