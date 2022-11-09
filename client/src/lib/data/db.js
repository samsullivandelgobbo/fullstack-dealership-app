import Dexie from "dexie"

export const db = new Dexie("inventoryDatabase")
db.version(1).stores({
  vehicles:
    "id, vin, make, model, year, price, odometer, color, specs, location, photos, description, isFavorite", // Primary key and indexed props

  dateSync: "++id, date",
})
