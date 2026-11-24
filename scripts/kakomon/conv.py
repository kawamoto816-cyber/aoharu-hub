import json,re,sys
raw=json.load(open('raw.json'))
FW=str.maketrans('０１２３４５６７８９ａｂｃｄｅｆＡＢＣＤ（）　','0123456789abcdefABCD() ')
def z(s): return re.sub(r'\s+','',(s or '').translate(FW))
def inside(c,r): m=(r['y0']+r['y1'])/2; return c['y0']<m<c['y1']
SIMPLE=re.compile(r'^[0-9a-f]$')
def split_labels(lab):
    lab=z(lab)
    m=re.fullmatch(r'(\d+)[－\-](\d+)',lab)
    if m: return [str(i) for i in range(int(m[1]),int(m[2])+1)], True
    if re.fullmatch(r'\d+',lab): return [lab], False
    return [x for x in lab.split('，') if x], False
def parse_exam(key,v,pages=None):
    pages=pages or v['pages']
    dai=[]; anomalies=[]
    for pg in pages:
        for h in pg['halves']:
            cur=None
            for p in h['pts']:
                rs=[r for r in h['rows'] if inside(p,r)]
                if not rs: continue
                d=next((c for c in h['dai'] if inside(c,rs[0])),None)
                dt=z(d['t']) if d else '?'
                m=re.match(r'第(\d+)問(.*?)\((\d+)\)',dt)
                if not m:
                    anomalies.append(f'daimon? {dt[:40]} rows={[z(r["label"]) for r in rs]}'); continue
                no=int(m[1]); dp=int(m[3])
                if not dai or dai[-1]['no']!=no: dai.append({'no':no,'points':dp,'items':[]})
                pt=z(p['t'])
                star='＊' in pt
                mm=re.search(r'\(各(\d+)\)',pt); each=int(mm[1]) if mm else None
                pn=re.sub(r'\(各\d+\)','',pt).replace('＊','')
                if not re.fullmatch(r'\d+',pn): anomalies.append(f'pts? {pt} in 第{no}問'); continue
                parts=[]
                for r in rs:
                    labs,rng=split_labels(r['label'])
                    a=z(r['ans'])
                    note=''
                    mm=re.search(r'\((.*?)\)$',a)
                    if mm: note=mm[1]; a=a[:mm.start()]
                    if rng:
                        ans=re.split(r'[－\-]',a); any_=True
                    elif len(labs)>1:
                        ans=a.split('，'); any_= note=='解答の順序は問わない'
                    else:
                        ans=[a]; any_=False
                    ok=len(ans)==len(labs) and all(SIMPLE.fullmatch(x) or x in('－','±') for x in ans)
                    part={'labels':labs,'answers':ans}
                    if any_: part['anyOrder']=True
                    if note and note!='解答の順序は問わない': part['note']=note
                    if not ok: anomalies.append(f'ans? 第{no}問 {labs}={a} note={note}')
                    parts.append(part)
                it={'points':int(pn),'parts':parts}
                if each: it['each']=each
                ncell=sum(len(x['labels']) for x in parts)
                if not star and not each and ncell>1 and not any(x.get('anyOrder') for x in parts) and not re.search(r'[ア-ン]',parts[0]['labels'][0]):
                    anomalies.append(f'multi-cell no star 第{no}問 {[x["labels"] for x in parts]}')
                dai[-1]['items'].append(it)
            orph=[r for r in h['rows'] if not any(inside(p,r) for p in h['pts'])]
            for r in orph:
                if re.fullmatch(r'[\d－ア-ン，]+',z(r['label'])): anomalies.append('orphan '+z(r['label'])+'='+z(r['ans']))
    for d in dai:
        s=sum(i['points'] for i in d['items'])
        if s!=d['points']: anomalies.append(f'sum 第{d["no"]}問 {s}!={d["points"]}')
    return dai,anomalies
out={}
for key,v in raw.items():
    if '基礎／' in key:
        for pg in v['pages']:
            t=z(pg['title']); sub=re.search(r'物理基礎|化学基礎|生物基礎|地学基礎',t.split('点満点)')[-1] if '(50点満点)' in t else t)
            subs=[s for s in ['物理基礎','化学基礎','生物基礎','地学基礎'] if s in re.sub(r'物理基礎／化学基礎／生物基礎／地学基礎','',t)]
            k2=key.split('|')[0]+'|'+(subs[0] if subs else '??')
            out[k2]=parse_exam(k2,v,[pg])
    else: out[key]=parse_exam(key,v)
res={}
for k,(dai,an) in out.items():
    tot=sum(d['points'] for d in dai)
    res[k]={'daimon':dai}
    if an or tot not in (50,100,200): print(k,'total',tot); [print('   ',a) for a in an]
json.dump(res,open('parsed.json','w'),ensure_ascii=False,indent=0)
print(len(res),'exams')
