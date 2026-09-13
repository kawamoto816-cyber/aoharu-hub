"use client";

// ごく稀に、クライアント側のClerkは「ログイン済み」と認識しているのに
// サーバー側(Next.jsのauth())は「未ログイン」と判定したままになる、
// セッション同期のズレが起きることがある。
//
// この状態だと、Clerkの仕様上「既にログイン中のユーザー」には
// 新規登録(サインアップ)モーダルが表示されず、クリックしても
// 何も起きない = ボタンが無反応に見えてしまう
// (「このプランで申し込む」の場合は、サーバー側の401をきっかけに
// 登録モーダルへフォールバックしようとした際に同じ状態が起こり得る)。
//
// openSignUpWithRecovery()は、openSignUp()を呼び出した後に実際に
// モーダルが開いたかどうかを確認し、開かなかった場合(かつクライアント側
// では既にログイン済みの場合)は上記のズレが起きたとみなして、ページを
// 自動的に1回だけ再読み込みし、復旧を試みる。
// (無限リロードを避けるため、1タブ・1セッションにつき1回のみ)

const RELOAD_GUARD_KEY = "aoharu_auth_mismatch_reload_attempted";
const MODAL_CHECK_DELAY_MS = 700;

function hasReloadedAlready(): boolean {
  try {
    return sessionStorage.getItem(RELOAD_GUARD_KEY) === "1";
  } catch {
    // sessionStorageが使えない環境では二重リロード防止ができないため、
    // 安全側に倒して「既に試した」ことにし、自動リロードはしない。
    return true;
  }
}

function markReloaded() {
  try {
    sessionStorage.setItem(RELOAD_GUARD_KEY, "1");
  } catch {
    // no-op
  }
}

function isClerkModalOpen(): boolean {
  const portal = document.getElementById("clerk-components");
  return !!portal && portal.children.length > 0;
}

type ClerkLike = {
  openSignUp: () => void;
  user?: unknown;
};

export function openSignUpWithRecovery(clerk: ClerkLike) {
  clerk.openSignUp();

  window.setTimeout(() => {
    if (isClerkModalOpen()) return; // 正常にモーダルが開いた
    if (!clerk.user) return; // 本当に未ログインなら、読み込みが遅いだけの可能性が高い
    if (hasReloadedAlready()) return;

    markReloaded();
    window.location.reload();
  }, MODAL_CHECK_DELAY_MS);
}
