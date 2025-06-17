// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, FileText, Download, Eye, Info, Tag, X } from 'lucide-react';
// import { Document, Section } from '../types';

// interface SectionViewProps {
//   section: Section;
//   onBack: () => void;
//   onDownloadDocument: (document: Document) => void;
// }

// export const SectionView: React.FC<SectionViewProps> = ({
//   section,
//   onBack,
//   onDownloadDocument,
// }) => {
//   const [documents, setDocuments] = useState<Document[]>([]);
//   const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

//   useEffect(() => {
//     const storedDocs = localStorage.getItem('documents');
//     if (storedDocs) {
//       try {
//         const parsed: Document[] = JSON.parse(storedDocs);
//         const filtered = parsed.filter((doc) => doc.tag === section.id);
//         setDocuments(filtered);
//       } catch (err) {
//         console.error('Error parsing documents from localStorage', err);
//       }
//     }
//   }, [section.id]);

//   const getSectionDescription = (sectionId: string) => {
//     switch (sectionId) {
//       case 'post-drafts':
//         return 'All three posts for this week are ready for your review in the Post Drafts document. Please check for:';
//       case 'content-povs':
//         return 'Strategic content perspectives and market insights ready for your review.';
//       case 'user-dna':
//         return 'Comprehensive audience analysis and user behavior insights.';
//       case 'content-strategy':
//         return 'Long-term content planning documents with strategic frameworks.';
//       default:
//         return 'Documents in this section are ready for your review.';
//     }
//   };

//   const getChecklistItems = (sectionId: string) => {
//     switch (sectionId) {
//       case 'post-drafts':
//         return ['Brand alignment', 'Tone consistency', 'Factual accuracy', 'Overall messaging'];
//       case 'content-povs':
//         return ['Strategic positioning', 'Voice consistency', 'Market relevance', 'Audience alignment'];
//       case 'user-dna':
//         return ['Demographic accuracy', 'Behavioral insights', 'Preference mapping', 'Engagement patterns'];
//       case 'content-strategy':
//         return ['Strategic alignment', 'Timeline feasibility', 'Resource allocation', 'Campaign integration'];
//       default:
//         return [];
//     }
//   };

//   const formatFileSize = (size: string) => size;

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   const todayDate = new Date().toISOString();

//   const getGoogleViewerURL = (dropboxUrl: string) => {
//     const rawUrl = dropboxUrl
//       .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
//       .replace('?dl=0', '');
//     return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(rawUrl)}`;
//   };

//   const checklistItems = getChecklistItems(section.id);

//   return (
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Back Button */}
//       <div className="mb-6">
//         <button
//           onClick={onBack}
//           className="flex items-center space-x-2 text-kiwi-green hover:text-kiwi-green/80 transition-colors font-nunito font-medium"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           <span>Back to Folders</span>
//         </button>
//       </div>

//       {/* Section Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-montserrat font-bold text-deep-teal mb-2 leading-tight">
//           {section.name} ({documents.length} document{documents.length !== 1 ? 's' : ''})
//         </h1>
//       </div>

//       {/* Info Card */}
//       {checklistItems.length > 0 && (
//         <div className="bg-kiwi-cream border border-intelligence-blue/20 rounded-xl p-6 mb-8">
//           <div className="flex items-start space-x-3">
//             <Info className="w-5 h-5 text-intelligence-blue mt-0.5 flex-shrink-0" />
//             <div>
//               <p className="text-charcoal-grey mb-3 font-nunito leading-normal">
//                 {getSectionDescription(section.id)}
//               </p>
//               <ul className="space-y-1">
//                 {checklistItems.map((item, index) => (
//                   <li key={index} className="flex items-center space-x-2 text-charcoal-grey font-nunito">
//                     <span className="w-1.5 h-1.5 bg-charcoal-grey/60 rounded-full"></span>
//                     <span>{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Documents Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {documents.map((document) => (
//           <div key={document.id} className="bg-white rounded-xl shadow-sm border border-soft-sage p-6">
//             {/* Document Header */}
//             <div className="flex items-start space-x-3 mb-4">
//               <div className="p-2 bg-soft-sage rounded-lg">
//                 <FileText className="w-5 h-5 text-charcoal-grey" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3 className="font-montserrat font-semibold text-deep-teal mb-1 line-clamp-2 leading-tight">
//                   {document.title}
//                 </h3>
//                 <p className="text-sm text-charcoal-grey/70 font-nunito">
//                   {formatFileSize(document.size)}
//                 </p>
//               </div>
//             </div>

