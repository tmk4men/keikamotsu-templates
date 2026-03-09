# 作業引き継ぎドキュメント

## プロジェクト概要
- **軽貨物ドライバー事業向けHPテンプレート集** (Next.js / Static Export)
- basePath: `/keikamotsu-templates`
- 採用HPテンプレート: 16種 (`/template-01` ~ `/template-16`)
- コーポレートHPテンプレート: 8種 (`/corporate/corporate-01` ~ `/corporate/corporate-08`)

---

## 完了済み作業（2026-03-08）

### C01〜C05 デザイン改善（画像・ビジュアル強化）
以下の改善を各テンプレートに適用済み：

| 改善項目 | 内容 |
|---|---|
| ヒーロー動画背景 | `<video>`要素追加済み。poster画像フォールバックあり |
| 強みセクション画像化 | テキストのみ → 画像+テキストの2カラム交互レイアウト |
| 会社概要+写真 | テーブル+会社外観写真の2カラム、キャプション付き |
| ビジュアルインターリュード | セクション間の全幅画像ブレイク（配送風景+オーバーレイテキスト） |
| フォトギャラリー新設 | 「職場の風景」6枚グリッド、ホバーでズーム+キャプション |
| レスポンシブ対応 | タブレット/モバイルで1カラム化、ギャラリー2列化 |

### C06〜C08
元々画像が10枚程度あり充実していたため、上記改善は未適用。
ただし動画背景は今後追加予定。

---

## 未完了作業（次回やること）

### 1. 動画ファイルの生成と配置

Geminiで以下の動画を生成し、`public/videos/` に配置する：

```
public/videos/
├── hero-daytime.mp4      ← 日中の配送バン走行（汎用ヒーロー）
├── hero-nightcity.mp4    ← 夜の都市走行（ダーク・テック系）
├── hero-bright.mp4       ← 明るくカラフルな走行（ポップ系）
├── delivery-scene.mp4    ← 荷物を置く配達シーン
├── loading-scene.mp4     ← 積み込みシーン
├── team-scene.mp4        ← チームワーク（採用CTA用）
├── driving-dynamic.mp4   ← ダイナミック走行（力強い系）
└── driving-nature.mp4    ← 田舎道走行（エコ・ナチュラル系）
```

#### Gemini動画生成プロンプト一覧

**1. hero-daytime.mp4（汎用・メイン）**
対象: C01, C02, C03, C06, C08, T02, T05, T08, T14
```
Cinematic slow-motion aerial shot of a white delivery van driving smoothly along a clean suburban road lined with trees. Golden hour sunlight. Shallow depth of field. Camera slowly pans forward following the van. Soft, warm lighting. Professional corporate footage style. No text overlays. Seamless loop. 1920x1080, 24fps.
```

**2. hero-nightcity.mp4（ダーク・テック系）**
対象: C04, C05, C07, T01, T04, T09, T11, T13
```
Cinematic nighttime cityscape with light trails from vehicles on a highway. A delivery van moves through the frame. Blue and purple ambient lighting reflects off wet road surfaces. Futuristic feel. Slow camera dolly. Bokeh city lights in background. Dark moody atmosphere. No text. Seamless loop. 1920x1080, 24fps.
```

**3. hero-bright.mp4（ポップ・明るい系）**
対象: T03, T12, T14, T15
```
Bright and cheerful time-lapse of a delivery van driving through a colorful neighborhood on a sunny day. Vibrant colors, blue sky with white clouds. Flowers and greenery along the road. Upbeat and energetic mood. Slightly sped up. Clean, modern look. No text. Seamless loop. 1920x1080, 24fps.
```

**4. delivery-scene.mp4（配送シーン）**
対象: 全テンプレの「事業内容」「強み」セクション
```
Close-up cinematic shot of a delivery driver carefully placing a cardboard package at a doorstep. Clean uniform, white gloves. Warm natural lighting. Shallow depth of field with soft bokeh background. Professional, trustworthy atmosphere. Slow motion. No text. Seamless loop. 1920x1080, 24fps.
```

