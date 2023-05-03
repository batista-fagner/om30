export const validatePatient = {
  patientName: [
    { required: true, message: 'Digite o nome do paciênte', trigger: 'blur' },
  ],
  motherName: [
    { required: true, message: 'Digite o nome da mãe', trigger: 'blur' },
  ],
  cpf: [
    { required: true, message: 'Digite o cpf', trigger: 'blur' },
    { min: 11, max: 11, message: 'Digite um cpf válido', trigger: 'blur' }
  ],
  cns: [
    { required: true, message: 'Digite o cns', trigger: 'blur' },
  ],
  date_birth: [
    { required: true, message: 'Digite a data de nascimento', trigger: 'blur' },
  ],
  cep: [
    { required: true, message: 'Digite o cep do paciente', trigger: 'blur' },
  ],
  logradouro: [
    { required: true, message: 'Digite o endereco', trigger: 'blur' },
  ]
}