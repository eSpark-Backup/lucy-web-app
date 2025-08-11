import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme.js";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition:Bounce
      />
    </Provider>
  </ThemeProvider>
);
