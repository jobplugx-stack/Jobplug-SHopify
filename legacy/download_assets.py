import concurrent.futures, json, urllib.parse, urllib.request, hashlib
from pathlib import Path
root=Path(__file__).parent
dest=root/'extraction'/'assets';dest.mkdir(exist_ok=True)
records=json.loads((root/'extraction/manifest.json').read_text())
urls={}
for r in records:
 for im in r.get('images',[]):
  u=urllib.parse.urljoin('https://www.jobplug.co',im.get('src',''))
  p=urllib.parse.urlparse(u)
  if '/cdn/shop/' in p.path and p.path.lower().endswith(('.jpg','.png','.jpeg','.webp','.heic','.svg')):
   urls[p.path]=u.split('?')[0]+'?width=1600&format=jpg' if p.path.endswith('.heic') else u.split('?')[0]+'?width=1600'
def get(u):
 try:
  p=urllib.parse.urlparse(u);fn=urllib.parse.unquote(p.path.split('/')[-1]).replace('.heic','.jpg')
  data=urllib.request.urlopen(u,timeout=30).read();(dest/fn).write_bytes(data)
  return {'url':u,'file':fn,'bytes':len(data)}
 except Exception as e: return {'url':u,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: out=list(pool.map(get,urls.values()))
(root/'extraction/assets.json').write_text(json.dumps(out,indent=2))
print(len(out),'asset records',sum('error' not in r for r in out),'downloaded')
