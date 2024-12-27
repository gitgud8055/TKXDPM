import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { store, persistor } from "./store/store-config";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import "@fontsource/inter";

createRoot(document.getElementById("root")!).render(
  <SnackbarProvider maxSnack={3} dense>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </SnackbarProvider>
);
