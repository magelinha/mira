"use strict";

var rules = [{
    name: 'isLancamento',
    validate: '$data.tipo == "Lançamento"'
},{
    name: 'isAluguel',
    validate: '$data.tipo == "Aluguel"'
},{
    name: 'isVenda',
    validate: '$data.tipo == "Venda"'
},{
    name: 'isImovel',
    validate: '$data.id != null'
}];

var selection = [
    {
        when: 'isImovel',
        abstract: 'imovel'
    }
];

var interface_abstracts = [
    {
        name:'landing',
        widgets : [
            {'container':[
                {'head': 'title'},
                {'content': {name: 'items', datasource:'url:<%= "/api/imovel" %>', children:[
                        {'item':
                            {'tipo': { 'link': ['nome', 'bairro']}}
                        }
                    ]}
                }
            ]}
        ]
    }, {
        name: 'imovel',
        widgets: [
            { name: 'carousel', datasource: '$data.fotos', children: ['carousel_item'] },
            {
                'content': [
                    'nome',
                    {

                        'detalhes':[{'row' : [{
                            'localizacao_box': ['localizacao_title',
                                {name: 'localizacao_lista', datasource: '$data.localizacao', children: 'localizacao_item'}]
                        }, {
                            'negociacao_box': ['negociacao_title',
                                {name: 'negociacao_lista', datasource: '$data.venda', children: 'negociacao_item', when: 'isVenda'},
                                {name: 'negociacao_lista', datasource: '$data.lancamento', children: 'negociacao_item', when: 'isLancamento'},
                                {name: 'negociacao_lista', datasource: '$data.aluguel', children: 'negociacao_item', when: 'isAluguel'}
                            ]
                        }]}, 'descricao_title', 'descricao'
                        ]
                    },
                    {'mapa_box': 'mapa'}
                ]
            }
        ]
    }
];

var GeralHead = [
    {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
    {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'}
];

var concrete_interface = [
    {
        name: 'landing',
        head: GeralHead.concat([
            {name: 'title', widget:'Title', value: '"Imovel"'}
        ]),
        maps: [

        { name: 'container', widget: 'SimpleHtml', tag:'div', class:'container' },
        { name: 'head', widget: 'SimpleHtml', tag:'div', class:'jumbotron' },
        { name: 'title', widget: 'BootstrapSimple', tag:'h1', text:'center', value:'"Escolha seu Imóvel"' },

        { name: 'content', widget: 'BootstrapSimple', class:'row', md:'10,offset-1' },
        { name: 'items', widget: 'BootstrapSimple' },
        { name: 'item', widget: 'BootstrapSimple', md:'6'},
        { name: 'tipo', widget: 'BootstrapSimple', class:'panel-body', alert:'info', when:'isAluguel' },
        { name: 'tipo', widget: 'BootstrapSimple', class:'panel-body', alert:'success', when:'isLancamento' },
        { name: 'tipo', widget: 'BootstrapSimple', class:'panel-body', alert:'warning', when:'isVenda' },
        { name: 'link', widget: 'BootstrapSimple', tag:'a', href:'navigate("/api/imovel/" + $data.id)' },
        { name: 'nome', widget: 'BootstrapSimple', tag:'p', class:'lead', text:'center',  value:'$data.nome' },
        { name: 'bairro', widget: 'BootstrapSimple', tag:'p', text:'center', value:'$data.bairro'}

    ]},{
        name: 'imovel',
        head:GeralHead.concat([
            {name: 'title', widget:'Title', value: '"Imovel | " + $data.tipo  + " | " + $data.nome'}
        ]),
        maps: [
            { name: 'carousel', widget: 'BootstrapCarousel' },
            { name: 'carousel_item', widget: 'BootstrapCarouselItem', value:'$data.desktop', when:'$env.device.desktop == true' },
            { name: 'carousel_item', widget: 'BootstrapCarouselItem', value:'$data.mobile', when:'$env.device.mobile == true' },
            { name: 'carousel_item', widget: 'BootstrapCarouselItem', value:'$data.tablet', when:'$env.device.tablet == true' },

            { name: 'content', widget: 'BootstrapSimple', class:'container' },
            { name: 'nome', widget: 'BootstrapSimple', tag:'h1', text:'center', value:'$data.nome' },
            { name: 'row', widget: 'BootstrapSimple', class:'row' },
            { name: 'detalhes', widget: 'BootstrapSimple', md:'8' },
            { name: 'localizacao_box', widget: 'BootstrapSimple', md:'6' },
            { name: 'localizacao_title', widget: 'BootstrapSimple', tag:'h3', value:'"Localização"' },
            { name: 'localizacao_lista', widget: 'BootstrapSimple', tag:'ul' },
            { name: 'localizacao_item', widget: 'BootstrapSimple', tag:'li', value:'$data.item'},
            { name: 'negociacao_box', widget: 'BootstrapSimple', md:'6' },
            { name: 'negociacao_title', widget: 'BootstrapSimple', tag:'h3', value:'"Formas de Pagamento"', when:'isVenda' },
            { name: 'negociacao_title', widget: 'BootstrapSimple', tag:'h3', value:'"Contrato de Locação"', when:'isAluguel' },
            { name: 'negociacao_title', widget: 'BootstrapSimple', tag:'h3', value:'"Lançamento"', when:'isLancamento' },
            { name: 'negociacao_lista', widget: 'BootstrapSimple', tag:'ul' },
            { name: 'negociacao_item', widget: 'BootstrapSimple', tag:'li', value:'$data.item' },
            { name: 'descricao_title', widget: "BootstrapSimple", tag:'h3', value:'"Descricao"'},
            { name: 'descricao', widget: "BootstrapSimple", tag:'p', value:'$data.descricao'},
            { name: 'mapa_box', widget: "BootstrapSimple", md:'4'},
            { name: 'mapa', widget:'MapStatic', value:'$data.bairro', class:'thumbnail' },
            { name: 'mapa', widget: "MapDynamic", address:'$data.bairro', options:{ zoom:13}, when:'$env.device.desktop == true'}


    ]}
];

var ajaxSetup = {

};

if(typeof define === 'function') {
    define([
        "jquery",
        "bootstrap",
        'mira/init'
    ], function ($, $bootstrap, Mira) {

        return function Imovel() {
            var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
        };

    });
} else {

    exports.ajaxSetup = ajaxSetup;
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}

