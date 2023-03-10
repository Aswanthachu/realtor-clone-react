import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


import Home from "./Pages/Home";
import Profile from './Pages/Profile';
import SignIn from './Pages/SignIn';
import Offers from './Pages/Offers';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListings from './Pages/CreateListings';
import Listing from './Pages/Listing';
import Category from './Pages/Category';

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/offers' element={<Offers />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/forget' element={<ForgotPassword />} />
            {/* <Route path='/create-listing' element={<PrivateRoute />}>
              <Route path='/create-listing' element={<CreateListings />} />
            </Route> */}

           {/* dd */}

           <Route
            path="/category/:categoryName/:listingId"
            element={<Listing />}
          />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="create-listing" element={<PrivateRoute />}>
            <Route path="/create-listing" element={<CreateListings />} />
          </Route>
          {/* <Route path="edit-listing" element={<PrivateRoute />}>
            <Route path="/edit-listing/:listingId" element={<EditListing />} />
          </Route> */}

          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Router>
      </div>
    </>
  );
}

export default App;
