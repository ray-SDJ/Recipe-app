import "./App.css"
import { FormEvent, useState } from "react"
import * as api from './api'
import { Recipe } from "./types";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("burgers");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);

    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Recipe App</h1>
      </header>
      <div>
        <form onSubmit={() => handleSearchSubmit}>
          <button type="submit">Submit</button>
        </form>
        {recipes.map((recipe) => (
          <div>
            {recipe.image}
            <h2>{recipe.title}</h2>
            <p>{recipe.ingredients}</p>
            <p>{recipe.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App