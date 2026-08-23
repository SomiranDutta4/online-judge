const mongoose = require("mongoose");

function formatDate(date) {
    const pad = (num) => String(num).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
           `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

const submissionSchema = new mongoose.Schema(
    {
        problemName: {
            type: String
        },

        code: {
            type: String
        },

        language: {
            type: String
        },

        userId: {
            type: String
        },

        verdict: {
            type: String
        },

        date: {
            type: String,
            default: () => formatDate(new Date())
        },

        result: {
            type: [mongoose.Schema.Types.Mixed],
            default: []
        }
    },
    {
        collection: "submissions",
        versionKey: false
    }
);

submissionSchema.set("toJSON", {
    transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
    }
});

module.exports = mongoose.model("Submission", submissionSchema);