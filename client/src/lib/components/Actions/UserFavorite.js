import axios from "axios"
import { userInfo } from "$lib/data/store"

/** 
  need to post favorite to db and then update the store

  if favorite exits: 
    delete favorite from db, remove id from store
  else:
    add favorite to db, add id to store

/**
 * 
 * @param {*} state 
 * @param {*} id 
 */
export async function AddFavorite(favorite) {
  let favorites
  console.log(favorite)
  let userID
  let email
  userInfo.subscribe((value) => {
    favorites = value.favorites
    userID = value.userID
    email = value.email
  })
  console.log(favorites)
  const res = await axios({
    method: "post",
    url: "http://localhost:8080/user/favorite",
    data: {
      id: decodeURIComponent(userID),
      favorite: favorite,
    },
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    params: {
      id: email,
    },
  }).catch(function (error) {
    console.log(error)
  })
  userInfo.update((value) => {
    value.favorites = [...value.favorites, favorite]
    console.log(value.favorites)
  })
  console.log(res.data)
}

export async function RemoveFavorite(favorite) {
  console.log("removing favorite")
  let favorites
  let userID
  let email
  userInfo.subscribe((value) => {
    favorites = value.favorites
    userID = value.userID
    email = value.email
  })
  const res = await axios({
    method: "post",
    url: "http://localhost:8080/user/favorite/remove",
    data: {
      id: decodeURIComponent(userID),
      favorite: favorite,
    },
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    params: {
      id: email,
    },
  }).catch(function (error) {
    console.log(error)
  })
  userInfo.update((value) => {
    value.favorites = value.favorites.filter((item) => item !== favorite)
  })
}
