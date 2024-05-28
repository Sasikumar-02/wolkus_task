import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'antd';
import { CloseOutlined } from '@mui/icons-material';
import '../styles/MovieList.css';

interface MovieListProps {
  movies: any[];
  onMovieClick?: (movie: any) => void;
  onIconClick?: () => void;
  onRemoveMovie?: (movieID: string) => void;
  onToggleTheme: () => void; // Add onToggleTheme prop
  theme: string; // Add theme prop
}

const MovieList: React.FC<MovieListProps> = ({ movies, onMovieClick, onIconClick, onRemoveMovie, onToggleTheme, theme }) => {
  const showConfirm = (movieID: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this movie?',
      content: 'Once deleted, the movie cannot be recovered.',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        if (onRemoveMovie) {
          onRemoveMovie(movieID);
        }
      },
    });
  };

  return (
    <div className={`movie-list ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.imdbID} className="movie-item">
            {onRemoveMovie && (
              <Button
                className="close-icon"
                shape="circle"
                icon={<CloseOutlined />}
                onClick={() => showConfirm(movie.imdbID)}
              />
            )}
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200x300'}
              alt={movie.Title}
              onClick={() => onMovieClick && onMovieClick(movie)}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))
      ) : null}
      {onIconClick && (
        <Button className="icon-card" onClick={onIconClick} style={{ width: '200px', height: '420px', background: 'lightgray' }}>
          <FontAwesomeIcon icon={faPlusCircle} size="3x" />
        </Button>
      )}
    </div>
  );
};

export default MovieList;
