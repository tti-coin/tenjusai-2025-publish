# tenjusai-2025-publish

## 概要

このリポジトリは、[tenjusai-2025](https://github.com/tti-coin/tenjusai-2025) プロジェクトの「AIお料理コンテスト」で作成された料理レシピを静的Webページとして公開するためのものです。

## 特徴

- 料理データ（レシピ・画像）は `recipies/` ディレクトリに保存されます。
- tenjusai-2025 のバックエンドが新しい料理データを自動でこのリポジトリにPushします。
- GitHub ActionsによるCD（継続的デプロイ）が設定されており、Pushされるたびに自動で静的ページがビルド・公開されます。
- 公開ページは [https://tti-coin.github.io/tenjusai-2025-publish/](https://tti-coin.github.io/tenjusai-2025-publish/) で閲覧できます。
- フロントエンドはVite + Vue3で構築されており、tenjusai-2025本体と同様のUI/UXです。

## データの流れ

1. tenjusai-2025のバックエンドでユーザーがレシピを作成
2. バックエンドが `recipies/` 以下に `data.json`・`image.png` を追加し、このリポジトリにPush
3. PushをトリガーにGitHub Actionsが自動でビルド・デプロイ
4. GitHub Pagesで即時に公開・閲覧可能

## 開発・運用上の注意

- 静的ページのビルド・デプロイはGitHub Actions（.github/workflows/deploy.yml）で自動化されています。
- Viteの `base` 設定は `/tenjusai-2025-publish/` です。
- `recipies/` ディレクトリの構造やファイル名はtenjusai-2025本体の仕様に準拠してください。
- 公開用の静的ファイルは `dist/` ディレクトリに出力されます。
- GitHub Pagesの「Source」は「GitHub Actions」に設定してください。

## 参考

- [tenjusai-2025（本体）](https://github.com/tti-coin/tenjusai-2025)
