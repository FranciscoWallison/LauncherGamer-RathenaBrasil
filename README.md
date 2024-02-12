# Launcher Gamer-RathenaBrasil

[Video: Configurações completa](https://www.youtube.com/watch?v=4BeqWathWTE&list=PLAJFB9irKbHW4Qs4kWZpUqGECm-BXnPyQ&index=2)

[Video: Usando com api](https://www.youtube.com/watch?v=EjY1lTSxmeo&list=PLAJFB9irKbHW4Qs4kWZpUqGECm-BXnPyQ&index=1)

[Video: Resumo sobre o projeo](https://www.youtube.com/watch?v=4BeqWathWTE&list=PLAJFB9irKbHW4Qs4kWZpUqGECm-BXnPyQ&index=2)


### COM API:
NAVEGAÇÃO / VALIDAÇÃO / ATUALIZAÇÃO 

<img src="https://github.com/FranciscoWallison/LauncherGamer-RathenaBrasil/blob/main/apresenta%C3%A7%C3%A3o/teste.gif" width="250" /><img src="https://github.com/FranciscoWallison/LauncherGamer-RathenaBrasil/blob/main/apresenta%C3%A7%C3%A3o/errors.gif" width="250" />
<img src="https://github.com/FranciscoWallison/LauncherGamer-RathenaBrasil/blob/main/apresenta%C3%A7%C3%A3o/load.gif" width="263" />

### SEM API:
VALIDAÇÃO / ATUALIZAÇÃO 

<img src="https://github.com/FranciscoWallison/LauncherGamer-RathenaBrasil/blob/main/apresenta%C3%A7%C3%A3o/load_logar.gif" width="250" /><img src="https://github.com/FranciscoWallison/LauncherGamer-RathenaBrasil/blob/main/apresenta%C3%A7%C3%A3o/load_aotoload.gif" width="250" />


### TEMPLATE 2 SÓ AutoPatcher 
<img src="https://github.com/FranciscoWallison/LauncherGamer-RathenaBrasil/blob/main/apresenta%C3%A7%C3%A3o/template2.gif" width="250" />

# OBS - Recomendado usar Gitness
## Uso
````
Tem como objetivo de atualizar o projeto do lado do cliente usando git e repositórios git's.
Para está usando precisa criar um instalador pelo ELECTRON.JS, recomendo que deixe só a pasta data.grf caso tenha criptografada e itens comumente padrão no instalador.
````
## Para Desenvolvimento 
Leia o README.md da [pasta](https://github.com/FranciscoWallison/LauncherGamer-RathenaBrasil/tree/main/electron-js) ````./electron-js````
## Para configurações 
Cire uma arquivo ````.env```` da rais do projeto e adicione as sequinte configurações.
#### Titulo do ````.exe```` .. com exemplo
TITLE_RO="RathenaBrasil"
#### Icone o diretório  do arquivo ````.ico```` que queira usar.. com exemplo
FILE_ICON="ro.ico"
#### Imagem de plano de fundo.. com exemplo
IMAGE_BACKGROUND="background.jpg"
## Login senha linkando para o navegador
````
OBS::Caso não queira usar, só deixar o campo vazio ou só por os valores com a URL entre aspas duplas.
Ex:URL_CREATE_ACCOUNT="http://localhost:6363/api/user/login"
````
#### Link do seu site para criar a conta
URL_CREATE_ACCOUNT=
#### Link do seu site para esqueci a senha
URL_ESQUECI_SENHA=
````
OBS::O esqueci a senha pode ficar ativado com as URL's das API's ativas.
Ex:URL_ESQUECI_SENHA="http://localhost:6363/api/user/login"
````
### Login senha e criar conta linkando para o API
````
OBS::Caso não queira usar só deixar o campo vazio ou por os valores com a URL entre aspas duplas.
Ex:URL_CREATE_ACCOUNT="http://localhost:6363/api/user/login".
OBS::Para funcionar os dois tem que ter as duas apis ativas.
````
#### Consultar da Api, validar login.. com exemplo
URL_LOGIN_API=
#### Consultar da Api, criar conta.. com exemplo
URL_CREATE_ACCOUNT_API=


#### Executável do servidor, lebrar deixar como ````-1rag1```` .. com exemplo
EXE_RO="login.exe"
#### Executável o arquivo de configurações.. com exemplo
EXE_SETEUP="Setup.exe"
#### Imagem da logo que fica no topo de login.. com exemplo
LOGO="logo.png"
#### Funcionalidade GIT OBS::AINDA EM FASE DE TESTE.
GIT_UPDATE=false

````
Alternativa de repositorio open soucer de Repositório Git
https://docs.gitness.com/
````
#### Consumindo Api

# Resposta de Login
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
 # Resposta Criar Conta
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
