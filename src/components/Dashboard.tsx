import React, { useState, useMemo , useEffect} from 'react';
import { LogOut, FileText, User, Eye, Users, Target, ArrowRight , X} from 'lucide-react';

import { Document, Section } from '../types';
import { DocumentViewer } from './DocumentViewer';
import { SearchBar } from './SearchBar';
import { SectionView } from './SectionView';

interface DashboardProps {
  documents: Document[];
  sections: Section[];
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  documents, 
  sections, 
  onLogout 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  
  const [user,setUser] = useState({});
  const [document, setDocument] = useState([]);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const [latestPostDraft, setLatestPostDraft] = useState({});
  const [featuredPOV, setFeaturedPOV] = useState({});

  useEffect(() => {
    if (user?.name && user?.linkedin_username) {
      const fetchDocuments = async () => {
        try {
          const response = await fetch(
            `https://outreach-sqy8.onrender.com/documents/?name=${encodeURIComponent(
              user.name
            )}&linkedin_username=${encodeURIComponent(user.linkedin_username)}`
          );
          const data = await response.json();
          console.log("DATA",data)
          setDocument(data);
          localStorage.setItem('documents', JSON.stringify(data));

          const firstPostDraft = data.find(doc => doc.tag === 'post-drafts');
          if (firstPostDraft) {
            setLatestPostDraft(firstPostDraft);
          }

          const firstfeaturedPOV = data.find(doc => doc.tag === 'content-povs');
          if (firstfeaturedPOV) {
            setFeaturedPOV(firstfeaturedPOV);
          }
        } catch (error) {
          console.error('Error fetching documents:', error);
        }
      };

      fetchDocuments();
    }
  }, [user]);


const [showModal, setShowModal] = useState(false);
const [selectedDocumentUrl, setSelectedDocumentUrl] = useState<string | null>(null);

const handleViewDocument1 = (url: string) => {
  setSelectedDocumentUrl(url);
  setShowModal(true);
};

const getGoogleViewerURL = (dropboxUrl: string) => {
  const rawUrl = dropboxUrl
    .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
    .replace('?dl=0', '');
  return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(rawUrl)}`;
};

  const handleViewDocument = (document: Document) => {
    setCurrentDocument(document);
    
    // Add to recent documents
    setRecentDocuments(prev => {
      const filtered = prev.filter(doc => doc.id !== document.id);
      return [document, ...filtered].slice(0, 5);
    });
  };
  
  const handleDownloadDocument = (document: Document) => {
    window.open(document.url, '_blank');
  };

  const handleSectionView = (sectionId: string) => {
    console.log(sectionId)
    setSelectedSection(sectionId);
  };

  const handleBackToDashboard = () => {
    setSelectedSection(null);
  };

  // Get latest post draft
  // const latestPostDraft = documents.find(doc => doc.section === 'post-drafts');
  
  // Get featured POV (latest content POV)
  // const featuredPOV = documents.find(doc => doc.section === 'content-povs');

  // Get documents by section for counts
  const getDocumentsBySection = (sectionId: string) => {
    return documents.filter(doc => doc.section === sectionId);
  };

  const getSectionIcon = (sectionId: string) => {
    switch (sectionId) {
      case 'post-drafts':
        return <FileText className="w-6 h-6" />;
      case 'content-povs':
        return <Eye className="w-6 h-6" />;
      case 'user-dna':
        return <Users className="w-6 h-6" />;
      case 'content-strategy':
        return <Target className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const getSectionColor = (sectionId: string) => {
    switch (sectionId) {
      case 'post-drafts':
        return 'bg-kiwi-green/10 text-kiwi-green border-kiwi-green/20';
      case 'content-povs':
        return 'bg-intelligence-blue/10 text-intelligence-blue border-intelligence-blue/20';
      case 'user-dna':
        return 'bg-deep-teal/10 text-deep-teal border-deep-teal/20';
      case 'content-strategy':
        return 'bg-kiwi-seed-brown/10 text-kiwi-seed-brown border-kiwi-seed-brown/20';
      default:
        return 'bg-soft-sage text-charcoal-grey border-soft-sage';
    }
  };

  // Filter documents based on search and section
  const filteredDocuments = useMemo(() => {
    let filtered = documents;
    
    if (selectedSection) {
      filtered = filtered.filter(doc => doc.section === selectedSection);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  }, [documents, searchQuery, selectedSection]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-deep-teal shadow-lg border-b border-deep-teal/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div>
                  <h1 className="text-xl font-montserrat font-bold text-white leading-tight">
                    Content<span className="text-kiwi-green">Q</span>
                  </h1>
                  <p className="text-xs text-white/70 font-nunito">powered by KiwiQ AI</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search documents..."
              />
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                  <div className="w-8 h-8 bg-kiwi-green rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-nunito font-medium">{user.name}</span>
                </div>
                
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 backdrop-blur-sm font-nunito"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Show section view if a section is selected */}
      {selectedSection ? (
        <SectionView
          section={sections.find(s => s.id === selectedSection)!}
          documents={getDocumentsBySection(selectedSection)}
          onBack={handleBackToDashboard}
          onViewDocument={handleViewDocument}
          onDownloadDocument={handleDownloadDocument}
        />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-montserrat font-bold text-deep-teal mb-2 leading-tight">Welcome, {user.name}</h1>
            <p className="text-charcoal-grey font-nunito leading-normal">Here's what's happening with your LinkedIn content this week:</p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Posts Ready Card */}
            <div className="bg-kiwi-cream border border-kiwi-green/20 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-kiwi-green/10 p-3 rounded-lg border border-kiwi-green/20">
                  <FileText className="w-6 h-6 text-kiwi-green" />
                </div>
                <div className="flex-1">
                  <h3 className="font-montserrat font-semibold text-deep-teal mb-1 leading-tight">Posts Ready</h3>
                  <p className="text-sm text-charcoal-grey mb-3 font-nunito leading-normal">Draft's ready to go live!</p>
                  <button 
                    onClick={() => handleSectionView('post-drafts')}
                    className="text-kiwi-green hover:text-kiwi-green/80 font-nunito font-medium text-sm flex items-center"
                  >
                    Review drafts <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* New POV Added Card */}
            <div className="bg-kiwi-cream border border-intelligence-blue/20 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-intelligence-blue/10 p-3 rounded-lg border border-intelligence-blue/20">
                  <Eye className="w-6 h-6 text-intelligence-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="font-montserrat font-semibold text-deep-teal mb-1 leading-tight">New POV Added</h3>
                  <p className="text-sm text-charcoal-grey mb-3 font-nunito leading-normal">Recent market analysis is ready to view</p>
                  <button 
                    onClick={() => handleSectionView('content-povs')}
                    className="text-intelligence-blue hover:text-intelligence-blue/80 font-nunito font-medium text-sm flex items-center"
                  >
                    View POVs <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Strategy Update Card */}
            <div className="bg-kiwi-cream border border-kiwi-seed-brown/20 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-kiwi-seed-brown/10 p-3 rounded-lg border border-kiwi-seed-brown/20">
                  <Target className="w-6 h-6 text-kiwi-seed-brown" />
                </div>
                <div className="flex-1">
                  <h3 className="font-montserrat font-semibold text-deep-teal mb-1 leading-tight">Updated Content Strategy</h3>
                  <p className="text-sm text-charcoal-grey mb-3 font-nunito leading-normal">The content strategy doc is now live.</p>
                  <button 
                    onClick={() => handleSectionView('content-strategy')}
                    className="text-kiwi-seed-brown hover:text-kiwi-seed-brown/80 font-nunito font-medium text-sm flex items-center"
                  >
                    View strategy <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Latest Post Draft */}
            <div className="bg-white rounded-xl shadow-sm border border-soft-sage p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-kiwi-green" />
                  <h2 className="text-lg font-montserrat font-semibold text-deep-teal leading-tight">Latest Post Draft</h2>
                </div>
                <button 
                  onClick={() => handleSectionView('post-drafts')}
                  className="text-intelligence-blue hover:text-intelligence-blue/80 font-nunito font-medium text-sm flex items-center"
                >
                  All drafts <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* {latestPostDraft && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-montserrat font-semibold text-deep-teal mb-2 leading-tight">{latestPostDraft.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-charcoal-grey/70 mb-3 font-nunito">
                      <span className="bg-kiwi-green/10 text-kiwi-green px-2 py-1 rounded-full text-xs font-medium border border-kiwi-green/20">Draft</span>
                      <span>Modified {new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}</span>
                    </div>
                    <p className="text-charcoal-grey text-sm mb-4 font-nunito leading-normal">{latestPostDraft.description}</p>
                  </div>
                  <button
                    onClick={() => handleViewDocument(latestPostDraft.document_url)}
                    className="w-full bg-kiwi-green hover:bg-kiwi-green/90 text-white font-nunito font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Post</span>
                  </button>
                </div>
              )} */}

              {latestPostDraft && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-montserrat font-semibold text-deep-teal mb-2 leading-tight">
                    {latestPostDraft.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-charcoal-grey/70 mb-3 font-nunito">
                    <span className="bg-kiwi-green/10 text-kiwi-green px-2 py-1 rounded-full text-xs font-medium border border-kiwi-green/20">
                      Draft
                    </span>
                    <span>
                      Modified{' '}
                      {new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-charcoal-grey text-sm mb-4 font-nunito leading-normal">
                    {latestPostDraft.description}
                  </p>
                </div>
                <button
                  onClick={() => handleViewDocument1(latestPostDraft.document_url)}
                  className="w-full bg-kiwi-green hover:bg-kiwi-green/90 text-white font-nunito font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Post</span>
                </button>
              </div>
            )}
            </div>

            {/* Featured POV */}
            <div className="bg-white rounded-xl shadow-sm border border-soft-sage p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-intelligence-blue" />
                  <h2 className="text-lg font-montserrat font-semibold text-deep-teal leading-tight">Featured POV</h2>
                </div>
                <button 
                  onClick={() => handleSectionView('content-povs')}
                  className="text-intelligence-blue hover:text-intelligence-blue/80 font-nunito font-medium text-sm flex items-center"
                >
                  All POVs <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {featuredPOV && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-montserrat font-semibold text-deep-teal mb-2 leading-tight">{featuredPOV.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-charcoal-grey/70 mb-3 font-nunito">
                      <span className="bg-intelligence-blue/10 text-intelligence-blue px-2 py-1 rounded-full text-xs font-medium border border-intelligence-blue/20">POV</span>
                      <span>Published {' '}
                      {new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}</span>
                    </div>
                    <p className="text-charcoal-grey text-sm mb-4 font-nunito leading-normal">{featuredPOV.description}</p>
                  </div>
                  <button
                    onClick={() => handleViewDocument1(featuredPOV.document_url)}
                    className="w-full bg-intelligence-blue hover:bg-intelligence-blue/90 text-white font-nunito font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View POV</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content Categories */}
          <div className="mb-8">
            <h2 className="text-2xl font-montserrat font-bold text-deep-teal mb-6 leading-tight">Content Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sections.map((section) => {
                const sectionDocs = getDocumentsBySection(section.id);
                const sectionColorClass = getSectionColor(section.id);
                
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionView(section.id)}
                    className="bg-white rounded-xl shadow-sm border border-soft-sage p-6 hover:shadow-md transition-shadow duration-200 text-left"
                  >
                    <div className="text-center">
                      <div className={`w-12 h-12 ${sectionColorClass} rounded-lg flex items-center justify-center mx-auto mb-4 border`}>
                        {getSectionIcon(section.id)}
                      </div>
                      <h3 className="font-montserrat font-semibold text-deep-teal mb-2 leading-tight">{section.name}</h3>
                      <p className="text-sm text-charcoal-grey mb-4 font-nunito leading-normal">
                        {section.id === 'post-drafts' && 'Weekly content ready for review'}
                        {section.id === 'content-povs' && 'Strategic market insights and analysis'}
                        {section.id === 'user-dna' && 'Audience profiles and preferences'}
                        {section.id === 'content-strategy' && 'Long-term content planning and goals'}
                      </p>
                      <div className="text-intelligence-blue font-nunito font-medium text-sm">
                        {/* {sectionDocs.length} document{sectionDocs.length !== 1 ? 's' : ''} */}
                        View Document
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </main>
      )}

      {/* Document Viewer Modal */}
      {currentDocument && (
        <DocumentViewer
          document={currentDocument}
          onClose={() => setCurrentDocument(null)}
          onDownload={handleDownloadDocument}
        />
      )}

      {showModal && selectedDocumentUrl && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-lg w-[90%] h-[90%] relative overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h2 className="text-lg font-semibold">{latestPostDraft?.title} {latestPostDraft?.description} </h2>
        <button
          onClick={() => setShowModal(false)}
          className="text-charcoal-grey hover:text-red-500"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <iframe
        src={getGoogleViewerURL(selectedDocumentUrl)}
        className="w-full h-full"
        frameBorder="0"
        title="PDF Viewer"
      />
    </div>
  </div>
)}
    </div>
  );
};