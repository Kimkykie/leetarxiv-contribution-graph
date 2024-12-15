const mongoose = require('mongoose');

const DailyCommitSchema = new mongoose.Schema({
    Date: {
        type: Date,
        required: true
    },
    Filename: {
        type: String,
        required: true
    }
});

const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    CommitHistory: [DailyCommitSchema]
});

module.exports = mongoose.model('User', UserSchema);