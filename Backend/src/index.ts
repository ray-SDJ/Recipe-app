import express from 'express'
import cors from 'cors'
import * as RecipeAPI from './recipes-api';
import { PrismaClient } from "@prisma/client";


const app = express();
const prismaClient = new PrismaClient();

app.use(express.json())

app.use(cors())


app.get("/api/recipes/search", async (req, res) => {
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);
    const results = await RecipeAPI.searchRecipes(searchTerm, page);

    return res.json(results);
})

app.post("/api/recipes/favorite", async (req, res) => {
    const recipeId = req.body.recipeId;
    try {
        const favoriteRecipe = await prismaClient.favoriteRecipes.create({
            data: {
                recipeId: recipeId
            }
        });
        return res.status(201).json()
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "oops, something went wrong"});
    }
})

app.get("/api/recipes/favorites", async (req, res) => {
    try {
        const recipes = await prismaClient.favoriteRecipes.findMany();
        const recipeIds = recipes.map((recipe) => recipe.recipeId.toString());
        const favorites = await RecipeAPI.getFavoriteRecipesByIDs(recipeIds);
        return res.json(favorites)


    } catch (error) {
        console.log(error)
    }
})

app.delete("/api/recipes/favorite", async (req, res) => {
    const recipeId = req.body.recipeId;
    try {
        await prismaClient.favoriteRecipes.delete({
            where: {
                recipeId: recipeId
            }
        })
        return res.status(204).send()
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "oops, something went wrong"})
    }

})

app.get("/api/recipe/:recipeId/summary", async (req, res) => {
    const recipeId = req.params.recipeId;
    const results = await RecipeAPI.getRecipeSummary(recipeId);
    return res.json(results)
})

app.listen(6000, () => {
    console.log("Listening on port 3000");
})