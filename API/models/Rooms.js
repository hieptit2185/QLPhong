const mongoose = require('mongoose')

const RoomsSchema = new mongoose.Schema(
    {
        kind_of_room: {
            type: String,
            required: true,
        },
        room_number: {
            type: Number,
            required: true,
        },
        floor: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        direction: { type: String },
        area: {
            type: Number,
            required: true
        },
        bed_type: {
            type: String,
            required: true
        },
        maximum_people: { type: Number, required: true },
        imgae: { type: String },
        utilities: { type: Array },
        room_rates: { type: Number, required: true },
        discount: { type: Number },
        status: { type: String, required: true }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Rooms", RoomsSchema)