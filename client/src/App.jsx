import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { Header } from "./components/Header";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import PrivateRoute from "./components/PrivateRoute";
import Lisinting from "./pages/Lisinting";
import ShowListing from "./pages/ShowListing";
import EditListing from "./pages/EditListing";
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/sign-in" element={<SignIn />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/create-listing" element={<Lisinting />}></Route>
              <Route path="/listing/:id" element={<ShowListing />}></Route>
              <Route
                path="/update-listing/:listingId"
                element={<EditListing />}
              ></Route>
            </Route>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
