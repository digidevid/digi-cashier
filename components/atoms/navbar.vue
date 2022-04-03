<template>
  <div class="fixed z-20 top-0 w-full">
    <div
      class="flex justify-between items-center py-4 px-10 font-semibold bg-blue-400 text-white text-lg max-w-lg"
    >
      <nuxt-link to="/">Kasir</nuxt-link>
      <nuxt-link to="/expense">Belanja</nuxt-link>
      <nuxt-link class="w-6 h-6" to="/settings">
        <font-awesome-icon
          :icon="['fa', 'screwdriver-wrench']"
          class="text-white w-full h-full"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
