const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");

//create recipe
router.post("/", async (req, res) => {
  try {
    const { recipename, ingredients, description } = req.body;
    console.log(recipename, ingredients, description);

    const data = new Recipe({
      recipename,
      ingredients,
      description,
    });

    await data.save();

   
    res.sendStatus(200);
  } catch (e) {
      res.sendStatus(500);
  }
});

//get all recipes
router.get("/", async (req, res) => {
  try {
    const data = await Recipe.find();
    console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.sendStatus(500);
  }
});

//get one recipe
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Recipe.findById(id).exec();
    console.log(data);
    res.status(200).json(data); 
  } catch (e) {
    res.sendStatus(500);
  }
});

//delete recipe
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Recipe.deleteOne({_id: id });
    res.sendStatus(200);
  } catch (error) {
    console.log("Error ", error);
    res.sendStatus(500);
  }
});

//update recipe
router.put("/", async (req, res) => {
  try {
    const { recipename, ingredients, description, _id } = req.body;
    await Recipe.updateOne({ _id }, { recipename, ingredients, description }); //updateOne({ filter }, { updateValue })
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
