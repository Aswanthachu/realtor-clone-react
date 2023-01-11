import './App.css';
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom';

import Home from "./Pages/Home";
import Profile from './Pages/Profile';
import SignIn from './Pages/SignIn';
import Offers from './Pages/Offers';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import Header from './components/Header';
 
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/profile'  element={<Profile />} />
          <Route path='/signin'  element={<SignIn />} />
          <Route path='/offers'  element={<Offers />} />
          <Route path='/signup'  element={<SignUp />} />
          <Route path='/forget'  element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
