### Para que servem os repositórios

Os repositórios podem ser entendidos como a camada responsável por fazer toda
a manipulação de dados da nossa aplicação, ou seja, realizar o acesso e manipulação
do banco de dados em si.

### DTO

Data Transfer Object

### Clean Code/Architecture

Código limpo deve partir do início de toda aplicação, sempre!
E o conceito de escrever sua aplicação com código limpo é:
- dar nomes declarativos para constantes;
- dar nomes declarativos para funções;
- dar nomes declarativos para classes.

E descrever de fato aquilo que está acontecendo diretamente no seu código
Passar informações muito bem definidas para que outras pessoas também possam
entender o código
- mensagens bem descritivas (como mensagens de erros).

### SOLID

S = SRP - Single Responsability Principle (Princípio da Responsabilidade Única)
O = OCP - Open-Closed Principle (Princípio aberto/fechado)
L = LSP - Liskov Substitution Principle (Princípio de Substituição de Interface)
I = ISP - Interface Segregation Principle (Princípio da Segregação de Interface)
D = DIP - Dependency Inversion Principle (Princípio da Inversão de Dependência)

Utilizando o Princípio de responsabilidade única (SRP)
```bash
# Exemplo
Imagine que você possui um CRUD (Criar, Listar, Alterar e Deletar) em uma classe
qualquer. Essa classe possui 4 reponsabilidade, que é o CRUD por si só.

Em SOLID, o princípio de SRP aplicado a esse exemplo acima torna-se a separação
das funções que essa classe possui em 4, criando assim, uma classe específica para cada
função do CRUD, onde você separa as responsabilidades.
```

### Singleton Pattern

É um padrão de projeto que tem como definição criar apenas uma instância de uma
classe que será uma instância global para a aplicação.

### Conceito de Stream

Diferente de uma leitura normal de um arquivo, o Stream permite a leitura de um determinado arquivo por partes.

### Docker Compose

Orquestrador de container's

### Injeção de Dependências

TSyringe
