<script lang="ts">
  import { loggedIn, userInfo } from "$lib/data/store";
  import {onMount} from "svelte"
  let userAuthState:boolean
  let userInfoState:object
  onMount(() => {
    loggedIn.subscribe((value) => {
    userAuthState = value
  });
    userInfo.subscribe((value) => {
    userInfoState = value
    console.log(userAuthState, userInfoState)

  });
  })

</script>

{#if userInfoState}
  <slot></slot>
{:else}
  <div class="flex justify-center items-center h-screen">
    <div class="text-center">
      <h1 class="text-4xl font-bold">You are not logged in</h1>
      <p class="text-xl">Please log in to view this page</p>
    </div>
  </div>
{/if}