# 動画フィルター

## 概要

YouTubeの動画タイトルに指定した文字列を含む動画を非表示にする。

### フィルタリング対応画面

- [ホーム画面](https://www.youtube.com)
- [登録チャンネル画面](https://www.youtube.com/feed/subscriptions)
- [動画視聴画面](https://youtube.com/watch)

## インストールとセットアップ

```
$ git clone https://github.com/sayuprc/youtube_filter.git

$ cd youtube_filter

$ yarn

$ yarn build
```

build完了後、chrome拡張の設定画面にある「パッケージ化されていない拡張機能を読み込む」からdistフォルダを選択する。

## 使い方

拡張機能のアイコンをクリックするとテキストボックスが表示されるのでそこにフィルタリングしたい文字列を入力してください。

フィルタリングしたい文字列が複数ある場合は、改行してください。

入力が完了したら、保存ボタンを押してください。

次回読み込み時からフィルタリング対象文字列をタイトルに含む動画が表示されなくなります。
