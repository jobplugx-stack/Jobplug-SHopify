"""Validate local theme structure and JS syntax. Not a Shopify-render or checkout test."""
from pathlib import Path
import json,re,subprocess,tempfile,shutil,sys
root=Path(__file__).resolve().parents[1]
node=shutil.which('node')
if not node:
 fallback=Path.home()/'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node'
 node=str(fallback) if fallback.exists() else None
if not node: sys.exit('Node.js is required for JavaScript syntax checks.')
for directory in ('config','locales','templates'):
 for f in (root/directory).rglob('*.json'): json.loads(f.read_text())
for f in (root/'sections').glob('*.liquid'):
 m=re.search(r'{%\s*schema\s*%}(.*?){%\s*endschema\s*%}',f.read_text(),re.S)
 if m: json.loads(m[1])
with tempfile.TemporaryDirectory() as tmp:
 for f in (root/'assets').iterdir():
  if f.name.endswith(('.js','.js.liquid')):
   text=re.sub(r"{{\s*'([^']+)'\s*\|\s*asset_url\s*}}",lambda m:'https://cdn.example.com/'+m[1],f.read_text())
   p=Path(tmp)/(f.name.removesuffix('.liquid'));p.write_text(text)
   subprocess.run([node,'--check',str(p)],check=True)
for directory in ('layout','sections','snippets','assets'):
 for f in (root/directory).glob('*.liquid'):
  for name in re.findall(r"'([^']+)'\s*\|\s*asset_url",f.read_text()):
   if not ((root/'assets'/name).exists() or (root/'assets'/(name+'.liquid')).exists()):
    sys.exit(f'Missing asset {name} in {f.name}')
layout=(root/'layout/theme.liquid').read_text()
assert '{{ content_for_header }}' in layout and '{{ content_for_layout }}' in layout
print('PASS: theme structure, JSON, section schemas, asset references and JavaScript syntax.')
print('Shopify preview and purchase tests remain separate required checks.')
