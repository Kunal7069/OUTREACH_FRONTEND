import React , { useState, useMemo , useEffect} from 'react';
import { Calendar, Download, FileText, Eye, Tag } from 'lucide-react';
import { Document } from '../types';

interface DocumentCardProps {
  document: Document;
  onView: (document: Document) => void;
  onDownload: (document: Document) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document, onView, onDownload }) => {
  const getFileIcon = (fileType: string) => {
    return <FileText className="w-5 h-5" />;
  };

  useEffect(() => {
     console.log(document)
    }, []);
  

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-soft-sage">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-kiwi-green/10 rounded-lg border border-kiwi-green/20">
              <div className="text-deep-teal">
                {getFileIcon(document.fileType)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-montserrat font-semibold text-deep-teal line-clamp-1 leading-tight">
                {document.title}
              </h3>
              <p className="text-sm text-charcoal-grey/70 font-nunito">{document.size}</p>
            </div>
          </div>
        </div>

        <p className="text-charcoal-grey text-sm mb-4 line-clamp-2 font-nunito leading-normal">
          {document.description}
        </p>

        <div className="flex items-center text-xs text-charcoal-grey/70 mb-4 font-nunito">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Modified {formatDate(document.lastModified)}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {document.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-kiwi-green/10 text-deep-teal border border-kiwi-green/20 font-nunito"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onView(document)}
            className="flex-1 bg-kiwi-green hover:bg-kiwi-green/90 text-white font-nunito font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
          <button
            onClick={() => onDownload(document)}
            className="bg-soft-sage hover:bg-kiwi-green/10 text-deep-teal font-nunito font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center border border-soft-sage hover:border-kiwi-green/30"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};