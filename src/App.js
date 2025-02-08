import "./App.css";
import Products from "./components/Listitems/Products.js";
import Header from "./components/Listitems/Layout/header.js";
import Subheader from "./components/Listitems/Layout/Subheader.js";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthIndex from "./components/Listitems/AuTH/auth.js";
import { useEffect } from "react";
import { checkIsLoggedIn } from "./actions/authActions.js";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./components/Listitems/Layout/profile.js";
import Footer from "./components/Listitems/Layout/footer.js";
import SearchResults from "./components/Listitems/SearchResults.js";

const NotFound = () => {
  return (
    <div>
      <h1>Not Found !</h1>
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkIsLoggedIn(() => {}));
  }, []);

  return (
    <div>
      <Header />
      <Subheader />
      <Routes>
        {/* protected routes  */}
        {!authState.idToken ? (
          <Route path="/login" element={<AuthIndex type="login" />} />
        ) : (
          <Route path="/login" element={<Navigate to="/" replace={true} />} />
        )}
        {!authState.idToken ? (
          <Route path="/signup" element={<AuthIndex type="signup" />} />
        ) : (
          <Route path="/signup" element={<Navigate to="/" replace={true} />} />
        )}

        <Route path="/404" element={<NotFound />} />
        {authState.idToken ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route
            path="/profile"
            element={<Navigate to="/login" replace={true} />}
          />
        )}
        <Route path="/search" element={<SearchResults />} />
        <Route path="/:category?" element={<Products />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
