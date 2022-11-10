import axios from "axios"
import Dexie from "dexie"
import { db } from "$lib/data/db"
import { loggedIn, userInfo } from "$lib/data/store"
// import { PUBLIC_INVENTORY_URL } from "$env/static/public"

async function QueryAPI() {
  const res = await axios.get("http://localhost:8080/inventory")
  const items = res.data.vehicles
  const date = res.data.date
  console.log(items)
  try {
    for (let i = 0; i < items.length; i++) {
      let inventoryPopulate = await db.vehicles.add({
        id: items[i]._id,
        make: items[i].make,
        model: items[i].model,
        year: items[i].year,
        price: items[i].price,
        odometer: items[i].odometer,
        vin: items[i].vin,
        color: items[i].color,
        specs: items[i].specs,
        location: items[i].location,
        photos: items[i].photos,
        description: items[i].description,
      })
    }
    let dateSync = await db.dateSync.add({
      id: 1,
      date: new Date(date),
    })

  } catch (err) {
    console.log(err)
  }
}

export async function load() {
  Dexie.exists("inventoryDatabase").then(async function (exists) {
    if (exists) {

      console.log("IndexedDB exists, checking sync")
      const dateSync = await db.dateSync.get(1)
      if (!dateSync) {
        await db.dateSync.clear()
        await db.vehicles.clear()
        await QueryAPI()
      }
      const dateNow = new Date()
      if (dateSync.date.getDate() !== dateNow.getDate()) {
        console.log("Syncing")
        await db.vehicles.clear(), await db.dateSync.clear()
        await QueryAPI()
      } else if (dateSync.date.getTime() < (dateNow.getTime() - 7200000)) {
        console.log("Syncing")
        await db.vehicles.clear(), await db.dateSync.clear()
        await QueryAPI()

      }
      console.log('Database synced')

    } else {

      await QueryAPI()
    }
  })
}
