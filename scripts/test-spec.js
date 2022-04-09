// use -s 指定的特定hooks名称
const argv = require('minimist')(process.argv.slice(2));
const { s } = argv;
console.log(chalk.blue('Run test of', s));
$`npx jest --runTestsByPath packages/hooks/src/${s}/__tests__/index.test.ts`;
