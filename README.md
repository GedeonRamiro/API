# API de Games

## Endpoints

### POST /createAccount
Esse endpoint é responsável por criar usuários
#### Parametros
name: nome do usuário

email: email do usuário

password: senha do usuário

Exemplo
```
{
   "name": "Nome",
   "email": "seuemail.com",
   "password": "12345678"
}
```
#### Respostas
##### OK! 200

Exemplo
```
{
    "message": "Usuário criado com suceso!"
}
```
##### Preencha todos os campos! 400
```
{
    "message": "Preencha todos os campos!"
}
```
##### Email já existe na base de dados! 403
```
{
    "message": "Já existe um usuário com esse email!"
}
```

### POST /login
Esse endpoint é responsável por fazer processo de login
#### Parametros
email: E-mail do usuário cadastrado no sistema

password: Senha do usuário cadastrado no sistema

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
```
{
    "message": "Preencha todos os campos!"
}
```
##### Email não existe na base de dados! 404
```
{
    "message": "Email não existe na base de dados!"
}
```
##### Credenciais invalidas! 401
```
{
    "message": "Credenciais invalidas!"
}
```

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

### GET /games/page/:num
Esse endpoint é responsável por retornar a listagem de games por paginação
#### Parametros
num: Número da página
#### Respostas
##### OK! 200
Caso essa resposta aconteça, vai receber a listagemde os games

Exemplo: 
```
"result": {
        "page": 1,
        "prev": false,
        "next": 2,
        "totalPage": 3,
        "games": {
            "count": 12,
            "rows": [
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
                {
                    "id": "kg7sh22p-jprelxq0-19xap82b-bp9qovmm",
                    "name": "World of Warcraft",
                    "year": 2015,
                    "price": 125.35,
                    "createdAt": "2022-08-31T11:04:56.000Z",
                    "updatedAt": "2022-08-31T11:04:56.000Z"
                },
                {
                    "id": "cwf9n14b-fq7zod7w-c0oor4sh-7qmkhnxp",
                    "name": "The Legend of Zelda: The Ocarina of Time",
                    "year": 1985,
                    "price": 420,
                    "createdAt": "2022-08-31T11:04:33.000Z",
                    "updatedAt": "2022-08-31T11:04:33.000Z"
                }
            ]
        }
    }
} 
```
##### Falha na autenticação! 401
Aconteceu alguma falha durante o processo de autenticação da requisição (Token inválido ou Token expirado)

Exemplo:
```
{
    "message": "Sem token!"
}
```

### GET /game/:id
Esse endpoint é responsável por retornar um game específico
#### Parametros
id: id do game
#### Respostas
##### OK! 200
Caso essa resposta aconteça, vai retorna o game

Exemplo: 
```
{
    "id": "50tum6n9-bgkktnc5-h44i5yt0-e7i4wvns",
    "name": "Metal Gear Solid",
    "year": 2016,
    "price": 78.45,
    "createdAt": "2022-08-31T11:05:36.000Z",
    "updatedAt": "2022-08-31T11:05:36.000Z"
}
```
##### Falha na autenticação! 401
Aconteceu alguma falha durante o processo de autenticação da requisição (Token inválido ou Token expirado)

Exemplo:
```
{
    "message": "Sem token!"
}
```
##### Game não existe na base de dados! 404

Exemplo:
```
{
    "message": "Game não encrontrado!"
}
```

### POST /game
Esse endpoint é responsável por criar um game
### Parametros
```
Exemplo
{
   "name": "The Legend of Zelda: The Ocarina of Time",
   "year": 1985,
   "price": 420,
}
```

#### Respostas
##### OK! 200
Caso essa resposta aconteça, vai criar uma game
{
    "message": "Game criado com sucesso!"
}

##### Preencha todos os campos! 400
```
{
    "message": "Preencha todos os campos!"
}
```

##### Falha na autenticação! 401
Aconteceu alguma falha durante o processo de autenticação da requisição (Token inválido ou Token expirado)

Exemplo:
```
{
    "message": "Sem token!"
}
```
##### Game não existe na base de dados! 404

### DELETE /game/:id
Esse endpoint é responsável por deleta um game
### Parametros
id: id do game
#### Respostas
##### OK! 200
Caso essa resposta aconteça, vai deletar o game
{
    "message": "Game excluído com sucesso!"
}

##### Falha na autenticação! 401
Aconteceu alguma falha durante o processo de autenticação da requisição (Token inválido ou Token expirado)

Exemplo:
```
{
    "message": "Sem token!"
}
```
##### Game não existe na base de dados! 404

### PUT /game/:id
Esse endpoint é responsável por atualizar um game
### Parametros
id: id do game

Exemplo
```
{
    "name": "Metal Gear Solid",
    "year": 2019,
    "price": 38.42,
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça, vai atualizar o game
{
    "message": "Game editado com sucesso!"
}

##### Falha na autenticação! 401
Aconteceu alguma falha durante o processo de autenticação da requisição (Token inválido ou Token expirado)

Exemplo:
```
{
    "message": "Sem token!"
}
```
##### Game não existe na base de dados! 404





