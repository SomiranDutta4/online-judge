const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
    {
        tags: {
            type: [String],
            default: []
        },

        countAC: {
            type: Number,
            default: 0
        },

        countTotal: {
            type: Number,
            default: 0
        },

        name: {
            type: String
        },

        author: {
            type: String
        },

        statement: {
            type: String
        },

        explanation: {
            type: String
        },

        sampleTestcases: {
            type: [mongoose.Schema.Types.Mixed],
            default: []
        },

        systemTestcases: {
            type: [mongoose.Schema.Types.Mixed],
            default: []
        },

        time: {
            type: Number
        },

        memory: {
            type: Number
        }
    },
    {
        collection: "problems",
        versionKey: false
    }
);

problemSchema.set("toJSON", {
    transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
    }
});

module.exports = mongoose.model("Problem", problemSchema);