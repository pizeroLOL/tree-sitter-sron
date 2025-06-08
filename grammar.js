/**
 * @file Sron grammar for tree-sitter
 * @author Pizero <zhaory200707@outlook.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "sron",

  rules: {
    // TODO: add the actual grammar rules
    source_file: ($) => repeat(choice($.statement, $.comment)),
    type: ($) =>
      choice(
        "string",
        "integer",
        "float",
        "boolean",
        "null",
        seq($.type, "[]"),
      ),

    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    namespace_identifier: ($) => seq($.identifier, "."),

    expression: ($) =>
      choice(
        $.bool_expression,
        $.null_expression,
        $.integer_expression,
        $.float_expression,
        $.string,
        $.array_expression,
      ),
    bool_expression: ($) => choice("true", "false"),
    null_expression: ($) => "null",
    // TODO: validation intager/float
    integer_expression: ($) => /(0|-?[1-9][0-9]*)(e[0-9]+)?/,
    float_expression: ($) => /(0|-?[1-9][0-9]*)(\.[0-9]*)?(e[+-]?[0-9]+)?/,
    string: ($) => choice(/'.*'/, /".*"/, /'''(.|\n)*'''/, /"""(.|\n)*"""/),
    array_expression: ($) =>
      seq(
        "[",
        optional(seq($.expression, repeat(seq(",", $.expression)))),
        "]",
      ),

    definition: ($) => choice($.value_definition),
    value_definition: ($) =>
      seq(
        repeat($.namespace_identifier),
        $.identifier,
        optional(seq(":", $.type)),
        "=",
        $.expression,
      ),

    comment: ($) => choice(/\/\/.*/, /#.*/, /\/\*(?:.)*\*\//),
    statement: ($) => seq(choice($.definition_statement), "\n"),
    definition_statement: ($) => seq($.value_definition, $.comment),
  },
});
