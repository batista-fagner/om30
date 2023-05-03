<template>
  <el-row>
    <el-col :span="12" class="signin_left">
      <div class="signin_sus">
        <img src="../../assets/sus.svg" width="400px" />
        <p class="title_login">Sistema de cadastro de saúde</p>
      </div>
      <div class="signin_logo-gov">
        <img src="../../assets/logo-govbr.svg" width="100px" />
      </div>
    </el-col>
    <el-col :span="12" class="signin_right">
      <div>
        <span label-position="top" class="sigin_text_input"
          >Digite o seu nome</span
        >
        <el-input
          placeholder="digite seu nome aqui"
          class="input-right"
          v-model="name"
          @input="nameInput"
        ></el-input>
        <el-button type="primary" :disabled="isActiveButton" class="sigin_button" @click="onSignin"
          >Entrar</el-button
        >
      </div>
    </el-col>
  </el-row>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Sigin",
  data() {
    return {
      name: "",
      isActiveButton: true
    };
  },
  methods: {
    onSignin() {
      if (this.name) {
        localStorage.setItem("nameUser", this.name)
        this.$router.push({ name: "Home" });
      }
    },

    nameInput() {
      this.isActiveButton = this.name ? false : true
    }
  },
};
</script>

<style scoped>
.signin_sus {
  position: absolute;
  top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sigin_button {
  margin-top: 20px;
  width: 92%;
}
.sigin_text_input {
  font-size: 1.37rem;
  color: #fff;
  margin-bottom: 20px;
}
.title_login {
  padding-top: 150px;
  font-size: 2.62rem;
  color: #fff;
  font-weight: 700;
}
.signin_logo-gov {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 98%;
}
.el-row {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.signin_left {
  position: relative;
  display: flex;
  justify-content: center;
  background-color: rgba(59, 130, 246, 0.5);
  height: 100vh;
}

.signin_right {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
  background: radial-gradient(
      389.07% 170.2% at 380.16% -72.26%,
      rgba(255, 255, 255, 0.1) 21.58%,
      rgba(255, 255, 255, 0) 100%
    ),
    radial-gradient(
      285.83% 160.31% at 100% 13.66%,
      rgba(202, 230, 252, 0) 0%,
      rgba(202, 230, 252, 0) 51.74%,
      rgba(202, 230, 252, 0.04) 51.76%
    ),
    radial-gradient(
      208.91% 177.84% at 26.92% -25.46%,
      rgba(202, 230, 252, 0) 0%,
      rgba(202, 230, 252, 0) 60.7%,
      rgba(202, 230, 252, 0.02) 60.76%
    ),
    linear-gradient(118.62deg, #003368 19.38%, #0069c5 129.43%);
}

.input-right {
  margin-top: 10px;
  max-width: 400px;
}
</style>
