import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import DesktopHeader from 'components/header/desktopHeader';
import MobileHeader from 'components/header/mobileHeader';
import SearchPage from 'components/searchPage';


function App() {
  return (
    <BrowserRouter>
      <DesktopHeader/>
      <MobileHeader/>
      <Switch>
        <Route path="/search">
          <SearchPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
