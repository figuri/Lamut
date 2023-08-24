// import shcema and model from mongoose
const { Schema, model } = require('mongoose');
// import User model
const User = require('./User');
// set up thought schema
const ThoughtSchema = new Schema(
    // define fields
    {
        thoughtText: {
            // thoughtText
            type: String,
            required: true,
            // must be between 1 and 280 characters
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            // createdAt
            type: Date,
            default: Date.now,
            // use getter method to format timestamp
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            // username
            type: String,
            required: true,
            // reference the User model's _id
            ref: 'User'
        },
        // reactions (array of nested documents created with the reactionSchema)
        reactions: [
            {
                // set custom id to avoid confusion with parent thought's _id field
                reactionId: mongoose.Schema.Types.ObjectId,
                // reactionBody
                reactionBody: {
                    type: String,
                    required: true,
                    // must be between 1 and 280 characters
                    minlength: 1,
                    maxlength: 280
                },
                // username
                username: {
                    type: String,
                    required: true
                },
                // createdAt
                createdAt: {
                    type: Date,
                    default: Date.now,
                    // use getter method to format timestamp
                    get: createdAtVal => dateFormat(createdAtVal)
                }
            }
        ]

    }
);

// get total count of reactions on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;