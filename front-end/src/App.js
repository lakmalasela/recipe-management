import "./App.css";
import FormComponent from "./components/forms/FormComponent";
import Headercomponent from "./components/header/HeaderComponent";
import EditRecipe from "./views/EditRecipe";
import SelectedRecipe from "./views/SelectedRecipe";
//routing
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RecipeTable from "./components/table/RecipeTable";
import Recipe from "./views/Recipe";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Recipe/>}></Route>,
      <Route path="add-recipe" element={<FormComponent />}></Route>
      <Route path="edit-recipe/:id" element={<EditRecipe />}></Route>
      <Route path="selected-recipe/:id" element={<SelectedRecipe />}></Route>
      
    </Route>
  )
);

function App() {
  return <RouterProvider index router={routes}></RouterProvider>;
}

export default App;
