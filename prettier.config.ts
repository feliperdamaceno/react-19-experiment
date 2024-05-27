/** @type {import("prettier").Config} */
export default {
  endOfLine: 'lf',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  importOrder: [
    '^(common|components)(.*)$',
    '^data-service(.*)$',
    '^(hooks|utils|context)(.*)$',
    '^(constants|themes|route-urls)(.*)$',
    '^../(.*)$',
    '^./(.*)$'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports']
}
