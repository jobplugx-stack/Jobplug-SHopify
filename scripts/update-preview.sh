#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
branch=$(git branch --show-current)
if [ "$branch" != "redesign-preview" ]; then
  echo 'Stop: updates must run on redesign-preview. Release and main branches are not edited by this command.' >&2
  exit 1
fi
if [ "$#" -ne 1 ] || [ -z "$1" ]; then
  echo 'Usage: sh scripts/update-preview.sh "Describe your change"' >&2
  exit 1
fi
python3 scripts/check.py
git fetch origin
# Refuse a stale branch rather than overwrite changes made in Shopify.
if git show-ref --verify --quiet refs/remotes/origin/redesign-preview; then
  git merge-base --is-ancestor origin/redesign-preview HEAD || {
    echo 'Remote has new changes. Commit local work then git pull --rebase origin redesign-preview and resolve before retrying.' >&2
    exit 1
  }
fi
git add assets config layout locales sections snippets templates scripts .github .gitignore .shopifyignore README.md
if ! git diff --cached --quiet; then git commit -m "$1"; fi
git push -u origin redesign-preview
echo 'Pushed preview branch. This command never publishes a Shopify theme.'
