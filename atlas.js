const {useState,useEffect,useRef,createElement:h,Fragment}=React;
const lessons=window.lessons;
const sections=window.proposalSections;
const nameOf=section=>section.title===section.title.toUpperCase()?section.title.toLowerCase().replace(/^./,c=>c.toUpperCase()):section.title;
const fmt=(value,digits=2)=>value.toLocaleString('id-ID',{maximumFractionDigits:digits});
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const save=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
const route=()=>location.hash.slice(1)||'awal';
const url=id=>'#'+id;
const refLabel=s=>/^\d/.test(s.id)?s.id+' '+nameOf(s):nameOf(s);
const matches=(id,rule)=>rule.endsWith('.*')?id===rule.slice(0,-2)||id.startsWith(rule.slice(0,-1)):id===rule;
const colors=['var(--accent)','var(--ink)','var(--muted)'];
const lessonLink=(id,text,props={})=>h('a',{href:url(id),...props},text);

function Flow({items}){
  return h('div',{className:'steps flex flex-wrap items-center','aria-label':'Alur materi'},items.map((item,i)=>
    h(Fragment,{key:item},i>0&&h('b',{'aria-hidden':true},'→'),h('span',null,item))));
}

function HeroPixels(){
  const canvas=useRef(null);
  useEffect(()=>{
    const img=new Image();
    img.onload=()=>{
      if(!canvas.current)return;
      const ctx=canvas.current.getContext('2d');
      ctx.drawImage(img,0,0,48,48);
      const field=ctx.getImageData(0,0,48,48);
      const pixels=Uint8ClampedArray.from(field.data);
      for(let y=0;y<48;y++)for(let x=0;x<48;x++){
        const i=(y*48+x)*4;
        const a=pixels[(y*48+Math.max(0,x-1))*4];
        const b=pixels[(y*48+Math.min(47,x+1))*4];
        const strength=Math.min(1,Math.abs(b-a)/78);
        field.data.set([227-153*strength,230-147*strength,242-125*strength,255],i);
      }
      ctx.putImageData(field,0,0);
    };
    img.src=window.ferSample;
    return ()=>{img.onload=null};
  },[]);
  return h('div',{className:'hero-visual grid grid-cols-2 items-center'},
    h('figure',null,h('img',{src:'assets/fer-happy.jpg',alt:'Citra grayscale FER2013 dengan label Happy',width:48,height:48}),h('figcaption',null,'Citra FER2013')),
    h('figure',null,h('canvas',{ref:canvas,width:48,height:48,role:'img','aria-label':'Respons perubahan intensitas kiri dan kanan'}),h('figcaption',null,'Respons filter contoh')));
}

function Home({done,last}){
  return h(Fragment,null,
    h('section',{className:'hero'},
      h('div',null,h('h1',null,'Belajar proposal FER2013'),h('p',null,'Ikuti perjalanan citra, bongkar cara model belajar, dan latih cara menjelaskan hasil penelitian Anda.'),
        lessonLink(last||lessons[0].id,last?'Lanjutkan belajar':'Mulai belajar',{className:'button primary'})),
      h(HeroPixels)),
    h('section',{className:'section stack'},h('h2',null,'Pilih materi'),h('p',{className:'muted'},'Ikuti urutannya atau buka materi yang ingin Anda pelajari sekarang.'),
      h('div',{className:'route-list'},lessons.map((lesson,i)=>h('a',{href:url(lesson.id),key:lesson.id},
        h('span',{className:'num'},String(i+1).padStart(2,'0')),
        h('span',null,h('b',null,lesson.title),h('small',null,lesson.path.slice(0,2).join(' → '))),
        h('span',{'aria-label':done.includes(lesson.id)?'Sudah dipelajari':undefined},done.includes(lesson.id)?'✓':'›'))))),
    h('section',{className:'section stack'},h('h2',null,'Rujukan proposal'),
      h('p',null,'Buka bagian asli V13 untuk memeriksa rincian metode, tabel, rumus, pustaka, dan lampiran.'),
      lessonLink('rujukan','Telusuri isi proposal')));
}

