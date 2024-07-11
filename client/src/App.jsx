import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./routes/ROUTES";
import { UserContextProvider } from "./context/userContext";
import { MovieContextProvider } from "./context/MovieContext";
import { CategoryContextProvider } from "./context/CategoriesContext";
import { QualityContextProvider } from "./context/QualitiesContext";
import { InformationContextProvider } from "./context/InformationContext";

const routes = createBrowserRouter(ROUTES);

function App() {
  return (
    <InformationContextProvider>
      <QualityContextProvider>
        <CategoryContextProvider>
          <MovieContextProvider>
            <UserContextProvider>
              <RouterProvider router={routes} />
            </UserContextProvider>
          </MovieContextProvider>
        </CategoryContextProvider>
      </QualityContextProvider>
    </InformationContextProvider>
  );
}

export default App;
