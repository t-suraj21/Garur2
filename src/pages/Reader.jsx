import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// ✅ Use safe CDN fallback for PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const API_KEY = 'AIzaSyCNk9tzPuYdptGt0xXWiY5DB1ti1u58vmk';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const Reader = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
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
      }
    } catch (err) {
      console.error('Error fetching book:', err);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const handleTestClick = () => {
    // Navigate to test page with the current book's class, subject, and chapter
    navigate(`/test/class1/math/chapter1`); // You can adjust these parameters as needed
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <div className="p-4 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{book?.volumeInfo?.title || 'Book Reader'}</h1>
        <button
          onClick={handleTestClick}
          className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
        >
          Take Test
        </button>
      </div>

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
