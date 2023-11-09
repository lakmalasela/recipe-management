const mongoose = require('mongoose');

const { Schema } = mongoose; 

const RecipeSchema = new Schema({
        recipename: {
            type: String,
            require: true
        },
        ingredients: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
     
    }, {
        timestamps: true,
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        }
    }

);

module.exports = mongoose.model("Recipe", RecipeSchema);