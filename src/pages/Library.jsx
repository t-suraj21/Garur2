import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const API_KEY = 'AIzaSyCNk9tzPuYdptGt0xXWiY5DB1ti1u58vmk';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const Library = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('ncert class 5');
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(searchQuery)}&key=${API_KEY}`);
      const data = await response.json();
      if (data.items) {
        setBooks(data.items);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim() === '') return;
    fetchBooks(query);
  };

  useEffect(() => {
    fetchBooks(query);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-extrabold mb-4 text-center">📚 Library</h1>
      <p className="mb-4 text-center text-lg">Search for NCERT books by class and subject</p>

      <div className="flex justify-center items-center mb-6 gap-2 max-w-xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          placeholder="Search NCERT books (e.g., class 6 science)"
        />
        <button
          onClick={handleSearch}
          className="p-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition"
          aria-label="Search"
        >
          <Search />
        </button>
      </div>

      {loading ? (
        <div className="text-center text-lg font-medium text-gray-700 dark:text-gray-200">🔄 Loading books...</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-200 dark:border-gray-700"
              onClick={() => {
                navigate(`/reader/book/${book.id}`);
              }}
            >
              <h3 className="text-lg font-semibold mb-1 line-clamp-2">{book.volumeInfo.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
              </p>
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  className="mt-3 rounded-lg h-40 object-contain mx-auto"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