function SourceBlocks({section}){
  return h('div',{className:'source-text'},section.blocks.map((block,i)=>{
    if(block.kind==='image')return h('img',{key:i,src:block.src,alt:'Gambar dalam bagian '+nameOf(section)});
    if(block.kind==='table')return h('div',{key:i,className:'table-wrap'},
      h('table',null,h('tbody',null,block.rows.map((row,j)=>
        h('tr',{key:j},row.map((cell,k)=>j===0&&block.rows.length>1
          ?h('th',{key:k,scope:'col'},cell):h('td',{key:k},cell)))))));
    return h('p',{key:i},block.text);
  }));
}

function Reference({id}){
  const selected=sections.find(x=>x.id===id)||sections[0];
  const sectionIndex=sections.indexOf(selected);
  const next=sections[sectionIndex+1];
  const prev=sections[sectionIndex-1];
  return h('article',{className:'lesson stack'},h('h1',null,'Rujukan proposal'),
    h('p',{className:'muted'},'Ekstrak isi V13 dari Latar Belakang hingga Lampiran. Tampilan mengikuti struktur situs.'),
    h('div',{className:'source-select'},h('label',{htmlFor:'source-picker'},'Bagian proposal'),
      h('select',{id:'source-picker',value:selected.id,onChange:event=>{location.hash='rujukan/'+event.target.value}},
        sections.map(x=>h('option',{key:x.id,value:x.id},refLabel(x))))),
    h('section',{className:'section stack'},h('h2',null,refLabel(selected)),h(SourceBlocks,{section:selected}),
      selected.blocks.length===0&&h('p',{className:'muted'},'Pilih subbagian untuk membaca pembahasannya.')),
    h('nav',{className:'footer-nav','aria-label':'Bagian rujukan terkait'},
      prev?lessonLink('rujukan/'+prev.id,'← '+refLabel(prev)):h('span'),
      next&&lessonLink('rujukan/'+next.id,refLabel(next)+' →')));
}

function Search(){
  const [query,setQuery]=useState('');
  const term=query.trim().toLocaleLowerCase('id');
  const includes=text=>text.toLocaleLowerCase('id').includes(term);
  const lessonHits=term?lessons.filter(l=>includes([l.title,l.intro,...l.notes.flat(),...l.terms.flat()].join(' '))):[];
  const referenceHits=term?sections.map(section=>{
    const part=section.blocks.find(b=>b.kind==='text'&&includes(b.text));
    return {section,part,match:includes(section.title)||part||section.blocks.some(b=>b.kind==='table'&&includes(b.rows.flat().join(' ')))};
  }).filter(x=>x.match):[];
  return h('article',{className:'lesson stack'},h('h1',null,'Cari topik'),
    h('div',{className:'search'},h('label',{htmlFor:'term'},'Kata atau istilah'),
      h('input',{type:'search',id:'term',placeholder:'Misalnya stride, focal loss, atau PrivateTest',value:query,onChange:e=>setQuery(e.target.value)})),
    h('p',{role:'status',className:'muted'},term?(lessonHits.length+referenceHits.length)+' hasil ditemukan.':'Pencarian mencakup materi belajar dan isi proposal.'),
    term&&lessonHits.length+referenceHits.length===0&&h('p',null,'Coba istilah yang lebih pendek atau nama bagian proposal.'),
    h('ul',{className:'results'},lessonHits.map(l=>h('li',{key:l.id},lessonLink(l.id,l.title),h('p',null,l.intro))),
      referenceHits.map(({section,part})=>h('li',{key:section.id},lessonLink('rujukan/'+section.id,refLabel(section)),
        part&&h('p',null,part.text.slice(0,195)+(part.text.length>195?'…':''))))));
}

function LabFrame({name,title,theme}){
  const ref=useRef(null);
  const [height,setHeight]=useState(760);
  const sync=()=>ref.current?.contentWindow.postMessage({atlasTheme:theme},'*');
  useEffect(()=>{
    const handler=event=>{
      const measured=event.data?.atlasLabHeight;
      if(event.source===ref.current?.contentWindow&&Number.isFinite(measured))
        setHeight(Math.max(420,Math.min(10000,measured)));
    };
    window.addEventListener('message',handler);
    sync();
    return ()=>window.removeEventListener('message',handler);
  },[theme]);
  return h('iframe',{ref,src:'labs/'+name+'.html',title,loading:'lazy',sandbox:'allow-scripts',
    className:'lab-frame',style:{height},onLoad:sync});
}

