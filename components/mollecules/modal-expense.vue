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
            <h3 class="text-2xl font-bold text-center mb-6">Tambah Belanja</h3>
            <div>
              <input
                v-model="newExpense.name"
                class="border border-gray-300 w-full py-3 px-4 rounded-md"
                type="text"
                placeholder="Nama item.."
              />
            </div>
            <div>
              <textarea
                v-model="newExpense.desc"
                class="border border-gray-300 w-full py-3 px-4 rounded-md mt-3"
                rows="3"
                placeholder="Keterangan.."
              ></textarea>
            </div>
            <div class="flex space-x-3 items-center mt-2">
              <p class="text-xl font-semibold">Rp</p>
              <input
                v-model="newExpense.totalPrice"
                class="border border-gray-300 w-full py-3 px-4 rounded-md"
                type="text"
                placeholder="0"
              />
            </div>
            <div class="mt-4">
              <button
                class="bg-blue-500 w-full py-3 text-lg font-semibold text-white rounded-md disabled:opacity-50"
                :disabled="!newExpense.name || !newExpense.totalPrice"
                @click="submitData"
              >
                Tambah
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
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newExpense: {
        name: "",
        desc: "",
        totalPrice: null,
      },
    };
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    },
    submitData() {
      this.newExpense.desc = this.newExpense.desc ? this.newExpense.desc : "-";
      this.$emit("submitData", this.newExpense);
      this.newExpense = {};
    },
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
