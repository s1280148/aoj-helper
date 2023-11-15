import React from "react";
import AppProvider from "./providers/AppProvider";
import AppRoutes from "./routes/AppRoutes";

/**
 * アプリケーション
 * @returns アプリケーション
 */
const App: React.FC = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
