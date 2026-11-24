import json,re
exec(open('conv.py').read().split('out={}')[0])  # parse_exam, z, split_labels
raw=json.load(open('raw.json')); meta=json.load(open('meta.json'))
SUBJ={ # 正解表の名前 -> (slug, 表示名, 分, 模試の型)
 '国語':('kokugo','国語',90,'kokugo'),
 '地理総合，地理探究':('geo','地理総合，地理探究',60,'geo'),
 '歴史総合，日本史探究':('nihonshi','歴史総合，日本史探究',60,'nihonshi'),
 '歴史総合，世界史探究':('sekaishi','歴史総合，世界史探究',60,'sekaishi'),
 '公共，倫理':('rinri','公共，倫理',60,'rinri'),
 '公共，政治・経済':('seikei','公共，政治・経済',60,'seikei'),
 '数学Ⅰ，数学Ａ':('math1a','数学Ⅰ，数学Ａ',70,'math1a'),
 '数学Ⅱ，数学Ｂ，数学Ｃ':('math2bc','数学Ⅱ，数学Ｂ，数学Ｃ',70,'math2bc'),
 '物理基礎':('phyb','物理基礎',30,'phyb'),'化学基礎':('chemb','化学基礎',30,'chemb'),'生物基礎':('biob','生物基礎',30,'biob'),'地学基礎':('earthb','地学基礎',30,'earthb'),
 '物理':('phy','物理',60,'phy'),'化学':('chem','化学',60,'chem'),'生物':('bio','生物',60,'bio'),'地学':('earth','地学',60,'earth'),
 'リーディング':('eng-r','英語（リーディング）',80,'eng-r'),'リスニング':('eng-l','英語（リスニング）',30,'eng-l'),
 '情報Ⅰ':('joho1','情報Ⅰ',60,'joho1'),
 '世界史Ｂ':('sekaishi-b','世界史Ｂ',60,'sekaishi'),'日本史Ｂ':('nihonshi-b','日本史Ｂ',60,'nihonshi'),'地理Ｂ':('geo-b','地理Ｂ',60,'geo'),
 '現代社会':('gendai','現代社会',60,'seikei'),'倫理':('rinri-old','倫理',60,'rinri'),'政治・経済':('seikei-old','政治・経済',60,'seikei'),'倫理，政治・経済':('rinsei','倫理，政治・経済',60,'seikei'),
}
YEAR={'8':'令和8年度','7':'令和7年度','6':'令和6年度'}
KIND={'h':('hon','本試験'),'t':('tsui','追・再試験')}
# ---- pass2 (手で確かめた2回目の読み取り) ----
p2={}; cur=None
for line in open('pass2.txt',encoding='utf-8'):
    line=line.rstrip('\n')
    if line.startswith('#'): cur=line[1:]; p2[cur]=[]; continue
    if line.startswith('D '):
        m=re.match(r'D 第(\d+)問[（(](\d+)[)）]',line); p2[cur].append({'no':int(m[1]),'points':int(m[2]),'items':[]}); continue
    m=re.match(r' P(.*?)\|(.*)$',line); pt=z(m[1]); cells=m[2].split(' ')
    rows=[]
    for c in cells:
        lab,ans=c.split('=',1); rows.append((lab,ans))
    p2[cur][-1]['items'].append(('ROWS',pt,rows))
def build_item(pt,rows,dno,anoms):
    star='＊' in pt; mm=re.search(r'\(各(\d+)\)',pt); each=int(mm[1]) if mm else None
    pn=re.sub(r'\(各\d+\)','',pt).replace('＊',''); tag=None
    if star and len(pn)>=2: tag=int(pn[0]); pn=pn[1:]
    parts=[]
    for lab,a in rows:
        labs,rng=split_labels(lab); a=z(a); note=''
        mm=re.search(r'\((.*?)\)$',a)
        if mm: note=mm[1]; a=a[:mm.start()]
        if rng: ans=re.split(r'[－\-]',a); anyo=True
        elif len(labs)>1: ans=a.split('，'); anyo=note=='解答の順序は問わない'
        else: ans=[a]; anyo=False
        part={'labels':labs,'answers':ans}
        if anyo: part['anyOrder']=True
        if note and note!='解答の順序は問わない':
            m2=re.fullmatch(r'(.+?)の解答の順序は問わない',note)
            if m2: part['anyOrderOf']=m2[1].split('，')
            else: anoms.append('note '+note)
        parts.append(part)
    it={'points':int(pn),'parts':parts}
    if each: it['each']=each
    if tag: it['tag']=tag
    return it
