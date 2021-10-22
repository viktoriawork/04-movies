import { useState, useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { useHistory, useLocation } from 'react-router-dom';

import movieAPI from '../components/MovieApi/MovieApi';
import { MovieList } from '../components/MovieList/MovieList';
import PageHeading from '../components/PageHeading/PageHeading';

import s from './Views.module.css';

export default function MovieViews() {
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [error, setError] = useState('');
  const saveSearchQuery =
    new URLSearchParams(location.search).get('queryBy') ?? '';

  useEffect(() => {
    if (!saveSearchQuery) {
      return;
    }

    movieAPI
      .fetchSearchMovies(saveSearchQuery)
      .then(movies => {
        setMovies(movies.results);
      })
      .catch(error => {
        setError(error);
      });
  }, [saveSearchQuery]);

  //значение имени
  const inputChange = event => {
    const { value } = event.currentTarget;
    setMovieName(value);
  };

  //результат поиска
  const onSubmitForm = event => {
    event.preventDefault();

    history.push({
      ...location,
      search: `queryBy=${movieName}`,
    });

    movieAPI.fetchSearchMovies(movieName).then(movies => {
      if (movies.results.length === 0) {
        setError(`Error! ${movieName} movie was not found. Try again`);
        return;
      }
      setMovies(movies.results);
    });
  };

  //! console.log(movies);
  return (
    <div className={s.container}>
      <PageHeading text="Find movies by name" />

      <form onSubmit={onSubmitForm} action="">
        <input
          type="text"
          name="query"
          required
          placeholder="Search Movie"
          autoComplete="off"
          value={movieName}
          onChange={inputChange}
          className={s.input}
        />
      </form>

      {error ? <p> {error} </p> : <MovieList movies={movies} />}
    </div>
  );
}
