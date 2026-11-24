import re,sys,json
# map_*.txt → lib/kakomon/units.gen.json  (解答欄キー → 単元 id)
out={}
for fn in sys.argv[1:]:
    cur=None
    for line in open(fn,encoding='utf-8'):
        line=line.strip()
        if not line: continue
        if line.startswith('@'): cur=line[1:]; out.setdefault(cur,{}); continue
        parts=line.split()
        u=parts[-1]
        unit=('h-sci-' if re.match(r'(phy|chem|bio|earth)',u) else 'h-')+u
        if len(parts)==3:  # kana: 大問 記号列 単元
            d,labs=parts[0],parts[1]
            for l in labs: out[cur][f'{d}-{l}']=unit
        else:
            r=parts[0]
            a,b=(r.split('-')+[r])[:2]
            for n in range(int(a),int(b)+1): out[cur][str(n)]=unit
# 試験にない解答欄は落とす (大問ごとの記号は多めに書いてよい)
exams={e['id']:e for e in json.load(open('lib/kakomon/exams.json',encoding='utf-8'))}
for k,m in out.items():
    e=exams[k]; valid=set()
    for d in e['daimon']:
        for it in d['items']:
            for p in it['parts']:
                for l in p['labels']: valid.add(f"{d['no']}-{l}" if e['type']=='kana' else l)
    for key in list(m):
        if key not in valid: del m[key]
json.dump(out,open(sys.argv[0].replace('scripts/kakomon/gen-units.py','lib/kakomon/units.gen.json') if 'scripts/kakomon' in sys.argv[0] else 'lib/kakomon/units.gen.json','w'),ensure_ascii=False,separators=(',',':'))
print({k:len(v) for k,v in out.items()})
