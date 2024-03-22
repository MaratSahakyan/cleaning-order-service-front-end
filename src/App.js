import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AuthProvider, { useAuth } from "./state/auth/AuthProvider";
import StoreProvider from "./state/store/StoreProvider";
import { memo } from "react";

const ProtectedRoute = memo(({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
});

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <StoreProvider>
          <Routes>
            <Route
              exact
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            />
            <Route exact path="/sign-up" element={<SignUp />} />
            <Route index exact path="/sign-in" element={<SignIn />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </StoreProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
