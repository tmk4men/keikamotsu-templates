#!/bin/bash
# ===================================================
# テンプレート個別デプロイ用ビルドスクリプト
#
# 使い方:
#   ./scripts/deploy.sh 01              # template-01 をルートとしてビルド
#   ./scripts/deploy.sh 01 /my-site     # basePath を指定してビルド
#
# 出力: ./out/ ディレクトリ（そのままデプロイ可能）
# ===================================================

set -e

TEMPLATE_ID="${1:?テンプレート番号を指定してください (例: 01)}"
BASE_PATH="${2:-}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

TEMPLATE_DIR="src/app/template-${TEMPLATE_ID}"
if [ ! -d "$TEMPLATE_DIR" ]; then
  echo "エラー: ${TEMPLATE_DIR} が見つかりません"
  exit 1
fi

echo "=== テンプレート ${TEMPLATE_ID} をビルド中 ==="

# 1. バックアップ
cp src/app/page.tsx src/app/page.tsx.bak
cp next.config.ts next.config.ts.bak

# 2. 選択したテンプレートをルートページに設定
cat > src/app/page.tsx << EOF
export { default } from "./template-${TEMPLATE_ID}/page";
EOF

# 3. basePath を更新（指定があれば）
if [ -n "$BASE_PATH" ]; then
  cat > next.config.ts << EOF
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "${BASE_PATH}",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
EOF
else
  # basePath なし（ルートデプロイ）
  cat > next.config.ts << EOF
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
EOF
fi

# 4. ビルド
npm run build

# 5. 復元
mv src/app/page.tsx.bak src/app/page.tsx
mv next.config.ts.bak next.config.ts

echo "=== ビルド完了: ./out/ ==="
echo "デプロイ先にそのまま ./out/ の中身をアップロードしてください"
