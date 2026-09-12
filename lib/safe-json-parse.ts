/**
 * AIモデルの応答テキストからJSONを安全にパースするヘルパー。
 *
 * 「JSONのみ出力してください」という指示に従っていても、モデルの応答には
 * 稀に次のような崩れが混ざり、そのままでは JSON.parse に失敗することがある。
 *   - 文字列値の中に生の改行/タブがそのまま入っている
 *     (本来は \n / \t にエスケープされているべき)
 *   - 配列やオブジェクトの末尾に余計なカンマが付いている
 * よくあるこれらの崩れ方を順番に補正してから再パースを試みる。
 */
export function safeJsonParse<T = any>(rawText: string): T {
  const transforms: Array<(text: string) => string> = [
    (text) => text,
    (text) => escapeRawControlCharsInStrings(text),
    (text) => stripTrailingCommas(escapeRawControlCharsInStrings(text)),
  ];

  let lastError: unknown;
  for (const transform of transforms) {
    try {
      return JSON.parse(transform(rawText));
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError instanceof Error ? lastError : new Error('JSONのパースに失敗しました');
}

/**
 * ダブルクォート文字列リテラルの内側にある、生の改行・復帰・タブ文字を
 * \n, \r, \t にエスケープする。文字列の外側(JSONの構造部分)には手を加えない。
 * 既にエスケープ済みの文字(\\ の直後の文字)はそのまま素通りさせる。
 */
function escapeRawControlCharsInStrings(text: string): string {
  let result = '';
  let inString = false;
  let isEscaped = false;

  for (const ch of text) {
    if (inString) {
      if (isEscaped) {
        result += ch;
        isEscaped = false;
        continue;
      }
      if (ch === '\\') {
        result += ch;
        isEscaped = true;
        continue;
      }
      if (ch === '"') {
        inString = false;
        result += ch;
        continue;
      }
      if (ch === '\n') {
        result += '\\n';
        continue;
      }
      if (ch === '\r') {
        result += '\\r';
        continue;
      }
      if (ch === '\t') {
        result += '\\t';
        continue;
      }
      result += ch;
      continue;
    }

    if (ch === '"') {
      inString = true;
    }
    result += ch;
  }

  return result;
}

/** `,}` や `,]` のような、構造上不要な末尾のカンマを取り除く */
function stripTrailingCommas(text: string): string {
  return text.replace(/,(\s*[}\]])/g, '$1');
}
