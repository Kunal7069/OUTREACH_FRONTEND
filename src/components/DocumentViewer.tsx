import React from 'react';
import { X, Download, Printer as Print, ExternalLink, ArrowLeft } from 'lucide-react';
import { Document } from '../types';

interface DocumentViewerProps {
  document: Document;
  onClose: () => void;
  onDownload: (document: Document) => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  document, 
  onClose, 
  onDownload 
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleExternalView = () => {
    window.open(document.url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-soft-sage">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-soft-sage rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-charcoal-grey" />
            </button>
            <div>
              <h2 className="text-xl font-montserrat font-semibold text-deep-teal leading-tight">{document.title}</h2>
              <p className="text-sm text-charcoal-grey font-nunito leading-normal">{document.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onDownload(document)}
              className="p-2 hover:bg-soft-sage rounded-lg transition-colors"
              title="Download"
            >
              <Download className="w-5 h-5 text-charcoal-grey" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 hover:bg-soft-sage rounded-lg transition-colors"
              title="Print"
            >
              <Print className="w-5 h-5 text-charcoal-grey" />
            </button>
            <button
              onClick={handleExternalView}
              className="p-2 hover:bg-soft-sage rounded-lg transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-5 h-5 text-charcoal-grey" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-soft-sage rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-charcoal-grey" />
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 bg-kiwi-cream/30">
          <iframe
            src={document.url}
            className="w-full h-full border-0 rounded-b-xl"
            title={document.title}
          />
        </div>
      </div>
    </div>
  );
};