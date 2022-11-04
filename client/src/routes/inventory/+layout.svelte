<script>
  // import { VehicleList } from '$lib/components'
  // export let data
  // let vehicles = data.vehicles
  // console.log(vehicles)
  // console.log(data.vehicles)
</script>


  <div class="drawer drawer-mobile max-h-drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="w-full navbar bg-seondary-100 px-4">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              /></svg
            >
          </label>
        </div>
        <div class="flex-1 px-2 mx-2">
          <div class="form-control">
            <div class="input-group">
              <input
                type="text"
                placeholder="Search Vehicles"
                class="input input-bordered"
              />
              <button class="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  /></svg
                >
              </button>
            </div>
          </div>
        </div>
        <div class="flex-none hidden lg:block">
          <ul class="menu menu-horizontal">
            <!-- Navbar menu content here -->
            <select class="select w-full max-w-xs">
              <option disabled selected>Sort Vehicles</option>
              <option>Year - High</option>
              <option>Year - Low</option>
              <option>Price - High</option>
              <option>Price - Low</option>
            </select>
          </ul>
        </div>
      </div>

      <slot />
    </div>
    <div class="drawer-side lg:sticky">
      <label for="my-drawer-3" class="drawer-overlay" />
      <ul class="menu p-4 overflow-y-auto w-60 bg-base-100">
        <!-- Sidebar content here -->
      </ul>
    </div>
  </div>


<style>
  .max-h-drawer {
    height: 90vh
  }
</style>