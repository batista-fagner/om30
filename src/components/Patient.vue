<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.patientName.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="Nome" prop="patientName"> </el-table-column>
      <el-table-column label="Data nascimento" prop="date_birth">
      </el-table-column>
      <el-table-column label="Cpf" prop="cpf"> </el-table-column>
      <el-table-column label="Cns" prop="cns"> </el-table-column>
      <el-table-column label="Endereço" prop="logradouro"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-button type="success" @click="openModal">Adicionar Paciente</el-button>
    <ModalPatient
      :dataTable="item"
      :handleModal.sync="dialogEdit"
      :openNew="openNew"
      @successOperation="success($event)"
    />
  </div>
</template>

<script>
import { api } from "../service/api";
import ModalPatient from "../components/modalPatient.vue";
import moment from "moment";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Patient",
  components: {
    ModalPatient,
  },
  data() {
    return {
      tableData: [],
      openNew: false,
      search: "",
      dialogEdit: false,
      centerDialogVisible: false,
      item: {},
    };
  },
  async mounted() {
    await this.loadPatient();
  },
  methods: {
    async loadPatient() {
      const resLoadPatient = await api.get('/patients');
      if (resLoadPatient.status === 200) {
        console.log(resLoadPatient.data);

        const newTableDateFormated = resLoadPatient.data.map((element) => {
          const data = moment(element.date_birth);
          return { ...element, date_birth: data.format("DD/MM/YYYY") };
        });
        this.tableData = newTableDateFormated;
      }
    },

    async removePatient(idPatient) {
      const respRemove = await api.delete(`patients/${idPatient}`)
      if (respRemove.status === 200) {
        // Colocar para abrir uma modal de confirmacao
        this.loadPatient();
        this.$notify({
          title: "Success",
          message: "Patiente removido com sucesso!",
          type: "success",
        });
      }
    },

    handleEdit(index, row) {
      this.item = row;
      this.dialogEdit = true;
      this.openNew = false;
    },

    handleDelete(index, row) {
      console.log('remover')
      this.removePatient(row.id);
    },

    openModal() {
      this.dialogEdit = true;
      this.openNew = true;
    },

    success(statusSucess) {
      if (statusSucess) {
        this.loadPatient();
      }
    },
  },
};
</script>

<style>
.el-table {
  border: 1px solid #ebeef5;
}
</style>
