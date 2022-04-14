<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <hr>
    <input class="input" type="text" v-model.number="operand1">
    <input class="input" type="text" v-model.number="operand2">
    <hr>
    <button class="btn" @click="sum">+</button>
    <button class="btn" @click="sub">-</button>
    <button class="btn" @click="exponentation">^</button>
    <button class="btn" @click="divide">/</button>
    <button class="btn" @click="multiply">*</button>
    <hr>
    <button class="btn" @click="result = 0, checkZero = false">reset</button>
    <p>Результат: {{ result }}</p>
    <p class="ready" v-if="!checkZero">Готово к работе</p>
    <p class="error" v-else>На ноль делить нельзя! Повторите "/" с корректными данными или нажмите "reset"</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      operand1: 0,
      operand2: 0,
      result: 0,
      checkZero: false
    }
  },
  methods: {
    sum() {
    this.result = this.operand1 + this.operand2;
    },
    sub() {
      this.result = this.operand1 - this.operand2;
    },
    exponentation() {
      this.result = this.operand1;
      for (let i = 1; i < this.operand2; i++) {
        this.result = this.operand1 * this.result;
      }
      return this.result
    },
    divide() {
      if (this.operand2 == 0) {
        this.checkZero = true;
      } else {
        this.result = this.operand1 / this.operand2;
        this.checkZero = false;
      }
    },
    multiply() {
      this.result = this.operand1 * this.operand2;
    }
  }
}
</script>

<style scoped>
  .btn {
    background-color: darkseagreen;
    margin: 5px;
    width: 50px;
  }

  .input {
    margin: 0 10px 0 10px;
  }

  .ready {
    color: darkgreen;
  }

  .error {
    border: 2px solid #8b0000;
    color: red;
  }
</style>
