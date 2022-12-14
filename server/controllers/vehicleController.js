const { json } = require("body-parser")
const vehicleService = require("../services/vehicleService")

const dotenv = require("dotenv").config()
const mediaPath = process.env.MEDIAPATH
console.log(mediaPath)
exports.addNew = async (req, res) => {
  try {
    let photos = []
    console.log("POST Vehicle:")
    const jsondata = JSON.parse(req.body.jsondata)
    console.log(jsondata.fileLength)
    for (let x = 0; x < jsondata.fileLength; x++) {
      photos.push(
        mediaPath + jsondata.stockNum + "/" + jsondata.stockNum + x + ".jpg"
      )
    }
    jsondata.photos = photos
    delete jsondata.filelen
    console.log(jsondata)

    const newVehicle = await vehicleService.addVehicle(jsondata)
    res.status(200).send(newVehicle)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getByMultiple = async (req, res) => {
  try {
    const field = req.query.f
    const value = req.query.v

    const vehicle = await vehicleService.getAllWith(field, value)
    res.status(200).send(vehicle)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.loadAll = async (req, res) => {
  try {
    const vehicles = await vehicleService.getAll()
    res.status(200).json({ vehicles: vehicles, date: Date.now() })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.deleteOne = async (req, res) => {
  try {
    const id = req.body.id
    const vehicle = await vehicleService.delete(id)
    res.status(200).send(vehicle)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.updateSoldState = async (req, res) => {
  try {
    let vehicleObject = { _id: req.body.id }
    const updateVehicle = await vehicleService.updateVehicle(
      vehicleObject,
      "sold",
      true
    )
    res.status(200).send(updateVehicle)
  } catch (err) {
    res.status(500).json(err)
  }
}
