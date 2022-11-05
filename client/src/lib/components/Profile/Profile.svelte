<script lang="ts">
  import { loggedIn, userInfo } from "$lib/data/store"
  import { onMount } from "svelte"
  let userAuthState: boolean
  let userData: any
  let userIsAdmin: any
  let userName:object
  let favorites: any
  let firstName:any
  onMount(() => {
    loggedIn.subscribe((value) => {
      userAuthState = value
    })
    userInfo.subscribe((value) => {
      userData = value
      if (value.name) {
      userName = value.name
      firstName = userName.first
    }
      
      userIsAdmin = value.isAdmin


    })
  })
</script>

<div class="flex p-4">
  <div class="flex flex-row">
    <div class="justify-center items-center">
      <h1 class="text-3xl font:bold">Hi {firstName}</h1>
    </div>
    <div class="flex flex-col px-12 jusitfy-end">
      <div class="justify-center items-center">
        <slot />
      </div>
    </div>
  </div>
</div>

{#if userIsAdmin}
  <a href="/admin">Admin</a>
{/if}
