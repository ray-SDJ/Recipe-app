import express from 'express'
import cors from 'cors'
import * as RecipeAPI from './recipes-api';


const app = express();

app.use(express.json())

app.use(cors())


app.get("/api/recipes/search", async (req, res) => {
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);
    const results = RecipeAPI.searchRecipes(searchTerm, page);

    return res.json(results);
})

app.listen(6000, () => {
    console.log("Listening on port 3000");
})