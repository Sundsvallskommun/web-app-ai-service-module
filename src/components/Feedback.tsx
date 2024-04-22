import React, { useEffect, useRef, useState } from "react";
import { ChatHistory, ChatHistoryEntry } from "../interfaces/history";
import { Button, Icon, cx } from "@sk-web-gui/react";
import { giveFeedback } from "../services/query-service";
import { useAppContext } from "../context/app.context";

export const Feedback: React.FC<{
  history: ChatHistory;
  msg: ChatHistoryEntry;
  idx: number;
  scrollRef: React.RefObject<HTMLDivElement>;
}> = ({ history, msg, idx, scrollRef }) => {
  const { assistantId, sessionId, setSessionId, user, hash } = useAppContext();
  const [showFeedbackReason, setShowFeedbackReason] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedback, setFeedback] = useState<-1 | 1 | null>(null);

  const scroll = () =>
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.parentElement.scrollTop = scrollRef.current.offsetTop;
      }
    }, 10);

  const sendFeedback = (val: -1 | 1, reason) => {
    setShowFeedbackReason(false);
    setFeedbackLoading(true);
    scroll();
    setShowThanks(true);
    setFeedback(val);
    giveFeedback(
      user,
      assistantId,
      sessionId,
      { value: 1, text: reason || null },
      hash
    ).then(() => {
      setTimeout(() => {
        setFeedbackLoading(false);
        scroll();
      }, 500);
    });
  };

  const handleFeedback = (val: -1 | 1) => {
    if (val === -1) {
      setShowFeedbackReason(true);
      scroll();
    } else {
      sendFeedback(val, null);
    }
  };

  useEffect(() => {
    setShowThanks(false);
    setShowFeedbackReason(false);
  }, [msg]);

  const CloseFeedbackButton = () => (
    <Icon.Padded
      name="x"
      aria-label="Stäng feedback"
      className="hover:bg-gray-lighter"
      size={28}
      variant="ghost"
      role="button"
      onClick={() => {
        setShowFeedbackReason(false);
        setShowThanks(false);
      }}
    />
  );

  return msg.origin === "assistant" &&
    idx === history.filter((msg) => msg.text !== "").length - 1 ? (
    <div>
      <div className="m-lg flex gap-24 justify-end">
        <Button
          iconButton
          variant="tertiary"
          size="sm"
          className={cx(
            `hover:bg-background-two bg-background-content`,
            feedback === 1 ? "bg-background-two" : null
          )}
        >
          <Icon
            aria-label="Bra svar"
            size={32}
            name="thumbs-up"
            onClick={() => handleFeedback(1)}
          />
        </Button>
        <Button
          iconButton
          variant="tertiary"
          size="sm"
          className={cx(
            `hover:bg-background-two bg-background-content`,
            feedback === -1 ? "bg-background-two" : null
          )}
        >
          <Icon
            aria-label="Dåligt svar"
            size={32}
            name="thumbs-down"
            onClick={() => handleFeedback(-1)}
          />
        </Button>
      </div>
      <div>
        {showFeedbackReason ? (
          <div className="flex flex-col gap-8 pl-14 pr-8 pt-8 pb-14 bg-background-color-mixin-1 dark:bg-light text-secondary rounded-12">
            <div className="flex flex-row items-center justify-between text-sm">
              <span className="text-[1.4rem] font-bold">Berätta mer</span>
              <CloseFeedbackButton />
            </div>
            <div className="flex flex-row items-center gap-8 justify-start text[1.4rem]">
              {["Innehåller faktafel", "Inte nöjd med svaret"].map((reason) => (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => sendFeedback(-1, reason)}
                >
                  {reason}
                </Button>
              ))}
            </div>
          </div>
        ) : feedbackLoading ? (
          <div className="flex flex-col gap-8 pl-14 pr-8 pt-8 pb-8 bg-background-color-mixin-1 dark:bg-light text-secondary rounded-12">
            <div className="flex flex-row items-center justify-between text-sm">
              <span className="text-[1.4rem] font-bold">Skickar feedback</span>
              <CloseFeedbackButton />
            </div>
          </div>
        ) : showThanks ? (
          <div className="flex flex-col gap-8 pl-14 pr-8 pt-8 pb-8 bg-background-color-mixin-1 dark:bg-light text-secondary rounded-12">
            <div className="flex flex-row items-center justify-between text-sm">
              <span className="text-[1.4rem] font-bold">
                Tack för din feedback
              </span>
              <CloseFeedbackButton />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <></>
  );
};
