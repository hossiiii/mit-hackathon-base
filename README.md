## Symbol アプリのベースアプリ　　

#### Symbol のアプリを作る上でベースになる最低限の構成となります。

## デモ URL

あとで

## 開発環境構築手順

git clone でダウンロード後トップディレクトリで

```
npm i
```

管理者アカウントの作成

```
node setup_tool/createdminAddress.js test
```

出力された内容をもとに、作成したアカウントに xym を入金する

.env の作成

```
cp .env.sample .env
```

上記.env の「PRIVATE_KEY」に setup_tool で作成した PrivateKey を入力する

開発環境の実行

```
npm run dev
```