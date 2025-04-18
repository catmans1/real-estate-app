import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateUser, Home, UserList } from "./pages";

const AppRoutes = () => {
  return (
    <Router basename="/real-estate-app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/create" element={<CreateUser />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