const sectionById=id=>sections.find(section=>section.id===id);
const questions=sectionById('2').blocks.filter(block=>block.kind==='text'&&block.text.endsWith('?'));
const objectives=sectionById('3').blocks.filter(block=>block.kind==='text');
const questionPaths=[
  ['Pilih satu faktor','Pertahankan faktor lain','Ukur macro-F1 dan recall'],
  ['Ukur efek A1 − A0 per loss','Bandingkan ketiga efek','Ukur interaksi'],
  ['Rata-rata lima seed pada PublicTest','Kunci konfigurasi','Bandingkan dengan A0B0 pada PrivateTest']
];
function QuestionLab(){
  const [selected,setSelected]=useState(0);
  const labels=['Pengaruh dua faktor','Interaksi','Seleksi dan pembanding'];
  return h('div',{className:'lab stack'},h('h3',null,'Hubungkan pertanyaan dengan pengujian'),
    h('div',{className:'controls flex flex-wrap items-center'},labels.map((label,i)=>
      h('button',{key:label,'aria-pressed':selected===i,onClick:()=>setSelected(i)},label))),
    h('div',{className:'stack','aria-live':'polite'},
      h('h4',null,'Rumusan masalah'),h('p',null,questions[selected].text),
      h(Flow,{items:questionPaths[selected]}),
      h('h4',null,'Tujuan'),h('p',null,objectives[selected].text)));
}

const [studyColumns,...studies]=sectionById('6.1').blocks.find(block=>block.kind==='table').rows;
function LiteratureLab(){
  const [selected,setSelected]=useState(3);
  return h('div',{className:'lab stack'},h('h3',null,'Bandingkan posisi studi terdahulu'),
    h('div',{className:'source-select'},h('label',{htmlFor:'study'},'Penelitian dalam Tabel 6.1'),
      h('select',{id:'study',value:selected,onChange:e=>setSelected(Number(e.target.value))},
        studies.map(([author],i)=>h('option',{key:author,value:i},author)))),
    h('dl',{className:'term-grid','aria-live':'polite'},studies[selected].slice(1).map((value,i)=>
      h(Fragment,{key:i},h('dt',null,studyColumns[i+1]),h('dd',null,value)))),
    lessonLink('rujukan/6.1','Lihat tabel asli'));
}

function Bar({label,value,max,text}){
  return h('div',{className:'bar'},h('span',null,label),
    h('div',{'aria-hidden':true},h('i',{style:{width:100*value/max+'%'}})),h('strong',null,text));
}

function LossLab(){
  const [probability,setProbability]=useState(.6);
  const [classIndex,setClassIndex]=useState(1);
  const counts=[3995,436,4097,7215,4830,3171,4965];
  const classes=['Angry','Disgust','Fear','Happy','Sad','Surprise','Neutral'];
  const alpha=28709/(7*counts[classIndex]);
  const ce=-Math.log(probability);
  const weight=alpha*ce;
  const focal=(1-probability)**2;
  return h('div',{className:'lab stack'},h('h3',null,'Bandingkan loss untuk satu sampel'),
    h('div',{className:'source-select'},h('label',{htmlFor:'loss-class'},'Label asli'),
      h('select',{id:'loss-class',value:classIndex,onChange:e=>setClassIndex(Number(e.target.value))},
        classes.map((c,i)=>h('option',{key:c,value:i},c+' ('+fmt(counts[i],0)+' citra latih)')))),
    h('label',{className:'slider-label',htmlFor:'prob'},'Probabilitas kelas benar '+fmt(probability*100,0)+'%'),
    h('input',{id:'prob',type:'range',min:.05,max:.95,step:.01,value:probability,onChange:e=>setProbability(Number(e.target.value))}),
    h('p',{role:'status'},'Bobot kelas α = '+fmt(alpha,3)+' dan faktor focal (1 − p)² = '+fmt(focal,4)+'.'),
    h('div',{className:'bars'},[['CE',ce],['WCE',weight],['CW focal',weight*focal]].map(([label,value])=>
      h(Bar,{key:label,label,value,max:30,text:fmt(value,3)}))),
    h('p',{className:'muted'},'Batang menunjukkan besar loss pada skala tetap 0 sampai 30. Probabilitas dipilih untuk simulasi. Jumlah kelas berasal dari tabel Training V13.'));
}

