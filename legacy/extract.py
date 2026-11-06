import concurrent.futures, hashlib, json, re, urllib.request, urllib.parse, xml.etree.ElementTree as ET
from pathlib import Path
from html.parser import HTMLParser

ROOT=Path(__file__).parent/'extraction'
BASE='https://www.jobplug.co'
class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.text=[]; self.links=[]; self.images=[]; self.embeds=[]; self.skip=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag in ('script','style'): self.skip+=1
        if tag=='a' and a.get('href'): self.links.append(a['href'])
        if tag=='img': self.images.append(a)
        if tag=='iframe': self.embeds.append(a)
        if tag in ('p','h1','h2','h3','h4','li','div','section','br'): self.text.append('\n')
    def handle_endtag(self,tag):
        if tag in ('script','style'): self.skip=max(0,self.skip-1)
    def handle_data(self,data):
        if not self.skip: self.text.append(data.strip()+' ')
def get(url):
    with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 JobPlug content audit'}),timeout=40) as r: return r.read().decode(),r.status
def name(url):
    p=urllib.parse.urlparse(url)
    return (p.path.strip('/').replace('/','__') or 'home')+('-'+hashlib.sha1(p.query.encode()).hexdigest()[:8] if p.query else '')
seen=set(); urls={BASE+'/'}; maps=[BASE+'/sitemap.xml']
while maps:
    u=maps.pop()
    if u in seen: continue
    seen.add(u)
    try:
        data,_=get(u); (ROOT/(name(u)+'.xml')).write_text(data)
        tree=ET.fromstring(data)
        locs=[e.text for e in tree.iter() if e.tag=='{http://www.sitemaps.org/schemas/sitemap/0.9}loc']
        if tree.tag.endswith('sitemapindex'): maps.extend(locs)
        else: urls.update(locs)
    except Exception as e: print('SITEMAP ERROR',u,str(e))
records=[]
def extract(u):
    try:
        raw,status=get(u); p=Parser(); p.feed(raw)
        text=re.sub(r'\n\s*\n+','\n', ''.join(p.text))
        stem=name(u); (ROOT/(stem+'.html')).write_text(raw); (ROOT/(stem+'.txt')).write_text(text)
        return {'url':u,'status':status,'file':stem+'.html','text_file':stem+'.txt','links':sorted(set(p.links)),'images':p.images,'embeds':p.embeds,'integrations':sorted(set(re.findall(r'https?[^\s<>"\x27]*(?:calendly|docs.google|forms.gle)[^\s<>"\x27]*',raw)))}
    except Exception as e: return {'url':u,'error':str(e)}
done=set()
while urls-done:
    batch=sorted(urls-done)
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        for r in pool.map(extract,batch):
            records.append(r); done.add(r['url']); print(r['url'],r.get('status',r.get('error')))
            for link in r.get('links',[]):
                u=urllib.parse.urljoin(BASE,link); p=urllib.parse.urlparse(u)
                if p.netloc in ('www.jobplug.co','jobplug.co') and p.path.startswith(('/pages/','/products/','/collections/','/blogs/','/policies/')) and not p.query:
                    urls.add(BASE+p.path.rstrip('/'))
for endpoint in ['/products.json?limit=250','/collections.json?limit=250']:
    try:
        raw,_=get(BASE+endpoint); (ROOT/(endpoint.split('?')[0].strip('/'))).write_text(raw)
    except Exception as e: print('JSON ERROR',e)
(ROOT/'manifest.json').write_text(json.dumps(records,indent=2))
print('TOTAL',len(records))
