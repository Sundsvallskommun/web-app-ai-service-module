import { Link } from "@sk-web-gui/react";
import Markdown from "react-markdown";
import sanitized from "../services/sanitizer-service";

export const MarkdownRendered = (props: { text: string }) => (
  <Markdown
    disallowedElements={["script", "iframe"]}
    components={{
      a(props) {
        const { node, href, title } = props;
        return (
          <Link external href={href} className="block break-all my-sm">
            {href}
          </Link>
        );
      },
      ol(props) {
        return <ol className="list-decimal">{props.children}</ol>;
      },
      ul(props) {
        return <ul className="list-disc">{props.children}</ul>;
      },
      li(props) {
        return <li className="my-md">{props.children}</li>;
      },
    }}
  >
    {sanitized(props.text)}
  </Markdown>
);
