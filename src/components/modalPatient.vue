<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <el-dialog
      title="Infome os dados do Paciente"
      :visible.sync="handleModal"
      width="30%"
      center
      @close="handleClose"
    >
      <el-row :gutter="20">
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
          label-position="top"
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-col :span="24">
            <el-form-item label="Digite seu nome" prop="patientName">
              <el-input v-model="form.patientName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Digite o nome da mãe" prop="motherName">
              <el-input v-model="form.motherName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="Digite seu Cpf"
              style="position: relative"
              prop="cpf"
            >
              <el-input v-model="form.cpf" @input="onCpfInput"></el-input>
              <p v-if="validateCep" style="position: absolute; color: red">
                Cep inválido!
              </p>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Digite seu Cns" prop="cns">
              <el-input v-model="form.cns"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Data de aniversário" prop="date_birth">
              <el-date-picker
                style="width: 100%"
                v-model="form.date_birth"
                type="date"
                placeholder="Pick a day"
              >
              </el-date-picker>
              <!-- <el-input v-model="form.date_birth"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Digite seu cep" prop="cep">
              <el-input
                v-model="form.cep"
                @input="onCepInput"
                prop="cep"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Estado" prop="">
              <el-input v-model="form.uf"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Cidade" prop="city">
              <el-input v-model="form.city"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Bairro" prop="bairro">
              <el-input v-model="form.bairro"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="Rua" prop="logradouro">
              <el-input v-model="form.logradouro"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button
          type="primary"
          @click="submitForm('form')"
          :loading="isLoading"
          >Cadastrar</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { api } from "../service/api";
import { validatePatient } from "../utils/validateRules";
import { validaCPF } from "../utils/validateCpf";
import moment from "moment";
export default {
  name: "ModalPatient",
  props: {
    handleModal: Boolean,
    dataTable: Object,
    openNew: Boolean,
  },
  data() {
    return {
      isLoading: false,
      idPatient: Number,
      rules: validatePatient,
      validateCep: false,
      form: {
        patientName: "",
        motherName: "",
        date_birth: "",
        cpf: "",
        cns: "",
        cep: "",
        uf: "",
        city: "",
        logradouro: "",
        bairro: "",
      },
    };
  },
  methods: {
    handleClose() {
      this.$emit("update:handleModal", false);
    },

    loadPatiensEdit() {
      const { id, patientName, motherName, date_birth, cpf, cns, cep } =
        this.dataTable;

      this.idPatient = id;

      this.form.patientName = patientName;
      this.form.motherName = motherName;
      this.form.date_birth = date_birth;
      this.form.cpf = cpf;
      this.form.cns = cns;
      this.form.cep = cep;
    },

    async getAddressCep(cep) {
      const respCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (respCep.status === 200) {
        const { bairro, localidade, logradouro, uf } = respCep.data;
        this.form.bairro = bairro;
        this.form.uf = uf;
        this.form.city = localidade;
        this.form.logradouro = logradouro;
      }
    },

    onCepInput() {
      const { cep } = this.form;

      if (cep.length === 8) {
        console.log(cep);
        this.getAddressCep(cep);
      }
    },

    resetForm(formName) {
      this.$refs[formName]?.resetFields();
    },

    onCpfInput() {
      const result = validaCPF(this.form.cpf);
      if (result) {
        console.log("errado");
      } else {
        this.validateCep = false;
        // alert('errado')
      }
    },

    async submitForm(formNames) {
      // eslint-disable-next-line no-unused-vars
      let dataFormated;
      this.$refs[formNames].validate(async (valid) => {
        if (valid) {
          const {
            patientName,
            motherName,
            date_birth,
            cpf,
            cns,
            cep,
            uf,
            city,
            bairro,
            logradouro,
          } = this.form;
          // eslint-disable-next-line no-debugger
          if (this.dataTable) {
            const data = moment(date_birth);
            dataFormated = data.format("DD/MM/YYYY");
          }
          if (this.idPatient) {
            const resultEdit = await api.put(`patients/${this.idPatient}`, {
              patientName,
              motherName,
              date_birth,
              cpf,
              cns,
              cep,
              uf,
              city,
              bairro,
              logradouro,
            });
            if (resultEdit.status === 200) {
              this.$notify({
                title: "Success",
                message: "Patiente atualizado com sucesso!",
                type: "success",
              });
              this.$emit("update:handleModal", false);
              this.$emit("successOperation", true);
            }
            return;
          }

          this.isLoading = true;
          const result = await api.post("patients/", {
            patientName,
            motherName,
            date_birth,
            cpf,
            cns,
            cep,
            uf,
            city,
            bairro,
            logradouro,
          });

          if (result.status === 201) {
            this.isLoading = false;
            this.$notify({
              title: "Success",
              message: "Patiente Adicionado com sucesso!",
              type: "success",
            });
            this.$emit("update:handleModal", false);
            this.$emit("successOperation", true);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  watch: {
    handleModal: function (modalStatus) {
      if (modalStatus && !this.openNew) {
        this.resetForm("form");
        this.loadPatiensEdit();

        if (this.form.cep) {
          this.getAddressCep(this.form.cep);
        }
      }
    },
    openNew: function (status) {
      console.log("sta", status);
      if (status) {
        (this.idPatient = ""),
          (this.form.patientName = ""),
          (this.form.motherName = ""),
          (this.form.date_birth = ""),
          (this.form.cpf = ""),
          (this.form.cns = ""),
          (this.form.cep = ""),
          (this.form.uf = ""),
          (this.form.city = ""),
          (this.form.logradouro = ""),
          (this.form.bairro = "");
      }
    },
  },
};
</script>

<style></style>
