# App 

Gympass style app.

## RF ->

- [x] Deve ser possível se cadastrar; 
- [x] Deve ser possível se autenticar; 
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário;
- [ ] Deve ser possível o usuário obter seu hitórico de check-ins;
- [ ] Deve ser possível o usúario buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RN ->

- [x] O usúario não deve se cadastrar com e-mail duplicado;
- [x] O usúario não pode fazer check-in duas vezes no mesmo dia ;
- [x] O usúario não pode fazer check-in se não estiver perto (100m) de uma academia;
- [ ] O check-in só pode ser validado até 20 minutos depois de criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNF ->

- [x] A senha do usuária deve estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgressSQL;
- [ ] Todas as listas de dados precisam estar paginados com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token); 
