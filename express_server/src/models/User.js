const mongoose = require("mongoose");

function formatDate(date) {
    const pad = (num) => String(num).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
           `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String
        },

        username: {
            type: String,
            required: true
        },

        lastName: {
            type: String
        },

        email: {
            type: String,
            required: true
        },

        contact: {
            type: String
        },

        country: {
            type: String
        },

        password: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        date: {
            type: String,
            default: () => formatDate(new Date())
        },

        stats: {
            type: mongoose.Schema.Types.Mixed
        }
    },
    {
        collection: "users",
        versionKey: false
    }
);

userSchema.set("toJSON", {
    transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;

        // IMPORTANT:
        // Don't send password back to the frontend
        delete ret.password;
    }
});

module.exports = mongoose.model("User", userSchema);