<script lang="ts">
  import { liveQuery } from "dexie";
  import { db } from "$lib/data/db";
  import { browser } from "$app/environment";
  import {
    VehicleCard,
    LoginModal,
    AddFavorite,
    RemoveFavorite,
    VehicleList
  } from "$lib/components";
  import { loggedIn, userInfo } from "$lib/data/store";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  // let loggedin;
  // let favorites;
  // onMount(async () => {
  //   favorites = get(userInfo).favorites;
  //   console.log(favorites);
  // });

  // loggedIn.subscribe((value) => {
  //   loggedin = value;
  // });
  const vehicles = liveQuery(() => (browser ? db.vehicles.toArray() : []));
</script>

<VehicleList {vehicles}/>

<!-- <div class="grid lg:grid-cols-3 gap-4">
  {#if $vehicles}
    {#each $vehicles as item}
      <VehicleCard {item}>
        {#if !loggedin}
          <LoginModal>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-heart hover:fill-red-500 focus:hidden"
              ><path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              /></svg
            >
          </LoginModal>
        {:else if item.id in favorites}
          <button on:click={RemoveFavorite}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="red"
              stroke="red"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-heart hover:fill-red-500 focus:hidden"
              ><path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              /></svg
            >
          </button>
        {:else}
          <button on:click={() => AddFavorite(item.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-heart hover:fill-red-500 focus:hidden"
              ><path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              /></svg
            >
          </button>
        {/if}
      </VehicleCard>
    {/each}
  {/if}
</div> -->
