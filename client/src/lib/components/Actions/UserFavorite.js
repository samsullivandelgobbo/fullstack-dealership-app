import axios from 'axios'
import { userInfo } from '$lib/data/store'

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
export const HandleFavorite = async (id) => {
  let favorites
  userInfo.subscribe((value) => {
    favorites = value.favorites
    console.log(favorites)
  })

  if (favorites.includes(id)) {
    await axios.post('http://localhost:8080/user/favorite'
  }
}