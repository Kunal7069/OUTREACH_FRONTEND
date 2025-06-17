import { Document, Section } from './types';

export const sections: Section[] = [
  {
    id: 'post-drafts',
    name: 'Post Drafts',
    icon: 'FileEdit',
    color: 'from-blue-600 to-blue-800',
    documentCount: 3
  },
  {
    id: 'content-povs',
    name: 'Content POVs',
    icon: 'Eye',
    color: 'from-purple-600 to-purple-800',
    documentCount: 3
  },
  {
    id: 'user-dna',
    name: 'User DNA',
    icon: 'Users',
    color: 'from-teal-600 to-teal-800',
    documentCount: 1
  },
  {
    id: 'content-strategy',
    name: 'Content Strategy',
    icon: 'Target',
    color: 'from-green-600 to-green-800',
    documentCount: 1
  }
];

export const documents: Document[] = [
  {
    id: '1',
    title: 'Topic 1 - Agentic Infrastructure & Real-Time Integrations',
    description: 'First post draft ready for review. Please check for brand alignment, tone consistency, factual accuracy, and overall messaging.',
    section: 'post-drafts',
    fileType: 'pdf',
    size: '2.4 MB',
    lastModified: '2025-06-12',
    url: '/Post Drafts/Ayan - Post 1.pdf',
    tags: ['draft']
  },
  {
    id: '2',
    title: 'Topic 2 - Building Scalable API Architectures for Modern SaaS',
    description: 'Second post draft ready for review. Please check for brand alignment, tone consistency, factual accuracy, and overall messaging.',
    section: 'post-drafts',
    fileType: 'pdf',
    size: '2.1 MB',
    lastModified: '2025-06-12',
    url: '/Post Drafts/Ayan - Post 2.pdf',
    tags: ['draft']
  },
  {
    id: '3',
    title: 'Topic 3 - The Future of Developer Experience in Enterprise Tools',
    description: 'Third post draft ready for review. Please check for brand alignment, tone consistency, factual accuracy, and overall messaging.',
    section: 'post-drafts',
    fileType: 'pdf',
    size: '1.8 MB',
    lastModified: '2025-06-12',
    url: '/Post Drafts/Ayan - Post 3.pdf',
    tags: ['draft']
  },
  {
    id: '4',
    title: 'Concept 1',
    description: 'We\'ve outlined specific angles for each topic and need your confirmation and voice check. Why this matters: These perspectives shape how your expertise is positioned and what takeaways your audience receives.',
    section: 'content-povs',
    fileType: 'pdf',
    size: '1.8 MB',
    lastModified: '2025-06-12',
    url: '/Content POVs/Ayan - Content Concept 1.pdf',
    tags: ['draft']
  },
  {
    id: '5',
    title: 'Concept 2',
    description: 'Detailed breakdown of content angles and voice positioning for upcoming topics.',
    section: 'content-povs',
    fileType: 'pdf',
    size: '2.3 MB',
    lastModified: '2025-06-12',
    url: '/Content POVs/Ayan - Content Concept 2.pdf',
    tags: ['draft']
  },
  {
    id: '6',
    title: 'Concept 3',
    description: 'Strategic mapping of audience expectations and voice consistency requirements.',
    section: 'content-povs',
    fileType: 'pdf',
    size: '1.9 MB',
    lastModified: '2025-06-12',
    url: '/Content POVs/Ayan - Content Concept 3.pdf',
    tags: ['draft']
  },
  {
    id: '7',
    title: 'User DNA',
    description: 'Comprehensive analysis of your target audience demographics, preferences, and behavior patterns.',
    section: 'user-dna',
    fileType: 'pdf',
    size: '3.1 MB',
    lastModified: '2025-06-12',
    url: '/User DNA/Ayan Barua [User DNA].pdf',
    tags: ['draft']
  },
  {
    id: '8',
    title: 'Content Strategy',
    description: 'Strategic content calendar with key themes, posting schedules, and campaign alignments.',
    section: 'content-strategy',
    fileType: 'pdf',
    size: '4.2 MB',
    lastModified: '2025-06-12',
    url: '/Content Strategy/Ayan Barua [Content Strategy].pdf',
    tags: ['draft']
  }
];

export const APP_PASSWORD = 'document2025';