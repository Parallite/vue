<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <hr />
    <div class="calculate">
      <input class="input" type="text" v-model.number="operand1" />
      <input class="input" type="text" v-model.number="operand2" />
      <p>Результат: {{ result }}</p>
      <hr />
      <div>
        <button
          class="btn"
          :title="operand"
          v-for="operand in operands"
          @click="calculate(operand)"
          :key="operand"
        >
          {{ operand }}
        </button>
      </div>
      <hr />
      <button class="btn" @click="(result = 0), (error = '')">reset</button>
      <p class="error" v-if="error.length > 0">На ноль делить нельзя!</p>
    </div>
    <div class="keyboard">
      <div>
        <input
          class="inputKeyboard"
          type="checkbox"
          name="keyboard"
          id="keyboard"
          v-model="checked"
        />
        <label for="keyboard">Keyboard</label>
      </div>
      <div v-if="checked">
        <button
          class="keyboard-btn"
          v-for="btn in keyboardBtns"
          @click="addToOperand(btn)"
          :key="btn"
        >
          {{ btn }}
        </button>
        <button class="keyboard-btn" @click="removeOperand">Delete</button>
        <p>Choose your operand:</p>
        <div class="wrp-radio">
          <div>
            <input
              type="radio"
              name="operands"
              id="operand1"
              value="first"
              v-model="picked"
              checked
            />
            <label for="operand1">First operand</label>
          </div>
          <div>
            <input
              type="radio"
              name="operands"
              id="operand2"
              value="second"
              v-model="picked"
            />
            <label for="operand2">Second operand</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      operand1: 0,
      operand2: 0,
      checked: false,
      picked: "first",
      result: 0,
      error: "",
      operands: ["+", "-", "^", "/", "*"],
      keyboardBtns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
  methods: {
    calculate(operation = "+") {
      this.error = "";
      switch (operation) {
        case "+":
          this.sum();
          break;
        case "-":
          this.sub();
          break;
        case "^":
          this.exponentation();
          break;
        case "/":
          this.divide();
          break;
        case "*":
          this.multiply();
          break;
      }
    },
    addToOperand(btn) {
      if (this.picked == "second") {
        this.operand2 = +(String(this.operand2) + btn);
      } else {
        this.operand1 = +(String(this.operand1) + btn);
      }
    },
    removeOperand() {
      if (this.picked == "second") {
        this.operand2 = Number(String(this.operand2).replace(/[0-9]\b/, ""));
      } else {
        this.operand1 = Number(String(this.operand1).replace(/[0-9]\b/, ""));
      }
    },
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
      return this.result;
    },
    divide() {
      if (this.operand2 == 0) {
        this.error = "На ноль делить нельзя!";
        return;
      } else {
        this.result = this.operand1 / this.operand2;
      }
    },
    multiply() {
      this.result = this.operand1 * this.operand2;
    },
  },
};
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

.inputKeyboard {
  margin: 15px 0 15px 0;
}

.keyboard-btn {
  background-color: azure;
}

.wrp-radio {
  display: flex;
  justify-content: center;
}
</style>
