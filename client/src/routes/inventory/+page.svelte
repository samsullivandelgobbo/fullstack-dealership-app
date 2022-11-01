<script>
import { liveQuery } from "dexie"
import { db } from "$lib/data/db"
import { browser } from "$app/environment"
import { VehicleCard } from "$lib/components"

  const vehicles = liveQuery(() => (browser ? db.vehicles.toArray() : []))
  

</script>

<!-- <VehicleList {vehicles} /> -->

<div class="grid lg:grid-cols-3 gap-4">
{#if $vehicles}
  {#each $vehicles as item}
    
    <VehicleCard {item}/>
  
    {/each}
    {/if}

  </div>