<script lang="ts">
  export let item:any
</script>

<div class="card card-compact bg-base-100 shadowl-sm">
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
</div>