const runIds=['A0B0','A0B1','A0B2','A1B0','A1B1','A1B2'];
const lossNames=['CE','WCE','CW focal'];
const seeds=[11,22,33,44,55];
function ExperimentLab(){
  const [run,setRun]=useState(0);
  const [seed,setSeed]=useState(11);
  const [parallel,setParallel]=useState(false);
  const pairs=parallel?[[50,54],[55,59],[58,62]]:[[50,57],[55,57],[58,54]];
  const y=score=>160-(score-45)*7;
  return h('div',{className:'lab stack'},h('h3',null,'Pilih kondisi dan seed'),
    h('table',{className:'matrix-center'},h('thead',null,h('tr',null,h('th',null,'Augmentasi'),lossNames.map(x=>h('th',{key:x,scope:'col'},x)))),
      h('tbody',null,[0,1].map(a=>h('tr',{key:a},h('th',{scope:'row'},'A'+a),
        lossNames.map((x,b)=>{const i=a*3+b;return h('td',{key:x},h('button',{'aria-pressed':i===run,onClick:()=>setRun(i)},runIds[i]))}))))),
    h('div',{className:'controls flex flex-wrap items-center','aria-label':'Pilih seed'},seeds.map(s=>h('button',{key:s,'aria-pressed':s===seed,onClick:()=>setSeed(s)},s))),
    h('p',{className:'callout',role:'status'},runIds[run]+' menggunakan '+lossNames[run%3]+(run<3?' tanpa augmentasi':' dengan augmentasi ringan')+'. Seed '+seed+' menentukan satu run dalam rancangan 30 pelatihan.'),
    h('div',{className:'source-select'},h('label',{htmlFor:'interaction'},'Contoh pola interaksi'),
      h('select',{id:'interaction',value:String(parallel),onChange:e=>setParallel(e.target.value==='true')},
        h('option',{value:'false'},'Efek augmentasi berbeda'),h('option',{value:'true'},'Efek augmentasi sama'))),
    h('p',{className:'muted'},'Macro-F1 (%) pada angka simulasi'),
    h('svg',{className:'chart',viewBox:'0 0 320 200',role:'img','aria-label':'Perubahan macro-F1 simulasi pada tiga loss dari A0 ke A1'},
      [45,50,55,60,65].map(v=>h('g',{key:v},h('line',{x1:36,x2:288,y1:y(v),y2:y(v),stroke:'var(--line)'}),h('text',{x:9,y:y(v)+4,fill:'currentColor',fontSize:12},v))),
      pairs.map(([a,b],i)=>h('line',{key:i,x1:57,x2:264,y1:y(a),y2:y(b),stroke:colors[i],strokeWidth:3,strokeDasharray:[null,'7 4','2 4'][i]})),
      h('text',{x:50,y:186,fill:'currentColor',fontSize:13},'A0'),h('text',{x:257,y:186,fill:'currentColor',fontSize:13},'A1')),
    h('p',{role:'status'},pairs.map(([a,b],i)=>lossNames[i]+' '+(b-a>0?'+':'')+(b-a)).join(' / ')+' poin persentase. '+(parallel?'Garis sejajar karena efeknya sama.':'Kemiringan berbeda karena efeknya bergantung pada loss.')));
}

