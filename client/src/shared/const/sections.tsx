import { Brain, Database, Laptop2 } from 'lucide-react';
import type { ReactNode } from 'react';

export type SectionTab = 'lectures' | 'practices' | 'labs';

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
    id: 'oaip',
    title: 'ОАиП',
    icon: () => <Laptop2 size={18} />,
    tabs: {
      lectures: '/oaip/lectures',
      practices: '/oaip/practices',
      labs: '/oaip/labs',
    },
    content: {
      lectures: [
        { id: 'lec1', title: 'Введение в ОАиП' },
        { id: 'lec2', title: 'Основы программирования' },
        { id: 'lec3', title: 'Объектно-ориентированное программирование' },
      ],
      practices: [
        { id: 'pr1', title: 'Практика 1: Установка окружения' },
        { id: 'pr2', title: 'Практика 2: Написание простого приложения' },
      ],
      labs: [
        { id: 'lab1', title: 'Лабораторная 1: Классы и объекты' },
        { id: 'lab2', title: 'Лабораторная 2: Наследование' },
      ],
    },
  },
  {
    id: 'opbd',
    title: 'ОПБД',
    icon: () => <Database size={18} />,
    tabs: {
      lectures: '/opbd/lectures',
      labs: '/opbd/labs',
    },
    content: {
      lectures: [
        { id: 'lec1', title: 'Введение в базы данных' },
        { id: 'lec2', title: 'Моделирование данных' },
      ],
      labs: [
        { id: 'lab1', title: 'Лабораторная 1: Создание таблиц' },
      ],
    },
  },
  {
    id: 'pirvp',
    title: 'ПиРВП',
    icon: () => <Brain size={18} />,
    tabs: {
      lectures: '/pirvp/lectures',
      practices: '/pirvp/practices',
    },
    content: {
      lectures: [
        { id: 'lec1', title: 'Введение в ПиРВП' },
      ],
      practices: [
        { id: 'pr1', title: 'Практика 1: Анализ алгоритмов' },
      ],
    },
  },
];
