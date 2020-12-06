# Current choice of OSS:

## UI

https://github.com/voerro/vue-tagsinput

# For textarea:

https://github.com/TunaYagci/vue-mentionable
https://stackoverflow.com/questions/58864588/display-live-suggestion-words-in-v-text-field-or-v-textarea-vuetify-vue-js
http://imankulov.github.io/asuggest/ -> no dropdown / Jquery
https://github.com/atmb4u/AutoJS -> only on right arrow / Jquery
http://bassistance.de/jquery-plugins/jquery-plugin-autocomplete/ / Jquery

## Grammar

https://github.com/SAP/chevrotain
https://nearley.js.org/

# Others

Demo of simple grammar:
Subject Verb Mod Demo -> https://omrelli.ug/nearley-playground/

Other possible software:
https://github.com/SAP/chevrotain
http://zaa.ch/jison/docs/
https://github.com/foo123/codemirror-grammar

Knowledge:
https://stackoverflow.com/questions/5109905/are-there-any-javascript-frameworks-for-parsing-auto-completing-a-domain-specifi

List of all parsing libraries:
https://sap.github.io/chevrotain/performance/

1. According to this chevotrain is much faster then others

Use cases I need to support:

1. add reminder
2. delete reminder talk to sister
3. delete talk to sister
4. add medciation lexapro
5. lexapro add
   1. if lexapro already exists (This is possible in visual studio code. For e.g. if a function name already exists it is given as a autocomplete option)
      1. then user cannot do add
      2. lexapro refill

Text strings to the grammer need to be fed in on the fly
Cannot use a tool that uses the command line to generate the parser.

Comparison

```code
                                    Chevrotain              nearley.js
Seprate build step                      No
Speed                                  100                      80
Working ex of content assist            Yes
Stars                                  1.5K
Generate railroad from parser           Yes
Current preference                      1
```

# Domain Knowledge:

How to write your own? https://medium.com/javascript-in-plain-english/json-parser-with-javascript-1a04d699f86a

## Lexer

A Lexer transforms a input string into seperate tokens
The lexer is context unaware, it lexes each token (pattern) individually.

## Parser

This has many grammers
Each grammer is a railroad diagram
One grammar can container other grammer.

## AST

The parser produces a abstract syntax tree.
Ref: https://tomassetti.me/parsing-in-javascript/
