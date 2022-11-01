//check for token in localstorage then query api to verify user
import { loggedIn, userInfo } from "$lib/data/store"
import axios from "axios"

export const Token = async () => {
  const token = localStorage.getItem("token")
  const userID = localStorage.getItem("userData")
  if (token && userID) {
    const res = await axios.get("http://localhost:8080/user/verify", {
      headers: { Authorization: token },
      params: { id: userID },
    })
    if (res.data.success == true) {
      console.log("User verified")
      return loggedIn.set(true), userInfo.set(res.data)
    }
  }
}
