<script>
  import { liveQuery } from "dexie"
  import { db } from "$lib/data/db"
  import { browser } from "$app/environment"
  import { VehicleCard, LoginModal } from "$lib/components"
  import { loggedIn } from "$lib/data/store"

  const vehicles = liveQuery(() => (browser ? db.vehicles.toArray() : []))
  let loggedin
  loggedIn.subscribe((value) => {
    loggedin = value
  })

</script>

<!-- <VehicleList {vehicles} /> -->

<div class="grid lg:grid-cols-3 gap-4">
{#if $vehicles}
  {#each $vehicles as item}
    
    <VehicleCard {item}>
      <div class="absolute right-4 top-4 hover:scale-125">
        {#if !loggedin}
        <LoginModal>
      
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="red"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-heart hover:stroke-red-500 focus:hidden"
            ><path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            /></svg
          >
          
        </LoginModal>
        {:else} 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="red"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-heart hover:stroke-red-500 focus:hidden"
            ><path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            /></svg
          >
        {/if}
      </div>
      
    </VehicleCard>
  
    {/each}
    {/if}

  </div>