<script lang="ts">
  import { onMount } from "svelte";
  import { LoginModal, AddFavorite, RemoveFavorite } from "$lib/components";
  import { loggedIn, userInfo } from "$lib/data/store";
  import { HandleFavorite } from "../Actions/UserFavorite"
  export let item:any
  let loggedin
  let favorites
  let favorite = null
  loggedIn.subscribe((value) => {
      loggedin = value;
    });
    userInfo.subscribe((value) => {
      favorites = value.favorites;
    });
  onMount(async () => {
    for (let x in favorites) {
      if (favorites[x] == item.id) {
        favorite = true;
        
      }
    }
  });

  function handleFavorite() {
    if (favorite) {
      favorite = false
      RemoveFavorite(item.id)
    } else {
      favorite = true
      AddFavorite(item.id)
    }
  }
</script>

<!-- <div class="card card-compact bg-base-100 shadowl-sm">
  <figure>
    <a>
      <img src={item.photos[1]} alt="Shoes" class="min-h-fit"/>
    </a>
    <div class="absolute right-4 top-4 hover:scale-125">
      <slot />
    </div>
  </figure>
  <div class="card-body">
    <h2 class="card-title">{item.year + item.make + item.model}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end" />
  </div>
</div> -->


<div class="card card-compact bg-base-100 shadowl-sm">
  <figure>
    <a>
      <img src={item.photos[1]} alt="Shoes" class="min-h-fit"/>
    </a>
    <div class="absolute right-4 top-4 hover:scale-125">
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
        {:else if favorite}
          <button on:click={handleFavorite}>
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
          <button on:click={handleFavorite}>
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
    </div>
  </figure>
  <div class="card-body">
    <h2 class="card-title">{item.year + item.make + item.model}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end" />
  </div>
</div>
