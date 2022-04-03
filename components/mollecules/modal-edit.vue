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
            <h3 class="text-2xl font-bold text-center mb-6">Edit Menu</h3>
            <div>
              <input
                v-model="newMenu.name"
                class="border border-gray-300 w-full py-3 px-4 rounded-md"
                type="text"
                placeholder="Nama menu.."
              />
            </div>
            <div class="flex space-x-2 items-center my-3">
              <label class="w-1/2">Jenis Menu:</label>
              <select
                v-model="newMenu.type"
                class="border border-gray-300 w-full py-3 px-4 rounded-md"
              >
                <option :value="1">Makanan</option>
                <option :value="2">Minuman</option>
                <option :value="3">Paket</option>
              </select>
            </div>
            <div class="flex space-x-3 items-center mt-2">
              <p class="text-xl font-semibold">Rp</p>
              <input
                v-model="newMenu.price"
                class="border border-gray-300 w-full py-3 px-4 rounded-md"
                type="text"
                placeholder="0"
              />
            </div>
            <div class="my-3">
              <div class="flex space-x-2 items-center mb-2">
                <input
                  type="checkbox"
                  class="w-4 h-4 m-0"
                  id="is-available"
                  v-model="newMenu.isAvailable"
                />
                <label for="is-available">Tersedia</label><br />
              </div>
              <div class="flex space-x-2 items-center mb-2">
                <input
                  type="checkbox"
                  class="w-4 h-4 m-0"
                  id="is-new"
                  v-model="newMenu.isNewMenu"
                />
                <label for="is-new">Menu Baru</label><br />
              </div>
              <div class="flex space-x-2 items-center mb-2">
                <input
                  type="checkbox"
                  class="w-4 h-4 m-0"
                  id="is-best"
                  v-model="newMenu.isBest"
                />
                <label for="is-best">Best Seller</label><br />
              </div>
            </div>
            <div class="mt-4">
              <button
                class="bg-blue-500 w-full py-3 text-lg font-semibold text-white rounded-md disabled:opacity-50"
                @click="editMenu"
                :disabled="isLoading || !newMenu.name || !newMenu.price"
              >
                <div v-if="isLoading">
                  <i class="fa fa-circle-o-notch fa-spin"></i>
                  Loading...
                </div>
                <div v-else>Edit</div>
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
    isLoading: {
      type: Boolean,
      default: false,
    },
    dataMenu: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      newMenuTemp: {
        id: "",
        name: "",
        type: 1,
        price: null,
        isAvailable: true,
        isNewMenu: true,
        isBest: false,
      },
      newMenu: {
        id: "",
        name: "",
        type: 1,
        price: null,
        isAvailable: true,
        isNewMenu: true,
        isBest: false,
      },
      isDataValid: true,
    };
  },
  watch: {
    dataMenu() {
      this.getDataMenu();
    },
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    },
    editMenu() {
      if (!this.newMenu.name || !this.newMenu.price) {
        this.isDataValid = false;
      } else {
        this.isDataValid = true;
      }
      if (this.isDataValid) {
        this.newMenu.price = parseInt(this.newMenu.price);
        this.$emit("editMenu", this.newMenu);
        this.newMenu = this.newMenuTemp;
      }
    },
    getDataMenu() {
      const data = this.dataMenu;
      this.newMenu = {
        id: data.id,
        name: data.name,
        type: data.type,
        price: data.price,
        isAvailable: data.isAvailable,
        isNewMenu: data.isNewMenu,
        isBest: data.isBest,
      };
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
