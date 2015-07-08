"use strict";

var rules = [
  {
    name: 'isDesktop',
    validate: '$env.device.desktop == true'
  },
  {
    name: 'isTablet',
    validate: '$env.device.tablet == true'
  },
  {
    name: 'isMobile',
    validate: '$env.device.mobile == true'
  }
];

var selection = [
  {
    when: '$data.id != null',
    abstract: 'imovel'
  }
];

var interface_abstracts = [
  { name:"landing",
    widgets:[ { name:"container",
      children:[ { name:"head",
        children:[ { name:"title" } ] },
        { name:"content",
          children:[ { name:"items", datasource: 'url:/api/imovel',
            children:[ { name:"item",
              children:[ { name:"tipo",
                children:[ { name:"link",
                  children:[ { name:"nome" },
                    { name:"bairro" } ] } ] } ] } ] } ] } ] } ] },
  { name:"imovel",
    widgets:[ { name:"carousel",
      children:[ { name:"carousel_item" } ],
      datasource:"$data.fotos" },
      { name:"content",
        children:[ { name:"nome" },
          { name:"detalhes",
            children:[ { name:"row",
              children:[ { name:"localizacao_box",
                children:[ { name:"localizacao_title" },
                  { name:"localizacao_lista",
                    children:[ { name:"localizacao_item" } ],
                    datasource:"$data.localizacao" } ] },
                { name:"negociacao_box",
                  children:[ { name:"negociacao_title",
                    children:[  ] },
                    { name:"negociacao_lista",
                      children:[ { name:"negociacao_item" } ],
                      datasource:"$data.negociacao" } ] } ] },
              { name:"descricao_title" },
              { name:"descricao" } ] },
          { name:"mapa_box", children: [{name:'mapa'}] },
        ] } ] }
];

var head = [
  {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
  {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
  {name: 'title', widget:'Title', value: '"MIRA | Model Interface for REST Applications"'}
];

var concrete_interface = [
  {
    name: 'landing',
    head: head,
    maps: [
      { name: "container", class:'container'},
      { name: "head", class:'jumbotron text-center'},
      { name: "title", tag: 'h1', value: 'Escolha seu Imóvel'},
      { name: "content", class:'row col-md-10 col-md-offset-1'},
      { name: "items"},
      { name: "item", class: 'col-md-6 text-center'},
      { name: "tipo", when: '$data.tipo == "Aluguel"', class: 'panel-body alert-info alert'},
      { name: "tipo", when: '$data.tipo == "Lançamento"', class: 'panel-body alert-success alert'},
      { name: "tipo", when: '$data.tipo == "Venda"', class: 'panel-body alert-danger alert'},
      { name: "link", tag: 'a', href: 'navigate("/api/imovel/" + $data.id)'},
      { name: "nome", tag: 'p', value: '$data.nome', class: 'lead'},
      { name: "bairro", tag: 'p', value: '$data.bairro' },

    ]
  },

  {
    name: 'imovel',
    head: [
      {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
      {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
      {name: 'title', widget:'Title', value: '$data.nome'}
    ],
    maps: [
      { name: "carousel", widget: 'BootstrapCarousel'},
      { name: "carousel_item", widget: 'BootstrapCarouselItem', value: '$data.desktop', when: 'isDesktop'},
      { name: "carousel_item", widget: 'BootstrapCarouselItem', value: '$data.mobile', when: 'isMobile'},
      { name: "carousel_item", widget: 'BootstrapCarouselItem', value: '$data.tablet', when: 'isTablet'},
      { name: "content", class: 'container' },
      { name: "nome", tag:'h1', class: 'text-center alert-info alert', when: '$data.tipo == "Aluguel"', value: "Imóvel Aluguel"},
      { name: "nome", tag:'h1', class: 'text-center alert-success alert', when: '$data.tipo == "Lançamento"', value: "Imóvel Lançamento"},
      { name: "nome", tag:'h1', class: 'text-center alert-danger alert', when: '$data.tipo == "Venda"', value: '"Imóvel Venda"'},
      { name: "detalhes", class:'col-md-8'},
      { name: "row", class:'row well'},
      { name: "localizacao_box", class: 'col-md-6'},
      { name: "localizacao_title", tag: 'h3', value: 'Localização'},
      { name: "localizacao_lista", tag: 'ul'},
      { name: "localizacao_item", tag: 'li', value: '$data.item'},
      { name: "negociacao_box", class:'col-md-6'},
      { name: "negociacao_title", value: '"Contrato de Locação"', tag: 'h3', when: '$data.tipo == "Aluguel"'},
      { name: "negociacao_title", value: '"Lançamento"', tag: 'h3', when: '$data.tipo == "Lançamento"'},
      { name: "negociacao_title", value: '"Formas de Pagamento"', tag: 'h3', when: '$data.tipo == "Venda"'},
      { name: "negociacao_lista", tag: 'ul'},
      { name: "negociacao_item", tag: 'li', value: '$data.item'},
      { name: "descricao_title", tag: 'h3', value: 'Descrição' },
      { name: "descricao", when: '$data.tipo == "Aluguel"', value: '$data.aluguel'},
      { name: "descricao", when: '$data.tipo == "Lançamento"', value: '$data.lancamento'},
      { name: "descricao", when: '$data.tipo == "Venda"', value: '$data.venda'},
      { name: "mapa_box",class: 'col-md-4'},
      { name: "mapa", widget: 'MapDynamic', address:'$data.bairro', options: {zoom:13}},
      { name: "mapa", widget: 'MapStatic', when: 'isMobile', value: '$data.bairro'},

    ]
  }
];

if(typeof define === 'function') {
  define([
    // Load our app module and pass it to our definition function
    "jquery",
    "bootstrap",
    'mira/init'
  ], function ($, $bootstrap, Mira) {

    return function Index() {
      var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
    };

  });
} else {
  exports.ajaxSetup = {};
  exports.abstracts = interface_abstracts;
  exports.mapping = concrete_interface;
  exports.selection = selection;
  exports.rules = rules;
}


