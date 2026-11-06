from pathlib import Path
import subprocess,sys,zipfile
root=Path(__file__).resolve().parents[1]
subprocess.run([sys.executable,str(root/'scripts/check.py')],check=True)
(root/'releases').mkdir(exist_ok=True)
p=root/'releases/jobplug-shopify-theme.zip'
with zipfile.ZipFile(p,'w',zipfile.ZIP_DEFLATED) as z:
 for directory in ('assets','config','layout','locales','sections','snippets','templates'):
  for f in sorted((root/directory).rglob('*')):
   if f.is_file(): z.write(f,f.relative_to(root))
print(p)
