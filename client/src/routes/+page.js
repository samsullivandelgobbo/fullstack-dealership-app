// import axios from "axios"
// import Dexie from "dexie"
// import { db } from "$lib/data/db"

// // import { PUBLIC_INVENTORY_URL } from "$env/static/public"

// export async function load() {
//   Dexie.exists("inventoryDatabase").then(async function (exists) {
//     if (exists) {
//       console.log("IndexedDB exists, checking sync")
//       // try {
//       //   const inventoryPopulate = await db.vehicles.add({})
//       // } catch (err) {
//       //   console.log(err)
//       // }
//     } else {
//       console.log("Client Side DB doesnt exist, querying API")
//       const res = await axios.get("http://localhost:8080/inventory")
//       const items = res.data
//       console.log(items)
//       try {
//         for (let i = 0; i < items.length; i++) {
//           let inventoryPopulate = await db.vehicles.add({
//             make: items[i].make,
//             model: items[i].model,
//             year: items[i].year,
//             price: items[i].price,
//             odometer: items[i].odometer,
//             vin: items[i].vin,
//             color: items[i].color,
//             specs: items[i].specs,
//             location: items[i].location,
//             photos: items[i].photos,
//             description: items[i].description,
//             isFavorite: items[i].isFavorite,
//           })
//         }
//       } catch (err) {
//         console.log(err)
//       }
//     }
//   })
// }