def from_raw(key,pages):
    an=[]; dai=[]
    for pg in pages:
        for h in pg['halves']:
            for p in h['pts']:
                rs=[r for r in h['rows'] if inside(p,r)]
                if not rs: continue
                d=next((c for c in h['dai'] if inside(c,rs[0])),None)
                m=re.match(r'第(\d+)問.*?\((\d+)\)',z(d['t'])) if d else None
                if not m: continue
                no=int(m[1])
                if not dai or dai[-1]['no']!=no: dai.append({'no':no,'points':int(m[2]),'items':[]})
                dai[-1]['items'].append(build_item(z(p['t']),[(r['label'],r['ans'] or '') for r in rs],no,an))
    return dai,an
exams={}
for key,v in list(raw.items()):
    yk,name=key.split('|'); y=yk[1]; k=yk[2]
    if '基礎／' in name or (y=='6' and '数学' in name): continue
    if name not in SUBJ: continue
    exams[(y,k,name)]=from_raw(key,v['pages'])[0]
for key,dl in p2.items():
    yk,name=key.split('|'); y=yk[1]; k=yk[2]; an=[]
    exams[(y,k,name)]=[{'no':d['no'],'points':d['points'],'items':[build_item(pt,rows,d['no'],an) for (_,pt,rows) in d['items']]} for d in dl]
# s7t 数学ⅡBC 第4問 ア〜オ
d4=[d for d in exams[('7','t','数学Ⅱ，数学Ｂ，数学Ｃ')] if d['no']==4][0]
d4['items']=[it for it in d4['items'] if not any(l in ('ア','イ','ウ','エ','オ') for p in it['parts'] for l in p['labels'])]
d4['items'].insert(0,{'points':2,'parts':[{'labels':['ア','イ','ウ','エ','オ'],'answers':['－','3','－','1','2']}]})
# 化学 R7：新課程は第1〜5問
for k in 'ht': exams[('7',k,'化学')]=[d for d in exams[('7',k,'化学')] if d['no']<=5]
def find(ex,dno,label):
    for d in ex:
        if d['no']!=dno and dno is not None: continue
        for it in d['items']:
            for p in it['parts']:
                if label in p['labels']: return it
    raise KeyError((dno,label))
def cond(y,k,name,dno,a,b,pairs):
    ex=exams[(y,k,name)]; it=find(ex,dno,a)
    it['parts']=[{'labels':[a,b],'answers':list(pairs[0]),'alts':[list(x) for x in pairs]}]
