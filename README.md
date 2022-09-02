# API de Games

## Endpoints
### GET / games
Esse endpoint é responsável por retornar a listagem de todos os games
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça, vai receber a listagem de todos os games
##### Falha na autenticação! 401
Aconteceu alguma falha durante o processo de autenticação da requisição (Token inválido ou Token expirado)
