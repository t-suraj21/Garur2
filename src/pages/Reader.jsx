import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { speakText, listenVoice } from '../utils/voiceUtils';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// ✅ Use safe CDN fallback for PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const API_KEY = 'AIzaSyCNk9tzPuYdptGt0xXWiY5DB1ti1u58vmk';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const Reader = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [pdfLink, setPdfLink] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchBook = async () => {
    try {
      const res = await fetch(`${BASE_URL}/${bookId}?key=${API_KEY}`);
      const data = await res.json();
      setBook(data);

      const pdf = data.accessInfo?.pdf?.acsTokenLink || data.accessInfo?.pdf?.downloadLink;

      if (pdf && data.accessInfo?.pdf?.isAvailable) {
        setPdfLink(pdf);
        speakText(`Opening ${data.volumeInfo.title}. PDF loaded. Say "Next" or "Previous" to change pages.`);
      } else {
        const fallback = data.volumeInfo?.description || "This book does not have a PDF version.";
        speakText(`PDF not available. Reading description of ${data.volumeInfo.title}.`);
        speakText(fallback);
      }
    } catch (err) {
      console.error('Error fetching book:', err);
      speakText('Failed to load the book.');
    }
  };

  const handleVoiceCommand = useCallback((command) => {
    const lower = command.toLowerCase();
    if (lower.includes('next')) {
      setPageNumber((prev) => Math.min(prev + 1, numPages || prev));
    } else if (lower.includes('previous')) {
      setPageNumber((prev) => Math.max(prev - 1, 1));
    } else if (lower.includes('read again')) {
      if (book?.volumeInfo?.description) {
        speakText(book.volumeInfo.description);
      } else {
        speakText(book?.volumeInfo?.title || 'Reading again.');
      }
    } else {
      speakText("Say 'next' or 'previous' to flip pages.");
    }
  }, [book, numPages]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  useEffect(() => {
    fetchBook();
  }, []);

  useEffect(() => {
    listenVoice(handleVoiceCommand);
  }, [handleVoiceCommand]);

  return (
    <div className="p-4 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-2">{book?.volumeInfo?.title || 'Book Reader'}</h1>

      {pdfLink ? (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <Document
            file={pdfLink}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p className="text-center">Loading PDF...</p>}
            className="flex justify-center"
          >
            <Page pageNumber={pageNumber} />
          </Document>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-blue-500 text-white rounded-xl"
            >
              Previous
            </button>
            <p className="text-sm">Page {pageNumber} of {numPages}</p>
            <button
              onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages || prev))}
              className="px-4 py-2 bg-blue-500 text-white rounded-xl"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          PDF not available. Reading fallback content.
        </p>
      )}
    </div>
  );
};

export default Reader;
