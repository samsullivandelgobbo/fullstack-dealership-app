<script lang="ts">
  import { loggedIn, userInfo } from "$lib/data/store";
  import { onMount } from "svelte";
  let userAuthState: boolean;
  let userIsAdmin: boolean;
  onMount(() => {
    loggedIn.subscribe((value) => {
      userAuthState = value;
    });
    userInfo.subscribe((value) => {
      userIsAdmin = value.isAdmin;
    });
  });
</script>

{#if userIsAdmin}
  <slot />
{:else}
  <div class="flex justify-center items-center h-screen">
    <div class="text-center">
      <h1 class="text-4xl font-bold">
        You are not authorized to view this page
      </h1>
    </div>
  </div>
{/if}
