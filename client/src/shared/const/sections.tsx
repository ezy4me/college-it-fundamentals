import { Brain, Database, Laptop2 } from 'lucide-react';
import type { ReactNode } from 'react';

export type SectionTab = 'lectures' | 'practices' | 'labs';

export interface Section {
  id: string;
  title: string;
  icon: () => ReactNode; 
  tabs: Partial<Record<SectionTab, string>>;
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
  },
  {
    id: 'opbd',
    title: 'ОПБД',
    icon: () => <Database size={18} />,
    tabs: {
      lectures: '/opbd/lectures',
      labs: '/opbd/labs',
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
  },
];
