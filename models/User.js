// import schema and model
const { Schema, model } = require('mongoose');
// import thoughts model
const Thought = require('./Thought');
// set up user schema
const UserSchema = new Schema(
    // define fields
    { 
        username: {
    // username
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: { 
    // email
            type: String,
            unique: true,
            required: true,
            // match a valid email address using regex to validate
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        }, // thoughts (array of _id values referencing the Thought model)
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],// friends (array of _id values referencing the User model)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
);
    // use virtual to get friendCount
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});
// get total count of friends on retrieval
const User = mongoose.model('User', UserSchema);

module.exports = User;
// export the User model
