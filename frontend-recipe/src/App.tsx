import "./App.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";

type Tabs = "search" | "favorites";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );
  const [selectedTab, setSelectedTab] = useState<Tabs>();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef(1);


  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const favoriteRecipes = await api.getFavoriteRecipes();
        setFavoriteRecipes(favoriteRecipes.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFavoriteRecipes();
  }, []);
  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (err) {
      console.error(err);
    }
  };
  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (err) {
      console.log(err);
    }
  };

  const addFavoriteRecipe = async (recipe: Recipe) => {
    try {
      await api.addFavoriteRecipe(recipe);
      setFavoriteRecipes([...favoriteRecipes, recipe])
    } catch (error) {
      console.log(error)
    }
  }

  const removeFavoriteRecipe = async(recipe: Recipe) => {
    try {
      await api.removeFavoriteRecipe(recipe);
      const updatedRecipes = favoriteRecipes.filter((favRecipe) => recipe.id !== favRecipe.id);
      setFavoriteRecipes(updatedRecipes);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    
    <div className="app-container">
      <div className="header">
        <img src="./public/differentplates.jpg"></img>
        <div className='title'> My Recipe App</div>
      </div>
        <div role="tablist"className="tabs tabs-boxed">
          <h1 role="tab"className="tab" onClick={() => setSelectedTab("search")}> Recipe Search</h1>
          <h1 role="tab"className="tab tab-active" onClick={() => setSelectedTab("favorites")}> Favorites</h1>
        </div>
        {selectedTab === "search" && (
          <div>
            <form onSubmit={() => handleSearchSubmit}>
              <input
                type="text"
                required
                placeholder="Enter Search Term..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              ></input>
              <button type="submit">Submit</button>
            </form>
            {recipes.map((recipe) => {
              const isFavorite = favoriteRecipes.some((favRecipe) => recipe.id === favRecipe.id);
              return (
                <RecipeCard
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                  onFavouriteButtonClick={isFavorite ? removeFavoriteRecipe : addFavoriteRecipe}
                  isFavourite={isFavorite}
                  />
              )
            })}
            <button className="view-more-button" onClick={handleViewMoreClick}>
              View More
            </button>
          </div>
        )}

        {selectedTab === "favorites" && (
          <div>
            {favoriteRecipes.map((recipe) => (
              <RecipeCard
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
                onFavouriteButtonClick={removeFavoriteRecipe}
                isFavourite={true}
              />
            ))}
          </div>
        )}

        {selectedRecipe ? (
          <RecipeModal
            recipeId={selectedRecipe.id.toString()}
            onClose={() => setSelectedRecipe(undefined)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default App;