//             {/* Document Description */}
//             <p className="text-charcoal-grey text-sm mb-4 line-clamp-3 font-nunito leading-normal">
//               {document.description}
//             </p>

//             {/* Document Meta */}
//             <div className="flex items-center justify-between text-sm text-charcoal-grey/70 mb-4 font-nunito">
//               <span>Modified {formatDate(todayDate)}</span>
//               <span className="bg-intelligence-blue/10 text-intelligence-blue px-2 py-1 rounded text-xs font-medium border border-intelligence-blue/20">
//                 draft
//               </span>
//             </div>

//             {/* Tags */}
//             <div className="flex flex-wrap gap-1 mb-4">
//               {document.tags?.map((tag: string) => (
//                 <span
//                   key={tag}
//                   className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-kiwi-green/10 text-deep-teal border border-kiwi-green/20 font-nunito"
//                 >
//                   <Tag className="w-3 h-3 mr-1" />
//                   {tag}
//                 </span>
//               ))}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => setSelectedDoc(document)}
//                 className="flex-1 bg-kiwi-green hover:bg-kiwi-green/90 text-white font-nunito font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
//               >
//                 <Eye className="w-4 h-4" />
//                 <span>View</span>
//               </button>
//               <button
//                 onClick={() => onDownloadDocument(document)}
//                 className="bg-soft-sage hover:bg-kiwi-green/10 text-charcoal-grey font-nunito font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center border border-soft-sage hover:border-kiwi-green/30"
//               >
//                 <Download className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* PDF Modal */}
//       {selectedDoc && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-lg w-[90%] h-[90%] relative overflow-hidden flex flex-col">
//             <div className="flex items-center justify-between px-4 py-2 border-b">
//               <h2 className="text-lg font-semibold">{selectedDoc.title}</h2>
//               <button
//                 onClick={() => setSelectedDoc(null)}
//                 className="text-charcoal-grey hover:text-red-500"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//             <iframe
//               src={getGoogleViewerURL(selectedDoc.document_url)}
//               className="w-full h-full"
//               frameBorder="0"
//               title="PDF Viewer"
//             />
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };


import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Download, Eye, Info, Tag, X } from 'lucide-react';
import { Document, Section } from '../types';

interface SectionViewProps {
  section: Section;
  onBack: () => void;
}

