# desafio-igti-modulo1

## Sobre o código
Criar uma aplicação para filtrar usuários e mostrar estatísticas a partir do filtro definido

## Resultado
![Desafio-Do-Módulo-1-Igti-Google-Chrome-2020-07-22-01-36-52-1](https://user-images.githubusercontent.com/39573063/88136535-d753b200-cbbf-11ea-8294-121757ffe8b6.gif)

## Tecnologias e funções utilizadas
* HTML 
* CSS
* 'Vanilla' JavaScript
* Manipulação de DOM 
* Formatação de valores (Intl)
* Métodos de arrays { map, filter, reduce, sort }
* HTTP requests usando fetch

## Teste a aplicação
> https://igti-modulo1.netlify.app/

## Requisitos
* Na carga inicial da aplicação, obter os dados de: https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo
* Carregar os dados dos usuários em um array.
* Permitir a filtragem de usuários através de um input com interação do usuário.
* O usuário poderá filtrar dados quando digitar pelo menos um caractere no input.
* O usuário poderá filtrar os dados tanto digitando "Enter" quanto clicando no botão correspondente, conforme imagens mais abaixo.
* Montar dois painéis.
* No painel da esquerda, listar os usuários filtrados.
* No painel da direita, calcular e mostrar algumas estatísticas sobre esses usuários
* Após executar a requisição à API, obtenha somente os dados necessários ao app. Esses são: name (first + last), picture, dob.age e gender.
* Monitore o input com o evento "keyup".
* Filtrem os dados a partir de qualquer posição no nome, ou seja, o nome "Brenda" (caso exista na API) deve ser retornado se o filtro for "enda".
* Para filtrar, considere todo o texto em minúsculas. Assim, o filtro "E" trará tanto "Elena" quanto "Helena", caso existam na API.
* Não faça a “limpeza” do texto, ou seja, devem ser considerados os acentos e caracteres especiais, o texto "Andre" não pode filtrar “André”.
* Dê um console.log() nos dados do evento de digitação e você descobrirá como "cercar" a tecla "Enter".
* Foque mais no código JavaScript e menos na interface. O mais importante é que o filtro e os cálculos estejam corretos.
* Quebre o seu código em funções bem definidas
