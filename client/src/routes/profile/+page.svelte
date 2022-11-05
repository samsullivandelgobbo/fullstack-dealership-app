<script>
  import { VehicleCard } from "$lib/components"
  import { liveQuery } from "dexie"
  import { db } from "$lib/data/db"
  import { browser } from "$app/environment"

  // let response
  // onMount(async () => {
  //   const response = Get('make', 'hyundai');
  //   vehicles = response
  // })
  const vehicles = liveQuery(() =>
    browser ? db.vehicles.where("favorites").equals(true).toArray() : []
  )
</script>

<h1 class="text-2xl font-bold">Favorites</h1>

{#if $vehicles}
  {#each $vehicles as item}
    <VehicleCard {item} />
  {/each}
{/if}


