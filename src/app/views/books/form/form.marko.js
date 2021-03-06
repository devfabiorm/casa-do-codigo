// Compiled using marko@4.23.9 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/CasaDoCodigo$1.0.0/src/app/views/books/form/form.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_forOf = require("marko/src/runtime/helpers/for-of"),
    helpers_escape_xml = require("marko/src/runtime/html/helpers/escape-xml"),
    marko_escapeXml = helpers_escape_xml.x,
    marko_attr = require("marko/src/runtime/html/helpers/attr"),
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer")),
    _preferred_script_location_tag = marko_loadTag(require("marko/src/core-tags/components/preferred-script-location-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  var { book } = data;

  var { validationErrors } = data;

  out.w("<html><head><meta charset=utf-8><link rel=stylesheet href=/static/css/bootstrap.min.css><link rel=stylesheet href=/static/css/fontawesome.min.css><link rel=stylesheet href=/static/css/casadocodigo.css></head><body><header class=cabecalhoPrincipal><div class=container><div class=\"row align-items-center\"><div class=col-4><h1 class=logo><img src=/static/images/logo-casadocodigo.svg alt=\"Casa do Código\"></h1></div><div class=\"cabecalhoPrincipal-navegacao col-8\"><a href=# class=login><i class=\"fas fa-sign-in-alt\"></i>Login</a></div></div></div></header><main class=conteudoPrincipal><div class=container><h1>Cadastro de livros</h1><form action=/livros/form method=post>");

  if (validationErrors) {
    var $for$0 = 0;

    marko_forOf(validationErrors, function(error) {
      var $keyScope$0 = "[" + (($for$0++) + "]");

      out.w("<div class=\"alert alert-danger\"><span>" +
        marko_escapeXml(error.param) +
        " - " +
        marko_escapeXml(error.msg) +
        "</span></div>");
    });
  }

  out.w(" ");

  if (book.id) {
    out.w("<input type=hidden name=_method value=PUT><input type=hidden name=id" +
      marko_attr("value", "" + book.id) +
      ">");
  }

  out.w("<div class=form-group><label for=title>Titulo:</label><input type=text id=title name=title" +
    marko_attr("value", "" + (book.title ? book.title : "")) +
    " placeholder=\"coloque o titulo\" class=form-control></div><div class=form-group><label for=price>Preço:</label><input type=text id=price name=price placeholder=150.25" +
    marko_attr("value", "" + (book.price ? book.price : "")) +
    " class=form-control></div><div class=form-group><label for=description>Descrição:</label><textarea cols=20 rows=10 id=description name=description placeholder=\"fale sobre o livro\" class=form-control>" +
    marko_escapeXml(book.description ? book.description : "") +
    "</textarea></div><input type=submit value=Salvar class=\"btn btn-primary\"></form></div></main><footer class=rodape><div class=container><div class=\"row align-items-center\"><div class=col-4><img src=/static/images/logo-rodape.svg class=logo-rodape></div><div class=col-8><ul class=redesSociais><li><a href=http://www.facebook.com/casadocodigo class=compartilhar-facebook target=_blank>/CasaDoCodigo</a></li><li><a href=http://www.twitter.com/casadocodigo class=compartilhar-twitter target=_blank>@casadocodigo</a></li></ul></div></div></div></footer>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "45");

  _preferred_script_location_tag({}, out);

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    id: "/CasaDoCodigo$1.0.0/src/app/views/books/form/form.marko",
    tags: [
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer",
      "marko/src/core-tags/components/preferred-script-location-tag"
    ]
  };
