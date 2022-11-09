import axios from "axios"
import Dexie from "dexie"
import { db } from "$lib/data/db"
import { loggedIn, userInfo } from "$lib/data/store"
// import { PUBLIC_INVENTORY_URL } from "$env/static/public"

export async function load() {
  Dexie.exists("inventoryDatabase").then(async function (exists) {
    if (exists) {
      console.log("IndexedDB exists, checking sync")
      const dateSync = await db.dateSync.get(1)
      const dateNow = new Date()
      console.log(dateNow)
      console.log(dateSync.date.getDate())
      // if (dateSync && dateSync.date.getDate() == )  {

      // }
    } else {
      console.log("Client Side DB doesnt exist, querying API")
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
          date: new Date(date),
        })
        loggedIn.subscribe(async (value) => {
          if (!value) {
            console.log("User not logged in, favorites unavailable")
          } else {
            console.log("Checking user favorites")
            userInfo.subscribe(async (value) => {
              if (value.favorites[0]) {
                console.log("User has favorites")
                const favorites = value.favorites
                console.log(favorites)
              }
            })
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  })
}
