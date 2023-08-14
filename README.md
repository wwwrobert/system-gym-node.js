# App 

Gympass style app.

## RF ->

- [x] Deve ser possível se cadastrar; 
- [x] Deve ser possível se autenticar; 
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário;
- [ ] Deve ser possível o usuário obter seu hitórico de check-ins;
- [ ] Deve ser possível o usúario buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RN ->

- [x] O usúario não deve se cadastrar com e-mail duplicado;
- [ ] O usúario não pode fazer check-in duas vezes no mesmo dia ;
- [ ] O usúario não pode fazer check-in se não estiver perto (100m) de uma academia;
- [ ] O check-in só pode ser validado até 20 minutos depois de criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNF ->

- [x] A senha do usuária deve estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgressSQL;
- [ ] Todas as listas de dados precisam estar paginados com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token); 

==============================================================================================================================================

COMANDOS DOCKER ->

# criar docker = docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql

# ver todos os bancos = docker ps -a 

# startar um banco já criado = docker start api-solid-pg 

# apagar banco = docker rm api-solid-pg

# parar os containers = docker compose stop

==============================================================================================================================================

COMANDOS PRISMA -> 

# acessar o banco de dados = npx prisma studio

# criar uma migration no prisma = npx prisma migrate dev 

==============================================================================================================================================
