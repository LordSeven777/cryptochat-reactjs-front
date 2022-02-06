import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./assets/sass/main.scss";

import FontAwesomeImports from "./components/global/FontAwesomeImports";
import WaitSocketSetup from "./components/common/WaitSocketSetup/";
import AuthUserProvider from "./components/global/AuthUserProvider";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LandingPage from "./components/pages/LandingPage";
import DiscussionsPage from "./components/pages/DiscussionsPage";
import TestPage from "./components/pages/TestPage";

// DiscussionsPage component waiting for socket setup
const WaitingDiscussionsPage = props => (
  <WaitSocketSetup>
    <DiscussionsPage {...props} />
  </WaitSocketSetup>
);

function App() {
  return (
    <FontAwesomeImports>
      <Provider store={store}>
        <AuthUserProvider>
          <Router>
            <div className="App">
              <Route path="/" exact render={() => <Redirect to="/landing" />} />
              <Route path="/landing" component={LandingPage} />
              <ProtectedRoute
                path="/discussions"
                component={WaitingDiscussionsPage}
              />
              <Route path="/test" component={TestPage} />
            </div>
          </Router>
        </AuthUserProvider>
      </Provider>
    </FontAwesomeImports>
  );
}

export default App;
