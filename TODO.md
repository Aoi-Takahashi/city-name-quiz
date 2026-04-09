# TODO

## 開発手順

### 1. 環境構築・スキャフォールド ✅

- [x] Vite + React + TypeScript プロジェクト作成
- [x] Vitest + React Testing Library 導入
- [x] ESLint 設定

### 2. 型定義 ✅

- [x] `Oomachi` 型（26大街のユニオン型）
- [x] `Town` 型（`name`, `reading`, `oomachi`）
  - ファイル: `src/types/index.ts`

### 3. データ準備 ✅

- [x] 町名JSONデータ作成（`src/assets/kochi_city_towns.json`）
  - 各エントリに `name`, `reading`, `district` を含む

### 4. コアロジック実装（TDD） ✅

- [x] テスト先行でユーティリティ関数を実装
  - [x] 町名一覧からランダムに20件抽出する関数（Fisher-Yates shuffle）
  - [x] 解答の採点関数（読み方・大街それぞれ判定）

### 5. UIコンポーネント実装 ✅

- [x] 出題画面コンポーネント（20問のリスト表示）
- [x] 解答フォーム（読み方テキスト入力 + 大街プルダウン）
- [x] 採点ボタン
- [x] 結果表示（正解エフェクト・不正解エフェクト＋正解表示）

### 6. SEO 対応 ✅

- [x] `index.html` に `<meta name="robots" content="noindex">` 追加
- [x] ページタイトルを `高知市 町名テスト` に変更

### 7. スタイリング ✅

- [x] 正解エフェクト（緑ハイライト・フラッシュアニメーション）
- [x] 不正解エフェクト（赤ハイライト・フラッシュアニメーション）
- [x] 全体レイアウト

### 8. ドキュメント整備 ✅

- [x] `CLAUDE.md` の Getting Started セクション記入
  - ビルド・lint・テストコマンド
  - 開発サーバー起動方法
  - 単一テスト実行方法
- [x] `CLAUDE.md` の Architecture セクション記入

### 9. Vercel デプロイ ✅

- [x] Vercel プロジェクト作成・連携
- [x] デプロイ確認

### 10. favicon 設定 ✅

- [x] favicon 画像作成・配置
- [x] `index.html` の `<link rel="icon">` を更新

### 11. ドキュメント整理 ✅

- [x] `CLAUDE.md` の仕様関連内容を `SPEC.md` に移行
- [x] `CLAUDE.md` は開発ガイド（コマンド・規約）のみに整理

### 12. FIXME 修正 ✅

- [x] `src/constants.ts` 内の `/* FIXME */` 箇所（薊野・葛島・鴨部・瀬戸・針木・横浜・久万・みづき）の大街を正しい値に修正