const confusion=[[79,1,0],[7,7,1],[4,0,1]];
const classNames=['Senang','Sedih','Jijik'];
const rowTotal=i=>confusion[i].reduce((sum,x)=>sum+x,0);
const columnTotal=i=>confusion.reduce((sum,row)=>sum+row[i],0);
const perClassF1=i=>2*confusion[i][i]/(rowTotal(i)+columnTotal(i));
const sampleScores=[[50,51,52,53,54],[52,53,52,54,53],[54,55,55,56,55],[53,55,54,56,57],[56,57,58,57,57],[55,56,56,57,56]];
const average=values=>values.reduce((sum,value)=>sum+value,0)/values.length;
function MetricsLab(){
  const [choice,setChoice]=useState(2);
  const [locked,setLocked]=useState(false);
  const [opened,setOpened]=useState(false);
  const [spread,setSpread]=useState(false);
  const tp=confusion[choice][choice], row=rowTotal(choice), col=columnTotal(choice);
  const total=classNames.reduce((sum,_,i)=>sum+rowTotal(i),0);
  const accuracy=classNames.reduce((sum,_,i)=>sum+confusion[i][i],0)/total;
  const macro=average(classNames.map((_,i)=>perClassF1(i)));
  const weighted=classNames.reduce((sum,_,i)=>sum+rowTotal(i)*perClassF1(i),0)/total;
  const means=sampleScores.map(average);
  const best=runIds[means.indexOf(Math.max(...means))];
  return h('div',{className:'lab stack'},h('h3',null,'Baca matriks dan hitung metrik'),
    h('p',{className:'muted'},'Contoh tiga kelas. Baris adalah label asli, kolom adalah prediksi.'),
    h('table',{className:'matrix-center'},h('thead',null,h('tr',null,h('th',null,'Asli ↓ / Prediksi →'),classNames.map(n=>h('th',{key:n,scope:'col'},n)))),
      h('tbody',null,confusion.map((r,i)=>h('tr',{key:i},h('th',{scope:'row'},classNames[i]),r.map((v,j)=>h('td',{key:j,style:{background:i===choice||j===choice?'var(--tint)':undefined}},v)))))),
    h('div',{className:'controls','aria-label':'Pilih kelas'},classNames.map((n,i)=>h('button',{key:n,'aria-pressed':choice===i,onClick:()=>setChoice(i)},n))),
    h('p',{role:'status'},classNames[choice]+' memiliki '+tp+' prediksi benar, '+(col-tp)+' prediksi salah masuk, dan '+(row-tp)+' contoh yang terlewat. Precision = '+tp+'/'+col+' = '+fmt(100*tp/col)+'%. Recall = '+tp+'/'+row+' = '+fmt(100*tp/row)+'%. F1 = '+fmt(100*perClassF1(choice))+'%.'),
    h('div',{className:'bars'},[['Accuracy',accuracy],['Weighted F1',weighted],['Macro-F1',macro]].map(([label,value])=>h(Bar,{key:label,label,value,max:1,text:fmt(100*value,1)+'%'}))),
    h('details',null,h('summary',null,'Pilih konfigurasi dari PublicTest'),
      h('p',{className:'muted'},'Lima skor simulasi diberikan dalam urutan seed 11, 22, 33, 44, 55.'),
      h('table',null,h('thead',null,h('tr',null,['Kondisi','Macro-F1 PublicTest (%)','Rata-rata (%)'].map(x=>h('th',{key:x,scope:'col'},x)))),
        h('tbody',null,sampleScores.map((r,i)=>h('tr',{key:i},h('th',{scope:'row'},runIds[i]),h('td',null,r.join(' / ')),h('td',null,fmt(means[i],1)))))),
      h('div',{className:'controls'},h('button',{disabled:locked,onClick:()=>setLocked(true)},'Kunci pilihan'),
        h('button',{disabled:!locked||opened,onClick:()=>setOpened(true)},'Buka PrivateTest')),
      h('p',{role:'status'},opened?'Pilihan '+best+' terkunci. Contoh PrivateTest '+best+' = 55% dan A0B0 = 52%, sehingga selisih +3 poin.':locked?best+' terpilih berdasarkan mean PublicTest tertinggi, '+fmt(Math.max(...means),1)+'%.':'Temukan rata-rata terbesar, lalu kunci pilihan.')),
    h('details',null,h('summary',null,'Bandingkan variasi antarseed'),
      h('div',{className:'controls'},h('button',{'aria-pressed':!spread,onClick:()=>setSpread(false)},'Selisih rapat'),h('button',{'aria-pressed':spread,onClick:()=>setSpread(true)},'Selisih menyebar')),
      h('p',{role:'status'},(spread?'−1, +5, 0, +7, +4':'+2, +3, +3, +4, +3')+' poin pada lima seed. Rata-rata keduanya +3 poin. Periksa variasi dan ketidakpastian sebelum menyatakan selisih didukung secara statistik.')));
}

