import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification, Modal, Input } from 'antd';
import MovieList from './MovieList';

const { Search } = Input;

const API_KEY = '867e35b4';
const genres = ['Comedy', 'Action', 'Thriller', 'Horror'];

interface GenreMovies {
  [key: string]: any[];
}

interface DashboardProps {
  onToggleTheme: () => void;
  theme: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onToggleTheme, theme }) => {
  const [genreMovies, setGenreMovies] = useState<GenreMovies>({});
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalSearchQuery, setModalSearchQuery] = useState<string>('');
  const [modalMovies, setModalMovies] = useState<any[]>([]);
  const [currentGenre, setCurrentGenre] = useState<string>('');
  const [toggle,setToggle]= useState(false);
  // Effect to listen for changes in theme in local storage
  useEffect(() => {
    console.log('hiii');
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme");
      if (newTheme) {
        onToggleTheme(); // Call onToggleTheme to update theme
      }
      console.log("newTheme",newTheme);
    };
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [onToggleTheme]);

  useEffect(() => {
    genres.forEach((genre) => {
      fetchMoviesByGenre(genre);
    });
  }, []);

  useEffect(() => {
    filterMovies(searchQuery);
  }, [searchQuery, genreMovies]);

  useEffect(() => {
    if (modalSearchQuery) {
      fetchModalMovies(modalSearchQuery);
    }
  }, [modalSearchQuery]);

  const fetchMoviesByGenre = async (genre: string) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${genre}&apikey=${API_KEY}`);
      if (response.data.Search) {
        setGenreMovies((prev) => ({ ...prev, [genre]: response.data.Search }));
      }
    } catch (error) {
      console.error(`Error fetching ${genre} movies:`, error);
    }
  };

  const fetchModalMovies = async (query: string) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      if (response.data.Search) {
        setModalMovies(response.data.Search);
      } else {
        setModalMovies([]);
        notification.error({
          message: "Movie not found"
        });
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setModalMovies([]);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.trim());
  };

  const handleModalSearch = (query: string) => {
    setModalSearchQuery(query.trim());
  };

  const filterMovies = (query: string) => {
    if (query === '') {
      setFilteredMovies([]);
      return;
    }
    const allMovies = Object.values(genreMovies).flat();
    const filtered = allMovies.filter(movie =>
      movie.Title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleAddMovieToGenre = (movie: any) => {
    setGenreMovies((prev) => {
      const updatedGenreMovies = { ...prev };
      if (updatedGenreMovies[currentGenre]) {
        updatedGenreMovies[currentGenre] = [...updatedGenreMovies[currentGenre], movie];
      } else {
        updatedGenreMovies[currentGenre] = [movie];
      }
      return updatedGenreMovies;
    });
    setModalVisible(false);
    setModalSearchQuery('');
    setModalMovies([]);
  };

  const handleRemoveMovieFromGenre = (genre: string, movieID: string) => {
    setGenreMovies((prev) => {
      const updatedGenreMovies = { ...prev };
      if (updatedGenreMovies[genre]) {
        updatedGenreMovies[genre] = updatedGenreMovies[genre].filter(movie => movie.imdbID !== movieID);
      }
      return updatedGenreMovies;
    });
  };

  const handleIconClick = (genre: string) => {
    setCurrentGenre(genre);
    setModalVisible(true);
  };

  return (
    <div className="App" style={{ margin: '10px 20px' }}>
      <Search
        placeholder="Search already available movies"
        onChange={(e) => handleSearch(e.target.value)}
        onSearch={handleSearch}
        enterButton
        style={{ marginBottom: '20px', width:'300px'}}
      />
      {searchQuery ? (
        <MovieList movies={filteredMovies} onToggleTheme={onToggleTheme} theme={theme} />
      ) : (
        genres.map((genre) => (
          <div key={genre}>
            <h2 style={{ marginLeft: '25px', textAlign: 'left', color: theme === 'light' ? 'black' : 'white' }}>
              {genre} Movies
            </h2>
            <MovieList
              movies={genreMovies[genre] || []}
              onIconClick={() => handleIconClick(genre)}
              onRemoveMovie={(movieID) => handleRemoveMovieFromGenre(genre, movieID)}
              onToggleTheme={onToggleTheme}
              theme={theme} 
            />
          </div>
        ))
      )}
      <Modal
        title={`Search Movies to add to ${currentGenre}`}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setModalSearchQuery('');
          setModalMovies([]);
        }}
        footer={null}
      >
        <Search
          placeholder="Search for a movie..."
          onChange={(e) => handleModalSearch(e.target.value)}
          onSearch={handleModalSearch}
          enterButton
        />
        {modalSearchQuery ? (
          <MovieList movies={modalMovies} onMovieClick={handleAddMovieToGenre} onToggleTheme={onToggleTheme} theme={theme} />
        ) : null}
      </Modal>
    </div>
  );
};

export default Dashboard;
