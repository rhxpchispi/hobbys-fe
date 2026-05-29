import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import MapView from './components/MapView';

function App() {
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setQuery(searchQuery);

    try {
      // Reemplazar con la URL de tu contenedor de FastAPI local o de producción
      const response = await fetch('http://localhost:8000/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      setCourses(data.cursos || []);
      setHasSearched(true);
    } catch (error) {
      console.error("Error consultando el backend híbrido:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      {/* Contenedor de la barra de búsqueda: se adapta dinámicamente */}
      <div className={`flex flex-col items-center justify-center transition-all duration-700 ease-in-out p-6 ${
        hasSearched ? 'h-24 bg-gray-50 border-b border-gray-200 justify-start pt-4' : 'flex-1'
      }`}>
        {!hasSearched && (
          <h1 className="text-4xl font-bold tracking-tight text-gray-800 mb-6">
            Proyecto Hobbys
          </h1>
        )}
        <div className={`w-full max-w-2xl transition-all duration-700 ${hasSearched ? 'flex items-center gap-4' : ''}`}>
          {hasSearched && <span className="text-xl font-bold text-gray-700 whitespace-nowrap">Proyecto Hobbys</span>}
          <SearchBar onSearch={handleSearch} initialValue={query} hideSuggestions={hasSearched} />
        </div>
      </div>

      {/* Panel de Resultados y Mapa */}
      {hasSearched && (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Listado Izquierdo */}
          <div className="w-full md:w-1/3 border-r border-gray-200 overflow-y-auto bg-white">
            <ResultsList courses={courses} loading={loading} />
          </div>
          
          {/* Mapa Derecho */}
          <div className="w-full md:w-2/3 h-[50vh] md:h-full bg-gray-100">
            <MapView courses={courses} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;