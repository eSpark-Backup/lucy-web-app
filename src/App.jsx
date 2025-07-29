import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes/routes";
import "./App.css";

const App = () => {
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
    <BrowserRouter>
      <Routes>{renderRoutes(routes)}</Routes>
    </BrowserRouter>
  );
};

export default App;
