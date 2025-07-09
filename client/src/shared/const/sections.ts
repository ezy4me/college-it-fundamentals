export type SectionTab = 'lectures' | 'practices' | 'labs';

export interface Section {
  id: string;
  title: string;
  icon: string;
  tabs: Partial<Record<SectionTab, string>>;
}

export const sections: Section[] = [
  {
    id: 'oaip',
    title: 'ОАиП',
    icon: '💻',
    tabs: {
      lectures: '/oaip/lectures',
      practices: '/oaip/practices',
      labs: '/oaip/labs',
    },
  },
  {
    id: 'opbd',
    title: 'ОПБД',
    icon: '🗄️',
    tabs: {
      lectures: '/opbd/lectures',
      labs: '/opbd/labs',
    },
  },
  {
    id: 'pirvp',
    title: 'ПиРВП',
    icon: '🧠',
    tabs: {
      lectures: '/pirvp/lectures',
      practices: '/pirvp/practices',
    },
  },
];
