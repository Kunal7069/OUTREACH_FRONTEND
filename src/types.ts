export interface Document {
  id: string;
  title: string;
  description: string;
  section: string;
  fileType: 'pdf' | 'doc' | 'txt' | 'image';
  size: string;
  lastModified: string;
  url: string;
  thumbnail?: string;
  tags: string[];
}

export interface Section {
  id: string;
  name: string;
  icon: string;
  color: string;
  documentCount: number;
}

export interface AppState {
  isAuthenticated: boolean;
  currentDocument: Document | null;
  searchQuery: string;
  selectedSection: string | null;
  recentDocuments: Document[];
}