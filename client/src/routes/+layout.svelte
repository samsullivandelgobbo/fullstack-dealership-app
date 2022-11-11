<script lang="ts">
  import "../app.css"
  import { Navbar, LoginModal, Token, Logout } from "$lib/components"
  import { onMount } from "svelte"
  import { loggedIn, userInfo } from "$lib/data/store"
  let userState
  let userData
  onMount(async () => {
    console.log("verifying token")
    await Token()

    loggedIn.subscribe((value) => {
      userState = value
    })
    userInfo.subscribe((value) => {
      userData = value
    })
    console.log("Logged in?:", userState, "User data:", userData)


  
  })

  //TODO: Add a user avatar to the navbar
</script>

<Navbar>
  {#if !userState}
    <LoginModal>
      <div class="btn">Get Started</div>
    </LoginModal>
  {:else}
    <div class="dropdown dropdown-end">
      <div tabindex="0" class="btn btn-ghost">
        <span>{userData.email}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          /></svg
        >
      </div>
      <ul
        tabindex="0"
        class="menu dropdown-content bg-base-100 rounded-box w-52"
      >
        <li><a href="/profile">Profile</a></li>
        <li><button on:click={Logout}>Logout</button></li>
      </ul>
    </div>
  {/if}
</Navbar>
<div class="z-0">
  <slot />
</div>
