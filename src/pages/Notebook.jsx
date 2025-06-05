import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Plus, Trash2, Edit2, Save, ArrowLeft } from 'lucide-react';

const Notebook = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editingNoteId, setEditingNoteId] = useState(null);

  const navigateToHome = () => {
    navigate('/home');
  };

  const handleAddNote = () => {
    setIsAddingNote(true);
    setNewNote({ title: '', content: '' });
  };

  const handleSaveNote = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/notes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      });

      if (!response.ok) {
        throw new Error('Failed to save note');
      }

      const savedNote = await response.json();
      setNotes([...notes, savedNote]);
      setIsAddingNote(false);
      setNewNote({ title: '', content: '' });
    } catch (err) {
      setError('Failed to save note. Please try again.');
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      setNotes(notes.filter(note => note._id !== noteId));
    } catch (err) {
      setError('Failed to delete note. Please try again.');
    }
  };

  const handleEditNote = (note) => {
    setEditingNoteId(note._id);
    setNewNote({ title: note.title, content: note.content });
  };

  const handleUpdateNote = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/notes/${editingNoteId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      const updatedNote = await response.json();
      setNotes(notes.map(note => note._id === editingNoteId ? updatedNote : note));
      setEditingNoteId(null);
      setNewNote({ title: '', content: '' });
    } catch (err) {
      setError('Failed to update note. Please try again.');
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5001/api/notes', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }

        const data = await response.json();
        setNotes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNotes();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={navigateToHome}
              className="text-white hover:text-purple-400 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
            <button
              onClick={handleAddNote}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Note
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Add/Edit Note Form */}
          {(isAddingNote || editingNoteId) && (
            <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-purple-800/30 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-4">
                {editingNoteId ? 'Edit Note' : 'Add New Note'}
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Note Title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <textarea
                  placeholder="Write your note here..."
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  rows="6"
                  className="w-full px-4 py-3 bg-white/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setIsAddingNote(false);
                      setEditingNoteId(null);
                      setNewNote({ title: '', content: '' });
                    }}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingNoteId ? handleUpdateNote : handleSaveNote}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {editingNoteId ? 'Update Note' : 'Save Note'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">{note.title}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditNote(note)}
                      className="p-2 text-purple-400 hover:text-purple-300 transition-all"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note._id)}
                      className="p-2 text-red-400 hover:text-red-300 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{note.content}</p>
                <div className="mt-4 text-sm text-gray-400">
                  {new Date(note.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {notes.length === 0 && !isAddingNote && (
            <div className="text-center py-12">
              <Book className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Notes Yet</h3>
              <p className="text-gray-400 mb-6">Start by adding your first note!</p>
              <button
                onClick={handleAddNote}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                Add Note
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Notebook; 