<template>
  <div>
    <div class="menu_header">
      <div class="menu_header-wellcome">
        <p>Usuário: {{ nameUser }}</p>
      </div>
      <div class="menu_header-close">
        <span @click="logoff">Sair</span>
      </div>
    </div>
    <div class="menu-side">
      <div class="profile_image">
        <img src="../../assets/woman_profile.jpeg" width="100px" />
      </div>
    </div>
    <el-row>
      <el-col :span="19">
        <Patient />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Patient from "../../components/Patient.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      nameUser: "",
    };
  },
  components: {
    Patient,
  },
  mounted() {
    const name = localStorage.getItem("nameUser");
    // Primeira letra do nome maiúscula
    this.nameUser =  name[0].toUpperCase() + name.substring(1)
  },
  methods: {
    logoff() {
      this.$router.push({ name: "Sigin" });
    },
  },
};
</script>

<style scoped>
.menu_header {
  background: linear-gradient(118.62deg, #003368 19.38%, #0069c5 129.43%);
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 150px;
}
.menu_header-wellcome {
  padding-left: 300px;
  align-self: center;
  color: #fff;
  font-size: 1.5rem;
}
.menu_header-close {
  cursor: pointer;
  color: #fff;
  font-weight: 700;
}
.profile_image {
  padding-left: 20px;
}
.profile_image img {
  border-radius: 50%;
}
.menu-side {
  background: linear-gradient(118.62deg, #003368 19.38%, #0069c5 129.43%);
  width: 150px;
  height: 100%;
  position: fixed;
}
.el-row {
  display: flex;
  justify-content: center;
  margin: 80px;
}
</style>
