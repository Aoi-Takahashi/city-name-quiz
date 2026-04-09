# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`city-name-quiz` は高知県高知市内の町名と、その町名が属する「大街」を答える町名テストWebアプリ。

## 用語定義

- **町名**：高知市内に存在する町名
- **大街**：町名が属する街のエリア

### 大街一覧

| 大街   | 読み       |
| ------ | ---------- |
| 下知   | しもぢ     |
| 五台山 | ごだいさん |
| 高須   | たかす     |
| 大津   | おおつ     |
| 介良   | けら       |
| 三里   | みさと     |
| 初月   | みかづき   |
| 鏡     | かがみ     |
| 朝倉   | あさくら   |
| 旭街   | あさひまち |
| 鴨田   | かもだ     |
| 潮江   | うしおえ   |
| 長浜   | ながはま   |
| 御畳瀬 | みませ     |
| 浦戸   | うらど     |
| 春野   | はるの     |
| 秦     | はだ       |
| 土佐山 | とさやま   |
| 布師田 | ぬのしだ   |
| 一宮   | いっく     |
| 南街   | みなみまち |
| 北街   | きたまち   |
| 江ノ口 | えのくち   |
| 上街   | かみまち   |
| 高知街 | こうちまち |
| 小高坂 | こだかさか |

参考資料：

- https://www.city.kochi.kochi.jp/uploaded/attachment/51589.pdf
- https://www.city.kochi.kochi.jp/uploaded/life/135132_442838_misc.pdf

## 機能要件

- 町名一覧からランダムに20件の町名を抽出して出題する
- 利用者は入力フォームから「町名の読み方」と「大街」を解答する
- 大街の入力はプルダウン形式
- 正解時：正解エフェクトを表示
- 不正解時：不正解箇所の下部に正解を表示し、不正解エフェクトを表示

出題形式例：

```
問題. 以下の町名の読み方と町名が属する大街を解答しなさい
　唐人町　<町名入力欄>　<大街入力プルダウン>
```

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
pnpm vitest run src/utils/__tests__/quiz.test.ts
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
│   ├── quiz.ts                 # pickRandomTowns / gradeAnswer
│   └── __tests__/
│       └── quiz.test.ts        # ユーティリティ関数のユニットテスト
├── test/
│   └── setup.ts                # Vitest セットアップ（jest-dom）
├── App.tsx                     # クイズ画面（QuizItem + App）
└── App.css                     # スタイル
```

### データフロー

1. `kochiCityTowns`（419件）から `pickRandomTowns` で20件をランダム抽出
2. `App` が20問分の状態（解答・採点結果）を管理
3. 採点ボタン押下時に `gradeAnswer` で読み方・大街をそれぞれ判定
4. `QuizItem` が判定結果に応じて正解／不正解エフェクトを表示
