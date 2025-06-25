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
    <div className="min-h-screen bg-gradient-to-br from-white via-kiwi-cream/20 to-soft-sage/30">
      {/* Header */}
      <header className="bg-gradient-to-r from-deep-teal to-deep-teal/90 shadow-xl border-b border-deep-teal/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <div className="flex items-center space-x-4">
              
                <div>
                  <h1 className="text-2xl font-montserrat font-bold text-white leading-tight">
                    Content<span className="text-kiwi-green">Q</span>
                  </h1>
                  <p className="text-xs text-white/80 font-nunito font-medium">powered by KiwiQ AI</p>
                </div>
            </div>
            
            
             
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 px-4 py-3 bg-white/15 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg">
                  <div className="w-9 h-9 bg-gradient-to-br from-kiwi-green to-kiwi-green/80 rounded-xl flex items-center justify-center shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-nunito font-semibold">{user.name}</span>
                </div>
                
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm font-nunito font-medium border border-white/10 hover:border-white/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Welcome Section */}
          <div className="mb-10">
             <div className="flex items-center space-x-3 mb-4">
              <div className="w-2 h-8 bg-gradient-to-b from-kiwi-green to-intelligence-blue rounded-full"></div>
              <h1 className="text-4xl font-montserrat font-bold text-deep-teal leading-tight">
                Hi <span className="text-kiwi-green">{user?.name?.split(" ")[0] || "there"}</span>,
              </h1>
            </div>
            <p className="text-charcoal-grey font-nunito text-lg leading-relaxed ml-5">Here's what your ContentQ AI Assistant has put together for you.</p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Posts Ready Card */}
            <div className="group bg-white/80 backdrop-blur-sm border border-kiwi-green/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-kiwi-green/20 to-kiwi-green/10 p-4 rounded-xl border border-kiwi-green/30 shadow-sm">
                  <FileText className="w-6 h-6 text-kiwi-green" />
                </div>
                <div className="flex-1">
                  <h3 className="font-montserrat font-bold text-deep-teal mb-2 leading-tight">Posts ready to review</h3>
                  <p className="text-sm text-charcoal-grey mb-4 font-nunito leading-normal">Draft's ready to go live!</p>
                  <button 
                    onClick={() => handleSectionView('post-drafts')}
                    className="text-kiwi-green hover:text-kiwi-green/80 font-nunito font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform duration-200"
                  >
                    Review drafts <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>

            {/* New POV Added Card */}
            <div className="group bg-white/80 backdrop-blur-sm border border-intelligence-blue/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-intelligence-blue/20 to-intelligence-blue/10 p-4 rounded-xl border border-intelligence-blue/30 shadow-sm">
                <Eye className="w-6 h-6 text-intelligence-blue" />
              </div>
              <div className="flex-1">
                <h3 className="font-montserrat font-bold text-deep-teal mb-2 leading-tight">POVs you could flesh out</h3>
                <p className="text-sm text-charcoal-grey mb-4 font-nunito leading-normal">High-level idea guiding your next post.</p>
                <button 
                  onClick={() => handleSectionView('content-povs')}
                  className="text-intelligence-blue hover:text-intelligence-blue/80 font-nunito font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform duration-200"
                >
                  View POVs <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

              <div className="group bg-white/80 backdrop-blur-sm border border-kiwi-seed-brown/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-kiwi-seed-brown/20 to-kiwi-seed-brown/10 p-4 rounded-xl border border-kiwi-seed-brown/30 shadow-sm">
                <Target className="w-6 h-6 text-kiwi-seed-brown" />
              </div>
              <div className="flex-1">
                <h3 className="font-montserrat font-bold text-deep-teal mb-2 leading-tight">Your Content Strategy</h3>
                <p className="text-sm text-charcoal-grey mb-4 font-nunito leading-normal">Content roadmap tailored to audience</p>
                <button 
                  onClick={() => handleSectionView('content-strategy')}
                  className="text-kiwi-seed-brown hover:text-kiwi-seed-brown/80 font-nunito font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform duration-200"
                >
                  View strategy <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

             <div className="group bg-white/80 backdrop-blur-sm border border-deep-teal/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-deep-teal/20 to-deep-teal/10 p-4 rounded-xl border border-deep-teal/30 shadow-sm">
                  <Users className="w-6 h-6 text-deep-teal" />
                </div>
                <div className="flex-1">
                  <h3 className="font-montserrat font-bold text-deep-teal mb-2 leading-tight">Your User DNA</h3>
                  <p className="text-sm text-charcoal-grey mb-4 font-nunito leading-normal">Audience research and persona insights</p>
                  <button 
                    onClick={() => handleSectionView('user-dna')}
                    className="text-deep-teal hover:text-deep-teal/80 font-nunito font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform duration-200"
                  >
                    View DNA <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
      </div>


           
      

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Latest Post Draft */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-soft-sage/50 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-kiwi-green to-kiwi-green/80 rounded-xl flex items-center justify-center shadow-md">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-montserrat font-bold text-deep-teal leading-tight">Latest Post Draft</h2>
              </div>
              <button 
                onClick={() => handleSectionView('post-drafts')}
                className="text-intelligence-blue hover:text-intelligence-blue/80 font-nunito font-semibold text-sm flex items-center px-3 py-2 rounded-lg hover:bg-intelligence-blue/10 transition-all duration-200"
              >
                All drafts <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
             

              {latestPostDraft && (
              <div className="space-y-8">
                  <div>
                    <h3 className="font-montserrat font-bold text-deep-teal mb-3 leading-tight text-lg">{latestPostDraft.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-charcoal-grey/70 mb-4 font-nunito">
                      <span className="bg-gradient-to-r from-kiwi-green/20 to-kiwi-green/10 text-kiwi-green px-3 py-1.5 rounded-full text-xs font-semibold border border-kiwi-green/30 shadow-sm">Draft</span>
                      <span className="font-medium">Modified {new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}</span>
                    </div>
                  </div>
                <button
                  onClick={() => handleViewDocument1(latestPostDraft.document_url)}
                  className="w-full bg-gradient-to-r from-kiwi-green to-kiwi-green/90 hover:from-kiwi-green/90 hover:to-kiwi-green/80 text-white font-nunito font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Eye className="w-5 h-5" />
                  <span>View Post</span>
                </button>
              </div>
            )}
            </div>

            {/* Featured POV */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-soft-sage/50 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-intelligence-blue to-intelligence-blue/80 rounded-xl flex items-center justify-center shadow-md">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-montserrat font-bold text-deep-teal leading-tight">Featured POV</h2>
              </div>
              <button 
                onClick={() => handleSectionView('content-povs')}
                className="text-intelligence-blue hover:text-intelligence-blue/80 font-nunito font-semibold text-sm flex items-center px-3 py-2 rounded-lg hover:bg-intelligence-blue/10 transition-all duration-200"
              >
                All POVs <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
              {featuredPOV && (
            <div className="space-y-6">
              <div>
                <h3 className="font-montserrat font-bold text-deep-teal mb-3 leading-tight text-lg">{featuredPOV.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-charcoal-grey/70 mb-4 font-nunito">
                  <span className="bg-gradient-to-r from-intelligence-blue/20 to-intelligence-blue/10 text-intelligence-blue px-3 py-1.5 rounded-full text-xs font-semibold border border-intelligence-blue/30 shadow-sm">POV</span>
                  <span className="font-medium">Published {new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}</span>
                </div>
              </div>
              <button
                onClick={() => handleViewDocument(featuredPOV.document_url)}
                className="w-full bg-gradient-to-r from-intelligence-blue to-intelligence-blue/90 hover:from-intelligence-blue/90 hover:to-intelligence-blue/80 text-white font-nunito font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Eye className="w-5 h-5" />
                <span>View POV</span>
              </button>
            </div>
          )}
           
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