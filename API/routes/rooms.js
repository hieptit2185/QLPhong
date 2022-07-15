const router = require("express").Router()
const Rooms = require("../models/Rooms")


//Create a new Room

router.post("/new", async (req, res) => {
    const newRooms = new Rooms(req.body);

    try {
        const savedRooms = await newRooms.save()
        res.status(201).json(savedRooms)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Delete a Room

router.delete("/:id", async (req, res) => {
    try {
        await Rooms.findByIdAndDelete(req.params.id)
        res.status(201).json("The room has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get all Rooms

router.post("/", async (req, res) => {
    const { room_number, kind_of_room, bed_type } = req.body
    const query = {}

    if (typeof room_number === "number") {
        query.room_number = room_number
    }

    if (typeof kind_of_room === "string") query.kind_of_room = kind_of_room

    if (typeof bed_type === "string") query.bed_type = bed_type


    try {
        const newRooms = await Rooms.find(query).lean()
        res.status(201).json(newRooms)

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
