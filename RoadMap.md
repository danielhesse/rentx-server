## Análise de Requisitos da Aplicação

**RF** - Requisitos Funcionais

**RNF** - Requisitos Não Funcionais

**RN** - Regra de Negócio

### Cadastro de Carro

**RF**
- [ ] Deve ser possível cadastrar um novo carro.
- [ ] Deve ser possível listar todas as categorias.

**RN**
- [x] Não deve ser possível cadastrar um carro com uma placa já existente.
- [x] O carro deve ser cadastrado, por padrão, como disponível.
- [ ] Não deve ser possível cadastrar um carro caso o usuário não seja um administrador.


### Listagem de Carros

**RF**
- [ ] Deve ser possível listar todos os carros disponíveis.
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
- [ ] O usuário não precisa estar logado.


### Cadastro de Especificação do Carro

**RF**
- [ ] Deve ser possível cadastrar um especificação para um carro.
- [ ] Deve ser possível listar todas as especificações.
- [ ] Deve ser possível listar todos os carros.

**RN**
- [ ] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [ ] Não deve ser possível cadastrar uma especificação já existent para o mesmo carro.
- [ ] O usuário responsável pelo cadastro deve ser um usuário administrador.


### Cadastro de imagens do carro

**RF**
- [ ] Deve ser possível cadastrar a imagem do carro.
- [ ] Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
- [ ] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- [ ] O usuário responsável pelo cadastro deve ser um usuário administrador.


### Aluguel

**RF**
- [ ] Deve ser possível cadastrar um aluguel

**RN**
- [ ] O aluguel deve ter duração mínima de 24 horas.
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
