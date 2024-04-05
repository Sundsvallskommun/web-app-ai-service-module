import {
  Button,
  defaultTheme,
  extendTheme,
  GuiProvider,
} from "@sk-web-gui/react";
import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { ServiceModule } from "./components/ServiceModule";
import { useAppContext } from "./context/app.context";
import { getAssistantById } from "./services/assistant-service";
import { hasExtendedFunctionality } from "./services/featureflag-service";

function App({
  user,
  hash,
  assistantId,
}: {
  user: string | null;
  hash: string | null;
  assistantId: string | null;
}) {
  const { setUser, setHash, setAssistantId, setAssistant } = useAppContext();
  const [colorScheme] = useState("light");

  const theme = useMemo(
    () =>
      extendTheme({
        cursor: colorScheme === "light" ? "pointer" : "default",
        colorSchemes: defaultTheme.colorSchemes,
      }),
    [colorScheme]
  );

  useEffect(() => {
    setUser(user || "");
    setHash(hash || "");
    setAssistantId(assistantId || "");
    if (hasExtendedFunctionality() && assistantId) {
      getAssistantById(assistantId, user, hash)
        .then(setAssistant)
        .catch(() => {
          console.error("Error when fetching assistant");
        });
    }
  }, [user, hash, assistantId]);

  return (
    <GuiProvider theme={theme}>
      <ServiceModule />
    </GuiProvider>
  );
}

export default App;