export const SectionView: React.FC<SectionViewProps> = ({
  section,
  onBack,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  useEffect(() => {
    const storedDocs = localStorage.getItem('documents');
    if (storedDocs) {
      try {
        const parsed: Document[] = JSON.parse(storedDocs);
        const filtered = parsed.filter((doc) => doc.tag === section.id);
        setDocuments(filtered);
      } catch (err) {
        console.error('Error parsing documents from localStorage', err);
      }
    }
  }, [section.id]);

  const getSectionDescription = (sectionId: string) => {
    switch (sectionId) {
      case 'post-drafts':
        return 'All three posts for this week are ready for your review in the Post Drafts document. Please check for:';
      case 'content-povs':
        return 'Strategic content perspectives and market insights ready for your review.';
      case 'user-dna':
        return 'Comprehensive audience analysis and user behavior insights.';
      case 'content-strategy':
        return 'Long-term content planning documents with strategic frameworks.';
      default:
        return 'Documents in this section are ready for your review.';
    }
  };

  const getChecklistItems = (sectionId: string) => {
    switch (sectionId) {
      case 'post-drafts':
        return ['Brand alignment', 'Tone consistency', 'Factual accuracy', 'Overall messaging'];
      case 'content-povs':
        return ['Strategic positioning', 'Voice consistency', 'Market relevance', 'Audience alignment'];
      case 'user-dna':
        return ['Demographic accuracy', 'Behavioral insights', 'Preference mapping', 'Engagement patterns'];
      case 'content-strategy':
        return ['Strategic alignment', 'Timeline feasibility', 'Resource allocation', 'Campaign integration'];
      default:
        return [];
    }
  };

  const formatFileSize = (size: string) => size;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const todayDate = new Date().toISOString();

  const getGoogleViewerURL = (dropboxUrl: string) => {
    const rawUrl = dropboxUrl
      .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
      .replace('?dl=0', '');
    return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(rawUrl)}`;
  };

  const downloadDocument = (doc: Document) => {
    const link = document.createElement('a');
    const directUrl = doc.document_url
      .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
      .replace('?dl=0', '');

    link.href = directUrl;
    link.download = doc.title || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const checklistItems = getChecklistItems(section.id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-kiwi-green hover:text-kiwi-green/80 transition-colors font-nunito font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Folders</span>
        </button>
      </div>

      {/* Section Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-montserrat font-bold text-deep-teal mb-2 leading-tight">
          {section.name} ({documents.length} document{documents.length !== 1 ? 's' : ''})
        </h1>
      </div>

      {/* Info Card */}
      {checklistItems.length > 0 && (
        <div className="bg-kiwi-cream border border-intelligence-blue/20 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-intelligence-blue mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-charcoal-grey mb-3 font-nunito leading-normal">
                {getSectionDescription(section.id)}
              </p>
              <ul className="space-y-1">
                {checklistItems.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2 text-charcoal-grey font-nunito">
                    <span className="w-1.5 h-1.5 bg-charcoal-grey/60 rounded-full"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-soft-sage p-6">
            {/* Document Header */}
            <div className="flex items-start space-x-3 mb-4">
              <div className="p-2 bg-soft-sage rounded-lg">
                <FileText className="w-5 h-5 text-charcoal-grey" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-montserrat font-semibold text-deep-teal mb-1 line-clamp-2 leading-tight">
                  {doc.title}
                </h3>
                <p className="text-sm text-charcoal-grey/70 font-nunito">
                  {formatFileSize(doc.size)}
                </p>
              </div>
            </div>

            {/* Document Description */}
            <p className="text-charcoal-grey text-sm mb-4 line-clamp-3 font-nunito leading-normal">
              {doc.description}
            </p>

            {/* Document Meta */}
            <div className="flex items-center justify-between text-sm text-charcoal-grey/70 mb-4 font-nunito">
              <span>Modified {formatDate(todayDate)}</span>
              <span className="bg-intelligence-blue/10 text-intelligence-blue px-2 py-1 rounded text-xs font-medium border border-intelligence-blue/20">
                draft
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {doc.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-kiwi-green/10 text-deep-teal border border-kiwi-green/20 font-nunito"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedDoc(doc)}
                className="flex-1 bg-kiwi-green hover:bg-kiwi-green/90 text-white font-nunito font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
              <button
                onClick={() => downloadDocument(doc)}
                className="bg-soft-sage hover:bg-kiwi-green/10 text-charcoal-grey font-nunito font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center border border-soft-sage hover:border-kiwi-green/30"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-[90%] h-[90%] relative overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <h2 className="text-lg font-semibold">{selectedDoc.title}</h2>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-charcoal-grey hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <iframe
              src={getGoogleViewerURL(selectedDoc.document_url)}
              className="w-full h-full"
              frameBorder="0"
              title="PDF Viewer"
            />
          </div>
        </div>
      )}
    </main>
  );
};
