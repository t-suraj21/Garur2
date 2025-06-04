import React, { useEffect, useState } from 'react';
import { listenVoice, speakText } from '../utils/voiceUtils';
import { useNavigate } from 'react-router-dom';
import { Mic, Search } from 'lucide-react';

const API_KEY = 'AIzaSyCNk9tzPuYdptGt0xXWiY5DB1ti1u58vmk';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const Library = () => {
  const navigate = useNavigate();
  const [voiceCommand, setVoiceCommand] = useState('');
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
        speakText("No books found.");
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      speakText("Error fetching books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceCommand = (command) => {
    setVoiceCommand(command);
    const lower = command.toLowerCase();
    const words = lower.split(' ');

    const classId = words.includes('class') ? words[words.indexOf('class') + 1] : '';
    const subject = words.includes('science') ? 'science' : (words.includes('math') ? 'math' : '');
    const chapterId = words.includes('chapter') ? words[words.indexOf('chapter') + 1] : '';

    if (lower.includes('read') && classId && subject && chapterId) {
      speakText(`Opening Class ${classId} ${subject} Chapter ${chapterId}`);
      navigate(`/reader/${classId}/${subject}/${chapterId}`);
    } else if (lower.includes('search') && (classId || subject)) {
      const searchQuery = `ncert class ${classId} ${subject}`.trim();
      setQuery(searchQuery);
      fetchBooks(searchQuery);
      speakText(`Searching for Class ${classId} ${subject} books`);
    } else {
      speakText("Please specify class and subject.");
    }
  };

  const handleSearch = () => {
    if (query.trim() === '') return;
    speakText(`Searching books for ${query}`);
    fetchBooks(query);
  };

  useEffect(() => {
    listenVoice(handleVoiceCommand);
    fetchBooks(query);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-extrabold mb-4 text-center">📚 Library</h1>
      <p className="mb-2 text-center text-lg">Say: "Read Class 5 Science Chapter 2" or "Search Class 5 Maths"</p>
      <p className="mb-4 text-sm text-center">🎙️ Voice Input: <strong className="text-blue-600">{voiceCommand}</strong></p>

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
        <button
          onClick={() => listenVoice(handleVoiceCommand)}
          className="p-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white transition"
          aria-label="Voice Search"
        >
          <Mic />
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
                speakText(`Opening ${book.volumeInfo.title}`);
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
