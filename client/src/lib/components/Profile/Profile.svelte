<script lang="ts">
  import { loggedIn, userInfo } from "$lib/data/store";
  import {onMount} from "svelte"
  let userAuthState:boolean
  let userData:any
  let userIsAdmin
  onMount(() => {
    loggedIn.subscribe((value) => {
    userAuthState = value
  });
    userInfo.subscribe((value) => {
    userData = value
    userIsAdmin = value.isAdmin
  });
  })

</script>

//navbar component 

//show admin link if user is admin
{#if userIsAdmin}
  <a href="/admin">Admin</a>
{/if}