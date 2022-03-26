<template>
  <div
    v-if="isShow"
    tabindex="0"
    class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed"
  >
    <div class="z-50 relative mx-auto my-0 w-full">
      <div
        class="modal-popup w-full md:w-3/4 lg:w-1/2 xl:w-1/3 flex flex-col overflow-hidden rounded-3xl px-4 pt-8 pb-6 bg-white"
      >
        <button
          class="fill-current h-6 w-6 absolute right-3 top-3 font-3xl font-bold primary focus:outline-none"
          @click="onClose"
        >
          <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6 primary">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div class="scroll-bar !overflow-y-auto !overscroll-auto md:px-2">
          <div>
            <h3 class="text-2xl font-bold text-center mb-2">Checkout</h3>
            <div
              class="flex justify-between items-center text-xl font-semibold"
            >
              <p>Pesanan</p>
              <p>Harga</p>
            </div>
            <div
              v-for="(item, id) in checkoutMenus"
              :key="id"
              class="flex justify-between items-center border-b-2 border-dashed pb-1 space-y-1 mt-2"
            >
              <div>
                <p>{{ item.name }}</p>
                <p class="text-sm">
                  {{ toRupiah(item.price) }} x {{ item.quantity }}
                </p>
              </div>
              <p class="text-lg">{{ toRupiah(item.totalPrice) }}</p>
            </div>
            <div
              class="flex justify-between items-center my-3 text-xl font-semibold"
            >
              <p>TOTAL</p>
              <p>{{ toRupiah(total) }}</p>
            </div>
            <div class="flex justify-between items-center my-4">
              <div
                v-for="(person, id) in picList"
                :key="id"
                class="flex items-center space-x-1"
              >
                <input
                  class="w-4 h-4"
                  type="radio"
                  v-model="pic"
                  :value="person.value"
                />
                <label class="text-md font-semibold">{{ person.name }}</label>
              </div>
            </div>
            <div>
              <button
                class="bg-blue-500 w-full py-3 text-lg font-semibold text-white rounded-md disabled:opacity-50"
                @click="submitData"
                :disabled="isLoading || checkoutMenus.length === 0"
              >
                <div v-if="isLoading">
                  <i class="fa fa-circle-o-notch fa-spin"></i>
                  Loading...
                </div>
                <div v-else>Submit</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50"
      @click="onClose"
    ></div>
  </div>
</template>

<script>
import { toRupiah } from "~/helper/currency";
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    checkoutMenus: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      pic: "Ihsan",
      picList: [
        {
          name: "Ihsan",
          value: "Ihsan",
        },
        {
          name: "Bembeng",
          value: "Bembeng",
        },
        {
          name: "Ibnu",
          value: "Ibnu",
        },
        {
          name: "Faishal",
          value: "Faishal",
        },
      ],
    };
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    },
    submitData() {
      this.$emit("submitData", this.checkoutMenus, this.pic);
    },
    toRupiah,
  },
};
</script>

<style>
.modal-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 95%;
  max-width: 95%;
  min-width: 20rem;
}
.scroll-bar::-webkit-scrollbar {
  display: none;
}
.scroll-bar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
