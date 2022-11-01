import axis from "axios"
import { loggedIn, userInfo } from "$lib/data/store"

export async function Logout() {
  const response = await axis.get("http://localhost:8080/user/logout", {
    headers: { Authorization: localStorage.getItem("token") },
    params: { id: localStorage.getItem("userData") },
  })
  if (response.data.success == true) {
    return (
      localStorage.clear(),
      loggedIn.set(false),
      userInfo.set({}),
      window.location.reload()
    )
  }
}