function ScheduleLab(){
  const [month,setMonth]=useState(0);
  const rows=sections.find(s=>s.id==='8').blocks.find(b=>b.kind==='table').rows;
  const active=rows.slice(1).filter(row=>row[month+1]?.trim());
  return h('div',{className:'lab stack'},h('h3',null,'Telusuri jadwal di proposal'),
    h('div',{className:'controls'},rows[0].slice(1).map((label,i)=>
      h('button',{key:label,'aria-pressed':month===i,onClick:()=>setMonth(i)},label))),
    h('ul',{'aria-live':'polite'},active.map(row=>h('li',{key:row[0]},row[0]))),
    h('p',{className:'muted'},'Jadwal diambil dari Bagian 8 V13 dan menunjukkan rencana pelaksanaan.'),
    lessonLink('rujukan/8','Buka tabel jadwal lengkap'));
}

const widgets={questions:QuestionLab,literature:LiteratureLab,loss:LossLab,experiment:ExperimentLab,metrics:MetricsLab,schedule:ScheduleLab};
function Lesson({lesson,index,theme,done,toggle}){
  const [showAnswer,setShowAnswer]=useState(false);
  const [lab,setLab]=useState(lesson.lab);
  const related=sections.filter(s=>lesson.ref.some(r=>matches(s.id,r)));
  const Widget=widgets[lesson.widget];
  const architecture=lesson.id==='model';
  const simulation=(lab||Widget)&&h('section',{className:'section stack'},h('h2',null,'Coba sendiri'),
    lesson.extraLab&&h('div',{className:'controls'},[[lesson.lab,'Pakai citra FER2013'],[lesson.extraLab,'Hitung dengan kisi kecil']].map(([key,label])=>
      h('button',{key,'aria-pressed':lab===key,onClick:()=>setLab(key)},label))),
    lab&&h(LabFrame,{key:lab,name:lab,title:'Simulasi '+lesson.title,theme}),
    Widget&&h(Widget));
  return h('article',{className:'lesson stack'},
    h('div',{className:'lesson-heading'},h('p',{className:'muted'},'Materi '+(index+1)+' dari '+lessons.length),
      h('h1',null,lesson.title),h('p',{className:'context'},'Rujukan '+lesson.ref.map(r=>r.replace('.*',' beserta subbagian')).join(', '))),
    h('p',{className:'lead'},lesson.intro),
    architecture?simulation:h(Flow,{items:lesson.path}),
    h('div',{className:'pairs'},lesson.notes.map(([title,body])=>h('article',{key:title},h('h3',null,title),h('p',null,body)))),
    !architecture&&simulation,
    h('section',{className:'section'},h('h2',null,'Arti istilah'),
      lesson.terms.map(([term,...values])=>h('details',{key:term},h('summary',null,term),
        h('dl',{className:'term-grid'},values.map((value,i)=>h(Fragment,{key:i},
          h('dt',null,['Arti','Contoh','Fungsi','Penggunaan'][i]),h('dd',null,value))))))),
    h('section',{className:'section stack'},h('h2',null,'Latihan menjelaskan'),h('p',null,lesson.quiz[0]),
      h('button',{'aria-expanded':showAnswer, onClick:()=>setShowAnswer(!showAnswer)},showAnswer?'Sembunyikan contoh jawaban':'Lihat contoh jawaban'),
      showAnswer&&h('p',{className:'callout'},lesson.quiz[1])),
    h('section',{className:'section'},h('h2',null,'Baca bagian proposal'),
      h('div',{className:'source-list'},related.map(s=>lessonLink('rujukan/'+s.id,refLabel(s),{key:s.id})))),
    h('section',{className:'section stack'},
      h('button',{'aria-pressed':done,onClick:toggle},done?'Sudah dipelajari':'Tandai sudah dipelajari'),
      h('nav',{className:'footer-nav','aria-label':'Materi sebelumnya dan berikutnya'},
        index>0?lessonLink(lessons[index-1].id,'← '+lessons[index-1].title):lessonLink('awal','← Beranda'),
        index<lessons.length-1?lessonLink(lessons[index+1].id,lessons[index+1].title+' →'):lessonLink('awal','Kembali ke daftar materi'))));
}

