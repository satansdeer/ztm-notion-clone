import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import { createPage } from "./utils/createPage";
import { Route, Routes } from "react-router-dom";
import { Auth } from "./auth/Auth"

const initialState = createPage();

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/:id"
        element={
          <AppStateProvider initialState={initialState}>
            <Page />
          </AppStateProvider>
        }
      />
      <Route
        path="/"
        element={
          <AppStateProvider initialState={initialState}>
            <Page />
          </AppStateProvider>
        }
      />
    </Routes>
  );
}

export default App;
