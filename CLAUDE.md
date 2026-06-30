# Koharubi (コハルビ) — Claude Code 作業指針

## サイト概要

- **サイト名**: Koharubi（コハルビ）
- **リポジトリ**: `jun-ju-waaaaa/kids-handmade-wear`
- **公開URL**: `https://jun-ju-waaaaa.github.io/kids-handmade-wear/`
- **種別**: 静的HTML/CSS/JS シングルページサイト（GitHub Pages）
- **内容**: ハンドメイド子ども服のブランドサイト（受注制作）
- **ブランチ運用**: `main` に直接コミット＆プッシュ（PRなし）

---

## 設定値

| 項目 | 値 |
|------|-----|
| GA4 測定ID | `G-XXXXXXXXXX`（このサイト専用・index.html参照） |
| Instagram | `https://www.instagram.com/atelier_koharubi/` / `@atelier_koharubi` |
| OGP画像 | `images/og-image.jpg`（1200×630px） |
| apple-touch-icon | `images/apple-touch-icon.png` |
| iOS ホーム画面名 | `<meta name="apple-mobile-web-app-title" content="Koharubi">` |

---

## ファイル構成

```
index.html          シングルページ本体
css/style.css       スタイルシート
js/main.js          JavaScript（ナビ・スクロール・フェードイン）
images/
  og-image.jpg      OGP共有画像（1200×630）
  hero3-desktop.jpg ヒーロー背景（PC）
  hero3-mobile.jpg  ヒーロー背景（モバイル）
  apple-touch-icon.png
sitemap.xml
robots.txt
```

---

## これまでの主な実装内容（2026年6月）

### 構造・コンテンツ
- **サイズセクション削除**: オーダーメイドの性質上サイズ保証不可のため、サイズセクション・ナビリンク・FAQのサイズ質問を全削除
- **オーダーの流れ**: 6ステップ構成。各ステップ番号の下にSVGストロークアイコン（`.step-icon`）を追加
- **ご注意書き（`.order-note`）**: オーダーセクション下部に枠線付きカード形式で追加
  ```
  ご注文前に
  ・すべてハンドメイドのため、多少の個体差がございます。
  ・オーダー確定後の大幅なデザイン変更・キャンセルはお受けできません。
  ・製作状況により、お届けまでお時間をいただく場合がございます。
  ```

### SEO / 技術
- **noindex解除**: 公開インデックス対応済み
- **構造化データ（JSON-LD）**: Organization / WebSite / HowTo / FAQPage の4種を `<head>` 内に実装
  - すべて本文の文言をそのまま使用（新規コピー追加なし）
- **OGP・Twitter Card**: `og:image`（og-image.jpg）・`og:locale` 含む全タグ実装済み
- **robots.txt / sitemap.xml**: 新規作成済み
- **GA4**: 専用測定ID（index.html参照）を `<head>` 直後に実装
- **フッター Instagram修正**: `@koharubi_handmade`（誤）→ `@atelier_koharubi`（正）に統一

### iOS対応
- `<meta name="apple-mobile-web-app-title" content="Koharubi">` 追加
  - ホーム画面アイコン名: **Koharubi**
  - ブラウザタブ・ブックマーク名: `<title>` 全文（長いもの）
- これらは独立して制御される

### バグ修正
- **自動スクロール不具合修正**（`js/main.js`）:
  - **原因**: ナビリンクがURLに `#hash` を残す仕様のため、その状態でブックマーク/ホーム画面保存すると次回開いたときに該当セクションへジャンプしていた
  - **対応**:
    1. ページ読み込み時に `history.scrollRestoration = 'manual'` + 強制 `scrollTo(0,0)` + ハッシュをURLから削除
    2. 全ての `a[href^="#"]` クリックをJSで制御し `scrollIntoView` でスムーススクロール、URLにハッシュを残さない（`history.replaceState`）

---

## CSS設計メモ

- カラー変数は `:root` に集約 (`--color-accent: #8b7355` など)
- `.step-icon`: `color: var(--color-accent); width: 36px; height: 36px; margin-bottom: 12px;`
- `.fade-in` / `.fade-in.visible`: IntersectionObserverで制御（threshold: 0.15）
- ヒーローは `height:0; padding-bottom:40%` の比率ボックス（PCは40%、モバイルは60%）
- モバイルナビ: `position:fixed; transform:translateX(100%)` でオフスクリーン、`.open` クラスで表示

---

## 方針・制約

- **本文の文章は変更しない**: SEO・構造化データ実装時も含め、見える文章は原則そのまま維持
- **シングルページ構成を維持**: 新セクション追加は慎重に
- **コメントは必要最小限**: コードに過剰なコメントを入れない
