import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Create from './components/createActivity/createactivity.jsx';
import Details from './components/details/details.jsx';
import Home from './components/home/home.jsx';
import Landing from './components/landing/landing.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/activities' component={Create} />
          <Route exact path='/countries/:id' component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
