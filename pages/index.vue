<template>
  <div class="bg-blue-100 pt-14">
    <div class="p-8">
      <h1 class="text-center text-3xl font-bold mb-4">Kasir DigiCafe</h1>
      <div v-if="!isLoadingMenu">
        <div>
          <h3 class="text-xl font-bold mb-2">Packets</h3>
          <div v-for="(packet, id) in packetMenus" :key="id">
            <div
              class="flex justify-between items-center border-b-2 border-dashed border-yellow-600 p-2"
            >
              <p>{{ packet.name }}</p>
              <div class="flex space-x-3 items-center">
                <button
                  @click="minus(packet)"
                  :disabled="packet.quantity === 0"
                >
                  <font-awesome-icon
                    :icon="['fa', 'circle-minus']"
                    class="text-red-400 w-6 h-6"
                  />
                </button>
                <p>{{ packet.quantity }}</p>
                <button @click="plus(packet)">
                  <font-awesome-icon
                    :icon="['fa', 'circle-plus']"
                    class="text-green-400 w-6 h-6"
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
              class="flex justify-between items-center border-b-2 border-dashed border-yellow-600 p-2"
            >
              <p>{{ food.name }}</p>
              <div class="flex space-x-3 items-center">
                <button @click="minus(food)" :disabled="food.quantity === 0">
                  <font-awesome-icon
                    :icon="['fa', 'circle-minus']"
                    class="text-red-400 w-6 h-6"
                  />
                </button>
                <p>{{ food.quantity }}</p>
                <button @click="plus(food)">
                  <font-awesome-icon
                    :icon="['fa', 'circle-plus']"
                    class="text-green-400 w-6 h-6"
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
              <p>{{ drink.name }}</p>
              <div class="flex space-x-3 items-center">
                <button @click="minus(drink)" :disabled="drink.quantity === 0">
                  <font-awesome-icon
                    :icon="['fa', 'circle-minus']"
                    class="text-red-400 w-6 h-6"
                  />
                </button>
                <p>{{ drink.quantity }}</p>
                <button @click="plus(drink)">
                  <font-awesome-icon
                    :icon="['fa', 'circle-plus']"
                    class="text-green-400 w-6 h-6"
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
      <div
        class="pt-4 pb-2 px-6 flex justify-between items-center text-xl font-bold"
      >
        <p>TOTAL</p>
        <p>{{ toRupiah(total) }}</p>
      </div>
      <div class="p-2 pb-0">
        <button
          class="bg-red-500 w-full py-3 text-lg font-semibold text-white rounded-md"
          @click="reset"
        >
          Reset
        </button>
      </div>
      <div class="p-2">
        <button
          class="bg-blue-500 w-full py-3 text-lg font-semibold text-white rounded-md"
          @click="checkout"
        >
          Checkout
        </button>
      </div>
    </div>
    <ModalCheckout
      :is-show="isShowModalCheckout"
      :checkout-menus="checkoutItems"
      :total="total"
      :is-loading="isLoadingSubmit"
      @onClose="onCloseModalCheckout"
      @submitData="submitData"
    />
  </div>
</template>

<script>
import axios from "axios";
import ModalCheckout from "../components/mollecules/modal-checkout.vue";
import { toRupiah } from "../helper/currency";
export default {
  name: "IndexPage",
  components: {
    ModalCheckout,
  },
  data() {
    return {
      total: 0,
      allMenus: [],
      packetMenus: [],
      foodMenus: [],
      drinkMenus: [],
      checkoutItems: [],
      isShowModalCheckout: false,
      isLoadingSubmit: false,
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

          // Add quantity and total price
          this.packetMenus.forEach((el) => {
            el.quantity = 0;
            el.totalPrice = 0;
          });
          this.foodMenus.forEach((el) => {
            el.quantity = 0;
            el.totalPrice = 0;
          });
          this.drinkMenus.forEach((el) => {
            el.quantity = 0;
            el.totalPrice = 0;
          });
          this.isLoadingMenu = false;
        })
        .catch((error) => {
          console.log(error);
          this.isLoadingMenu = false;
        });
    },
    minus(item) {
      item.quantity--;
      item.totalPrice = item.price * item.quantity;
      this.calculate();
    },
    plus(item) {
      item.quantity++;
      item.totalPrice = item.price * item.quantity;
      this.calculate();
    },
    calculate() {
      const totalPacketPrice = this.packetMenus
        .map((item) => item.totalPrice)
        .reduce((prev, curr) => prev + curr, 0);
      const totalFoodPrice = this.foodMenus
        .map((item) => item.totalPrice)
        .reduce((prev, curr) => prev + curr, 0);
      const totalDrinkPrice = this.drinkMenus
        .map((item) => item.totalPrice)
        .reduce((prev, curr) => prev + curr, 0);
      this.total = totalPacketPrice + totalFoodPrice + totalDrinkPrice;
    },
    reset() {
      this.packetMenus.forEach((el) => {
        el.quantity = 0;
        el.totalPrice = 0;
      });
      this.foodMenus.forEach((el) => {
        el.quantity = 0;
        el.totalPrice = 0;
      });
      this.drinkMenus.forEach((el) => {
        el.quantity = 0;
        el.totalPrice = 0;
      });
      this.total = 0;
    },
    checkout() {
      const allMenu = this.packetMenus
        .concat(this.foodMenus)
        .concat(this.drinkMenus);
      this.checkoutItems = allMenu.filter((item) => item.quantity > 0);
      this.isShowModalCheckout = true;
    },
    onCloseModalCheckout() {
      this.isShowModalCheckout = false;
    },
    submitData(data, pic) {
      this.isLoadingSubmit = true;
      data.forEach((el) => {
        el.pic = pic;
      });
      const scriptUrl =
        "https://script.google.com/macros/s/AKfycbyQRHwlWM_dvlXiMNX2EYKX3HkGSmN6kh13efYk_B_gYjBhTJPoW5QNseS9w_SwaSAu/exec";

      const fetches = [];
      let isSuccess = true;
      data.forEach((el) => {
        const newForm = new FormData();
        const today = new Date();

        const date = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const fullDate = `${date}/${month}/${year}`;

        const hour = today.getHours();
        const minute = today.getMinutes();
        const time = `${hour}:${minute}`;

        newForm.append("Tanggal", fullDate);
        newForm.append("Jam", time);
        newForm.append("Nama", el.name);
        newForm.append("Harga", el.price);
        newForm.append("Jumlah", el.quantity);
        newForm.append("Total", el.totalPrice);
        newForm.append("PIC", el.pic);

        fetches.push(
          fetch(scriptUrl, {
            method: "POST",
            body: newForm,
            changeOrigin: true,
          }).catch((error) => {
            console.error("Error!", error.message);
            alert(error.message);
            isSuccess = false;
          })
        );
      });
      Promise.all(fetches).then((res) => {
        this.isShowModalCheckout = false;
        this.isLoadingSubmit = false;
        this.reset();
      });
    },
    toRupiah,
  },
};
</script>
