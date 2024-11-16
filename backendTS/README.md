# Instruções de uso:

1. definir variáveis de ambiente

- o arquivo .env.example possui as váriaveis que deverão ser definidas no .env para o funcionamento da aplicação

- para acompanhar o banco de dados conforme os testes, recomendo que baixem o mongo compass

2. instalar as dependencias: npm i

3. rodar a aplicacao: npm start (deve ser reiniciada caso haja alguma modificação no backend)

**Nota**: Certifique-se de que o MongoDB está instalado localmente e que o serviço do MongoDB está em execução para que o projeto funcione corretamente.

# rotas:

- o fluxo da aplicação inicia no app.ts, definindo a porta que sera utilizada para rodar o backend localmente, atualmente a porta seria http://localhost:4444/api

- requisiçoes para usuarios: localhost:4444/api/usuarios/AÇAO
- requisiçoes para tarefas: localhost:4444/api/tarefas/ACAO

as ACOES para cada método http constam nos respectivos arquivos de rotas para cada entidade,
algumas das rotas pedem /:id, que são os ids das entidades cadastradas no banco e devem ser incluidas na url da seguinte forma:

(exemplo rota de exclusão de usuario)
localhost:4444/api/usuarios/delete/673343368ca2a7e237880a9b
