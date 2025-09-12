import { Brain, Database, Home, Laptop2 } from "lucide-react";
import type { ReactNode } from "react";

export type SectionTab = "lectures" | "practices" | "labs";

export interface MaterialItem {
  id: string;
  title: string;
}

export interface Section {
  id: string;
  title: string;
  icon: () => ReactNode;
  tabs: Partial<Record<SectionTab, string>>;
  content: Partial<Record<SectionTab, MaterialItem[]>>;
}

export const sections: Section[] = [
  {
    id: "/",
    title: "Главная",
    icon: () => <Home size={18} />,
    tabs: {},
    content: {},
  },
  {
    id: "oaip",
    title: "ОАиП",
    icon: () => <Laptop2 size={18} />,
    tabs: {
      lectures: "/oaip/lectures",
      practices: "/oaip/practices",
      labs: "/oaip/labs",
    },
    content: {
      lectures: [],
      practices: [],
      labs: [],
    },
  },
  {
    id: "opbd",
    title: "ОПБД",
    icon: () => <Database size={18} />,
    tabs: {
      lectures: "/opbd/lectures",
      labs: "/opbd/labs",
    },
    content: {
      lectures: [],
      labs: [],
    },
  },
  {
    id: "pirvp",
    title: "ПиРВП",
    icon: () => <Brain size={18} />,
    tabs: {
      lectures: "/pirvp/lectures",
      labs: "/pirvp/labs",
    },
    content: {
      lectures: [
        { id: "lec1", title: "Введение в веб-технологии [1]" },
        { id: "lec2", title: "Работа браузера и семантический HTML [2]" },
        { id: "lec3", title: "Основы CSS: стилизация и каскадность [3]" },
      ],
    },
  },
];
