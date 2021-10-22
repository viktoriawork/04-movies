import { useState, useEffect } from 'react';

import movieAPI from '../components/MovieApi/MovieApi';
import PageHeading from '../components/PageHeading/PageHeading';
import { MovieList } from '../components/MovieList/MovieList';

import s from './Views.module.css';

export default function HomeViews() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieAPI.fetchTrending().then(movies => {
      setMovies(movies.results);
    });
  }, []);

  return (
    <div className={s.container}>
      <PageHeading text="Popular movies" />
      <MovieList movies={movies} />
    </div>
  );
}
