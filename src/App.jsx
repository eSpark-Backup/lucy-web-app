import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import routes from "./routes/routes";
import { AnimatePresence } from "framer-motion";

import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import "./App.css";

const AppRoutes = () => {
  const location = useLocation();

  const renderRoutes = (routes) =>
    routes.map(({ path, element, children }, index) =>
      children ? (
        <Route key={index} path={path} element={element}>
          {children?.map((child, i) => (
            <Route
              key={i}
              index={child.index}
              path={child.path}
              element={child.element}
            />
          ))}
        </Route>
      ) : (
        <Route key={index} path={path} element={element} />
      )
    );

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {renderRoutes(routes)}
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
