<script lang="ts">
  import { VehicleCard } from '$lib/components'
  export let vehicles:any
</script>




{#if $vehicles}
  {#each $vehicles as item}
    
    <VehicleCard {item}/>
  
    {/each}
    {/if}