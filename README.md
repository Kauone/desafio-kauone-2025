# Abrigo de Animais

Este projeto resolve o desafio técnico de lógica para adoção de animais em um abrigo, utilizando Javascript.

## Como rodar a aplicação na sua máquina

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/en/) instalado (versão recomendada: 18 ou superior)
- [Git](https://git-scm.com/) instalado

### 2. Clonando o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/Kauone/desafio-kauone-2025.git
cd desafio-kauone-2025
```

### 3. Instalando as dependências

No diretório do projeto, execute:

```bash
npm install
```

### 4. Rodando os testes

Para validar sua solução e conferir se está tudo funcionando, execute:

```bash
npm test
```

Os testes estão no arquivo `src/abrigo-animais.test.js` e cobrem todos os cenários do desafio.

### 5. Rodando o código manualmente

Você pode testar o método principal diretamente no Node.js.  
Exemplo de uso no terminal:

```bash
node
```

E dentro do REPL do Node.js:

```javascript
const { AbrigoAnimais } = require('./src/abrigo-animais.js');
const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
console.log(resultado);
```

### 6. Estrutura do projeto

- `src/abrigo-animais.js`: Lógica principal do desafio.
- `src/abrigo-animais.test.js`: Testes automatizados.
- `README.md`: Este guia.
