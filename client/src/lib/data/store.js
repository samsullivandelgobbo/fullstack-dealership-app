import { writable } from "svelte/store"

export const loggedIn = writable(false)
export const userInfo = writable({
  email: "",
  favorites: [],
  isAdmin: false,
  userID: "",
  name: "",
})

export const userFavorites = writable([])
export const userID = writable("")
