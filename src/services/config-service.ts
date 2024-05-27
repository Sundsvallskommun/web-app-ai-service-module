interface Content {
  header: string;
  subHeader: string;
  secondary?: string;
  faqs: string[];
  infoLink?: {
    text: string;
    url: string;
  };
}

interface Styles {
  brandColor: string;
  brandButtonColor: string;
  brandHeader: string;
  brandText: string;
  brandRadius: string;
  brandWidth: string;
  brandMaxWidth: string;
  brandButtons: string;
  brandUserColor: string;
}

const VuxContent: Content = {
  header: "Hej, vad vill du ha hjälp med?",
  subHeader: "Skriv din fråga om vuxenutbildning till AI-assistenten",
  secondary: "The AI assistant can answer your questions in multiple languages",
  faqs: [
    "Hur gör jag en ansökan?",
    "Var bokar man tid hos studievägledaren?",
    "Hur gör man en SFI-anmälan?",
    "How do I apply for a course?",
  ],
  infoLink: {
    text: "Hur Sundsvalls kommun använder artificiell intelligens (AI): www.servanet.se/AI",
    url: "https://sundsvall.se/ai",
  },
};

const VuxStyles: Partial<Styles> = {};

const ServanetContent: Content = {
  header: "Låt vår AI-assistent hjälpa dig med din felsökning",
  subHeader: "Ställ din fråga eller beskriv ditt problem",
  secondary: "The AI assistant can answer your questions in multiple languages",
  faqs: [
    "Hur kopplar jag in min utrustning?",
    "Jag har inget internet - vad gör jag?",
    "Varför är min uppkoppling svajig?",
  ],
  infoLink: {
    text: "Hur Servanet använder artificiell intelligens (AI): www.servanet.se/AI",
    url: "https://servanet.se/ai",
  },
};

const ServanetStyles: Partial<Styles> = {
  brandColor: "bg-servanet dark:bg-servanetDark",
  brandButtonColor: "bg-[#66677B]",
  brandHeader: "!font-medium font-servanetHeader",
  brandText: "font-semibold font-servanetDisplay",
  brandRadius: "rounded-6",
  brandWidth: "xl:w-[66rem]",
  brandMaxWidth: "max-w-[66rem]",
  brandButtons: "bg-background-content border-2 border-[#676869] rounded-20",
  brandUserColor: "vattjom",
};

const defaultStyles: Styles = {
  brandColor: "bg-vattjom-surface-primary",
  brandButtonColor: "",
  brandHeader: "!font-extrabold font-header",
  brandText: "font-bold",
  brandRadius: "rounded-18",
  brandWidth: "xl:w-[64rem]",
  brandMaxWidth: "max-w-[64rem]",
  brandButtons: "bg-vattjom-surface-accent border-0 rounded-12",
  brandUserColor: "bjornstigen",
};

export const getContent: () => Content = () => {
  switch (import.meta.env.VITE_APPLICATION) {
    case "VUX":
      return VuxContent;
    case "SERVANET":
      return ServanetContent;
    default:
      return {
        header: "Hej, vad vill du ha hjälp med?",
        subHeader: "Ställ en fråga till AI-assistenten",
        faqs: [],
      };
  }
};

export const getStyles: () => Styles = () => {
  switch (import.meta.env.VITE_APPLICATION) {
    case "VUX":
      return { ...defaultStyles, ...VuxStyles };
    case "SERVANET":
      return { ...defaultStyles, ...ServanetStyles };
    default:
      return defaultStyles;
  }
};
