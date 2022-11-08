<script>
  import axios from "axios";
  let files;
  let vehicle = {
    make: "",
    model: "",
    year: "",
    color: "",
    price: "",
    odometer: "",
    vin: "",
    stockNum: "",
    location: "",
    notes: "",
    description: "",
    specs: {
      engine: "",
      transmission: "",
      drivetrain: "",
      fuelType: "",
      platform: "",
      doors: "",
      seats: "",
      fuelEconomy: "",
    },
  };
  const test = () => {
    console.log(vehicle);
  };

  async function vinPopulate(vin) {
    console.log(vin);
    let vindata = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
    );
    console.log(vindata);
  }

  const addVehicle = async () => {
    let fileLength = files.length;
    let formData = new FormData();
    let jsondata = JSON.stringify(vehicle);
    formData.append("jsondata", jsondata);
    for (let x = 0; x < fileLength; x++) {
      formData.append("file[]", files[x]);
    }
    const res = await axios({
      method: "post",
      url: "http://localhost:8080/inventory/add-vehicle",
      data: formData,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (response) {
        console.log(response.error);
      });
  };
</script>

<div class="container mx-auto p-12">
  <div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col">
      <button class="btn btn-primary" on:click={() => vinPopulate(vehicle.vin)}
        >Populate Fields</button
      >

      <label for="vin">VIN</label>
      <input
        type="text"
        id="vin"
        bind:value={vehicle.vin}
        class="border border-gray-300 rounded-md p-2"
      />
    </div>
    <div class="flex flex-col">
      <button class="btn btn-primary" on:click={addVehicle}>Add Vehicle</button>
      <label for="make">Make</label>
      <input
        type="text"
        id="make"
        bind:value={vehicle.make}
        class="border border-gray-300 rounded-md p-2"
      />
    </div>
    <div class="flex flex-col">
      <label for="model">Model</label>
      <input
        type="text"
        id="model"
        bind:value={vehicle.model}
        class="border border-gray-300 rounded-md p-2"
      />
    </div>
    <div class="flex flex-col">
      <label for="year">Year</label>
      <input
        type="text"
        id="year"
        bind:value={vehicle.year}
        class="border border-gray-300 rounded-md p-2"
      />
    </div>
    <div class="flex flex-col">
      <label for="color">Color</label>
      <input
        type="text"
        id="color"
        bind:value={vehicle.color}
        class="border border-gray-300 rounded-md p-2"
      />
    </div>
    <div class="flex flex-col">
      <label for="price">Price</label>
      <input
        type="text"
        id="price"
        bind:value={vehicle.price}
        class="border border-gray-300 rounded-md p-2"
      />
    </div>
    <div class="flex flex-col">
      <label for="odometer">Kilometres</label>
      <input
        type="text"
        id="odometer"
        bind:value={vehicle.odometer}
        class="border border-gray-300 rounded-md p-2"
      />
    </div>
    <div class="flex flex-col">
      <label for="stockNum">Stock Number</label>
      <input
        type="text"
        id="stockNum"
        bind:value={vehicle.stockNum}
        class="border border-gray-300 rounded-md p-2"
      />
    </div>
    <div class="flex flex-col">
      <label for="location">Location</label>
      <input
        type="text"
        id="location"
        bind:value={vehicle.location}
        class="border border-gray-300 rounded-md p-2"
      />
    </div>
    <div class="flex flex-col">
      <label for="notes">Notes</label>
      <input
        type="text"
        id="notes"
        bind:value={vehicle.notes}
        class="border border-gray-300 rounded-md p-2"
      />
    </div>
  </div>
  <div class="flex w-full py-4">
    <input
      type="file"
      class="block w-full text-sm text-slate-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border-0
    file:text-sm file:font-semibold
    file:bg-primary-50 file:text-primary-700
    hover:file:bg-primary-100
  "
      multiple
      bind:files
    />
  </div>
</div>
