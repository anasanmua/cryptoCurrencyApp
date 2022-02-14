const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const tipSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            minlength: 100
        },
        image: {
            type: String,

        }


    },
    {

        timestamps: true,
    }
);

const Tip = model("Tip", tipSchema);

module.exports = Tip;