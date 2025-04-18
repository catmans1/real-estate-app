import AppRoutes from "./routes";

import { UserStatusProvider } from "context";

function App() {
  return (
    <UserStatusProvider>
      <AppRoutes />
    </UserStatusProvider>
  );
}

export default App;
