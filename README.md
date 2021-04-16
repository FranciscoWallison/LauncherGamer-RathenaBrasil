# Launcher Gamer-RathenaBrasil

<img src="https://github.com/FranciscoWallison/LauncherGamer-RathenaBrasil/blob/main/apresenta%C3%A7%C3%A3o/errors.gif" width="300" /> <img src="https://github.com/FranciscoWallison/LauncherGamer-RathenaBrasil/blob/main/apresenta%C3%A7%C3%A3o/teste.gif" width="300" />
## Para Desenvolvimento 
Leia o README.md da [pasta](https://github.com/FranciscoWallison/LauncherGamer-RathenaBrasil/tree/main/electron-js) ````./electron-js````
## Para configurações 
Cire uma arquivo ````.env```` da rais do projeto e adicione as sequinte configurações.
#### Titulo do ````.exe```` .
TITLE_RO="RathenaBrasil"
#### Icone o diretorio do arquivo ````.ico```` que queira usar.
FILE_ICON="ro.ico"
#### Imagem de plano de fundo
IMAGE_BACKGROUND="background.jpg"
#### Consuta da Api, validar login
URL_LOGIN="http://localhost:6363/api/user/login"
#### Consuta da Api, criar conta
URL_CREATE_Account="http://localhost:6363/api/user/create"
#### Executavel do servidor, lebrar deixar como ````-1rag1````
EXE_RO="login.exe"
#### Executavel o arquivo de configurações.
EXE_SETEUP="Setup.exe"
#### Imagem da logo que fica no topo de login
LOGO="logo.png"
#### Funcionalidade GIT OBS::AINDA EM FASE DE TESTE
GIT_UPDATE=false



#### Consuta da Api, como ele consume as infomrções e manda.

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
