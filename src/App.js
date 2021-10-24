import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import SearchPage from 'components/searchPage/searchPage';
import Header from 'components/header/header';
import  LoadingBar from 'react-redux-loading-bar';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='content'>
        <header className='desktop'>
          <LoadingBar />
        </header>
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
