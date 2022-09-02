# API de Games

## Endpoints
### GET / games
Esse endpoint é responsável por retornar a listagem de todos os games
#### Parametros
Nenhum
#### Respostas
##### OK! 200
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
Caso essa resposta aconteça, vai receber a listagem de todos os games
##### Falha na autenticação! 401
Aconteceu alguma falha durante o processo de autenticação da requisição (Token inválido ou Token expirado)
