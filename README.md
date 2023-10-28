Request結果を定期的に取得する

# データ取得サイクル

## 1. 巡回

だいたい一分ごとに処理をまわす想定。以下の処理をおこなう

- url_infoテーブルに登録された内容を元にurl_info_queueに登録を試みる。一度に登録できるものは一つを想定(テーブルとしては複数保持可能)
- url_info_queueレコードにて、exec_datetimeが現在時刻を超過するレコードが存在した場合、「2. 取得処理」をおこなう。

## 2. 取得処理

対象レコードを元にURLにたいして、requestを行い、resultにbodyをいれて、resultに取得結果の可否をいれた上で

url_info_queue_historyに登録する。

その後、url_info_queueにあたらしいレコードを登録する。

# View関連

## top

path: /

/timing, /queue

へのLinkを表示する。

## url_info

page path: /timing

利用API: /api/timing, /api/timings

url_infoへの登録と登録した内容一覧の確認がおこなえる。

## url_info_queue

page path: /queue

利用API: /api/queue, /api/queues, /api/queue/history

キューにたまっている内容と結果を表示する。