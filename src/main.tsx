import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppWrapper } from "./context/app.context";
import "./index.css";

export const initializeReactApp = (rootElement) => {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AppWrapper>
        <App
          user={rootElement.getAttribute("data-user")}
          hash={rootElement.getAttribute("data-hash")}
          assistantId={
            rootElement.getAttribute("data-assistant") ||
            import.meta.env.VITE_DEFAULT_ASSISTANT_ID
          }
        />
      </AppWrapper>
    </React.StrictMode>
  );
};

class CustomAppComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = this.parentElement.querySelector(
      "#apptemplate"
    ) as HTMLTemplateElement;
    if (template) {
      const templateContent = template.content;
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(templateContent.cloneNode(true));

      const rootElement = shadowRoot.querySelector("#servicemoduleroot");
      if (rootElement) {
        initializeReactApp(rootElement);
      } else {
        console.error("Root element for React app not found.");
      }
    } else {
      console.error("Template not found in parent element.");
    }
  }
}
customElements.define("servicemodule-app", CustomAppComponent);
const container = document.querySelector("#servicemodulewrapper");
if (container) {
  container.appendChild(document.createElement("servicemodule-app"));
}

const topLevel = document.querySelector("#servicemoduleroot") as HTMLElement;
if (topLevel) {
  initializeReactApp(topLevel);
}
