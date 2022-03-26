<template>
  <div class="bg-blue-100 pt-14">
    <div class="p-8">
      <h1 class="text-center text-3xl font-bold mb-4">Kasir DigiCafe</h1>
      <div>
        <h3 class="text-xl font-bold mb-2">Foods</h3>
        <div v-for="(food, id) in foods" :key="id">
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
        <div v-for="(drink, id) in drinks" :key="id">
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
import ModalCheckout from "../components/mollecules/modal-checkout.vue";
import { foods, drinks } from "../constants/menu";
import { toRupiah } from "../helper/currency";
export default {
  name: "IndexPage",
  components: {
    ModalCheckout,
  },
  data() {
    return {
      foods,
      drinks,
      total: 0,
      checkoutItems: [],
      isShowModalCheckout: false,
      isLoadingSubmit: false,
    };
  },
  methods: {
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
      const totalFoodPrice = this.foods
        .map((item) => item.totalPrice)
        .reduce((prev, curr) => prev + curr, 0);
      const totalDrinkPrice = this.drinks
        .map((item) => item.totalPrice)
        .reduce((prev, curr) => prev + curr, 0);
      this.total = totalFoodPrice + totalDrinkPrice;
    },
    reset() {
      this.foods.forEach((el) => {
        el.quantity = 0;
        el.totalPrice = 0;
      });
      this.drinks.forEach((el) => {
        el.quantity = 0;
        el.totalPrice = 0;
      });
      this.total = 0;
    },
    checkout() {
      const allMenu = this.foods.concat(this.drinks);
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
        const hour = today.getHours();
        const minute = today.getMinutes();
        const time = `${hour}:${minute}`;

        newForm.append("Tanggal", today.toDateString());
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
