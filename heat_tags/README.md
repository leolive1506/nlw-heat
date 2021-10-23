# Startar banco de dados com docker (se não da erro na hora de começar)
```
sudo docker start postgres
```


# Objetivo
> Ler todas msg, processar para gerar uma nuvem de tags com as palavras que mais apareceram

# Pq o uso do elixir
> Usar das propriedades dele que ajudam
 
# Lógica
> Processar todas as msg de forma concorrente <br />
 Processo diário que conta todos dias e gera reporte final da contagem <br />
 Salvar as msg num banco, le as msg geradas hoje <br />

> Criação de rota para obtenção dos dados <br />
Criar uma mensagem no banco de dados <br />
Módulo para separação e contagem de palavras <br />
Criar agendador de geração de relatórios 

# Fundamentos
> `Erlang` -> Linguagem p qual elixir é compilado que roda ~ 80% tráfico internet

## table
> Criar campo pra criar table (onde fica guardada mostra no terminal)
```
mix ecto.gen.migration name_table
```

> Roda a migração dps formar a tabela e ela é criada no db
```
mix ecto.migrate
```

## controller
> É framework que recebe os dados e manda pra lógica de negócios

## module
> module é um agrupamento de funções

## função 
> Toda função de um controller no ex recebe dois params
```
def create(conexão, params)
```
> Tem que manipular conexão e devolver uma conexão tb
> funciton privada 
```
defp
```


## IO.inspect(params)
> Mostra no terminal os params recebidos


# |> Pipe operator
> pega conexão e passa como argumento p conexão de baixo
Ex: 
```
conn
    |> text("RECEBI A REQUISÃO")
```
> Mesma coisa que 
```
text(conn, "RECEBI A REQUISÃO")
```

# Sobre code
## `Lógica de negócio`
> lib -> nameProject
## Parte web (routes, controllers, views)
> lib -> nameProject_web



# Criar um projeto
```
mix phx.new nameProject --no-html --no-assets

```
> Nesse caso ta falando qeu não quer nada de html nem js e css pq vai ser uma API json


```
entrar na pasta
    $ cd nameProject
    $ mix deps.get

config seu banco de dados in config/dev.exs and run:

    $ mix ecto.create

Start seu servidor com

    $ mix phx.server

You can also run your app inside IEx (Interactive Elixir) as:

    $ iex -S mix phx.server

```

#semLimites