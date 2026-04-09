# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`city-name-quiz` は高知県高知市内の町名と、その町名が属する「大街」を答える町名テストWebアプリ。

仕様の詳細は [SPEC.md](./SPEC.md) を参照。

## 技術スタック

- 言語：TypeScript + React
- デプロイ：Vercel

## 開発規約

### 実装方針

- 単一責任の原則に従い、処理は簡潔明瞭に関数に切り出す
- 関数を切り出す際は必ずテストを先に定義してからコードを書く（テスト駆動）
- 許可なく既存の実装をリファクタリングしない

### 編集禁止ファイル

許可なく以下のファイルを編集しないこと：

- `README.md`

### SEO対応

- 公開するWebアプリは検索クローラーにインデックスされないよう対応すること（`noindex` 設定必須）

## Getting Started

### 依存関係のインストール

```bash
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

### ビルド

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

### テスト（全件）

```bash
pnpm vitest run
```

### テスト（単一ファイル）

```bash
pnpm vitest run src/test/quiz.test.ts
```

### テスト（ウォッチモード）

```bash
pnpm vitest
```

### 環境変数

現時点で環境変数の設定は不要。

## Architecture

```
src/
├── assets/
│   └── kochi_city_towns.json   # 元データ（name / reading / district）
├── data/
│   └── kochiCity.ts            # Town[] としてエクスポートする町名データ
├── types/
│   └── index.ts                # Town 型・Oomachi ユニオン型
├── utils/
│   └── quiz.ts                 # pickRandomTowns / gradeAnswer
├── test/
│   ├── setup.ts                # Vitest セットアップ（jest-dom）
│   └── quiz.test.ts            # ユーティリティ関数のユニットテスト
├── App.tsx                     # クイズ画面（QuizItem + App）
└── App.css                     # スタイル
```

### データフロー

1. `kochiCityTowns`（419件）から `pickRandomTowns` で20件をランダム抽出
2. `App` が20問分の状態（解答・採点結果）を管理
3. 採点ボタン押下時に `gradeAnswer` で読み方・大街をそれぞれ判定
4. `QuizItem` が判定結果に応じて正解／不正解エフェクトを表示
