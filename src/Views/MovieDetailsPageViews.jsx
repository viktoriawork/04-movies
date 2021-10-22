import { useState, useEffect, lazy, Suspense } from 'react';

//react-loader-spinner
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import {
  useParams,
  Switch,
  Route,
  NavLink,
  useHistory,
  useLocation,
  Link,
} from 'react-router-dom';

import movieAPI from '../components/MovieApi/MovieApi';
import s from './Views.module.css';
//Views
//import Cast from '../Views/Cast/Cast';
//import Reviews from '../Views/Reviews/Reviews';

//Views
const Cast = lazy(() =>
  import('../Views/Cast/Cast.jsx' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../Views/Reviews/Reviews.jsx' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPageViews() {
  const { movieId } = useParams();
  const [moviePage, setMoviesPage] = useState([]);
  const history = useHistory();
  //const location = useLocation();
  const { state } = history.location;
  const prevLink = `${state.url}${state.query}`;

  console.log(state.query);
  useEffect(() => {
    movieAPI.fetchMovieById(movieId).then(movie => {
      setMoviesPage(movie);
    });
  }, [movieId]);

  //! console.log(movieId);

  return (
    <div className={s.container}>
      <Link type="button" to={prevLink} className={s.btn}>
        Go back
      </Link>

      <div className={s.movieDetailsPage}>
        <img
          src={
            moviePage.backdrop_path
              ? `https://image.tmdb.org/t/p/w500/${moviePage.poster_path}`
              : null
          }
          // src={`https://image.tmdb.org/t/p/w500/${moviePage.backdrop_path}`}
          alt={moviePage.title}
          width="300"
          height="250"
          className={s.imgDetails}
        />
        <div className={s.movieDescription}>
          <ul className={s.list}>
            <li>
              <h2 className={s.title}>{moviePage.title}</h2>
            </li>
            <li className={s.listDescription}>
              <p className={s.text}>Release date:</p>
              <span className={s.release}>{` ${moviePage.release_date}`}</span>
            </li>
            <li className={s.listDescription}>
              <span>{`Popularity: ${moviePage.popularity}%`}</span>
            </li>
            <li className={s.listDescription}>
              <span
                className={s.overview}
              >{`Overview: ${moviePage.overview}`}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* <hr /> */}
      {moviePage && (
        <div>
          <ul>
            <li className={s.description}>
              <NavLink
                // to={`/movies/${movieId}/cast`}
                to={{
                  pathname: `/movies/${movieId}/cast`,
                  state: {
                    url: state.url,
                    query: state.query,
                  },
                }}
                activeClassName={s.activeLink}
              >
                Cast
              </NavLink>
            </li>
            <li className={s.description}>
              <NavLink
                // to={`/movies/${movieId}/reviews`}
                to={{
                  pathname: `/movies/${movieId}/reviews`,
                  state: {
                    url: state.url,
                    query: state.query,
                  },
                }}
                activeClassName={s.activeLink}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {/* <hr /> */}
      <Suspense
        fallback={
          <div>
            <Loader
              type="MutatingDots"
              //type="Watch"
              color="#00BFFF"
              height={80}
              width={80}
              timeout={3000}
            />
          </div>
        }
      >
        <Switch>
          <Route path="/movies/:movieId/cast">
            <Cast>{moviePage && <Cast movieId={movieId} />}</Cast>
          </Route>
          <Route path="/movies/:movieId/reviews">
            <Reviews movieId={movieId} />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
