// make thoughts model

// import schema and model
// import user model

// set up thought schema
    // define fields
    // thoughtText
    // createdAt
    // username (The user that created this thought)
    // reactions (array of nested documents created with the reactionSchema)
        // reactionId
        // reactionBody
        // username
        // createdAt
            // use Mongoose's built-in timestamps
    // use virtual to get reactionCount
// create the Thought model using the ThoughtSchema
