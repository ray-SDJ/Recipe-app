export interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  image: string;
}

export interface RecipeSummary {
  id: number;
  title: string;
  summary: string;
}
