<template>
  <div class="bg-blue-100 pt-14">
    <div class="py-8 px-4">
      <h1 class="text-center text-3xl font-bold mb-4">Atur Menu</h1>
      <div v-if="!isLoadingMenu">
        <div>
          <h3 class="text-xl font-bold mb-2">Packets</h3>
          <div v-for="(packet, id) in packetMenus" :key="id">
            <div
              class="flex justify-between space-x-3 items-center border-b-2 border-dashed border-yellow-600 p-2"
            >
              <div>
                <p>{{ packet.name }}</p>
                <p class="text-sm font-semibold text-gray-600">
                  {{ toRupiah(packet.price) }} |
                  <span v-if="packet.isAvailable">Ready</span>
                  <span v-else>Kosong</span>
                  <span v-if="packet.isNewMenu">| New</span>
                  <span v-if="packet.isBest">| Best-seller</span>
                </p>
              </div>
              <div class="flex space-x-3 items-center">
                <button @click="onClickEditMenu(packet)">
                  <font-awesome-icon
                    :icon="['fa', 'pen-to-square']"
                    class="text-yellow-400 w-6 h-6"
                  />
                </button>
                <button @click="onClickRemoveMenu(packet)">
                  <font-awesome-icon
                    :icon="['fa', 'trash-can']"
                    class="text-red-400 w-6 h-6"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-bold mt-4 mb-2">Foods</h3>
          <div v-for="(food, id) in foodMenus" :key="id">
            <div
              class="flex justify-between space-x-3 items-center border-b-2 border-dashed border-yellow-600 p-2"
            >
              <div>
                <p>{{ food.name }}</p>
                <p class="text-sm font-semibold text-gray-600">
                  {{ toRupiah(food.price) }} |
                  <span v-if="food.isAvailable">Ready</span>
                  <span v-else>Kosong</span>
                  <span v-if="food.isNewMenu">| New</span>
                  <span v-if="food.isBest">| Best-seller</span>
                </p>
              </div>
              <div class="flex space-x-3 items-center">
                <button @click="onClickEditMenu(food)">
                  <font-awesome-icon
                    :icon="['fa', 'pen-to-square']"
                    class="text-yellow-400 w-6 h-6"
                  />
                </button>
                <button @click="onClickRemoveMenu(food)">
                  <font-awesome-icon
                    :icon="['fa', 'trash-can']"
                    class="text-red-400 w-6 h-6"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-bold mt-4 mb-2">Drinks</h3>
          <div v-for="(drink, id) in drinkMenus" :key="id">
            <div
              class="flex justify-between items-center border-b-2 border-dashed border-yellow-600 p-2"
            >
              <div>
                <p>{{ drink.name }}</p>
                <p class="text-sm font-semibold text-gray-600">
                  {{ toRupiah(drink.price) }} |
                  <span v-if="drink.isAvailable">Ready</span>
                  <span v-else>Kosong</span>
                  <span v-if="drink.isNewMenu">| New</span>
                  <span v-if="drink.isBest">| Best-seller</span>
                </p>
              </div>
              <div class="flex space-x-3 items-center">
                <button @click="onClickEditMenu(drink)">
                  <font-awesome-icon
                    :icon="['fa', 'pen-to-square']"
                    class="text-yellow-400 w-6 h-6"
                  />
                </button>
                <button @click="onClickRemoveMenu(drink)">
                  <font-awesome-icon
                    :icon="['fa', 'trash-can']"
                    class="text-red-400 w-6 h-6"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="w-full h-screen pt-8 px-6">
        <div class="w-full animate-pulse flex justify-between items-center">
          <div class="animate-pulse w-full">
            <div class="rounded-full w-3/4 h-4 bg-slate-400"></div>
            <div class="mt-2 flex space-x-2">
              <div class="rounded-full w-10 h-4 bg-slate-400"></div>
              <div class="rounded-full w-1/3 h-4 bg-slate-400"></div>
            </div>
          </div>
          <div class="rounded-full w-12 h-10 bg-slate-400"></div>
        </div>
        <div
          class="w-full animate-pulse flex justify-between items-center mt-6"
        >
          <div class="animate-pulse w-full">
            <div class="rounded-full w-3/4 h-4 bg-slate-400"></div>
            <div class="mt-2 flex space-x-2">
              <div class="rounded-full w-10 h-4 bg-slate-400"></div>
              <div class="rounded-full w-1/3 h-4 bg-slate-400"></div>
            </div>
          </div>
          <div class="rounded-full w-12 h-10 bg-slate-400"></div>
        </div>
      </div>
    </div>
    <div class="sticky bottom-0 bg-white rounded-t-2xl">
      <div class="p-2 pt-6">
        <button
          class="bg-green-500 w-full py-3 text-lg font-semibold text-white rounded-md"
          @click="onClickCreateMenu"
        >
          Tambah Menu
        </button>
      </div>
    </div>
    <ModalCreate
      :is-show="isShowModalCreate"
      :is-loading="isLoadingCreate"
      @onClose="onCloseModalCreate"
      @createMenu="createMenu"
    />
    <ModalEdit
      :is-show="isShowModalEdit"
      :is-loading="isLoadingEdit"
      :data-menu="selectedMenu"
      @onClose="onCloseModalEdit"
      @editMenu="editMenu"
    />
    <ModalRemove
      :is-show="isShowModalRemove"
      :detail-menu="selectedMenu"
      :is-loading="isLoadingRemove"
      @onClose="onCloseModalRemove"
      @removeMenu="removeMenu"
    />
  </div>
