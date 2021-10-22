import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

//react-loader-spinner
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

//Navigation
import { Navigation } from './components/Navigation/Navigation';
//import { routes } from './utils/routes';
import './App.css';
//Views
//  import  HomeViews  from './Views/HomeViews';
// import  MovieViews  from './Views/MovieViews';
// import  MovieDetailsPageViews  from './Views/MovieDetailsPageViews';
// import  NotFound  from './Views/NotFound/NotFound';

//Views
const HomeViews = lazy(() =>
  import('./Views/HomeViews.jsx' /* webpackChunkName: "home" */),
);
const MovieViews = lazy(() =>
  import('./Views/MovieViews.jsx' /* webpackChunkName: "movie" */),
);
const MovieDetailsPageViews = lazy(() =>
  import(
    './Views/MovieDetailsPageViews.jsx' /* webpackChunkName: "movie-details" */
  ),
);
const NotFound = lazy(() =>
  import('./Views/NotFound/NotFound.jsx' /* webpackChunkName: "not-found" */),
);

function App() {
  return (
    <div className="App">
      <Navigation />
      <hr />
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
          <Route path="/" exact>
            <HomeViews />
          </Route>

          <Route path="/movies" exact>
            <MovieViews />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPageViews />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
