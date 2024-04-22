interface Content {
  header: string;
  subHeader: string;
  faqs: string[];
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
  header: "Hej, hur kan vi hjälpa dig idag?",
  subHeader: "Ställ en fråga till AI-assistenten",
  faqs: [
    "Hur gör jag en ansökan?",
    "Var bokar man tid hos studievägledaren?",
    "Hur gör man en SFI-anmälan?",
    "How do I apply for a course?",
  ],
};

const VuxStyles: Partial<Styles> = {};

const ServanetContent: Content = {
  header: "Låt vår AI-assistent hjälpa dig med din felsökning",
  subHeader: "Ställ en fråga eller beskriv ditt problem",
  faqs: [
    "Hur kopplar jag in min utrustning?",
    "Jag har inget internet - vad gör jag?",
    "Varför är min uppkoppling svajig?",
  ],
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
        header: "Hej, hur kan vi hjälpa dig idag?",
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
