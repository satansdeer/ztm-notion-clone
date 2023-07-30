import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import { Route, Routes } from "react-router-dom";
import { Auth } from "./auth/Auth";
import { Private } from "./auth/Private";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/:id"
        element={
          <Private
            component={
              <AppStateProvider >
                <Page />
              </AppStateProvider>
            }
          />
        }
      />
      <Route
        path="/"
        element={
          <Private
            component={
              <AppStateProvider >
                <Page />
              </AppStateProvider>
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
