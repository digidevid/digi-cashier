<template>
  <div class="max-w-lg mx-auto relative z-0">
    <Navbar />
    <Nuxt />
  </div>
</template>

<script>
import Navbar from "../components/atoms/navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>
