import { AiOutlineHeart } from "react-icons/ai";
import { Recipe } from "../types";

interface Props {
  recipe: Recipe;
  onClick: (recipe: Recipe)=>void;
  onFavoriteButtonClick: (recipe: Recipe) => void
}

const RecipeCard = ({ recipe, onClick, onFavoriteButtonClick }: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image}></img>
      <div className="recipe-card-title">
        <span onClick={(event) => {
            event.stopPropagation()
            onFavoriteButtonClick(recipe)
        }}>
          <AiOutlineHeart size={25} />
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
