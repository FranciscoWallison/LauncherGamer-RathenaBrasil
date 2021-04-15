# Launcher Gamer-RathenaBrasil

 ## Resposta de Login
 #### Envio
 ````
      {
          userid: "teste",
          password: "testCreatedUser",
      }
 ````
####  Retorno
````
      Resposta com error
          {"error":["Essa conta não existe."]}
      Resposta sucesso
          {}
````
 ## Resposta Criar Conta
 #### Envio
 ````
      {
          email: "teste@teste.com", 
          userid: "teste",
          password: "testCreatedUser",
      }
 ````
####  Retorno
````
      Error
          {
              "email":    ["Email já cadastrado."],
              "userid":   ["Usuário já cadastrado."],
              "password": ["Senha tem que ter no mino 8 caracteres."],
          }
      Sucesso
          {}
````
