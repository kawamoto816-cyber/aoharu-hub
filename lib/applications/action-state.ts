// サーバーアクションの結果を画面に返すための型。
// "use server" のファイルからは値をexportできないので、ここに分けている。

export interface ActionState {
  /** true=成功, false=失敗, undefined=まだ実行していない */
  ok?: boolean;
  /** 利用者に見せる一言（「保存しました」など） */
  message?: string;
}

export const EMPTY_ACTION_STATE: ActionState = {};
