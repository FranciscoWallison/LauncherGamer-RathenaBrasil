# Launcher Gamer-RathenaBrasil



<img src="https://github.com/FranciscoWallison/LauncherGamer-RathenaBrasil/blob/main/apresenta%C3%A7%C3%A3o/errors.gif" width="300" /> <img src="https://github.com/FranciscoWallison/LauncherGamer-RathenaBrasil/blob/main/apresenta%C3%A7%C3%A3o/teste.gif" width="300" />
<img src="https://github.com/FranciscoWallison/LauncherGamer-RathenaBrasil/blob/main/apresenta%C3%A7%C3%A3o/load.gif" width="300" />

## Para Desenvolvimento 
Leia o README.md da [pasta](https://github.com/FranciscoWallison/LauncherGamer-RathenaBrasil/tree/main/electron-js) ````./electron-js````
## Para configurações 
Cire uma arquivo ````.env```` da rais do projeto e adicione as sequinte configurações.
#### Titulo do ````.exe```` .. com exemplo
TITLE_RO="RathenaBrasil"
#### Icone o diretorio do arquivo ````.ico```` que queira usar.. com exemplo
FILE_ICON="ro.ico"
#### Imagem de plano de fundo.. com exemplo
IMAGE_BACKGROUND="background.jpg"
#### Consuta da Api, validar login.. com exemplo
URL_LOGIN="http://localhost:6363/api/user/login"
#### Consuta da Api, criar conta.. com exemplo
URL_CREATE_Account="http://localhost:6363/api/user/create"
#### Executavel do servidor, lebrar deixar como ````-1rag1```` .. com exemplo
EXE_RO="login.exe"
#### Executavel o arquivo de configurações.. com exemplo
EXE_SETEUP="Setup.exe"
#### Imagem da logo que fica no topo de login.. com exemplo
LOGO="logo.png"
#### Funcionalidade GIT OBS::AINDA EM FASE DE TESTE.
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
      Error
          {"error":["Essa conta não existe."]}
      Sucesso
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
