# Tutorial de como implementar o webpack ao projeto
- https://webpack.js.org/
## Iniciando

### 1º Passo
Primeiro você dar start no npm e depois deve instalar o webpack no seu projeto com o npm.
```bash
npm i -y
npm install webpack webpack-cli --save-dev
```
Veja que você vai instalar o CLI do webpack junto para executar alguns comandos que necessitam dele, fora isso vamos instalar ele como dependência de desenvolvimento ja que ele vai rodando somente no ambiente dev.

### 2º Passo
Agora dentro do seu projeto nós vamos configurar algumas rotinas para o npm rodar e vamos configurar o webpack. Você deve ir dentro do *package.json* na raiz do projeto e porcurar pela chave:
```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
},
```
Aqui você pode adicionar uma nova linha com o seguinte comando.
```js
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack --config webpack.config.js",   
},
```
Pare executar essa linha você pode usar o *npm run build* para pedir ao webpack para construir o seu projeto transpilando o seu código fonte e empacotando as dependências.

Agora vamos terminar de configurar o webpack, crie um arquivo na raiz do projeto com o nome *webpack.config.js*, nesse repositório você pode encontrar um arquivo chamado *webpack.config.demo.js*, ele pode servir de modelo para você, basta copiar e colar.

### 3º Passo
Agora vou explicar para você o que todas as linhas dentro do arquivo que usamos.

```js
const path = require('path') // importamos um modulo do nodejs para resolver o caminho de pastar ou arquivos.

// criamos um objeto com algumas configurações que vai ser usado pelo webpack.
module.exports = {
  // Informamos que estamos em ambiente de desenvolvimento, você pode mudar para 'production' para o
  // webpack otimizar os builds(isso fazer o build demorar mais).
  mode: 'development',
  // Aqui falamos ao webpack onde é o inicio do projeto, no caso um arquivo index.js dentro da pasta src/
  // você pode mudar o arquivo inicial para sua preferência.
  entry: './src/index.js', 
  // Aqui informamos ao webpack a onde ele vai 'cuspir' o arquivo final que 'buildamos'
  // novamente você pode alterar para sua preferência.
  output: {
    filename: 'main.js', // nome do arquivo final
    path: path.resolve(__dirname, './public'), // caminho onde o arquimo main.js vai ficar.
  },
}
```

### Finalizando

Depois de ter feitos os passos anteriores você pode rodar o seguinte comando em algum interpretador de shell na raiz do projeto:
```bash
npm run build
```
Se tudo tiver corrido bem você vai notar alguma mensagem parecida com essa: 
```bash
...
Built at: 15/06/2020 11:52:07
  Asset      Size  Chunks             Chunk Names
main.js  70.4 KiB       0  [emitted]  main
...
```
Logo após isso você pode ir na raiz do seu projeto e procurar pela pasta *public/* como configuramos e dentro dela um arquivo chamado *main.js* como tambem configuramos.
Caso tenha curiosidade você pode abrir esse arquivo e ver como ele é grande, isso se trata porque ele contem todas as dependências usadas no projeto e nosso código transpilado.

### Contribuições

Caso encontre qualquer erro neste mine tutorial, ou queira adicionar mais valor ao mesmo, basta enviar um *pull request*.