cond('8','h','歴史総合，日本史探究',3,'16','17',[('1','5'),('2','6')])
cond('8','h','公共，政治・経済',3,'9','10',[('1','5'),('2','2')])
cond('8','h','公共，政治・経済',4,'21','22',[('1','4'),('2','3')])
cond('7','h','公共，倫理',5,'27','28',[('1','2'),('2','5')])
cond('7','t','公共，倫理',5,'27','28',[('1','5'),('2','3'),('3','4')])
it13=find(exams[('6','h','世界史Ｂ')],2,'13'); it13['parts']=[{'labels':['13'],'answers':['2'],'alts':[['2'],['4']]}]
it14=find(exams[('6','h','世界史Ｂ')],2,'14'); it14['parts']=[{'labels':['14'],'answers':['1'],'dep':{'label':'13','map':{'2':'1','4':'5'}}}]
def req(y,k,name,dno,label,needs): find(exams[(y,k,name)],dno,label)['requires']=needs
req('8','h','数学Ⅱ，数学Ｂ，数学Ｃ',5,'ク',['キ'])
req('7','h','数学Ⅰ，数学Ａ',2,'シ',['カ','キ','ク','ケ','コ','サ'])
req('7','h','数学Ⅰ，数学Ａ',2,'ト',['テ'])
req('7','h','数学Ⅰ，数学Ａ',4,'ス',['コ','サ','シ'])
req('7','h','数学Ⅰ，数学Ａ',4,'ツ',['ソ','タ','チ'])
req('7','h','数学Ⅱ，数学Ｂ，数学Ｃ',5,'チ',['ス','セ','ソ','タ'])
def part(y,k,name,label,answers,pts): find(exams[(y,k,name)],None,label).setdefault('partial',[]).append({'answers':answers,'points':pts})
part('8','h','生物','23',['2','3'],1)
part('8','t','生物基礎','117',['2','3'],1)
part('7','h','生物基礎','106',['1','4','7'],1); part('7','h','生物基礎','116',['1','4','7'],1)
part('7','h','生物','21',['1','4'],2); part('7','h','生物','23',['1','2'],2)
part('7','t','生物','13',['2','3'],2); part('7','t','生物','20',['8'],2)
for l,a in [('2',['2','3']),('7',['1','6']),('10',['3','5']),('12',['1','3'])]: part('6','h','生物',l,a,2)
find(exams[('6','h','生物')],None,'13')['one']=2
part('6','t','生物','5',['6'],2)
# ---- 仕上げ・検算 ----
out=[]; errs=[]
for (y,k,name),dai in sorted(exams.items(),key=lambda x:(-int(x[0][0]),x[0][1],list(SUBJ).index(x[0][2]))):
    slug,disp,mins,moshi=SUBJ[name]
    if y=='6' and name=='国語': mins=80
    kana=any(re.search(r'[ア-ン]',l) for d in dai for it in d['items'] for p in it['parts'] for l in p['labels'])
    for d in dai:
        for it in d['items']: it.pop('tag',None)
    ex={'id':f'r{y}-{KIND[k][0]}-{slug}','year':YEAR[y],'kind':KIND[k][1],'subject':disp,'minutes':mins,'moshi':moshi,'type':'kana' if kana else 'num','daimon':dai}
    if name=='数学Ⅱ，数学Ｂ，数学Ｃ':
        ex['select']={'from':[4,5,6,7],'count':3}
        for d in dai:
            if d['no']>=4: d['select']=True
    req_tot=sum(d['points'] for d in dai if not d.get('select'))+ (sum(sorted([d['points'] for d in dai if d.get('select')])[-3:]) if ex.get('select') else 0)
    ex['total']=req_tot
    want=200 if name=='国語' else 50 if '基礎' in name else 100
    if req_tot!=want: errs.append(f"{ex['id']} total {req_tot}")
    labels=[]
    for d in dai:
        s=sum(it['points'] for it in d['items'])
        if s!=d['points']: errs.append(f"{ex['id']} 第{d['no']}問 {s}!={d['points']}")
        for it in d['items']:
            n=sum(len(p['labels']) for p in it['parts'])
            if it.get('each') and it['each']*n!=it['points']: errs.append(f"{ex['id']} each mismatch {it}")
            for p in it['parts']:
                if len(p['labels'])!=len(p['answers']): errs.append(f"{ex['id']} len {p}")
                for a in p['answers']:
                    if not re.fullmatch(r'[0-9a-f－]',a): errs.append(f"{ex['id']} ans {a} {p['labels']}")
                labels+=[(d['no'],l) for l in p['labels']]
    if not kana:
        nums=[int(l) for _,l in labels]; st=nums[0]
        if nums!=list(range(st,st+len(nums))): errs.append(f"{ex['id']} labels not contiguous {nums[:5]}..")
    else:
        if len(set(labels))!=len(labels): errs.append(f"{ex['id']} dup labels")
    out.append(ex)
print(len(out),'exams'); print('\n'.join(errs) or 'no errors')
json.dump(out,open('exams.json','w'),ensure_ascii=False)
from collections import Counter
print(Counter((e['year'],e['kind']) for e in out))
