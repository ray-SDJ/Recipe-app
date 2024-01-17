const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page: number) => {
  if (!apiKey) {
    throw new Error("No API key provided");
  }

  const url = new URL("109bbf07468c433f86eea8811f6cd8f8");
  const queryParams = {
    apiKey: apiKey,
    query: searchTerm,
    number: "10",
    offset: (page * 10).toString(),
  };
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url);
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.log(error);
  }
};

export const getRecipeSummary = async (recipeId: string) => {
  if (!apiKey) {
    throw new Error("No API key provided");
  }
  const url = new URL(
    `https://api.spoonacular.com/recipes/${recipeId}/summary`
  );
  const params = {
    apiKey: apiKey,
  };
  url.search = new URLSearchParams(params).toString();
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const getFavoriteRecipesByIDs = async (ids: string[]) => {
  if (!apiKey) {
    throw new Error("No API key provided");
  }
  const url = new URL("https://api.spoonacular.com/recipes/informationBulk");
  const params = {
    apiKey: apiKey,
    ids: ids.join(","),
  };
  url.search = new URLSearchParams(params).toString();
  const searchResponse = await fetch(url);
  const json = searchResponse.json;

  return { results: json };
};
