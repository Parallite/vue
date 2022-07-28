<template>
  <div
    class="about_text-container"
    :style="{ backgroundImage: 'url(' + bgImg + ')' }"
  >
    <div class="about_text-wrp-glass">
      <div class="about_text"></div>
    </div>
  </div>
</template>

<script>
import bgImg from "@/assets/img/man.jpg";

export default {
  name: "AboutProject",
  data() {
    return {
      text: `Welcome to my application page. This application was developed by me when I first met the Vue CLI v2. The style was also designed by me. I hope you like it`,
      bgImg: bgImg,
    };
  },
  methods: {
    textAnimation(selector, text) {
      const textEl = document.querySelector(selector);
      for (let i = 0; i < text.length; i++) {
        let div = document.createElement("div");
        div.innerText = text[i];
        setTimeout(() => {
          if (text[i] === " ") {
            textEl.insertAdjacentHTML(
              "beforeend",
              "<div style='width: 20px;'></div>"
            );
          }
          textEl.append(div);
          div.animate(
            [
              { transform: "translateY(-15px)" },
              { transform: "translateY(0px)" },
            ],
            { duration: 90, iterations: 1 }
          );
        }, i * 100);
      }
    },
  },
  mounted() {
    this.textAnimation(".about_text", this.text);
  },
};
</script>

<style scoped>
.about_text-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.about_text-wrp-glass {
  margin: 20px 0 20px 0;
  padding: 30px 30px 30px 30px;
  width: 70%;
  min-height: 40%;
  background: rgba(255, 255, 255, 0.71);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.9px);
  -webkit-backdrop-filter: blur(6.9px);
  border: 1px solid rgba(255, 255, 255, 0.26);
  animation: box-shadow-animate 3s linear infinite;
  box-sizing: border-box;
}

.about_text {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
  font-size: 25px;
}

@keyframes box-shadow-animate {
  0% {
    box-shadow: 0 4px 30px rgba(255, 85, 0, 0.1);
    -moz-box-shadow: 0 4px 30px rgba(255, 85, 0, 0.1);
  }

  50% {
    box-shadow: 0 4px 30px rgba(255, 85, 0, 0.8);
    -moz-box-shadow: 0 4px 30px rgba(255, 85, 0, 0.8);
  }
  100% {
    box-shadow: 0 4px 30px rgba(255, 85, 0, 0.1);
    -moz-box-shadow: 0 4px 30px rgba(255, 85, 0, 0.1);
  }
}
</style>