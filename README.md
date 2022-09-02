# API de Games

## Endpoints

### POST /login
Esse endpoint é responsável por fazer processo de login
#### Parametros
email: E-mail do usuário cadastrado no sistema

password: Password do usuário cadastrado no sistema

Exemplo
```
{
   "email": "seuemail.com",
   "password": "12345678"
}
```
#### Respostas
##### OK! 200

Caso isso aconteça, vai receber o token JWT para acessar endpoints protegidos

Exemplo
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsImVtYWlsIjoibmljb2xhc0Bob3RtYWlsLmNvbSIsIm5hbWUiOiJOaWNvbGFzIiwiaWF0IjoxNjYyMTE4MTg1LCJleHAiOjE2NjIyOTA5ODV9.qKdv0auTXksFATZpQhx6EUxd5J2RgXMUS_6bpwBS_kI",
    "user": {
        "id": 40,
        "email": "seumail@hotmail.com"
        "name": "Nome do usuário
    }
}
```
##### Preencha todos os campos! 400
##### Email não existe na base de dados! 404
##### Credenciais invalidas! 401

### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça, vai receber a listagem de todos os games

Exemplo: 
```
[
    {
        "id": "ca8p54bh-fxejbnz7-1uei92rc-77xosqkl",
        "name": "GoldenEye: 007",
        "year": 1975,
        "price": 35.6,
        "createdAt": "2022-08-31T11:05:53.000Z",
        "updatedAt": "2022-08-31T11:05:53.000Z"
    },
    {
        "id": "50tum6n9-bgkktnc5-h44i5yt0-e7i4wvns",
        "name": "Metal Gear Solid",
        "year": 2016,
        "price": 78.45,
        "createdAt": "2022-08-31T11:05:36.000Z",
        "updatedAt": "2022-08-31T11:05:36.000Z"
    },
    {
        "id": "e9w5q6wu-1ltuix2v-1jt3qt5w-1ddcy6gm",
        "name": "Final Fantasy VII",
        "year": 1986,
        "price": 48.2,
        "createdAt": "2022-08-31T11:05:21.000Z",
        "updatedAt": "2022-08-31T11:05:21.000Z"
    },
 [    
```
##### Falha na autenticação! 401
Aconteceu alguma falha durante o processo de autenticação da requisição (Token inválido ou Token expirado)

Exemplo:
```
{
    "message": "Sem token!"
}
```


