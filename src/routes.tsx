import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, UserList } from "./pages";

const AppRoutes = () => {
  return (
    <Router basename="/real-estate-app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
