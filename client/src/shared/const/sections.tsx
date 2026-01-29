import { Brain, Database, Home, Laptop2, Carrot } from "lucide-react";

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
        { id: "lec4", title: "Основы UI/UX и адаптивной вёрстки [4]" },
        {
          id: "lec5",
          title: "Основы JavaScript: синтаксис и работа с DOM [5]",
        },
        { id: "lec6", title: "Массивы и строки в JavaScript [6]" },
        {
          id: "lec7",
          title: "Функции в JavaScript: области видимости, замыкания и стек вызовов [7]",
        },
        { id: "lec8", title: "Формы и клиентская валидация [8]" },
        {
          id: "lec9",
          title: "Асинхронность, EventLoop, Promises, async/await [9]",
        },
        {
          id: "lec10",
          title: "Современный frontend — фреймворки и инструменты сборки [10]",
        },
        {
          id: "lec11",
          title: "Архитектура веб-приложений и REST API [11]",
        },
        {
          id: "lec12",
          title: "Введение в серверную разработку: Node.js, Express.js и ORM [12]",
        },
        {
          id: "lec13",
          title: "Основы React: JSX, компоненты, state и props [13]",
        },
        {
          id: "lec14",
          title: "Работа с API в React: fetch, axios и useEffect [14]",
        },
        {
          id: "lec15",
          title: "Формы и маршрутизация в React [15]",
        },
      ],
      labs: [
        {
          id: "lab1",
          title: "Семантическая верстка и базовые стили [1]",
        },
        {
          id: "lab2",
          title: "Создание адаптивного веб-дизайна [2]",
        },
        {
          id: "lab3",
          title: "Взаимодействие с DOM [3]",
        },
        {
          id: "lab4",
          title: "Форма и валидация данных [4]",
        },
        {
          id: "lab5",
          title: "Асинхронная загрузка данных [5]",
        },
      ],
    },
  },
  {
    id: "isrpo",
    title: "ИСРПО",
    icon: () => <Carrot size={18} />,
    tabs: {
      lectures: "/isrpo/lectures",
      labs: "/isrpo/labs",
    },
    content: {
      lectures: [
        {
          id: "lec1",
          title: "Введение в Git [1]",
        },
        {
          id: "lec2",
          title: "Работа с удаленным репозиторием и ветки [2]",
        },
      ],
      labs: [],
    },
  },
];
