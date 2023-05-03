# om30

O projeto om30 é uma plataforma que possui uma tela de login simplificada, onde o usuário poderá digitar seu nome para adentrar no sistema

Após digitar seu nome e entrar na plataforma ele verá de início um usuário cadastrado (késsia) como exemplo.

Nela é possível ver a listagem dos pacientes cadastrados, **editar** cada paciente , **remover** cada paciente e **adicionar** o respectivos pacientes.

Por meio de uma modal você irá conseguir cadastrar e editar o respectivo paciênte

Foi utilizado o sistema de modal para melhorar a experiência e interação do usuário ao utilizar com o sistema.

Foi também configurado o sistema de rotas para possibilitar as navegacões bem como da página de login para a home, bem como
a api do viaCep para trazers os dados do endereço do usuário e carregar os camops automáticamente.

## Ferramentas utilizadas
- [element.io](https://element.eleme.io/#/en-US/component/installation) como biblioteca de UI
- [Axios](https://axios-http.com/docs/intro) para o consumo das api
- [json-server](https://www.npmjs.com/package/json-server) para criação dos dados mockados bem como adicionar, editar , listar e remover paciente
- [viacep](https://viacep.com.br/)


## Para instalar todos os pacotes rode o comando:
```
yarn
```

### Após instalar todos os compandos execute o comando abaixo para rodar o projeto e começar a utiliza-lo
```
yarn run serve
```

## Para executar o server mockado
- navegar até a pasta db.json que se econtra em src/db
- executar o comando: json-server --watch db.json

## Pontos para melhorar no código:
- Ao clicar em remover um paciente abrir uma modal de confirmação questionando ao usuário se tem certeza que deseja remover o paciente
- Inserir a possibilidade do usuário adcionar a foto do paciente bem como edita-la. A foto que existe hoje esta fixa no código.
- Melhorar a validacao do cpf para nao aceitar letras mas apenas

## O que não foi feito:
Não foi feito a tempo a validação do campo CNS