</template>

<script>
import axios from "axios";
import ModalCreate from "../components/mollecules/modal-create.vue";
import ModalEdit from "../components/mollecules/modal-edit.vue";
import ModalRemove from "../components/mollecules/modal-remove.vue";
import { toRupiah } from "../helper/currency";
export default {
  name: "IndexPage",
  components: {
    ModalRemove,
    ModalCreate,
    ModalEdit,
  },
  data() {
    return {
      total: 0,
      allMenus: [],
      packetMenus: [],
      foodMenus: [],
      drinkMenus: [],
      selectedMenu: {},
      isShowModalCreate: false,
      isShowModalEdit: false,
      isShowModalRemove: false,
      isShowModalCheckout: false,
      isLoadingSubmit: false,
      isLoadingCreate: false,
      isLoadingEdit: false,
      isLoadingRemove: false,
      isLoadingMenu: true,
    };
  },
  mounted() {
    this.getAllMenus();
  },
  methods: {
    getAllMenus() {
      this.isLoadingMenu = true;
      axios
        .get("https://digicafe-api.herokuapp.com/api/menus")
        .then((response) => {
          this.allMenus = response.data;

          // Setting packet menus
          this.packetMenus = this.allMenus.filter((el) => {
            return el.type === 3;
          });

          // Setting Food Menus
          this.foodMenus = this.allMenus
            .filter((el) => {
              return el.type === 1;
            })
            .sort((a, b) => {
              return a.name.localeCompare(b.name);
            });

          // Setting Drink Menus
          this.drinkMenus = this.allMenus
            .filter((el) => {
              return el.type === 2;
            })
            .sort((a, b) => {
              return a.name.localeCompare(b.name);
            });

          this.isLoadingMenu = false;
        })
        .catch((error) => {
          console.log(error);
          this.isLoadingMenu = false;
        });
    },
    onClickCreateMenu() {
      this.isShowModalCreate = true;
    },
    onCloseModalCreate() {
      this.isShowModalCreate = false;
    },
    createMenu(params) {
      this.isLoadingCreate = true;
      axios
        .post("https://digicafe-api.herokuapp.com/api/menus", params)
        .then((response) => {
          this.isShowModalCreate = false;
          this.isLoadingCreate = false;
          this.getAllMenus();
        })
        .catch((error) => {
          console.log(error);
          this.isShowModalCreate = false;
          this.isLoadingCreate = false;
        });
    },
    onClickEditMenu(menu) {
      this.selectedMenu = menu;
      this.isShowModalEdit = true;
    },
    onCloseModalEdit() {
      this.isShowModalEdit = false;
    },
    editMenu(params) {
      this.isLoadingEdit = true;
      axios
        .put(
          `https://digicafe-api.herokuapp.com/api/menus/${params.id}`,
          params
        )
        .then((response) => {
          this.isShowModalEdit = false;
          this.isLoadingEdit = false;
          this.getAllMenus();
        })
        .catch((error) => {
          console.log(error);
          this.isShowModalEdit = false;
          this.isLoadingEdit = false;
        });
    },
    onClickRemoveMenu(menu) {
      this.selectedMenu = menu;
      this.isShowModalRemove = true;
    },
    onCloseModalRemove() {
      this.isShowModalRemove = false;
    },
    removeMenu(menu) {
      this.isLoadingRemove = true;
      axios
        .delete(`https://digicafe-api.herokuapp.com/api/menus/${menu.id}`)
        .then((response) => {
          this.isShowModalRemove = false;
          this.isLoadingRemove = false;
          this.getAllMenus();
        })
        .catch((error) => {
          console.log(error);
          this.isShowModalRemove = false;
          this.isLoadingRemove = false;
        });
    },
    toRupiah,
  },
};
</script>
