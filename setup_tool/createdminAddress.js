const sym = require('symbol-sdk');
const arg = process.argv[2];

//引数からテストネットかメインネットかを判断し、参照するプロパティを変更する
let networkType = '';
if (arg == null) {
  console.log('引数に test もしくは main を指定して実行して下さい');
  return;
} else if (arg == 'main') {
  networkType = 104;
} else if (arg == 'test') {
  networkType = 152;
} else {
  console.log('引数に test もしくは main を指定して実行して下さい');
  return;
}

const account = sym.Account.generateNewAccount(networkType);
const privateKey = account.privateKey;
const address = account.address.plain();

console.log('= Address =');
console.log('');
console.log(address);
console.log('');
if (arg == 'main') console.log('社内の誰かにXYMを送ってもらって下さい。');
if (arg == 'test') console.log('このURLから入金して下さい。');
if (arg == 'test') console.log(`https://testnet.symbol.tools/?recipient=${address}&amount=1000`);
console.log('');
console.log('= PrivateKey =');
console.log('');
console.log('こちらを.envファイルに入力して下さい');
console.log(privateKey);
console.log('');
