import { Link } from "@sk-web-gui/react";
import Markdown from "react-markdown";
import sanitized from "../services/sanitizer-service";

export const MarkdownRendered: React.FC<{
  text: string;
  tabbable?: boolean;
}> = ({ text, tabbable = true }) => (
  <Markdown
    disallowedElements={["script", "iframe"]}
    components={{
      a(props) {
        const { node, href, title } = props;
        return (
          <Link
            tabIndex={tabbable ? 0 : -1}
            external={href.startsWith("http")}
            href={href}
            className="block break-all my-sm"
          >
            {props.children || props.href}
          </Link>
        );
      },
      ol(props) {
        return <ol className="list-decimal ml-24">{props.children}</ol>;
      },
      ul(props) {
        return <ul className="list-disc ml-24">{props.children}</ul>;
      },
      li(props) {
        return <li className="my-md">{props.children}</li>;
      },
    }}
  >
    {sanitized(text)}
  </Markdown>
);