**5. loading-scene.mp4（積み込みシーン）**
対象: 全テンプレの「一日の流れ」やインターリュード
```
Smooth tracking shot of a delivery worker loading cardboard boxes into the back of a white cargo van in a clean warehouse. Organized shelves in background. Bright fluorescent lighting. Professional and efficient workflow. Medium speed. No text. Seamless loop. 1920x1080, 24fps.
```

**6. team-scene.mp4（チームワーク）**
対象: 全テンプレの「採用情報」セクション
```
Group of diverse Japanese delivery drivers standing together in front of white cargo vans, smiling and talking. Clean uniforms. Morning sunlight. Warm and friendly atmosphere. Slow camera pan from left to right. Depth of field. Professional corporate recruitment video style. No text. Seamless loop. 1920x1080, 24fps.
```

**7. driving-dynamic.mp4（ダイナミック走行）**
対象: C07, T07, T13, T16
```
Low-angle dynamic tracking shot of a white delivery van speeding along a highway. Motion blur on the road. Dramatic sky. Camera mounted close to ground level. Powerful and energetic feel. Slight slow motion. No text. Seamless loop. 1920x1080, 24fps.
```

**8. driving-nature.mp4（エコ・自然系）**
対象: C03, C06, T06, T10
```
Peaceful aerial drone shot of a white delivery van driving through a lush green countryside road. Rice fields and mountains in the background. Soft natural lighting, slightly overcast. Calm and eco-friendly mood. Slow and steady camera movement. Japanese rural landscape. No text. Seamless loop. 1920x1080, 24fps.
```

### 2. 動画の組み込み作業

動画ファイル配置後、以下のテンプレートに`<video>`要素を追加する：

#### 既にvideo要素追加済み（ファイル配置のみでOK）
- C01〜C05: ヒーローセクションに`<video>`追加済み
  - 現在のsrc: `/keikamotsu-templates/videos/hero.mp4`
  - → テーマに合わせてsrcを変更する必要あり

#### 未実装（video要素の追加が必要）
- **C06〜C08**: ヒーロー + セクション背景
- **T01〜T16**: ヒーロー + セクション背景
  - 採用テンプレは `src/templates/TemplateRenderer.tsx` で共通構造を使用
  - 各テンプレ固有のCSSは `src/app/template-XX/styles.css`

### 3. C01〜C05のvideo srcをテーマ別に変更

```
C01 → hero-daytime.mp4（紺×オレンジ、クリーン企業風）
C02 → hero-daytime.mp4（青×緑、信頼・堅実）
C03 → driving-nature.mp4（緑×琥珀、ナチュラル）
C04 → hero-nightcity.mp4（ダーク×ゴールド、高級感）
C05 → hero-nightcity.mp4（パープル×シアン、テック）
```

---

## プロジェクト構造（主要ファイル）

```
keikamotsu-hp/
├── next.config.ts          # basePath: /keikamotsu-templates, output: export
├── public/
│   ├── images/             # 画像素材（webp/png）
│   └── videos/             # ← ここに動画を配置
├── src/
│   ├── app/
│   │   ├── page.tsx                      # 採用HPギャラリー（トップ）
│   │   ├── corporate/page.tsx            # コーポレートHPギャラリー
│   │   ├── corporate/corporate-XX/       # コーポレートテンプレ（page.tsx + styles.css）
│   │   └── template-XX/                  # 採用テンプレ（page.tsx + styles.css）
│   ├── components/                       # 共有コンポーネント
│   ├── data/
│   │   ├── siteData.ts                   # 採用テンプレ共通データ
│   │   └── corporateSiteData.ts          # コーポレートテンプレ共通データ
│   └── templates/
│       └── TemplateRenderer.tsx          # 採用テンプレ共通レンダラー
```

## 注意事項
- 画像パスは `/keikamotsu-templates/images/xxx.png` (basePath付き)
- CSSからの画像参照は相対パス `../../../../public/images/xxx.webp`
- `output: "export"` なので静的書き出し（SSGのみ）
- 各テンプレのCSSクラスは `cpXX-` (コーポレート) / テンプレ固有プレフィックス
