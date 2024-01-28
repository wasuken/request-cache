# 自動テスト

本当に最低限疎通できるか程度のテストをテストDBスキーマに接続したテストコンテナで検証する。

```sh
$ dp exec app-test sh
$ npm test
```

# データ取得サイクル

Request 結果を定期的に取得する

#h# 1. 巡回

だいたい一分ごとに処理をまわす想定。以下の処理をおこなう

- url_info テーブルに登録された内容を元に url_info_queue に登録を試みる。一度に登録できるものは一つを想定(テーブルとしては複数保持可能)
- url_info_queue レコードにて、exec_datetime が現在時刻を超過するレコードが存在した場合、「2. 取得処理」をおこなう。

## 2. 取得処理

対象レコードを元に URL にたいして、request を行い、result に body をいれて、result に取得結果の可否をいれた上で

url_info_queue_history に登録する。

その後、url_info_queue にあたらしいレコードを登録する。

# View 関連

## top

path: /

/timing, /queue

への Link を表示する。

## url_info

page path: /timing

利用 API: /api/timing, /api/timings

url_info への登録と登録した内容一覧の確認がおこなえる。

## url_info_queue

page path: /queue

利用 API: /api/queues, /api/queues/history

キューにたまっている内容と結果を表示する。
