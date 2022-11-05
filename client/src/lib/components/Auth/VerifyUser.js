//check for token in localstorage then query api to verify user
import { loggedIn, userInfo } from "$lib/data/store"
import axios from "axios"

export const Token = async () => {
  function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(";").shift()
  }

  let authToken = getCookie("token")
  let userCookie = decodeURIComponent(getCookie("userData"))
  let token = localStorage.getItem("token")

  if (userCookie) {
    localStorage.setItem("userData", userCookie)
  }

  const userID = localStorage.getItem("userData")
  if (!token) {
    if (authToken) {
      token = authToken
      localStorage.setItem("token", token)
    }
  }
  if (token && userID) {
    const res = await axios
      .get("http://localhost:8080/user/verify", {
        headers: { Authorization: token },
        params: { id: userID },
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.success == false) {
            localStorage.removeItem("token")
            localStorage.removeItem("userData")
            loggedIn.set(false)
          }
        }
      })

    if (res.data.success == true) {
      console.log("User verified")
      return loggedIn.set(true), userInfo.set(res.data)
    } else {
      console.log("User not verified")
      return (
        loggedIn.set(false),
        localStorage.removeItem("token"),
        localStorage.removeItem("userData")
      )
    }
  } else {
    console.log("User not verified")
    return (
      loggedIn.set(false),
      localStorage.removeItem("token"),
      localStorage.removeItem("userData")
    )
  }
}
