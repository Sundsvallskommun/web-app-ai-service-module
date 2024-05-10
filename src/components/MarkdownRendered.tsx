import { Link } from "@sk-web-gui/react";
import Markdown from "react-markdown";
import sanitized from "../services/sanitizer-service";

const ParagraphComponent = (props) => {
  return <p className="my-md first:mt-xs">{props.children}</p>;
};

const LinkComponent =
  ({ hidden, id }) =>
  (props) => {
    const { href, children } = props;
    return (
      <Link
        key={id}
        aria-hidden={hidden ? "true" : "false"}
        external={href.startsWith("http")}
        href={href}
        className="my-sm"
        tabIndex={hidden ? -1 : 0}
      >
        {children || href}
      </Link>
    );
  };

const OlComponent = (props) => {
  return <ol className="list-decimal ml-24">{props.children}</ol>;
};

const UlComponent = (props) => {
  return <ul className="list-disc ml-24">{props.children}</ul>;
};

const LiComponent = (props) => {
  return <li className="my-md">{props.children}</li>;
};

export const MarkdownRendered = (props) => {
  const { text, messageId, hideElements } = props;
  return (
    <Markdown
      disallowedElements={["script", "iframe"]}
      components={{
        p: ParagraphComponent,
        a: LinkComponent({ hidden: hideElements, id: messageId }),
        ol: OlComponent,
        ul: UlComponent,
        li: LiComponent,
      }}
    >
      {sanitized(text)}
    </Markdown>
  );
};
