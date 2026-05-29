import React, { useState } from 'react';
import { Search } from 'lucide-react';

function SearchBar({ onSearch, initialValue = '', hideSuggestions = false }) {
  const [input, setInput] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  const suggestions = [
    "quiero aprender a cocinar",
    "artes marciales para niños",
    "me gustaria saber ingles, nivel inicial"
  ];

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="¿Qué te gustaría aprender a hacer hoy?..."
          className="w-full px-5 py-3 pl-12 rounded-full border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-gray-700 transition"
        />
        <Search className="absolute left-4 text-gray-400 w-5 h-5" />
      </form>

      {/* Sugerencias de búsqueda estilo Google debajo */}
      {!hideSuggestions && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <span className="text-sm text-gray-500 py-1">Ejemplos:</span>
          {suggestions.map((text, idx) => (
            <button
              key={idx}
              onClick={() => { setInput(text); onSearch(text); }}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full border border-gray-200 transition"
            >
              "{text}"
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;