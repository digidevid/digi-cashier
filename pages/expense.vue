<template>
  <div class="bg-blue-100 p-4 pt-20 pb-52 min-h-screen">
    <h3 class="text-center text-3xl font-bold mb-4">Pengeluaran</h3>
    <div class="flex justify-between items-center my-2">
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
    <div
      v-for="(item, id) in expenseList"
      :key="id"
      class="flex justify-between items-center border-b-2 border-gray-600 border-dashed pb-2 space-y-1 mt-2"
    >
      <div>
        <p>{{ item.name }}</p>
        <p class="text-sm">{{ item.desc }}</p>
      </div>
      <div class="flex items-center space-x-3">
        <p class="text-lg">{{ toRupiah(item.totalPrice) }}</p>
        <button @click="minus(id)">
          <font-awesome-icon
            :icon="['fa', 'circle-minus']"
            class="text-red-400 w-6 h-6"
          />
        </button>
      </div>
    </div>
    <div class="fixed bottom-0 left-0 bg-white rounded-t-2xl w-full px-2 pb-2">
      <div
        class="flex justify-between items-center my-3 text-xl font-bold px-4"
      >
        <p>TOTAL</p>
        <p>{{ toRupiah(total) }}</p>
      </div>
      <div>
        <button
          class="bg-blue-500 w-full py-3 text-lg font-semibold text-white rounded-md disabled:opacity-50"
          @click="submitData"
          :disabled="isLoading || expenseList.length === 0 || !pic"
        >
          <div v-if="isLoading">
            <i class="fa fa-circle-o-notch fa-spin"></i>
            Loading...
          </div>
          <div v-else>Submit</div>
        </button>
      </div>
      <div class="w-full flex justify-between space-x-3 items-center mt-2">
        <button
          class="bg-red-500 w-full py-3 text-lg font-semibold text-white rounded-md disabled:opacity-50"
          @click="reset"
        >
          Reset
        </button>
        <button class="mt-1" @click="plus">
          <font-awesome-icon
            :icon="['fa', 'circle-plus']"
            class="text-green-400 w-12 h-12"
          />
        </button>
      </div>
    </div>
    <ModalExpense
      :is-show="isShowModalExpense"
      @onClose="onCloseModalExpense"
      @submitData="addExpense"
    />
  </div>
</template>

<script>
import ModalExpense from "../components/mollecules/modal-expense.vue";
import { toRupiah } from "../helper/currency";
export default {
  components: {
    ModalExpense,
  },
  data() {
    return {
      expenseList: [],
      total: 0,
      isShowModalExpense: false,
      isLoading: false,
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
      pic: "Ihsan",
    };
  },
  methods: {
    onCloseModalExpense() {
      this.isShowModalExpense = false;
    },
    minus(id) {
      this.expenseList.splice(id, 1);
      this.calculate();
    },
    plus() {
      this.isShowModalExpense = true;
    },
    reset() {
      this.expenseList = [];
      this.total = 0;
    },
    calculate() {
      this.total = this.expenseList
        .map((item) => parseInt(item.totalPrice))
        .reduce((prev, curr) => prev + curr, 0);
    },
    addExpense(data) {
      this.expenseList.push(data);
      this.calculate();
      this.isShowModalExpense = false;
    },
    submitData() {
      this.isLoading = true;
      this.expenseList.forEach((el) => {
        el.pic = this.pic;
      });
      const scriptUrl =
        "https://script.google.com/macros/s/AKfycbzQ4VQPIvRMv5sYz1QPkjabkzvr6zPgoaYpq4QG0tHuuWSoNzc3zGO46IG4CyJ-8TiR/exec";
      const fetches = [];
      let isSuccess = true;
      this.expenseList.forEach((el) => {
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
        newForm.append("Keterangan", el.desc);
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
        this.isLoading = false;
        this.reset();
      });
    },
    toRupiah,
  },
};
</script>

<style></style>