function App(){
  const [current,setCurrent]=useState(route);
  const [done,setDone]=useState(()=>read('atlas-fer-done',[]));
  const [last,setLast]=useState(()=>read('atlas-fer-last',null));
  const [theme,setTheme]=useState(()=>read('atlas-fer-theme',matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
  const content=useRef(null);
  const index=lessons.findIndex(l=>l.id===current);
  const isReference=current==='rujukan'||current.startsWith('rujukan/');
  useEffect(()=>{
    const change=()=>setCurrent(route());
    addEventListener('hashchange',change);
    return ()=>removeEventListener('hashchange',change);
  },[]);
  useEffect(()=>{
    document.documentElement.dataset.theme=theme;
    save('atlas-fer-theme',theme);
  },[theme]);
  useEffect(()=>{
    if(index>=0){setLast(current);save('atlas-fer-last',current)}
    window.scrollTo(0,0);
  },[current,index]);
  const toggle=()=>{
    const next=done.includes(current)?done.filter(x=>x!==current):[...done,current];
    setDone(next);save('atlas-fer-done',next);
  };
  const activeLink=(id,label,active,props={})=>lessonLink(id,label,{'aria-current':active?'page':undefined,...props});
  let page=h(Home,{done,last});
  if(index>=0)page=h(Lesson,{key:current,lesson:lessons[index],index,theme,done:done.includes(current),toggle});
  if(isReference)page=h(Reference,{id:current.split('/')[1]||'1'});
  if(current==='cari')page=h(Search);
  return h(Fragment,null,
    h('a',{href:'#materi',className:'skip',onClick:event=>{event.preventDefault();content.current.focus()}},'Lewati ke materi'),
    h('header',{className:'top'},h('div',{className:'top-inner'},
      lessonLink('awal',h(Fragment,null,h('span',{className:'mark','aria-hidden':true},Array.from({length:9},(_,i)=>h('i',{key:i}))),'Atlas FER2013'),{className:'brand'}),
      h('nav',{className:'top-links','aria-label':'Navigasi utama'},
        activeLink('rujukan','Rujukan',isReference,{className:'sources'}),activeLink('cari','Cari',current==='cari'),
        h('button',{onClick:()=>setTheme(theme==='dark'?'light':'dark')},theme==='dark'?'Tema terang':'Tema gelap')))),
    h('div',{className:'shell'},
      h('aside',{className:'rail'},h('h2',null,'Daftar materi'),
        h('nav',{className:'rail-nav','aria-label':'Daftar materi'},
          lessons.map((l,i)=>activeLink(l.id,h(Fragment,null,h('span',{className:'num'},i+1),h('span',null,l.title),done.includes(l.id)&&h('span',{'aria-label':'Sudah dipelajari'},'✓')),l.id===current,{key:l.id}))),
        h('p',{className:'progress status'},done.length+' dari '+lessons.length+' dipelajari'),
        h('progress',{'aria-label':'Materi dipelajari',value:done.length,max:lessons.length})),
      h('nav',{className:'mobile-nav source-select','aria-label':'Pilih materi'},h('label',{htmlFor:'mobile-route'},'Buka bagian'),
        h('select',{id:'mobile-route',value:isReference?'rujukan':current,onChange:e=>{location.hash=e.target.value}},
          h('option',{value:'awal'},'Beranda'),...lessons.map(l=>h('option',{key:l.id,value:l.id},l.title)),
          h('option',{value:'rujukan'},'Rujukan proposal'),h('option',{value:'cari'},'Cari topik')),
        h('span',{className:'mobile-progress'},done.length+' dari '+lessons.length+' dipelajari')),
      h('main',{id:'materi',className:'content',ref:content,tabIndex:-1},page)));
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
