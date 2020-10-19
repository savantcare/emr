/* By default it is a JSON file called .prettierrc why has it been converte to a JS file
    In JSON you cannot add comments.
    So converted to JS module
    For different file types see: https://prettier.io/docs/en/configuration.html

    How to do changes in a lot of files at once?
    > /webclient> npx prettier --write .  
  */
module.exports = {
  semi: false, // https://prettier.io/docs/en/options.html#semicolons
  singleQuote: true,
  endOfLine: 'auto',
  printWidth: 120,
  /* Why go to 120? And not the default 80? 
  The kernel went from 80 to 100 in may 2020. https://www.phoronix.com/scan.php?page=news_item&px=Linux-Kernel-Deprecates-80-Col
  Kernel supports development in very old hardware.
  So I went to 120. VK Oct 2020
  */

  /* Ref: https://prettier.io/docs/en/options.html#jsx-brackets */
  jsxBracketSameLine: true,
}
