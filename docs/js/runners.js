/* Code runners + code bench: js (worker), jsm (main thread), ts, web, react, vue, next, py, sql, php, e2e, ai.
   This is a learning sandbox: it deliberately executes code the learner typed (new Function / eval / iframes)
   inside the learner's own browser. It never fetches or runs code from anywhere else. */
const RUN={};
const LANG_LABEL={js:'JavaScript',jsm:'JavaScript',ts:'TypeScript',web:'HTML · CSS · JS',react:'React (JSX)',vue:'Vue',next:'Next.js (mini)',py:'Python 3',sql:'SQL (SQLite)',php:'PHP 8',e2e:'Playwright-style test',ai:'JavaScript + Claude'};

/* ---------- value formatting ---------- */
const FMT_SRC=`function __fmt(v,d){d=d||0;if(typeof v==='string')return d?JSON.stringify(v):v;if(v===null)return 'null';if(v===undefined)return 'undefined';if(typeof v==='function')return '[Function '+(v.name||'anonymous')+']';if(typeof v==='bigint')return v+'n';if(typeof v!=='object')return String(v);if(d>3)return Array.isArray(v)?'[Array]':'[Object]';if(v instanceof Error)return v.name+': '+v.message;if(v instanceof Map)return 'Map('+v.size+') {'+[...v].map(([k,x])=>__fmt(k,d+1)+' => '+__fmt(x,d+1)).join(', ')+'}';if(v instanceof Set)return 'Set('+v.size+') {'+[...v].map(x=>__fmt(x,d+1)).join(', ')+'}';if(Array.isArray(v))return '['+v.map(x=>__fmt(x,d+1)).join(', ')+']';if(typeof v.then==='function')return 'Promise { <pending> }';const ks=Object.keys(v);const nm=v.constructor&&v.constructor!==Object&&v.constructor.name?v.constructor.name+' ':'';return nm+'{ '+ks.map(k=>(/^[A-Za-z_$][\\w$]*$/.test(k)?k:JSON.stringify(k))+': '+__fmt(v[k],d+1)).join(', ')+(ks.length?' ':'')+'}'}`;
/* ---------- Vitest-style test prelude ---------- */
const TEST_SRC=`const __tests=[];let __suite='';const __hooks={be:[],ae:[]};
function describe(n,f){const p=__suite;__suite=p?p+' > '+n:n;f();__suite=p}
function it(n,f){__tests.push({name:(__suite?__suite+' > ':'')+n,f})}
const test=it;it.each=test.each=rows=>(n,f)=>rows.forEach(r=>it(n.replace(/%s|%d|%i|%j/g,()=>__fmt(Array.isArray(r)?r[0]:r)),()=>f(...(Array.isArray(r)?r:[r]))));
function beforeEach(f){__hooks.be.push(f)}function afterEach(f){__hooks.ae.push(f)}
function __eq(a,b){return JSON.stringify(a)===JSON.stringify(b)}
function expect(v){const mk=(neg)=>{const chk=(pass,msg)=>{if(neg?pass:!pass)throw new Error((neg?'expected not: ':'')+msg)};return{
 toBe:e=>chk(Object.is(v,e),'expected '+__fmt(v,1)+' to be '+__fmt(e,1)),toEqual:e=>chk(__eq(v,e),'expected '+__fmt(v,1)+' to equal '+__fmt(e,1)),toStrictEqual:e=>chk(__eq(v,e),'expected '+__fmt(v,1)+' to strictly equal '+__fmt(e,1)),
 toBeTruthy:()=>chk(!!v,'expected '+__fmt(v,1)+' to be truthy'),toBeFalsy:()=>chk(!v,'expected '+__fmt(v,1)+' to be falsy'),toBeNull:()=>chk(v===null,'expected '+__fmt(v,1)+' to be null'),toBeUndefined:()=>chk(v===undefined,'expected '+__fmt(v,1)+' to be undefined'),toBeDefined:()=>chk(v!==undefined,'expected value to be defined'),
 toContain:e=>chk(v!=null&&v.includes(e),'expected '+__fmt(v,1)+' to contain '+__fmt(e,1)),toHaveLength:n=>chk(v!=null&&v.length===n,'expected length '+(v&&v.length)+' to be '+n),toMatch:r=>chk(typeof r==='string'?String(v).includes(r):r.test(v),'expected '+__fmt(v,1)+' to match '+r),
 toBeGreaterThan:n=>chk(v>n,'expected '+v+' to be greater than '+n),toBeLessThan:n=>chk(v<n,'expected '+v+' to be less than '+n),toBeCloseTo:(n,p=2)=>chk(Math.abs(v-n)<Math.pow(10,-p)/2,'expected '+v+' to be close to '+n),
 toHaveProperty:(k,val)=>chk(v!=null&&k in v&&(val===undefined||__eq(v[k],val)),'expected object to have property '+k),
 toThrow:m=>{let threw=false,err=null;try{v()}catch(e){threw=true;err=e}chk(threw&&(!m||String(err&&err.message).includes(m)||(m instanceof RegExp&&m.test(err.message))),threw?'expected error "'+(err&&err.message)+'" to include "'+m+'"':'expected function to throw')},
 toHaveBeenCalled:()=>chk(v.mock&&v.mock.calls.length>0,'expected mock to have been called'),toHaveBeenCalledTimes:n=>chk(v.mock&&v.mock.calls.length===n,'expected mock to be called '+n+' times, but it was called '+(v.mock?v.mock.calls.length:0)+' times'),
 toHaveBeenCalledWith:(...a)=>chk(v.mock&&v.mock.calls.some(c=>__eq(c,a)),'expected mock to have been called with '+__fmt(a,1)+(v.mock?', calls were '+__fmt(v.mock.calls,1):''))}};
 const m=mk(false);m.not=mk(true);m.resolves=new Proxy({},{get:(o,k)=>async(...a)=>expect(await v)[k](...a)});m.rejects=new Proxy({},{get:(o,k)=>async(...a)=>{let e;try{await v}catch(x){e=x}if(!e)throw new Error('expected promise to reject');return expect(()=>{throw e})[k](...a)}});return m}
const vi={fn(impl){const f=function(...a){f.mock.calls.push(a);const r=impl?impl.apply(this,a):undefined;f.mock.results.push(r);return r};f.mock={calls:[],results:[]};f.mockReturnValue=v=>{impl=()=>v;return f};f.mockResolvedValue=v=>{impl=()=>Promise.resolve(v);return f};f.mockRejectedValue=v=>{impl=()=>Promise.reject(v);return f};f.mockImplementation=g=>{impl=g;return f};f.mockReturnValueOnce=v=>{const prev=impl;let used=false;impl=(...a)=>{if(!used){used=true;return v}return prev?prev(...a):undefined};return f};f.mockClear=()=>{f.mock.calls=[];return f};return f},
 spyOn(o,k){const orig=o[k];const f=vi.fn(function(...a){return orig.apply(this,a)});o[k]=f;f.mockRestore=()=>{o[k]=orig};return f},useFakeTimers(){},useRealTimers(){}};
async function __runTests(){const res=[];for(const t of __tests){try{for(const h of __hooks.be)await h();await t.f();for(const h of __hooks.ae)await h();res.push({name:t.name,ok:true})}catch(e){res.push({name:t.name,ok:false,err:String(e&&e.message||e)})}}return res}`;
function prepJS(code){return code.replace(/^\s*import\s+[^;]*?from\s+['"][^'"]+['"];?\s*$/gm,m=>'// '+m.trim()+'   (imports are joined into one file in this sandbox)').replace(/^\s*import\s+['"][^'"]+['"];?\s*$/gm,'').replace(/^(\s*)export\s+default\s+(function|class|async\s+function)/gm,'$1$2').replace(/^(\s*)export\s+default\s+/gm,'$1const __default = ').replace(/^(\s*)export\s+(const|let|var|function|class|async\s+function|interface|type|enum)\b/gm,'$1$2').replace(/^\s*export\s*\{[^}]*\};?\s*$/gm,'')}
function checksOf(l){const xs={};l.tasks.forEach((t,i)=>{if(t.x!=null)xs[i]=t.x});return xs}

/* ---------- JS in a Web Worker (timeouts protect against infinite loops) ---------- */
const WORKER_SRC=FMT_SRC+'\n'+`self.onmessage=async e=>{const {code,checks,prelude,withTests}=e.data;const logs=[];const con={log:(...a)=>logs.push(a.map(x=>__fmt(x)).join(' ')),info:(...a)=>logs.push(a.map(x=>__fmt(x)).join(' ')),warn:(...a)=>logs.push('⚠ '+a.map(x=>__fmt(x)).join(' ')),error:(...a)=>logs.push('✖ '+a.map(x=>__fmt(x)).join(' ')),table:(t)=>logs.push(__fmt(t))};
 let ev=null,err=null,tests=null;
 try{`+TEST_SRC+`
  self.__runTests=__runTests;self.__tests=__tests;
  const AF=Object.getPrototypeOf(async function(){}).constructor;
  const f=new AF('console','describe','it','test','expect','vi','beforeEach','afterEach',(prelude||'')+'\\n'+code+'\\n;return (__s)=>eval(__s)');
  ev=await f(con,describe,it,test,expect,vi,beforeEach,afterEach);
  if(__tests.length)tests=await __runTests();
 }catch(x){err=(x&&x.name?x.name+': ':'')+(x&&x.message||String(x))}
 const res={};for(const [k,expr] of Object.entries(checks||{})){try{const v=ev?await ev('(async()=>('+expr+'))()'):undefined;res[k]={ok:!!v,v:__fmt(v,1)}}catch(x){res[k]={ok:false,err:x.message}}}
 postMessage({logs,err,res,tests})}`;
let _worker=null,_workerUrl=null;
function runInWorker(code,checks,prelude,ms){if(window.__NO_WORKER){return new Promise(resolve=>{const fake={};new Function('self','postMessage',WORKER_SRC)(fake,r=>resolve(r));fake.onmessage({data:{code,checks,prelude}})})}return new Promise(resolve=>{if(!_workerUrl)_workerUrl=URL.createObjectURL(new Blob([WORKER_SRC],{type:'text/javascript'}));if(!_worker)_worker=new Worker(_workerUrl);const w=_worker;
 const timer=setTimeout(()=>{w.terminate();_worker=null;resolve({logs:[],err:'Timed out after '+((ms||4000)/1000)+'s. Check for an infinite loop or code that never finishes.',res:{},tests:null,timeout:true})},ms||4000);
 w.onmessage=e=>{clearTimeout(timer);resolve(e.data)};w.onerror=e=>{clearTimeout(timer);e.preventDefault();_worker=null;w.terminate();resolve({logs:[],err:e.message,res:{},tests:null})};w.postMessage({code,checks,prelude})})}
RUN.js=async(src,l)=>{const code=prepJS(src);const r=await runInWorker(code,checksOf(l),l.prelude,l.timeout);return{code:src,logs:r.logs,err:r.err,res:r.res,tests:r.tests,out:r.logs.join('\n')}};
RUN.nodeFile=async(src)=>{const r=await runInWorker(prepJS(src),{},'',4000);return{out:r.logs.join('\n')+(r.err?'\n'+r.err:''),err:!!r.err}};

/* ---------- JS on the main thread (needs DB, AI, or DOM access) ---------- */
const AsyncFn=Object.getPrototypeOf(async function(){}).constructor;
async function runMain(src,l,env){const logs=[];const fmt=new Function(FMT_SRC+';return __fmt')();const con={log:(...a)=>logs.push(a.map(x=>fmt(x)).join(' ')),info:(...a)=>logs.push(a.map(x=>fmt(x)).join(' ')),warn:(...a)=>logs.push('⚠ '+a.map(x=>fmt(x)).join(' ')),error:(...a)=>logs.push('✖ '+a.map(x=>fmt(x)).join(' ')),table:t=>logs.push(fmt(t))};
 const names=Object.keys(env),vals=Object.values(env);let ev=null,err=null;
 let tests=null;try{const body=(l.tests?FMT_SRC+'\n'+TEST_SRC+'\n':'')+prepJS(src)+(l.tests?'\n;var __results=__tests.length?await __runTests():null;':'')+'\n;return (__s)=>eval(__s)';const f=new AsyncFn('console',...names,body);ev=await f(con,...vals);if(l.tests)tests=await ev('__results')}catch(x){err=(x&&x.name?x.name+': ':'')+(x&&x.message||String(x))}
 const res={};const xs=checksOf(l);for(const [k,expr] of Object.entries(xs)){try{const v=ev?await ev('(async()=>('+expr+'))()'):undefined;res[k]={ok:!!v,v:fmt(v,1)}}catch(x){res[k]={ok:false,err:x.message}}}
 return{code:src,logs,err,res,out:logs.join('\n'),ev,tests}}

/* ---------- SQL (sql.js / SQLite) ---------- */
let _SQL=null;async function sqlLib(){await need('sql');if(!_SQL)_SQL=await initSqlJs();return _SQL}
function sqlRows(db,q,params){const st=db.prepare(q);if(params)st.bind(params);const rows=[];while(st.step())rows.push(st.getAsObject());st.free();return rows}
RUN.sql=async(src,l)=>{const SQL=await sqlLib();const db=new SQL.Database();if(l.seed)db.exec(l.seed);let results=[],err=null,cur='';
 try{for(const st of db.iterateStatements(src)){cur=st.getSQL();let cols=st.getColumnNames();const vals=[];while(st.step()){if(!cols.length)cols=st.getColumnNames();vals.push(st.get())}if(cols.length)results.push({columns:cols,values:vals})}}catch(e){err=e.message+(cur?'\n  in: '+cur.trim().split('\n')[0].slice(0,90):'')}
 const q=(s,p)=>{try{return sqlRows(db,s,p)}catch(e){return[]}};
 return{code:src,db,results,last:results[results.length-1]||null,err,q,lastRows:results.length?results[results.length-1].values.map(v=>Object.fromEntries(results[results.length-1].columns.map((c,i)=>[c,v[i]]))):[]}};
/* ---------- TypeScript (real compiler, small built-in lib) ---------- */
const MINI_LIB=`interface Array<T>{length:number;[n:number]:T;push(...items:T[]):number;pop():T|undefined;shift():T|undefined;unshift(...items:T[]):number;map<U>(fn:(v:T,i:number,a:T[])=>U):U[];filter<S extends T>(fn:(v:T,i:number,a:T[])=>v is S):S[];filter(fn:(v:T,i:number,a:T[])=>unknown):T[];reduce(fn:(acc:T,v:T,i:number,a:T[])=>T):T;reduce<U>(fn:(acc:U,v:T,i:number,a:T[])=>U,init:U):U;forEach(fn:(v:T,i:number,a:T[])=>void):void;find<S extends T>(fn:(v:T,i:number,a:T[])=>v is S):S|undefined;find(fn:(v:T,i:number,a:T[])=>unknown):T|undefined;findIndex(fn:(v:T,i:number)=>unknown):number;some(fn:(v:T,i:number)=>unknown):boolean;every(fn:(v:T,i:number)=>unknown):boolean;includes(v:T):boolean;indexOf(v:T):number;join(sep?:string):string;slice(s?:number,e?:number):T[];splice(s:number,n?:number,...items:T[]):T[];concat(...items:(T|T[])[]):T[];sort(fn?:(a:T,b:T)=>number):this;reverse():T[];flat():any[];flatMap<U>(fn:(v:T,i:number)=>U|U[]):U[];at(i:number):T|undefined;keys():IterableIterator<number>;entries():IterableIterator<[number,T]>;[Symbol.iterator]():IterableIterator<T>}
interface ReadonlyArray<T>{readonly length:number;readonly [n:number]:T;map<U>(fn:(v:T,i:number)=>U):U[];filter(fn:(v:T,i:number)=>unknown):T[];includes(v:T):boolean;join(s?:string):string;forEach(fn:(v:T)=>void):void;find(fn:(v:T)=>unknown):T|undefined;slice(s?:number,e?:number):T[];[Symbol.iterator]():IterableIterator<T>}
interface ArrayConstructor{new<T>(n?:number):T[];isArray(v:any):v is any[];from<T>(v:Iterable<T>|ArrayLike<T>):T[];from<T,U>(v:Iterable<T>|ArrayLike<T>,fn:(v:T,i:number)=>U):U[];of<T>(...items:T[]):T[]}declare var Array:ArrayConstructor;
interface ArrayLike<T>{readonly length:number;readonly [n:number]:T}
interface String{length:number;toUpperCase():string;toLowerCase():string;trim():string;split(sep:string|RegExp,limit?:number):string[];includes(s:string):boolean;startsWith(s:string):boolean;endsWith(s:string):boolean;slice(s?:number,e?:number):string;substring(s:number,e?:number):string;replace(a:string|RegExp,b:string|((m:string,...a:any[])=>string)):string;replaceAll(a:string|RegExp,b:string):string;charAt(i:number):string;charCodeAt(i:number):number;indexOf(s:string):number;padStart(n:number,s?:string):string;padEnd(n:number,s?:string):string;repeat(n:number):string;match(r:RegExp):RegExpMatchArray|null;at(i:number):string|undefined;localeCompare(s:string):number;[Symbol.iterator]():IterableIterator<string>;readonly [n:number]:string}
interface StringConstructor{(v?:any):string;fromCharCode(...c:number[]):string}declare var String:StringConstructor;
interface Number{toFixed(d?:number):string;toString(r?:number):string;toLocaleString(l?:string,o?:any):string}interface NumberConstructor{(v?:any):number;isInteger(v:unknown):boolean;isNaN(v:unknown):boolean;parseFloat(s:string):number;MAX_SAFE_INTEGER:number}declare var Number:NumberConstructor;
interface Boolean{}interface BooleanConstructor{(v?:any):boolean}declare var Boolean:BooleanConstructor;
interface Object{constructor:Function;toString():string;hasOwnProperty(k:PropertyKey):boolean}interface ObjectConstructor{keys(o:object):string[];values<T>(o:{[k:string]:T}):T[];values(o:{}):any[];entries<T>(o:{[k:string]:T}):[string,T][];entries(o:{}):[string,any][];assign<T extends {},U>(t:T,s:U):T&U;freeze<T>(o:T):Readonly<T>;fromEntries<T=any>(e:Iterable<readonly [PropertyKey,T]>):{[k:string]:T}}declare var Object:ObjectConstructor;
interface Function{apply(this:Function,t:any,a?:any):any;call(this:Function,t:any,...a:any[]):any;bind(this:Function,t:any,...a:any[]):any;readonly name:string}interface CallableFunction extends Function{}interface NewableFunction extends Function{}interface IArguments{length:number;[i:number]:any}
interface RegExp{test(s:string):boolean;exec(s:string):RegExpExecArray|null;readonly source:string}interface RegExpMatchArray extends Array<string>{index?:number;groups?:{[k:string]:string}}interface RegExpExecArray extends Array<string>{index:number}
interface SymbolConstructor{readonly iterator:unique symbol;readonly asyncIterator:unique symbol}declare var Symbol:SymbolConstructor;interface Symbol{}type PropertyKey=string|number|symbol;
interface IteratorResult<T>{done?:boolean;value:T}interface Iterator<T>{next():IteratorResult<T>}interface Iterable<T>{[Symbol.iterator]():Iterator<T>}interface IterableIterator<T> extends Iterator<T>{[Symbol.iterator]():IterableIterator<T>}
interface TemplateStringsArray extends ReadonlyArray<string>{readonly raw:readonly string[]}
interface PromiseLike<T>{then<A=T,B=never>(f?:((v:T)=>A|PromiseLike<A>)|null,r?:((e:any)=>B|PromiseLike<B>)|null):PromiseLike<A|B>}
interface Promise<T>{then<A=T,B=never>(f?:((v:T)=>A|PromiseLike<A>)|null,r?:((e:any)=>B|PromiseLike<B>)|null):Promise<A|B>;catch<B=never>(r?:((e:any)=>B|PromiseLike<B>)|null):Promise<T|B>;finally(f?:()=>void):Promise<T>}
interface PromiseConstructor{new<T>(ex:(res:(v:T|PromiseLike<T>)=>void,rej:(e?:any)=>void)=>void):Promise<T>;resolve():Promise<void>;resolve<T>(v:T):Promise<Awaited<T>>;reject<T=never>(e?:any):Promise<T>;all<T extends readonly unknown[]|[]>(v:T):Promise<{-readonly [P in keyof T]:Awaited<T[P]>}>}declare var Promise:PromiseConstructor;
type Awaited<T>=T extends null|undefined?T:T extends object&{then(f:infer F,...a:infer _):any}?F extends (v:infer V,...a:infer _)=>any?Awaited<V>:never:T;
interface Map<K,V>{get(k:K):V|undefined;set(k:K,v:V):this;has(k:K):boolean;delete(k:K):boolean;readonly size:number;keys():IterableIterator<K>;values():IterableIterator<V>;entries():IterableIterator<[K,V]>;forEach(fn:(v:V,k:K)=>void):void;[Symbol.iterator]():IterableIterator<[K,V]>}interface MapConstructor{new<K=any,V=any>(e?:readonly (readonly [K,V])[]|null):Map<K,V>}declare var Map:MapConstructor;
interface Set<T>{add(v:T):this;has(v:T):boolean;delete(v:T):boolean;readonly size:number;forEach(fn:(v:T)=>void):void;values():IterableIterator<T>;[Symbol.iterator]():IterableIterator<T>}interface SetConstructor{new<T=any>(v?:readonly T[]|null):Set<T>}declare var Set:SetConstructor;
interface Date{getTime():number;getFullYear():number;getMonth():number;getDate():number;toISOString():string;toLocaleDateString(l?:string,o?:any):string}interface DateConstructor{new(v?:string|number|Date):Date;now():number}declare var Date:DateConstructor;
interface Error{name:string;message:string;stack?:string}interface ErrorConstructor{new(m?:string):Error;(m?:string):Error}declare var Error:ErrorConstructor;declare var TypeError:ErrorConstructor;declare var RangeError:ErrorConstructor;
interface JSON{parse(t:string):any;stringify(v:any,r?:any,s?:string|number):string}declare var JSON:JSON;
interface Math{floor(x:number):number;ceil(x:number):number;round(x:number):number;max(...v:number[]):number;min(...v:number[]):number;abs(x:number):number;random():number;sqrt(x:number):number;pow(x:number,y:number):number;PI:number}declare var Math:Math;
interface Console{log(...a:any[]):void;error(...a:any[]):void;warn(...a:any[]):void;info(...a:any[]):void;table(t:any):void}declare var console:Console;
declare function parseInt(s:string,r?:number):number;declare function parseFloat(s:string):number;declare function isNaN(n:number):boolean;declare function setTimeout(f:(...a:any[])=>void,ms?:number):number;declare function structuredClone<T>(v:T):T;
type Partial<T>={[P in keyof T]?:T[P]};type Required<T>={[P in keyof T]-?:T[P]};type Readonly<T>={readonly [P in keyof T]:T[P]};type Pick<T,K extends keyof T>={[P in K]:T[P]};type Record<K extends keyof any,T>={[P in K]:T};type Exclude<T,U>=T extends U?never:T;type Extract<T,U>=T extends U?T:never;type Omit<T,K extends keyof any>=Pick<T,Exclude<keyof T,K>>;type NonNullable<T>=T&{};type Parameters<T extends (...a:any)=>any>=T extends (...a:infer P)=>any?P:never;type ReturnType<T extends (...a:any)=>any>=T extends (...a:any)=>infer R?R:any;type Uppercase<S extends string>=intrinsic;type Lowercase<S extends string>=intrinsic;type Capitalize<S extends string>=intrinsic;
`;
const TEST_LIB='declare function describe(n:string,f:()=>void):void;declare function it(n:string,f:()=>void|Promise<void>):void;declare function test(n:string,f:()=>void|Promise<void>):void;declare function expect(v:any):any;declare var vi:any;declare function beforeEach(f:()=>void):void;';
function tsDiagnose(code,opts){const files={'/main.ts':code,'/lib.d.ts':MINI_LIB+(/\bexpect\s*\(/.test(code)?TEST_LIB:'')};const host={getSourceFile:(n,v)=>files[n]!=null?ts.createSourceFile(n,files[n],v):undefined,getDefaultLibFileName:()=>'/lib.d.ts',writeFile(){},getCurrentDirectory:()=>'/',getDirectories:()=>[],fileExists:n=>files[n]!=null,readFile:n=>files[n],getCanonicalFileName:n=>n,useCaseSensitiveFileNames:()=>true,getNewLine:()=>'\n'};
 const prog=ts.createProgram(['/main.ts'],Object.assign({strict:true,target:ts.ScriptTarget.ES2022,noEmit:true,noUnusedLocals:false,types:[]},opts||{}),host);
 return ts.getPreEmitDiagnostics(prog).filter(d=>!d.file||d.file.fileName==='/main.ts').map(d=>{const msg=ts.flattenDiagnosticMessageText(d.messageText,'\n');const pos=d.file&&d.start!=null?d.file.getLineAndCharacterOfPosition(d.start):null;return{line:pos?pos.line+1:0,col:pos?pos.character+1:0,code:d.code,msg}})}
RUN.ts=async(src,l)=>{await need('ts');const code=prepJS(src);let diag=[];try{diag=tsDiagnose(code)}catch(e){diag=[{line:0,msg:'TypeScript checker failed: '+e.message}]}
 const js=ts.transpileModule(code,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.None}}).outputText.replace(/^"use strict";\s*/,'').replace(/Object\.defineProperty\(exports,\s*"__esModule"[^;]*;\s*/g,'');
 const r=await runInWorker(js,checksOf(l),l.prelude,l.timeout);return{code:src,diag,logs:r.logs,err:r.err,res:r.res,tests:r.tests,out:r.logs.join('\n')}};

/* ---------- preview iframe helpers ---------- */
function libTags(names){return (names||[]).flatMap(n=>IFRAME_LIBS[n]||[]).filter((v,i,a)=>a.indexOf(v)===i).map(u=>'<script src="'+u+'"><\/script>').join('')}
const IFRAME_BASE='<style>body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;margin:16px;color:#16202a;background:#fff}button{font:inherit;padding:6px 12px;cursor:pointer}input,select,textarea{font:inherit;padding:5px 8px}</style>';
const ERR_HOOK='<script>window.__errs=[];window.__logs=[];window.onerror=function(m,s,l,c,e){__errs.push(String(e&&e.message||m));};window.addEventListener("unhandledrejection",function(e){__errs.push(String(e.reason&&e.reason.message||e.reason))});(function(){var o=console.log,er=console.error;console.log=function(){__logs.push([].map.call(arguments,function(a){try{return typeof a==="object"?JSON.stringify(a):String(a)}catch(x){return String(a)}}).join(" "));o.apply(console,arguments)};console.error=function(){var t=[].map.call(arguments,String).join(" ");if(!/^Warning:/.test(t))__errs.push(t);er.apply(console,arguments)}})();<\/script>';
function loadFrame(frame,html){return new Promise(res=>{let done=false;const fin=()=>{if(done)return;let real=true;try{real=frame.contentWindow.location.href==='about:srcdoc'}catch(e){}if(!real)return;done=true;setTimeout(()=>res(frame),120)};frame.onload=fin;frame.srcdoc=html;setTimeout(()=>{if(!done){done=true;res(frame)}},8000)})}
async function frameReady(frame,test,ms){const t0=Date.now();while(Date.now()-t0<(ms||4000)){try{if(test(frame.contentWindow))return true}catch(e){}await sleep(60)}return false}
function domCtx(frame,src,extra){const win=frame.contentWindow,doc=frame.contentDocument;return Object.assign({code:src,win,doc,errs:(win&&win.__errs)||[],logs:(win&&win.__logs)||[],$:s=>doc.querySelector(s),$$:s=>[...doc.querySelectorAll(s)],text:()=>doc.body?doc.body.innerText:'',click:async s=>{const el=typeof s==='string'?doc.querySelector(s):s;if(!el)return false;el.click();await sleep(80);return true},
 type:async(s,v)=>{const el=typeof s==='string'?doc.querySelector(s):s;if(!el)return false;const proto=el.tagName==='TEXTAREA'?win.HTMLTextAreaElement.prototype:win.HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,v);el.dispatchEvent(new win.Event('input',{bubbles:true}));el.dispatchEvent(new win.Event('change',{bubbles:true}));await sleep(80);return true},
 byText:t=>[...doc.querySelectorAll('body *')].find(e=>e.children.length===0&&e.textContent.trim()===t),css:(el,p)=>el?win.getComputedStyle(el)[p]:null,wait:sleep},extra||{})}
RUN.web=async(src,l,b)=>{const html=/<html|<body|<head/i.test(src)?src:'<!doctype html><html><head><meta charset="utf-8">'+IFRAME_BASE+'</head><body>'+src+'</body></html>';
 const inj=ERR_HOOK+libTags(l.libs)+(l.inject?'<script>'+l.inject+'<\/script>':'');const doc2=html.replace(/<head[^>]*>/i,m=>m+inj);await loadFrame(b.frame,doc2===html?inj+html:doc2);if(l.libs&&l.libs.includes('tailwind'))await sleep(400);if(l.libs&&l.libs.includes('vue'))await frameReady(b.frame,w=>w.Vue);await sleep(150);return domCtx(b.frame,src)};
RUN.vue=RUN.web;

/* ---------- React / TSX via Babel in the browser ---------- */
const REQ_MAP='{"react":window.React,"react-dom":window.ReactDOM,"react-dom/client":window.ReactDOM,"zustand":window.zustandVanilla&&{createStore:window.zustandVanilla.createStore,create:function(init){var api=window.zustandVanilla.createStore(init);var useStore=function(sel){sel=sel||function(s){return s};return React.useSyncExternalStore(api.subscribe,function(){return sel(api.getState())})};Object.assign(useStore,api);return useStore}},"@reduxjs/toolkit":window.RTK,"react-redux":window.ReactRedux,"@tanstack/react-query":window.ReactQuery,"react-hook-form":window.ReactHookForm,"zod":window.Zod&&Object.assign({},window.Zod,{z:window.Zod.z||window.Zod}),"framer-motion":window.Motion,"motion/react":window.Motion,"recharts":window.Recharts,"@testing-library/dom":window.TestingLibraryDom}';
function babelCJS(code,file){return Babel.transform(code,{filename:file||'App.tsx',presets:[['react',{runtime:'classic'}],['typescript',{isTSX:true,allExtensions:true}]],plugins:['transform-modules-commonjs'],sourceType:'module'}).code}
RUN.react=async(src,l,b)=>{await need('babel');let js;try{js=babelCJS(src)}catch(e){return{code:src,err:'Compile error: '+e.message.replace(/^\/?App\.tsx:\s*/,''),errs:[],logs:[],compileError:true}}
 const rtl=!!l.rtl;const libs=['react',...(l.libs||[]),...(rtl?['rtl']:[])];
 const rtlPre=rtl?FMT_SRC+'\n'+TEST_SRC+'\nvar __TLD=window.TestingLibraryDom,__roots=[];function render(el){var c=document.createElement("div");document.body.appendChild(c);var r=ReactDOM.createRoot(c);ReactDOM.flushSync(function(){r.render(el)});__roots.push([r,c]);return Object.assign({container:c,unmount:function(){r.unmount()}},__TLD.within(c))}function cleanup(){__roots.forEach(function(x){try{x[0].unmount()}catch(e){}x[1].remove()});__roots=[]}afterEach(cleanup);var screen=__TLD.within(document.body),within=__TLD.within,waitFor=__TLD.waitFor,fireEvent={};Object.keys(__TLD.fireEvent).forEach(function(k){fireEvent[k]=function(){var a=arguments,r;ReactDOM.flushSync(function(){r=__TLD.fireEvent[k].apply(null,a)});return r}});\n':'';
 const tail=rtl?'\n;__runTests().then(function(r){window.__testResults=r}).catch(function(e){window.__testResults=[{name:"test runner",ok:false,err:e.message}]});':'\n;var __AppC=module.exports.default||module.exports.App;if(!__AppC)throw new Error("Export a component: export default function App() { ... }");window.__App=__AppC;ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(__AppC));';
 const html='<!doctype html><html><head><meta charset="utf-8">'+IFRAME_BASE+ERR_HOOK+libTags(libs)+(l.inject?'<script>'+l.inject+'<\/script>':'')+'</head><body><div id="root"></div><script>(function(){var M='+REQ_MAP+';window.require=function(n){if(n in M&&M[n])return M[n];throw new Error("Module not found: Can\'t resolve \'"+n+"\' (this sandbox has: "+Object.keys(M).filter(function(k){return M[k]}).join(", ")+")")};var module={exports:{}},exports=module.exports;try{'+(rtlPre+js+tail).replace(/<\/script/gi,'<\\/script')+'}catch(e){__errs.push(e.message);window.__testResults=window.__testResults||[];document.getElementById("root").innerHTML="<pre style=\\"color:#b00;white-space:pre-wrap\\">"+String(e.message).replace(/</g,"&lt;")+"</pre>"}})();<\/script></body></html>';
 await loadFrame(b.frame,html);await sleep(250);let tests=null;if(rtl){await frameReady(b.frame,w=>w.__testResults,5000);tests=b.frame.contentWindow.__testResults||[]}return domCtx(b.frame,src,{tests})};

/* ---------- mini Next.js (App Router) ---------- */
const NEXT_RT=`(function(){
var M=window.__mods,cache={},routes=[],layouts={},state={url:'/',cookies:{}};window.__next=state;
function dirname(p){return p.split('/').slice(0,-1).join('/')}
function join(a,b){var parts=(a?a.split('/'):[]);b.split('/').forEach(function(s){if(s==='..')parts.pop();else if(s!=='.'&&s)parts.push(s)});return parts.join('/')}
var EXT=['','.tsx','.ts','.jsx','.js','/index.tsx','/index.ts','/index.js'];
function resolve(from,spec){var base=spec.indexOf('@/')===0?spec.slice(2):spec.charAt(0)==='.'?join(dirname(from),spec):null;if(base===null)return null;for(var i=0;i<EXT.length;i++)if(M[base+EXT[i]])return base+EXT[i];return '?'+spec}
var rerender=function(){};
function Link(p){var h=p.href;return React.createElement('a',Object.assign({},p,{href:h,onClick:function(e){if(p.onClick)p.onClick(e);if(/^https?:/.test(h))return;e.preventDefault();navigate(h)}}),p.children)}
var redirectErr=function(to){var e=new Error('NEXT_REDIRECT');e.__redirect=to;return e};var notFoundErr=function(){var e=new Error('NEXT_NOT_FOUND');e.__nf=true;return e};
function cookieStore(){return{get:function(n){return state.cookies[n]!=null?{name:n,value:state.cookies[n]}:undefined},set:function(n,v){state.cookies[n]=typeof v==='object'?v.value:v},delete:function(n){delete state.cookies[n]},has:function(n){return n in state.cookies},getAll:function(){return Object.keys(state.cookies).map(function(k){return{name:k,value:state.cookies[k]}})}}}
function NextResponse(body,init){return new Response(body,init)}
NextResponse.json=function(d,init){init=init||{};return new Response(JSON.stringify(d),{status:init.status||200,headers:{'content-type':'application/json'}})};
NextResponse.redirect=function(u){var r=new Response(null,{status:307});r.__redirect=String(u.pathname||u);return r};NextResponse.next=function(){var r=new Response(null,{status:200});r.__next=true;return r};
var BUILT={react:React,'react-dom':ReactDOM,'next/link':{__esModule:true,default:Link},'next/navigation':{useRouter:function(){return{push:navigate,replace:navigate,refresh:function(){rerender()},back:function(){}}},usePathname:function(){return state.url.split('?')[0]},useSearchParams:function(){return new URLSearchParams(state.url.split('?')[1]||'')},redirect:function(to){throw redirectErr(to)},notFound:function(){throw notFoundErr()}},'next/cache':{revalidatePath:function(){setTimeout(function(){rerender()},0)}},'next/headers':{cookies:function(){return cookieStore()}},'next/server':{NextResponse:NextResponse},'@prisma/client':{PrismaClient:window.__PrismaClient},'zod':window.Zod&&Object.assign({},window.Zod,{z:window.Zod.z||window.Zod})};
function req(from){return function(spec){if(BUILT[spec])return BUILT[spec];var p=resolve(from,spec);if(!p||p.charAt(0)==='?')throw new Error("Module not found: Can't resolve '"+spec+"' in "+from);if(cache[p])return cache[p].exports;var m={exports:{}};cache[p]=m;M[p](req(p),m,m.exports);return m.exports}}
function load(p){return req('app/x')('@/'+p)}
Object.keys(M).forEach(function(p){var m=p.match(/^app\\/(.*?)\\/?page\\.(tsx|jsx|ts|js)$/);if(m){var segs=m[1].split('/').filter(function(s){return s&&!/^\\(.*\\)$/.test(s)});routes.push({file:p,segs:segs})}var lm=p.match(/^app\\/(.*?)\\/?layout\\.(tsx|jsx)$/);if(lm)layouts[lm[1].split('/').filter(function(s){return s&&!/^\\(.*\\)$/.test(s)}).join('/')]=p});
routes.sort(function(a,b){return a.segs.filter(function(s){return s.charAt(0)==='['}).length-b.segs.filter(function(s){return s.charAt(0)==='['}).length});
function match(path){var ps=path.split('/').filter(Boolean);for(var i=0;i<routes.length;i++){var r=routes[i];if(r.segs.length!==ps.length)continue;var params={},ok=true;for(var j=0;j<ps.length;j++){var s=r.segs[j];if(s.charAt(0)==='['){params[s.slice(1,-1)]=decodeURIComponent(ps[j])}else if(s!==ps[j]){ok=false;break}}if(ok)return{route:r,params:params}}return null}
var origCE=React.createElement;React.createElement=function(t,p){if(t==='form'&&p&&typeof p.action==='function'){var act=p.action;var np=Object.assign({},p,{action:undefined,onSubmit:function(e){e.preventDefault();var fd=new FormData(e.target);Promise.resolve(act(fd)).then(function(){rerender()}).catch(function(err){if(err&&err.__redirect)navigate(err.__redirect);else{window.__errs.push(err.message);show(err)}})}});delete np.action;arguments[1]=np}return origCE.apply(React,arguments)};
var root=ReactDOM.createRoot(document.getElementById('__next'));
function show(e){root.render(origCE('div',{style:{fontFamily:'monospace',background:'#fff0f0',border:'2px solid #e00',padding:'14px',whiteSpace:'pre-wrap'}},origCE('b',null,'Unhandled Runtime Error'),'\\n\\n'+(e.message||e)))}
async function apiFetch(url,init){var path=url.split('?')[0];var m=path.match(/^\\/api\\/(.*)$/);var file=null,params={};if(m){var segs=m[1].split('/');Object.keys(M).forEach(function(p){var rm=p.match(/^app\\/api\\/(.*)\\/route\\.(ts|js)$/);if(!rm||file)return;var rs=rm[1].split('/');if(rs.length!==segs.length)return;var ok=true,pr={};rs.forEach(function(s,i){if(s.charAt(0)==='[')pr[s.slice(1,-1)]=segs[i];else if(s!==segs[i])ok=false});if(ok){file=p;params=pr}})}
 if(!file)return new Response(JSON.stringify({error:'Not found'}),{status:404});var mod=load(file);var method=(init&&init.method||'GET').toUpperCase();if(!mod[method])return new Response(null,{status:405});var rq=new Request('http://localhost:3000'+url,init);rq.nextUrl=new URL('http://localhost:3000'+url);rq.cookies=cookieStore();return mod[method](rq,{params:params})}
window.fetch=(function(of){return function(u,init){u=String(u);if(u.charAt(0)==='/')return apiFetch(u,init);if(/^http:\\/\\/localhost:3000\\//.test(u))return apiFetch(u.slice(21),init);return of(u,init)}})(window.fetch);
window.__apiFetch=apiFetch;
async function navigate(url){state.url=url;window.__url=url;try{parent.postMessage({__nextUrl:url},'*')}catch(e){}
 if(M['middleware.ts']||M['middleware.js']){var mw=load(M['middleware.ts']?'middleware.ts':'middleware.js');var cfg=mw.config||{};var mt=[].concat(cfg.matcher||'/:path*');var path=url.split('?')[0];var hit=mt.some(function(p){var re=new RegExp('^'+p.replace(/\\/:path\\*$/,'(/.*)?').replace(/:path\\*/,'.*').replace(/:\\w+/g,'[^/]+')+'$');return re.test(path)});if(hit&&mw.middleware){var rq={url:'http://localhost:3000'+url,nextUrl:new URL('http://localhost:3000'+url),cookies:cookieStore()};var res=await mw.middleware(rq);if(res&&res.__redirect&&res.__redirect!==path){return navigate(res.__redirect)}}}
 rerender()}
rerender=async function(){var url=state.url;var path=url.split('?')[0];var sp=Object.fromEntries(new URLSearchParams(url.split('?')[1]||''));var hit=match(path);
 try{var el;if(!hit){var nf=M['app/not-found.tsx']?load('app/not-found.tsx').default:null;el=nf?origCE(nf):origCE('div',{style:{textAlign:'center',marginTop:'60px'}},origCE('h1',null,'404'),origCE('p',null,'This page could not be found.'))}
  else{var Page=load(hit.route.file).default;if(!Page)throw new Error(hit.route.file+' has no default export. Pages must use: export default function Page() { ... }');el=Page({params:hit.params,searchParams:sp});if(el&&typeof el.then==='function')el=await el}
  var chain=[''];var segs=hit?hit.route.segs:[];for(var i=1;i<=segs.length;i++)chain.push(segs.slice(0,i).join('/'));
  for(var k=chain.length-1;k>=0;k--){var lp=layouts[chain[k]];if(lp){var Lay=load(lp).default;var out=Lay({children:el,params:hit?hit.params:{}});if(out&&typeof out.then==='function')out=await out;el=out}}
  if(el&&el.type==='html'){var body=[].concat(el.props.children).find(function(c){return c&&c.type==='body'});el=body?origCE('div',{id:'__body'},body.props.children):el}
  root.render(el)}catch(e){if(e&&e.__redirect)return navigate(e.__redirect);if(e&&e.__nf){var nf2=M['app/not-found.tsx']?load('app/not-found.tsx').default:null;return root.render(nf2?origCE(nf2):origCE('h1',null,'404 | Not found'))}window.__errs.push(e.message);show(e)}};
window.__navigate=navigate;navigate(window.__startUrl||'/');
})();`;
function nextRules(files){const errs=[];for(const [p,src] of Object.entries(files)){if(!/\.(tsx|jsx|ts|js)$/.test(p)||p==='middleware.ts')continue;const client=/^\s*['"]use client['"]/.test(src);
 const hooks=src.match(/\buse(State|Effect|Reducer|Ref|Context|Transition|Optimistic)\s*\(/);if(hooks&&!client)errs.push({file:p,msg:"You're importing a component that needs use"+hooks[1]+". This React hook only works in a Client Component. To fix, mark the file (or its parent) with the \"use client\" directive.\n\n  ╭─["+p+":1:1]\n  │ Add  'use client'  as the very first line of "+p});
 const ev=src.match(/\bon(Click|Change|Submit|Input)=\{/);if(ev&&!client)errs.push({file:p,msg:'Event handlers cannot be passed to Client Component props.\n  <... on'+ev[1]+'={function} ...>\nIf you need interactivity, consider converting part of this to a Client Component ("use client") in '+p});
 if(client&&/\basync\s+function\s+\w+\s*\([^)]*\)\s*\{[\s\S]*?\bawait\b/.test(src)&&/export default async/.test(src))errs.push({file:p,msg:'async/await is not yet supported in Client Components, only Server Components. Remove "use client" from '+p+' or make the component synchronous.'});
 if(client&&/from ['"]@\/lib\/(db|prisma)['"]/.test(src))errs.push({file:p,msg:'A Client Component ('+p+') imports the database module. Database code must stay on the server: fetch data in a Server Component (page.tsx) and pass it down as props.'})}
 return errs}
RUN.next=async(files,l,b)=>{await need('babel');const errs=nextRules(files);const mods={};
 for(const [p,src] of Object.entries(files)){if(!/\.(tsx|jsx|ts|js)$/.test(p))continue;try{mods[p]=babelCJS(src.replace(/^\s*['"]use (client|server)['"];?/m,''),p)}catch(e){errs.push({file:p,msg:'Syntax error in '+p+'\n'+e.message.replace(/^[^:]*:\s*/,'')})}}
 const bundle='window.__mods={'+Object.entries(mods).map(([p,c])=>JSON.stringify(p)+':function(require,module,exports){'+c+'\n}').join(',\n')+'};';
 b.nextErrs=errs;const start=b.url||'/';
 if(files['prisma/schema.prisma'])await PRISMA.ensure(files['prisma/schema.prisma']);
 const overlay=errs.length?'<div style="font-family:monospace;background:#fff0f0;border:2px solid #e00;padding:14px;white-space:pre-wrap;margin:-16px"><b style="color:#b00">Build Error</b><br><br>'+esc(errs[0].msg)+'</div>':'';
 const html='<!doctype html><html><head><meta charset="utf-8">'+IFRAME_BASE+ERR_HOOK+libTags(['react',...(l.libs||[])])+'</head><body>'+(errs.length?overlay:'<div id="__next"></div><script>window.__startUrl='+JSON.stringify(start)+';window.__PrismaClient=parent.PRISMA&&parent.PRISMA.Client;'+bundle.replace(/<\/script/gi,'<\\/script')+'<\/script><script>'+NEXT_RT+'<\/script>')+'</body></html>';
 await loadFrame(b.frame,html);await sleep(300);const ctx=domCtx(b.frame,Object.values(files).join('\n'),{files,buildErrs:errs,url:()=>{try{return b.frame.contentWindow.__url}catch(e){return null}},go:async u=>{b.frame.contentWindow.__navigate(u);await sleep(250)},api:async(u,init)=>{const r=await b.frame.contentWindow.__apiFetch(u,init);const txt=await r.text();let json=null;try{json=JSON.parse(txt)}catch(e){}return{status:r.status,text:txt,json}}});return ctx};

/* ---------- Prisma-like client over SQLite (shared with the mini Next runtime) ---------- */
const PRISMA={db:null,models:{},migrated:null,
 parse(schema){const models={};for(const m of schema.matchAll(/model\s+(\w+)\s*\{([\s\S]*?)\}/g)){const fields=[];for(const line of m[2].split('\n')){const f=line.trim().match(/^(\w+)\s+(\w+)(\[\])?(\?)?\s*(.*)$/);if(!f||f[1].startsWith('@@'))continue;fields.push({name:f[1],type:f[2],list:!!f[3],opt:!!f[4],attrs:f[5]||''})}models[m[1]]={name:m[1],fields}}return models},
 sqlType(t){return{Int:'INTEGER',String:'TEXT',Boolean:'INTEGER',DateTime:'TEXT',Float:'REAL'}[t]},
 colSQL(f){let s='"'+f.name+'" '+this.sqlType(f.type);const a=f.attrs;
  if(/@id/.test(a))s+=' PRIMARY KEY'+(/autoincrement/.test(a)?' AUTOINCREMENT':'');
  else if(!f.opt)s+=' NOT NULL';
  if(/@unique/.test(a))s+=' UNIQUE';
  let m;if(/@default\(now\(\)\)/.test(a))s+=' DEFAULT CURRENT_TIMESTAMP';
  else if((m=a.match(/@default\((true|false)\)/)))s+=' DEFAULT '+(m[1]==='true'?1:0);
  else if((m=a.match(/@default\("([^"]*)"\)/)))s+=" DEFAULT '"+m[1]+"'";
  else if((m=a.match(/@default\((-?\d+(?:\.\d+)?)\)/)))s+=' DEFAULT '+m[1];
  return s},
 migrationSQL(models){return Object.values(models).map(m=>{const cols=m.fields.filter(f=>this.sqlType(f.type)&&!f.list).map(f=>this.colSQL(f));return 'CREATE TABLE "'+m.name+'" (\n  '+cols.join(',\n  ')+'\n);'}).join('\n\n')}, async ensure(schema){const SQL=await sqlLib();if(!this.db){this.db=new SQL.Database()}this.models=this.parse(schema);this.schema=schema},
 async migrate(schema,name){await this.ensure(schema);const sql=this.migrationSQL(this.models);if(this.migrated===sql)return{same:true};const SQL=await sqlLib();const old=this.db;this.db=new SQL.Database();this.db.exec(sql);
  if(old){for(const m of Object.values(this.models)){try{const rows=sqlRows(old,'SELECT * FROM "'+m.name+'"');for(const r of rows){const cols=Object.keys(r).filter(c=>m.fields.some(f=>f.name===c));if(cols.length)this.db.run('INSERT INTO "'+m.name+'" ('+cols.map(c=>'"'+c+'"').join(',')+') VALUES ('+cols.map(()=>'?').join(',')+')',cols.map(c=>r[c]))}}catch(e){}}}
  this.migrated=sql;this.migrations=(this.migrations||0)+1;return{sql,name}},
 where(m,w){const cl=[],ps=[];for(const [k,v] of Object.entries(w||{})){if(v&&typeof v==='object'&&!(v instanceof Date)){if('contains' in v){cl.push('"'+k+'" LIKE ?');ps.push('%'+v.contains+'%')}if('equals' in v){cl.push('"'+k+'" = ?');ps.push(v.equals)}for(const [op,s] of [['gt','>'],['gte','>='],['lt','<'],['lte','<='],['not','!=']])if(op in v){cl.push('"'+k+'" '+s+' ?');ps.push(v[op])}if('in' in v){cl.push('"'+k+'" IN ('+v.in.map(()=>'?').join(',')+')');ps.push(...v.in)}}else{cl.push('"'+k+'" = ?');ps.push(typeof v==='boolean'?(v?1:0):v)}}return{sql:cl.length?' WHERE '+cl.join(' AND '):'',ps}},
 cast(m,r){if(!r)return r;for(const f of m.fields)if(f.type==='Boolean'&&f.name in r)r[f.name]=!!r[f.name];return r},
 delegate(name){const P=this;const m=()=>{const mm=P.models[name];if(!mm)throw new Error('Unknown model '+name);if(!P.migrated)throw new Error('The table `main.'+name+'` does not exist in the current database. Run `npx prisma migrate dev` first.');return mm};
  const incl=(mm,rows,inc)=>{if(!inc)return rows;for(const [rel,on] of Object.entries(inc)){if(!on)continue;const f=mm.fields.find(x=>x.name===rel);if(!f)continue;const other=P.models[f.type];if(f.list){const fk=other.fields.find(x=>x.type===name&&/@relation/.test(x.attrs));const col=fk?(fk.attrs.match(/fields:\s*\[(\w+)\]/)||[])[1]:null;for(const r of rows)r[rel]=col?sqlRows(P.db,'SELECT * FROM "'+other.name+'" WHERE "'+col+'" = ?',[r.id]).map(x=>P.cast(other,x)):[]}else{const col=(f.attrs.match(/fields:\s*\[(\w+)\]/)||[])[1];for(const r of rows)r[rel]=col?P.cast(other,sqlRows(P.db,'SELECT * FROM "'+other.name+'" WHERE id = ?',[r[col]])[0]||null):null}}return rows};
  return{
   async findMany(o){o=o||{};const mm=m();const w=P.where(mm,o.where);let q='SELECT * FROM "'+name+'"'+w.sql;if(o.orderBy){const [k,d]=Object.entries(o.orderBy)[0];q+=' ORDER BY "'+k+'" '+(d==='desc'?'DESC':'ASC')}if(o.take)q+=' LIMIT '+(+o.take);if(o.skip)q+=(o.take?'':' LIMIT -1')+' OFFSET '+(+o.skip);return incl(mm,sqlRows(P.db,q,w.ps).map(r=>P.cast(mm,r)),o.include)},
   async findUnique(o){const r=await this.findMany({where:o.where,include:o.include,take:1});return r[0]||null},async findFirst(o){const r=await this.findMany(Object.assign({},o,{take:1}));return r[0]||null},
   async create(o){const mm=m();const d=Object.assign({},o.data);for(const f of mm.fields)if(f.type==='Boolean'&&f.name in d)d[f.name]=d[f.name]?1:0;const cols=Object.keys(d);try{P.db.run('INSERT INTO "'+name+'" ('+cols.map(c=>'"'+c+'"').join(',')+') VALUES ('+cols.map(()=>'?').join(',')+')',cols.map(c=>d[c]))}catch(e){if(/UNIQUE/.test(e.message))throw new Error('Unique constraint failed on the fields: ('+e.message.split('.').pop()+')');if(/NOT NULL/.test(e.message))throw new Error('Argument `'+e.message.split('.').pop()+'` is missing.');throw e}const id=sqlRows(P.db,'SELECT last_insert_rowid() AS id')[0].id;return P.cast(mm,sqlRows(P.db,'SELECT * FROM "'+name+'" WHERE rowid = ?',[id])[0])},
   async update(o){const mm=m();const d=Object.assign({},o.data);for(const f of mm.fields)if(f.type==='Boolean'&&f.name in d)d[f.name]=d[f.name]?1:0;const w=P.where(mm,o.where);P.db.run('UPDATE "'+name+'" SET '+Object.keys(d).map(c=>'"'+c+'" = ?').join(', ')+w.sql,[...Object.values(d),...w.ps]);return this.findFirst({where:o.where})},
   async delete(o){const mm=m();const row=await this.findFirst({where:o.where});if(!row)throw new Error('Record to delete does not exist.');const w=P.where(mm,o.where);P.db.run('DELETE FROM "'+name+'"'+w.sql,w.ps);return row},
   async count(o){const mm=m();const w=P.where(mm,(o||{}).where);return sqlRows(P.db,'SELECT COUNT(*) AS n FROM "'+name+'"'+w.sql,w.ps)[0].n}}},
 Client:null};
PRISMA.Client=function(){const P=PRISMA;return new Proxy({},{get:(o,k)=>{if(k==='$disconnect'||k==='$connect')return async()=>{};if(typeof k!=='string')return undefined;const name=k.charAt(0).toUpperCase()+k.slice(1);return P.delegate(name)}})};
window.PRISMA=PRISMA;

/* ---------- Python (Brython) ---------- */
const PY_PRE=`import sys, json, builtins, traceback, io, types
from browser import window
class _W:
    def __init__(self,k): self.k=k
    def write(self,t): window[self.k] = window[self.k] + str(t)
    def flush(self): pass
sys.stdout=_W("__pyout"); sys.stderr=_W("__pyerr")
_FS = json.loads(window.__pyfs_json)
class _File:
    def __init__(self, path, mode='r', encoding=None, newline=None):
        path=str(path)
        if path.startswith('./'): path=path[2:]
        self.path=path; self.mode=mode; self.closed=False
        if 'r' in mode and '+' not in mode:
            if path not in _FS: raise FileNotFoundError("[Errno 2] No such file or directory: '"+path+"'")
            self._b = io.StringIO(_FS[path])
        else:
            self._b = io.StringIO(_FS.get(path,'') if 'a' in mode else '')
            if 'a' in mode: self._b.seek(0,2)
    def read(self,n=-1): return self._b.read() if n is None or n<0 else self._b.read(n)
    def readline(self): return self._b.readline()
    def readlines(self): return self._b.readlines()
    def write(self,s):
        self._b.write(s); return len(s)
    def writelines(self,ls):
        for l in ls: self._b.write(l)
    def __iter__(self): return iter(self._b.getvalue().splitlines(True))
    def close(self):
        if not self.closed and ('w' in self.mode or 'a' in self.mode): _FS[self.path]=self._b.getvalue()
        self.closed=True
    def __enter__(self): return self
    def __exit__(self,*a): self.close()
builtins.open=_File
import os
def _exists(p):
    p=str(p).rstrip('/')
    if p.startswith('./'): p=p[2:]
    return p in _FS or any(k.startswith(p+'/') for k in _FS)
os.path.exists=_exists
os.path.isfile=lambda p: str(p) in _FS
def _listdir(p='.'):
    p=str(p).rstrip('/')
    pre='' if p in ('.','') else p+'/'
    return sorted(set(k[len(pre):].split('/')[0] for k in _FS if k.startswith(pre)))
os.listdir=_listdir
def _remove(p): _FS.pop(str(p),None)
os.remove=_remove
os.makedirs=lambda p, exist_ok=False: None

def _mv(a,b):
    a=str(a); b=str(b)
    if a not in _FS: raise FileNotFoundError("[Errno 2] No such file or directory: '"+a+"'")
    if b.endswith('/') or any(k.startswith(b.rstrip('/')+'/') for k in _FS) or b in _DIRS: b=b.rstrip('/')+'/'+a.split('/')[-1]
    _FS[b]=_FS.pop(a)
    return b
os.rename=_mv
_DIRS=set()
def _mkd(p, exist_ok=False): _DIRS.add(str(p).rstrip('/'))
os.makedirs=_mkd
os.mkdir=_mkd
import shutil
shutil.move=_mv
shutil.copy=lambda a,b: _FS.__setitem__(str(b) if not (str(b) in _DIRS or str(b).endswith('/')) else str(b).rstrip('/')+'/'+str(a).split('/')[-1], _FS[str(a)])
os.path.isdir=lambda p: str(p).rstrip('/') in _DIRS or any(k.startswith(str(p).rstrip('/')+'/') for k in _FS)
os.path.splitext=lambda p: (str(p)[:str(p).rfind('.')], str(p)[str(p).rfind('.'):]) if '.' in str(p).split('/')[-1] else (str(p),'')
os.path.join=lambda *ps: '/'.join(str(x).strip('/') for x in ps if str(x) not in ('','.'))
os.getenv=lambda k, d=None: json.loads(window.__pyenv_json).get(k, d)
os.environ=json.loads(window.__pyenv_json)
# --- requests (mock web APIs) ---
_rq=types.ModuleType('requests')
class _Resp:
    def __init__(s,status,data):
        s.status_code=status; s._d=data; s.ok=200<=status<300; s.text=json.dumps(data); s.headers={'content-type':'application/json'}
    def json(s): return s._d
    def raise_for_status(s):
        if not s.ok: raise _rq.HTTPError(str(s.status_code)+" Error for url")
class _HTTPError(Exception): pass
_rq.HTTPError=_HTTPError
_rq.exceptions=types.SimpleNamespace(HTTPError=_HTTPError, Timeout=TimeoutError, RequestException=Exception)
def _call(method,url,params=None,json_body=None,timeout=None,headers=None):
    r=json.loads(window.__mockapi(method,url,json.dumps(params or {}),json.dumps(json_body)))
    if r.get('timeout'): raise TimeoutError('Read timed out. (read timeout='+str(timeout)+')')
    return _Resp(r['status'],r['body'])
_rq.get=lambda url,params=None,timeout=None,headers=None: _call('GET',url,params,None,timeout,headers)
_rq.post=lambda url,json=None,timeout=None,headers=None,data=None: _call('POST',url,None,json,timeout,headers)
sys.modules['requests']=_rq
# --- pydantic + fastapi shims ---
_pd=types.ModuleType('pydantic')
class ValidationError(Exception):
    def __init__(s,errs): s._e=errs; super().__init__(str(len(errs))+" validation error(s): "+", ".join(e['loc'][-1]+": "+e['msg'] for e in errs))
    def errors(s): return s._e
def _tname(t): return getattr(t,'__name__',str(t))
def Field(default=None, **kw): return default
class BaseModel:
    def __init__(self, **data):
        ann={}
        for c in reversed(type(self).__mro__): ann.update(getattr(c,'__annotations__',{}) or {})
        errs=[]
        for k,t in ann.items():
            if k in data: v=data[k]
            elif hasattr(type(self),k): v=getattr(type(self),k)
            else:
                errs.append({'loc':['body',k],'msg':'Field required','type':'missing'}); continue
            if t is int:
                if isinstance(v,bool) or not (isinstance(v,int) or (isinstance(v,str) and v.lstrip('-').isdigit())):
                    errs.append({'loc':['body',k],'msg':'Input should be a valid integer','type':'int_parsing'}); continue
                v=int(v)
            elif t is float:
                if isinstance(v,bool) or not isinstance(v,(int,float)):
                    try: v=float(v)
                    except Exception:
                        errs.append({'loc':['body',k],'msg':'Input should be a valid number','type':'float_parsing'}); continue
                v=float(v)
            elif t is str and not isinstance(v,str):
                errs.append({'loc':['body',k],'msg':'Input should be a valid string','type':'string_type'}); continue
            elif t is bool and not isinstance(v,bool):
                errs.append({'loc':['body',k],'msg':'Input should be a valid boolean','type':'bool_parsing'}); continue
            setattr(self,k,v)
        if errs: raise ValidationError(errs)
        self.__fields=list(ann.keys())
    def model_dump(self): return {k:getattr(self,k) for k in self.__fields}
    def dict(self): return self.model_dump()
    def __repr__(self): return type(self).__name__+"("+", ".join(k+"="+repr(getattr(self,k)) for k in self.__fields)+")"
_pd.BaseModel=BaseModel; _pd.ValidationError=ValidationError; _pd.Field=Field
sys.modules['pydantic']=_pd
_fa=types.ModuleType('fastapi')
class HTTPException(Exception):
    def __init__(self,status_code,detail=None): self.status_code=status_code; self.detail=detail
class FastAPI:
    def __init__(self,**kw): self.routes=[]; self.title=kw.get('title','FastAPI')
    def _add(self,m,path,status_code=200):
        def deco(fn):
            self.routes.append((m,path,fn,status_code)); return fn
        return deco
    def get(self,path,status_code=200,**kw): return self._add('GET',path,status_code)
    def post(self,path,status_code=200,**kw): return self._add('POST',path,status_code)
    def put(self,path,status_code=200,**kw): return self._add('PUT',path,status_code)
    def patch(self,path,status_code=200,**kw): return self._add('PATCH',path,status_code)
    def delete(self,path,status_code=200,**kw): return self._add('DELETE',path,status_code)
def Query(default=None,**kw): return default
_fa.FastAPI=FastAPI; _fa.HTTPException=HTTPException; _fa.Query=Query; _fa.status=types.SimpleNamespace(HTTP_201_CREATED=201,HTTP_204_NO_CONTENT=204,HTTP_404_NOT_FOUND=404,HTTP_400_BAD_REQUEST=400)
sys.modules['fastapi']=_fa
def _jsonable(v):
    if isinstance(v,BaseModel): return v.model_dump()
    if isinstance(v,dict): return {k:_jsonable(x) for k,x in v.items()}
    if isinstance(v,(list,tuple)): return [_jsonable(x) for x in v]
    return v
class _TResp:
    def __init__(s,code,data): s.status_code=code; s._d=data; s.text=json.dumps(data)
    def json(s): return s._d
def _match(pattern,path):
    ps=[p for p in pattern.strip('/').split('/') if p]; xs=[p for p in path.strip('/').split('/') if p]
    if len(ps)!=len(xs): return None
    out={}
    for a,b in zip(ps,xs):
        if a.startswith('{') and a.endswith('}'): out[a[1:-1]]=b
        elif a!=b: return None
    return out
class TestClient:
    def __init__(self,app): self.app=app
    def request(self,method,url,body=None):
        path,_,qs=url.partition('?')
        query={}
        for part in qs.split('&'):
            if '=' in part:
                k,v=part.split('=',1); query[k]=v
        allowed=False
        for (m,pattern,fn,code) in self.app.routes:
            params=_match(pattern,path)
            if params is None: continue
            if m!=method:
                allowed=True; continue
            ann=getattr(fn,'__annotations__',{}) or {}
            co=fn.__code__; names=list(co.co_varnames[:co.co_argcount]); defs=fn.__defaults__ or ()
            dmap={names[len(names)-len(defs)+i]:d for i,d in enumerate(defs)}
            kwargs={}
            for n in names:
                t=ann.get(n)
                if n in params or n in query:
                    raw=params[n] if n in params else query[n]
                    if t is int:
                        try: raw=int(raw)
                        except Exception: return _TResp(422,{'detail':[{'loc':['path' if n in params else 'query',n],'msg':'Input should be a valid integer, unable to parse string as an integer','type':'int_parsing'}]})
                    elif t is float: raw=float(raw)
                    elif t is bool: raw=raw.lower() in ('1','true','yes')
                    kwargs[n]=raw
                elif isinstance(t,type) and issubclass(t,BaseModel):
                    try: kwargs[n]=t(**(body or {}))
                    except ValidationError as e: return _TResp(422,{'detail':e.errors()})
                elif n in dmap: kwargs[n]=dmap[n]
                else: return _TResp(422,{'detail':[{'loc':['query',n],'msg':'Field required','type':'missing'}]})
            try: res=fn(**kwargs)
            except HTTPException as e: return _TResp(e.status_code,{'detail':e.detail})
            return _TResp(code,_jsonable(res))
        if allowed: return _TResp(405,{'detail':'Method Not Allowed'})
        return _TResp(404,{'detail':'Not Found'})
    def get(self,url,params=None):
        if params: url=url+'?'+'&'.join(str(k)+'='+str(v) for k,v in params.items())
        return self.request('GET',url)
    def post(self,url,json=None): return self.request('POST',url,json)
    def put(self,url,json=None): return self.request('PUT',url,json)
    def patch(self,url,json=None): return self.request('PATCH',url,json)
    def delete(self,url): return self.request('DELETE',url)
_tc=types.ModuleType('fastapi.testclient'); _tc.TestClient=TestClient; sys.modules['fastapi.testclient']=_tc
# --- pytest shim ---
_pt=types.ModuleType('pytest')
class _Raises:
    def __init__(s,exc,match=None): s.exc=exc; s.match=match; s.value=None
    def __enter__(s): return s
    def __exit__(s,t,v,tb):
        if t is None: raise AssertionError("DID NOT RAISE "+s.exc.__name__)
        if not issubclass(t,s.exc): return False
        if s.match and s.match not in str(v): raise AssertionError("Regex pattern did not match: '"+s.match+"' not in '"+str(v)+"'")
        s.value=v; return True
_pt.raises=lambda exc,match=None: _Raises(exc,match)
def _fixture(fn=None,**kw):
    if fn is None: return lambda f: _fixture(f)
    fn._is_fixture=True; return fn
_pt.fixture=_fixture
class _Mark:
    def parametrize(self,names,values):
        def deco(fn):
            fn._params=([n.strip() for n in names.split(',')],values); return fn
        return deco
_pt.mark=_Mark()
_pt.approx=lambda v,rel=1e-6: type('A',(),{'__eq__':lambda s,o: abs(o-v)<=max(rel*abs(v),1e-12)})()
sys.modules['pytest']=_pt
def __run_pytest(g):
    tests=[(k,v) for k,v in g.items() if k.startswith('test_') and callable(v)]
    fixtures={k:v for k,v in g.items() if callable(v) and getattr(v,'_is_fixture',False)}
    results=[]
    for name,fn in tests:
        co=fn.__code__; argn=list(co.co_varnames[:co.co_argcount])
        cases=[{}]
        if hasattr(fn,'_params'):
            ns,vals=fn._params
            cases=[dict(zip(ns, v if isinstance(v,(list,tuple)) else [v])) for v in vals]
        for i,case in enumerate(cases):
            label=name+('['+'-'.join(str(x) for x in case.values())+']' if hasattr(fn,'_params') else '')
            try:
                kw={}
                for a in argn:
                    if a in case: kw[a]=case[a]
                    elif a in fixtures: kw[a]=fixtures[a]()
                fn(**kw); results.append({'name':label,'ok':True})
            except AssertionError as e:
                tb=traceback.extract_tb(sys.exc_info()[2]); line=tb[-1].line if tb else ''
                results.append({'name':label,'ok':False,'err':'AssertionError'+(': '+str(e) if str(e) else '')+(' (assert line: '+str(line)+')' if line else '')})
            except Exception as e:
                results.append({'name':label,'ok':False,'err':type(e).__name__+': '+str(e)})
    return results
`;
let _pyReady=null;
async function pyLib(){if(!_pyReady)_pyReady=(async()=>{await need('brython');if(!window.__BRYTHON__.__initialized){try{window.brython({debug:0})}catch(e){}window.__BRYTHON__.__initialized=true}})();return _pyReady}
const MOCK_API={
 'GET https://api.example.com/users':()=>({status:200,body:[{id:1,name:'Ada Lovelace',email:'ada@example.com',city:'London'},{id:2,name:'Alan Turing',email:'alan@example.com',city:'Wilmslow'},{id:3,name:'Grace Hopper',email:'grace@example.com',city:'New York'}]}),
 'GET https://api.example.com/users/:id':p=>{const u={1:{id:1,name:'Ada Lovelace',email:'ada@example.com'},2:{id:2,name:'Alan Turing',email:'alan@example.com'},3:{id:3,name:'Grace Hopper',email:'grace@example.com'}}[p.id];return u?{status:200,body:u}:{status:404,body:{error:'User not found'}}},
 'GET https://api.example.com/weather':(p,q)=>{const t={lagos:31,london:12,abidjan:29,tokyo:18,accra:30}[String(q.city||'').toLowerCase()];return t==null?{status:404,body:{error:'Unknown city'}}:{status:200,body:{city:q.city,temp_c:t,conditions:t>25?'sunny':'cloudy'}}},
 'GET https://api.example.com/slow':()=>({timeout:true}),
 'POST https://api.example.com/todos':(p,q,b)=>b&&b.title?{status:201,body:Object.assign({id:101},b)}:{status:400,body:{error:'title is required'}},
};
window.__mockapi=(method,url,paramsJson,bodyJson)=>{const [path,qs]=url.split('?');const q=Object.assign(Object.fromEntries(new URLSearchParams(qs||'')),JSON.parse(paramsJson||'{}'));const body=bodyJson&&bodyJson!=='null'?JSON.parse(bodyJson):null;
 for(const [k,fn] of Object.entries(MOCK_API)){const [m,pat]=k.split(' ');if(m!==method)continue;const re=new RegExp('^'+pat.replace(/[.]/g,'\\.').replace(/:(\w+)/g,'(?<$1>[^/]+)')+'/?$');const mm=path.match(re);if(mm)return JSON.stringify(fn(mm.groups||{},q,body))}
 return JSON.stringify({status:404,body:{error:'Not found: '+url}})};
async function runPy(src,checks,opts){await pyLib();opts=opts||{};window.__pyout='';window.__pyerr='';window.__pyres='{}';window.__pytests='null';window.__pyfs_json=JSON.stringify(opts.fs||{});window.__pyenv_json=JSON.stringify(opts.env||{});
 const chk='__g["_TC"]=TestClient\n__r={}\nfor __k,__e in '+JSON.stringify(Object.entries(checks||{}))+':\n    try:\n        __r[__k]=bool(eval(__e,__g))\n    except Exception as __x:\n        __r[__k]=False\nwindow.__pyres=json.dumps(__r)\n';
 const prog=PY_PRE+'\n__g={"__name__":"__main__","open":_File}\n__ok=True\ntry:\n    exec(compile('+JSON.stringify(src)+',"main.py","exec"),__g)\nexcept SystemExit:\n    pass\nexcept BaseException as __ex:\n    __ok=False\n    __tb=traceback.format_exc().split("\\n")\n    __keep=[l for l in __tb if "main.py" in l or not l.startswith("  File")]\n    __lines=[]\n    __skip=False\n    for l in __tb:\n        if l.startswith("  File") and "main.py" not in l:\n            __skip=True\n            continue\n        if __skip and l.startswith("    "):\n            __skip=False\n            continue\n        __skip=False\n        __lines.append(l)\n    sys.stderr.write("\\n".join(__lines))\n'+(opts.pytest?'if __ok:\n    window.__pytests=json.dumps(__run_pytest(__g))\n':'')+chk+'window.__pyfs_json=json.dumps(_FS)\n';
 let jsErr=null;try{window.__BRYTHON__.runPythonSource(prog,{})}catch(e){jsErr=e&&e.$class?e.$class.__name__+': '+(e.args||''):String(e&&e.message||e)}
 let res={};try{res=JSON.parse(window.__pyres)}catch(e){}const fsOut=JSON.parse(window.__pyfs_json||'{}');let tests=null;try{tests=JSON.parse(window.__pytests)}catch(e){}
 const err=(window.__pyerr||'').trim()||(jsErr&&!window.__pyout?jsErr:null);return{out:window.__pyout,err,res,fs:fsOut,tests}}
RUN.py=async(src,l,b)=>{const xs=checksOf(l);const fs=b.pyfs||Object.assign({},l.fs||{});const r=await runPy(src,xs,{fs,pytest:l.pytest,env:l.env});b.pyfs=r.fs;const res={};for(const [k,v] of Object.entries(r.res))res[k]={ok:v};
 return{code:src,out:r.out,logs:r.out?r.out.replace(/\n$/,'').split('\n'):[],err:r.err,res,fs:r.fs,tests:r.tests}};
RUN.pyFile=async(src,io)=>{const r=await runPy(src,{},{fs:{}});return{out:(r.out||'').replace(/\n$/,'')+(r.err?'\n'+r.err:''),err:!!r.err}};

/* ---------- PHP (mini interpreter in php.js) ---------- */
RUN.php=async(src,l,b)=>{if(l.sqlite)await sqlLib();const files=typeof src==='object'?src:null;const code=files?(files[l.entry||'index.php']||''):src;const r=await PHPI.run(code,{files:files||{},db:l.sqlite?b.phpdb||(b.phpdb=PHPI.newDb(_SQL,l.seed)):null,laravel:l.laravel,checks:l.tasks.map(t=>t.php||null)});
 b.php=r;return{code:files?Object.values(files).join('\n'):src,files,out:r.out,logs:r.out?[r.out]:[],err:r.err,res:r.res||{},php:r,req:(m,u,body)=>r.request?r.request(m,u,body):{status:500,body:'no router'}}};
RUN.phpFile=async(src,io)=>{if(/new\s+PDO/.test(src))await sqlLib();const r=await PHPI.run(src,{files:{},readFile:io&&io.read,db:/new\s+PDO/.test(src)?PHPI.newDb(_SQL,''):null});return{out:(r.out||'')+(r.err?'\n'+r.err:''),err:!!r.err}};
RUN.phpSync=src=>PHPI.runSync?PHPI.runSync(src):{out:src};

/* ---------- AI client (uses Claude through the page capability when available) ---------- */
function aiClient(onCall){
 const mock=(msgs,system,opts)=>{const last=msgs[msgs.length-1];const text=typeof last.content==='string'?last.content:last.content.map(c=>c.text||'').join(' ');const all=(system||'')+' '+text;
  if(/json/i.test(all)){const keys=[...new Set((all.match(/"(\w+)"\s*:/g)||[]).map(k=>k.replace(/[":\s]/g,'')))];const fields=keys.length?keys:(all.match(/\b(name|email|sentiment|summary|category|priority|score|tags|title|city|date)\b/gi)||['result']).map(s=>s.toLowerCase());const o={};for(const k of fields)o[k]=k==='sentiment'?'positive':k==='score'||k==='priority'?4:k==='tags'?['sample','offline']:k==='email'?'ada@example.com':'sample '+k;return JSON.stringify(o)}
  if(/summar/i.test(all))return 'Offline sample summary: the text discusses the main topic in a few key points.';if(/translate/i.test(all))return 'Bonjour le monde (offline sample)';return 'This is an offline sample response. When this page runs inside Claude, you get a real answer here.'};
 const create=async(params)=>{if(!params||!params.model)throw new Error('400 invalid_request_error: model: Field required');if(!params.max_tokens)throw new Error('400 invalid_request_error: max_tokens: Field required');if(!Array.isArray(params.messages)||!params.messages.length)throw new Error('400 invalid_request_error: messages: at least one message is required');
  if(params.messages[0].role!=='user')throw new Error('400 invalid_request_error: messages: the first message must use the "user" role');for(const m of params.messages)if(!['user','assistant'].includes(m.role))throw new Error('400 invalid_request_error: messages.role must be "user" or "assistant" (put system instructions in the top-level "system" field)');
  onCall&&onCall(params);let text,live=false;
  if(sampleFn){try{const conv=params.messages.map(m=>({role:m.role,content:typeof m.content==='string'?m.content:m.content.map(c=>c.text||JSON.stringify(c)).join('\n')}));if(params.system)conv[0]={role:'user',content:'[System instructions]\n'+params.system+'\n\n[User]\n'+conv[0].content};const r=await sampleFn(conv,{modelTier:'quick'});text=r.text;live=true}catch(e){text=mock(params.messages,params.system)}}else text=mock(params.messages,params.system);
  return{id:'msg_'+Math.random().toString(36).slice(2,12),type:'message',role:'assistant',model:params.model,content:[{type:'text',text}],stop_reason:'end_turn',usage:{input_tokens:Math.ceil(JSON.stringify(params.messages).length/4),output_tokens:Math.ceil(text.length/4)},_live:live}};
 const agent=async({prompt,tools,system})=>{if(sampleFn){try{const used=[];const r=await sampleFn((system?'[System]\n'+system+'\n\n':'')+prompt,{modelTier:'quick',tools:(tools||[]).map(t=>({name:t.name,description:t.description,inputSchema:t.input_schema||t.inputSchema,execute:async inp=>{used.push({name:t.name,input:inp});return await t.run(inp)}}))});return{text:r.text,toolCalls:used,live:true}}catch(e){}}
  const t=(tools||[])[0];if(!t)return{text:mock([{content:prompt}],system),toolCalls:[]};const props=Object.keys((t.input_schema||t.inputSchema||{}).properties||{});const guess={};for(const p of props){const m=prompt.match(/\b(Lagos|London|Tokyo|Accra|Abidjan)\b/);guess[p]=p==='city'&&m?m[1]:p==='a'?12:p==='b'?30:'sample'}const out=await t.run(guess);return{text:'(offline) I called '+t.name+' and got: '+JSON.stringify(out),toolCalls:[{name:t.name,input:guess}],live:false}};
 return{messages:{create},runAgent:agent}}
RUN.ai=async(src,l,b)=>{const calls=[];const env={client:aiClient(p=>calls.push(p)),Anthropic:function(){return aiClient(p=>calls.push(p))}};if(l.envExtra)Object.assign(env,l.envExtra());const r=await runMain(src,l,env);r.calls=calls;r.live=!!sampleFn;return r};
RUN.jsm=async(src,l,b)=>{let env={};if(l.sqlite){const SQL=await sqlLib();const db=new SQL.Database();if(l.seed)db.exec(l.seed);env.db={query:(q,params)=>sqlRows(db,q,params),run:(q,params)=>{db.run(q,params);return{changes:db.getRowsModified()}},raw:db}}if(l.envExtra)Object.assign(env,l.envExtra());return runMain(src,l,env)};

/* ---------- Playwright-style end-to-end tests against the preview ---------- */
function pwPage(frame,appHtml){const doc=()=>frame.contentDocument,win=()=>frame.contentWindow;
 const accName=el=>{if(!el)return'';if(el.getAttribute('aria-label'))return el.getAttribute('aria-label');if(el.id){const lb=doc().querySelector('label[for="'+el.id+'"]');if(lb)return lb.textContent.trim()}const wrap=el.closest('label');if(wrap)return wrap.textContent.trim();if(el.tagName==='INPUT'&&(el.type==='submit'||el.type==='button'))return el.value;return (el.textContent||el.getAttribute('placeholder')||'').trim()};
 const ROLE={button:'button,[role=button],input[type=submit],input[type=button]',link:'a[href],[role=link]',heading:'h1,h2,h3,h4,h5,h6,[role=heading]',textbox:'input:not([type]),input[type=text],input[type=email],input[type=password],input[type=search],input[type=tel],textarea,[role=textbox]',checkbox:'input[type=checkbox],[role=checkbox]',listitem:'li,[role=listitem]',list:'ul,ol,[role=list]',alert:'[role=alert]',img:'img,[role=img]',combobox:'select,[role=combobox]',navigation:'nav,[role=navigation]',dialog:'dialog,[role=dialog]',status:'[role=status]'};
 const nameOk=(n,want,exact)=>want==null||(want instanceof RegExp?want.test(n):exact?n===want:n.toLowerCase().includes(String(want).toLowerCase()));
 const visible=el=>{if(!el||!el.isConnected)return false;const s=win().getComputedStyle(el);if(s.display==='none'||s.visibility==='hidden')return false;let p=el.parentElement;while(p){const ps=win().getComputedStyle(p);if(ps.display==='none')return false;p=p.parentElement}return true};
 const loc=finder=>{const L={_all:()=>finder().filter(Boolean),_one:async()=>{const t0=Date.now();while(Date.now()-t0<1500){const els=L._all();if(els.length===1)return els[0];if(els.length>1)throw new Error('strict mode violation: locator resolved to '+els.length+' elements. Make it more specific, e.g. { name: "..." } or .first()');await sleep(50)}throw new Error('Timeout 1500ms exceeded: no element matches the locator')},
  async click(){const el=await L._one();if(el.disabled)throw new Error('element is disabled');el.click();await sleep(120)},
  async fill(v){const el=await L._one();const proto=el.tagName==='TEXTAREA'?win().HTMLTextAreaElement.prototype:win().HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,v);el.dispatchEvent(new (win().Event)('input',{bubbles:true}));el.dispatchEvent(new (win().Event)('change',{bubbles:true}));await sleep(60)},
  async check(){const el=await L._one();if(!el.checked)el.click();await sleep(60)},async press(k){const el=await L._one();if(k==='Enter'){const f=el.closest('form');if(f)f.requestSubmit?f.requestSubmit():f.submit()}await sleep(100)},
  async textContent(){return (await L._one()).textContent},async inputValue(){return (await L._one()).value},async isVisible(){const els=L._all();return els.length>0&&visible(els[0])},async count(){return L._all().length},
  first(){return loc(()=>L._all().slice(0,1))},last(){return loc(()=>L._all().slice(-1))},nth(i){return loc(()=>L._all().slice(i,i+1))},
  getByRole(r,o){return loc(()=>L._all().flatMap(p=>[...p.querySelectorAll(ROLE[r]||r)].filter(e=>nameOk(accName(e),o&&o.name,o&&o.exact))))},getByText(t){return loc(()=>L._all().flatMap(p=>[...p.querySelectorAll('*')].filter(e=>e.children.length===0&&nameOk(e.textContent.trim(),t))))},
  filter(o){return loc(()=>L._all().filter(e=>!o||!o.hasText||nameOk(e.textContent,o.hasText)))},__isLocator:true};return L};
 const page={async goto(path){await loadFrame(frame,appHtml.replace('__PATH__',path||'/'));await sleep(150)},
  getByRole:(r,o)=>loc(()=>[...doc().querySelectorAll(ROLE[r]||r)].filter(e=>nameOk(accName(e),o&&o.name,o&&o.exact))),
  getByText:(t,o)=>loc(()=>{const all=[...doc().body.querySelectorAll('*')].filter(e=>nameOk(e.textContent.trim(),t,o&&o.exact));return all.filter(e=>![...e.children].some(c=>all.includes(c)))}),
  getByLabel:t=>loc(()=>[...doc().querySelectorAll('input,textarea,select')].filter(e=>nameOk(accName(e),t))),getByPlaceholder:t=>loc(()=>[...doc().querySelectorAll('[placeholder]')].filter(e=>nameOk(e.getAttribute('placeholder'),t))),
  getByTestId:t=>loc(()=>[...doc().querySelectorAll('[data-testid="'+t+'"]')]),locator:css=>loc(()=>[...doc().querySelectorAll(css)]),
  url:()=>{try{return 'http://localhost:3000'+(win().__path||'/')}catch(e){return ''}},async waitForTimeout(ms){await sleep(Math.min(ms,1000))},__isPage:true};
 const pexpect=(t)=>{const mk=neg=>{const ok=async(fn,msg)=>{const t0=Date.now();let last=false;while(Date.now()-t0<1500){try{last=await fn()}catch(e){last=false}if(last!==neg)return;await sleep(60)}throw new Error((neg?'expected NOT ':'expected ')+msg)};
  if(t&&t.__isPage)return{toHaveURL:re=>ok(async()=>re instanceof RegExp?re.test(page.url()):page.url().endsWith(re),'page URL '+page.url()+' to match '+re),toHaveTitle:re=>ok(async()=>re instanceof RegExp?re.test(doc().title):doc().title===re,'title "'+doc().title+'" to match '+re)};
  if(t&&t.__isLocator)return{toBeVisible:()=>ok(async()=>{const e=t._all();return e.length>0&&visible(e[0])},'element to be visible'),toBeHidden:()=>ok(async()=>{const e=t._all();return !e.length||!visible(e[0])},'element to be hidden'),toHaveText:x=>ok(async()=>{const e=t._all();return e.length>0&&(x instanceof RegExp?x.test(e[0].textContent):e[0].textContent.trim()===x)},'element to have text '+x+' (got "'+((t._all()[0]||{}).textContent||'').trim()+'")'),toContainText:x=>ok(async()=>{const e=t._all();return e.length>0&&(x instanceof RegExp?x.test(e[0].textContent):e[0].textContent.includes(x))},'element to contain text '+x),toHaveCount:n=>ok(async()=>t._all().length===n,'locator to have count '+n+' (got '+t._all().length+')'),toHaveValue:v=>ok(async()=>{const e=t._all();return e.length>0&&e[0].value===v},'input to have value '+v),toBeChecked:()=>ok(async()=>{const e=t._all();return e.length>0&&e[0].checked},'checkbox to be checked'),toBeDisabled:()=>ok(async()=>{const e=t._all();return e.length>0&&e[0].disabled},'element to be disabled'),toBeEnabled:()=>ok(async()=>{const e=t._all();return e.length>0&&!e[0].disabled},'element to be enabled')};
  return{toBe:async x=>{if((t===x)===neg)throw new Error('expected '+t+(neg?' not':'')+' to be '+x)},toEqual:async x=>{if((JSON.stringify(t)===JSON.stringify(x))===neg)throw new Error('expected '+JSON.stringify(t)+' to equal '+JSON.stringify(x))},toBeTruthy:async()=>{if(!!t===neg)throw new Error('expected value to be truthy')},toContain:async x=>{if(String(t).includes(x)===neg)throw new Error('expected '+t+' to contain '+x)}}};
  const m=mk(false);m.not=mk(true);return m};
 return{page,expect:pexpect}}
RUN.e2e=async(src,l,b)=>{const tests=[];const test=(n,f)=>tests.push({n,f});test.describe=(n,f)=>f();test.beforeEach=f=>{test._be=f};const {page,expect}=pwPage(b.frame,l.app);
 const r=await runMain(src.replace(/^\s*import\s.*from\s+['"]@playwright\/test['"];?\s*$/gm,''),{tasks:[]},{test,expect,page:undefined});if(r.err)return Object.assign(r,{tests:[]});
 const res=[];for(const t of tests){try{await page.goto('/');if(test._be)await test._be({page});await t.f({page});res.push({name:t.n,ok:true})}catch(e){res.push({name:t.n,ok:false,err:e.message})}}
 const app=await (async()=>{await page.goto('/');return domCtx(b.frame,src)})();return Object.assign(r,{tests:res,doc:app.doc,win:app.win})};

/* ---------- design bench is in design.js ---------- */

/* ---------- Code bench ---------- */
BENCH.code={
 mount(el,l){this.l=l;const lang=l.lang;if(lang==='next'){PRISMA.db=null;PRISMA.migrated=null;PRISMA.migrations=0}this.code=null;clearInterval(this.poll);this.ctx=null;this.reqs=[];this.termHist=[];this.applied=[];this.built=false;this.runs=0;this.seeded=false;this.files=l.files?Object.assign({},l.files):null;this.cur=this.files?(l.open||Object.keys(this.files)[0]):null;this.url='/';this.pyfs=l.fs?Object.assign({},l.fs):null;this.phpdb=null;
  const needsFrame=['web','vue','react','next','e2e'].includes(lang);
  el.innerHTML='<div class="card panel code-panel"><div class="code-bar"><div class="tabs-f" id="cTabs"></div><span class="pill">'+esc(LANG_LABEL[lang]||lang)+'</span><button class="btn primary" id="cRun" title="Ctrl+Enter">▶ Run</button><button class="btn" id="cReset">Reset code</button></div><textarea id="cEd" class="code-ed tall" spellcheck="false" autocapitalize="off" aria-label="Code editor"></textarea><div class="note-meta">Ctrl+Enter runs your code. Tab indents.'+(lang==='php'&&!l.laravel?' PHP runs in a small built-in interpreter that supports the features these lessons use.':'')+'</div></div>'
   +(needsFrame?'<div class="card panel preview"><h3>'+(lang==='next'?'<span class="urlbar"><span class="muted">localhost:3000</span><input id="cUrl" value="/" aria-label="Preview URL"><button class="btn" id="cGo">Go</button></span>':lang==='e2e'?'App under test':'Preview')+'</h3><iframe id="cFrame" title="Preview" class="frame"></iframe></div>':'')
   +(l.api?'<div class="card panel"><h3>Send a request <span class="eyebrow">'+esc(l.api==='php'?'Laravel router':'FastAPI TestClient')+'</span></h3><div class="reqbar"><select id="rMethod" aria-label="Method"><option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option></select><input id="rUrl" value="'+esc(l.apiStart||'/')+'" aria-label="Path"><button class="btn primary" id="rSend">Send</button></div><textarea id="rBody" class="code-ed short" placeholder=\'JSON body, e.g. {"name": "Ada"}\' aria-label="Request body"></textarea><pre class="console" id="rOut">Responses appear here.</pre></div>':'')
   +(l.term?'<div id="cTerm"></div>':'')
   +'<div class="card panel"><h3>Output <span class="eyebrow" id="cStatus"></span></h3><div class="console" id="cOut">Press Run to execute your code.</div></div>'
   +(lang==='sql'?'<div class="card panel"><h3>Results</h3><div id="cTable" class="tbl-wrap"><div class="muted small">Query results appear here.</div></div></div>':'')
   +(lang==='py'&&l.fs?'<div class="card panel"><h3>Files <span class="eyebrow">virtual disk</span></h3><ul class="files" id="cFs"></ul></div>':'');
  this.frame=$('#cFrame');this.renderTabs();this.load();
  const ed=$('#cEd');ed.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();this.run()}else if(e.key==='Tab'){e.preventDefault();const s=ed.selectionStart;ed.value=ed.value.slice(0,s)+'  '+ed.value.slice(ed.selectionEnd);ed.selectionStart=ed.selectionEnd=s+2;this.store()}});
  ed.addEventListener('input',()=>this.store());
  $('#cRun').onclick=()=>this.run();$('#cReset').onclick=()=>{this.files=l.files?Object.assign({},l.files):null;if(!this.files)this.code=l.starter||'';this.load();this.renderTabs()};
  if($('#cGo'))$('#cGo').onclick=async()=>{this.url=$('#cUrl').value||'/';await this.run()};
  if($('#rSend'))$('#rSend').onclick=()=>this.send();
  if(l.term)this.mountTerm(l);
  if(this.pyfs)this.renderFs();
  window.addEventListener('message',this._msg=(e)=>{if(e.data&&e.data.__nextUrl&&$('#cUrl')){$('#cUrl').value=e.data.__nextUrl;this.url=e.data.__nextUrl}});
  if(l.autorun)setTimeout(()=>this.run(),50);
 },
 renderTabs(){const t=$('#cTabs');if(!this.files){t.innerHTML='<span class="mono small">'+esc(this.l.filename||({js:'main.js',jsm:'main.js',ai:'main.js',ts:'main.ts',web:'index.html',vue:'index.html',react:'App.tsx',py:'main.py',sql:'query.sql',php:'index.php',e2e:'app.spec.ts'}[this.l.lang]||'main'))+'</span>';return}
  t.innerHTML=Object.keys(this.files).map(f=>'<button class="ftab'+(f===this.cur?' on':'')+'" data-ftab="'+esc(f)+'">'+esc(f)+'</button>').join('')+(this.l.allowNew?'<button class="ftab add" id="cNew" title="New file">+ file</button>':'');
  t.querySelectorAll('[data-ftab]').forEach(b=>b.onclick=()=>{this.store();this.cur=b.dataset.ftab;this.load();this.renderTabs()});
  const nb=$('#cNew');if(nb)nb.onclick=()=>{const box=document.createElement('span');box.innerHTML='<input id="cNewName" class="newfile" placeholder="app/about/page.tsx" aria-label="New file path"><button class="btn" id="cNewOk">Add</button>';nb.replaceWith(box);const inp=$('#cNewName');inp.focus();const add=()=>{const n=inp.value.trim().replace(/^\/+/,'');if(n&&!this.files[n]){this.store();this.files[n]='';this.cur=n}this.load();this.renderTabs()};$('#cNewOk').onclick=add;inp.addEventListener('keydown',e=>{if(e.key==='Enter')add()})}},
 load(){const ed=$('#cEd');if(this.files)ed.value=this.files[this.cur]||'';else{if(this.code==null)this.code=this.l.starter||'';ed.value=this.code}},
 store(){const v=$('#cEd').value;if(this.files)this.files[this.cur]=v;else this.code=v},
 src(){this.store();return this.files?Object.assign({},this.files):this.code},
 setCode(v){if(typeof v==='object'){this.files=Object.assign(this.files||{},v);if(!this.cur||!(this.cur in this.files))this.cur=Object.keys(v)[0];}else{if(this.files)this.files[this.cur]=v;else this.code=v}this.load();this.renderTabs()},
 async run(){const l=this.l;this.runs=(this.runs||0)+1;const out=$('#cOut');out.innerHTML='<span class="muted">Running…</span>';$('#cStatus').textContent='';const src=this.src();let ctx;
  try{const lang=l.lang;const runner=RUN[lang];let input=src;
   if(lang==='js'||lang==='ts'||lang==='jsm'||lang==='ai'){if(this.files){const names=Object.keys(this.files);const order=names.filter(n=>!/\.test\.|\.spec\./.test(n)).concat(names.filter(n=>/\.test\.|\.spec\./.test(n)));input=order.map(n=>'// ---- '+n+' ----\n'+this.files[n]).join('\n')}}
   if(lang==='next'){this.url=($('#cUrl')&&$('#cUrl').value)||this.url||'/'}
   ctx=await runner(input,l,this)}catch(e){ctx={code:typeof src==='string'?src:JSON.stringify(src),err:'Sandbox error: '+e.message}}
  this.ctx=ctx;this.show(ctx);
  if(l.lang==='py'&&this.pyfs)this.renderFs();
  record(this.files?{code:Object.entries(this.files).map(([k,v])=>'// '+k+'\n'+v).join('\n\n'),lang:l.lang==='py'?'python':l.lang==='sql'?'sql':l.lang==='php'?'php':l.lang==='react'||l.lang==='next'?'tsx':l.lang==='ts'?'ts':l.lang==='web'||l.lang==='vue'?'html':'js'}:{code:typeof src==='string'?src:'',lang:l.lang==='py'?'python':l.lang==='sql'?'sql':l.lang==='php'?'php':l.lang==='react'||l.lang==='next'?'tsx':l.lang==='ts'?'ts':l.lang==='web'||l.lang==='vue'?'html':'js'});
  await checkTasks(ctx);clearInterval(this.poll);if(l.tasks.some(t=>t.live)&&this.frame){const started=Date.now();this.poll=setInterval(()=>{if(L!==l||Date.now()-started>120000){clearInterval(this.poll);return}checkTasks(Object.assign({},ctx,{liveOnly:true}))},800)}return ctx},
 show(c){const out=$('#cOut');const parts=[];
  if(c.diag&&c.diag.length)parts.push('<div class="c-diag">'+c.diag.map(d=>'<div><span class="c-r">✖ '+(d.line?'line '+d.line+': ':'')+'</span>'+esc(d.msg)+' <span class="c-m">ts('+d.code+')</span></div>').join('')+'</div>');else if(c.diag)parts.push('<div class="c-g">✓ No type errors</div>');
  if(c.buildErrs&&c.buildErrs.length)parts.push('<div class="c-r">✖ Build error in '+esc(c.buildErrs[0].file)+'</div><pre class="c-pre">'+esc(c.buildErrs[0].msg)+'</pre>');
  const logs=c.logs||[];if(logs.length)parts.push('<pre class="c-pre">'+esc(logs.join('\n'))+'</pre>');else if(c.out&&!logs.length)parts.push('<pre class="c-pre">'+esc(c.out)+'</pre>');
  if(c.errs&&c.errs.length)parts.push('<pre class="c-pre c-r">✖ '+esc(c.errs.slice(0,3).join('\n'))+'</pre>');
  if(c.err)parts.push('<pre class="c-pre c-r">'+esc(c.err)+'</pre>');
  if(c.tests&&c.tests.length){const pass=c.tests.filter(t=>t.ok).length;parts.push('<div class="tests">'+c.tests.map(t=>'<div class="'+(t.ok?'c-g':'c-r')+'">'+(t.ok?'✓ ':'✗ ')+esc(t.name)+(t.ok?'':'<div class="c-m">  → '+esc(t.err)+'</div>')+'</div>').join('')+'<div class="tsum">Tests: <b class="'+(pass===c.tests.length?'okc':'badc')+'">'+pass+' passed</b>'+(pass<c.tests.length?', <b class="badc">'+(c.tests.length-pass)+' failed</b>':'')+' ('+c.tests.length+')</div></div>')}
  else if(c.tests&&!c.tests.length&&(this.l.lang==='e2e'))parts.push('<div class="c-m">No tests found. Write test("name", async ({ page }) => { ... })</div>');
  if(c.calls&&c.calls.length)parts.push('<div class="c-m">'+c.calls.length+' API call'+(c.calls.length>1?'s':'')+' · '+(c.live?'answered live by Claude':'offline sample responses (open this page in Claude for live answers)')+'</div>');
  if(!parts.length)parts.push('<span class="muted">'+(this.l.lang==='sql'?'Statements ran with no output.':this.frame?'Ran. Check the preview.':'Ran with no output. Use console.log() / print() to see values.')+'</span>');
  out.innerHTML=parts.join('');$('#cStatus').textContent=c.err||(c.errs&&c.errs.length)||(c.diag&&c.diag.length)||(c.buildErrs&&c.buildErrs.length)?'errors':'ran';
  if(this.l.lang==='sql'){const t=$('#cTable');const rs=c.results||[];t.innerHTML=rs.length?rs.slice(-3).map(r=>'<table><tr>'+r.columns.map(x=>'<th>'+esc(x)+'</th>').join('')+'</tr>'+r.values.slice(0,50).map(v=>'<tr>'+v.map(x=>'<td>'+(x===null?'<span class="muted">NULL</span>':esc(x))+'</td>').join('')+'</tr>').join('')+'</table>'+(r.values.length>50?'<div class="muted small">… '+(r.values.length-50)+' more rows</div>':'')+'<div class="muted small">'+r.values.length+' row'+(r.values.length===1?'':'s')+'</div>').join('<hr>'):'<div class="muted small">'+(c.err?'Fix the error above.':'No rows returned. (INSERT/UPDATE/CREATE statements return no rows.)')+'</div>'}},
 async send(){const m=$('#rMethod').value,u=$('#rUrl').value;let body=null;const bt=$('#rBody').value.trim();if(bt){try{body=JSON.parse(bt)}catch(e){$('#rOut').textContent='The body is not valid JSON: '+e.message;return}}
  if(!this.ctx||this.dirtyApi!==JSON.stringify(this.src())){await this.run();this.dirtyApi=JSON.stringify(this.src())}
  let r;if(this.l.api==='php'){r=this.ctx&&this.ctx.req?await this.ctx.req(m,u,body):{status:500,body:'Run the code first'}}else{r=await this.pyRequest(m,u,body)}
  $('#rOut').textContent=m+' '+u+'\n→ '+r.status+'\n\n'+(typeof r.body==='string'?r.body:JSON.stringify(r.body,null,2));this.lastResp=r;record({c:m+' '+u+(body?' '+JSON.stringify(body):''),ok:r.status<500});await checkTasks(Object.assign({},this.ctx,{resp:r,reqs:(this.reqs=(this.reqs||[]).concat([{m,u,body,status:r.status,json:r.body}]))}))},
 async pyRequest(m,u,body){const src=this.src();const r=await runPy(src+'\n\nfrom fastapi.testclient import TestClient as __TC\n__app=[v for v in list(globals().values()) if type(v).__name__=="FastAPI"]\nif __app:\n    __c=__TC(__app[0])\n    __rr=__c.request('+JSON.stringify(m)+','+JSON.stringify(u)+','+(body?'__import__("json").loads('+JSON.stringify(JSON.stringify(body))+')':'None')+')\n    window.__pyresp=__import__("json").dumps({"status":__rr.status_code,"body":__rr.json()})\nelse:\n    window.__pyresp=__import__("json").dumps({"status":500,"body":"No FastAPI app found. Create one with app = FastAPI()"})\n',{},{fs:this.pyfs||{}});
  if(r.err&&!window.__pyresp)return{status:500,body:r.err};try{const x=JSON.parse(window.__pyresp);window.__pyresp=null;return x}catch(e){return{status:500,body:r.err||'error'}}},
 renderFs(){const ul=$('#cFs');if(!ul)return;const fs=this.pyfs||{};const ks=Object.keys(fs);ul.innerHTML=ks.length?ks.map(k=>'<li><span>'+esc(k)+'</span><span class="st c">'+fs[k].length+' B</span></li>').join(''):'<li><span class="muted">no files</span></li>'},
 mountTerm(l){const self=this;this.term=makeTerminal($('#cTerm'),{id:'nterm',title:'terminal · project',prompt:()=>'you@laptop:~/'+(l.project||'app')+'$',exec:async line=>[await self.termCmd(line.trim())],after:async(line,outs)=>{record({c:line.trim(),ok:!outs.some(r=>r.e)});await checkTasks(Object.assign({},self.ctx||{},{termHist:(self.termHist=(self.termHist||[]).concat([line.trim()]))}))}});this.term.sys(l.laravel?'Project terminal. Try: php artisan migrate, php artisan route:list':'Project terminal. Try: npm run dev, npm run build, npx prisma migrate dev --name init');},
 async termCmd(line){const R2=(o,e)=>({o,e:!!e});const files=this.src();
  if(line==='clear')return{o:'',clear:true};
  if(this.l.laravel&&/^php artisan/.test(line))return this.artisan(line);
  if(/^npm run dev/.test(line)){const c=await this.run();return R2('  ▲ Next.js 14.2.15\n  - Local:        http://localhost:3000\n\n ✓ Ready'+(c.buildErrs&&c.buildErrs.length?'\n {r}⨯ '+c.buildErrs[0].msg.split('\n')[0]+'{/}':''))}
  if(/^npm run build/.test(line)){const errs=nextRules(files);for(const [p,s] of Object.entries(files)){if(!/\.(tsx|ts)$/.test(p))continue;try{await need('babel');babelCJS(s.replace(/^\s*['"]use (client|server)['"];?/m,''),p)}catch(e){errs.push({file:p,msg:e.message})}}if(errs.length)return R2('   ▲ Next.js 14.2.15\n   Creating an optimized production build ...\n{r}Failed to compile.{/}\n\n'+errs[0].file+'\n'+errs[0].msg,true);
   const routes=Object.keys(files).filter(p=>/^app\/.*page\.(t|j)sx?$/.test(p)).map(p=>'/'+p.replace(/^app\/?/,'').replace(/\/?page\.(t|j)sx?$/,'').split('/').filter(s=>!/^\(.*\)$/.test(s)).join('/'));const api=Object.keys(files).filter(p=>/^app\/api\/.*route\.(t|j)s$/.test(p)).map(p=>'/'+p.replace(/^app\//,'').replace(/\/route\.(t|j)s$/,''));
   this.built=true;return R2('   ▲ Next.js 14.2.15\n   Creating an optimized production build ...\n {g}✓ Compiled successfully{/}\n ✓ Generating static pages\n\nRoute (app)                 Size\n'+routes.concat(api).map(r=>{const p=Object.keys(files).find(f=>('/'+f.replace(/^app\/?/,'').replace(/\/?(page|route)\.(t|j)sx?$/,'')).replace(/\/\([^/]*\)/g,'')===r);const src=p?files[p]:'';const dyn=/\[|cookies\(|searchParams|export const dynamic|\/api\//.test(r+src);return (dyn?'ƒ ':'○ ')+(r||'/').padEnd(26)+(dyn?'dynamic':'static')}).join('\n')+'\n\n○  (Static)   prerendered as static content\nƒ  (Dynamic)  server-rendered on demand')}
  if(/^npx prisma migrate dev/.test(line)){const sch=files['prisma/schema.prisma'];if(!sch)return R2('Error: Could not find a schema.prisma file. Create prisma/schema.prisma first.',true);const nm=(line.match(/--name\s+(\S+)/)||[])[1]||'migration';try{const r=await PRISMA.migrate(sch,nm);if(r.same)return R2('Already in sync, no schema change or pending migration was found.');const dir='prisma/migrations/2026100910'+String(PRISMA.migrations).padStart(2,'0')+'00_'+nm+'/migration.sql';this.files[dir]='-- CreateTable\n'+r.sql+'\n';this.renderTabs();return R2('Environment variables loaded from .env\nPrisma schema loaded from prisma/schema.prisma\nDatasource "db": SQLite database "dev.db"\n\nApplying migration `'+dir.split('/')[2]+'`\n\nThe following migration(s) have been created and applied from new schema changes:\n\n'+dir+'\n\n{g}Your database is now in sync with your schema.{/}\n\n✔ Generated Prisma Client (v5.20.0)')}catch(e){return R2('Error: '+e.message,true)}}
  if(/^npx prisma (generate)/.test(line))return R2('✔ Generated Prisma Client (v5.20.0) to ./node_modules/@prisma/client');
  if(/^npx prisma studio/.test(line)){if(!PRISMA.migrated)return R2('Run npx prisma migrate dev first.',true);return R2(Object.keys(PRISMA.models).map(m=>{let rows=[];try{rows=sqlRows(PRISMA.db,'SELECT * FROM "'+m+'"')}catch(e){}return '{c}'+m+'{/} ('+rows.length+' rows)\n'+rows.slice(0,8).map(r=>'  '+JSON.stringify(r)).join('\n')}).join('\n\n'))}
  if(/^npm (test|run test)/.test(line)){const c=await this.run();return R2(c.tests?c.tests.map(t=>(t.ok?'{g}✓{/} ':'{r}✗{/} ')+t.name).join('\n'):'no tests',c.tests&&c.tests.some(t=>!t.ok))}
  if(/^(ls|tree)/.test(line))return R2(Object.keys(files).sort().join('\n'));
  return R2('This project terminal supports: npm run dev, npm run build, npm test, npx prisma migrate dev --name NAME, npx prisma studio, ls',true)},
 async artisan(line){const R2=(o,e)=>({o,e:!!e});const files=this.src();const a=line.split(/\s+/).slice(2);const cmd=a[0]||'list';
  if(cmd==='list'||cmd==='--help')return R2('Laravel Framework 11.26.0\n\nAvailable commands:\n  migrate            Run the database migrations\n  migrate:fresh      Drop all tables and re-run all migrations\n  db:seed            Seed the database with records\n  route:list         List all registered routes\n  make:model         Create a new Eloquent model (-m also creates a migration)\n  make:controller    Create a new controller class\n  serve              Serve the application');
  await sqlLib();if(!this.phpdb)this.phpdb=PHPI.newDb(_SQL,this.l.seed||'');this.applied=this.applied||[];
  if(cmd==='migrate:fresh'){this.phpdb=PHPI.newDb(_SQL,this.l.seed||'');this.applied=[]}
  if(cmd==='migrate'||cmd==='migrate:fresh'){const r=PHPI.run('',{files,laravel:true,db:this.phpdb});if(r.err)return R2(r.err,true);const res=r.migrate(this.applied);if(res.err)return R2('  INFO  Running migrations.\n\n{r}'+res.err+'{/}',true);this.applied.push(...res.done);this.migratedCount=(this.migratedCount||0)+res.done.length;if(!res.done.length)return R2('  INFO  Nothing to migrate.');return R2((cmd==='migrate:fresh'?'  Dropping all tables ... DONE\n\n':'')+'  INFO  Running migrations.\n\n'+res.done.map(f=>'  '+f.split('/').pop().replace(/\.php$/,'').padEnd(48,'.')+' {g}DONE{/}').join('\n'))}
  if(cmd==='db:seed'){const r=PHPI.run('',{files,laravel:true,db:this.phpdb});if(r.err)return R2(r.err,true);if(!r.hasClass('DatabaseSeeder'))return R2('  ERROR  Target class [Database\\Seeders\\DatabaseSeeder] does not exist. Create database/seeders/DatabaseSeeder.php',true);const e=r.eval('(new DatabaseSeeder())->run();');if(e.err)return R2(e.err,true);this.seeded=true;return R2('  INFO  Seeding database.\n\n  Database\\Seeders\\DatabaseSeeder {g}DONE{/}')}
  if(cmd==='route:list'){const r=PHPI.run('',{files,laravel:true,db:this.phpdb});if(r.err)return R2(r.err,true);this.listedRoutes=true;return R2(r.routes.map(x=>'  '+x.m.padEnd(9)+x.uri.replace(/^\//,'').padEnd(30,'.')+' '+(x.h&&x.h.values?x.h.values().map(v=>String(v).split('\\').pop()).join('@'):'Closure')).join('\n')+'\n\n  Showing ['+r.routes.length+'] routes')}
  if(cmd==='make:model'){const n=a[1];if(!n)return R2('  ERROR  Not enough arguments (missing: "name").',true);const p='app/Models/'+n+'.php';this.files[p]='<?php\n\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Model;\n\nclass '+n+' extends Model\n{\n    protected $fillable = [];\n}\n';let msg='  INFO  Model ['+p+'] created successfully.';if(a.includes('-m')||a.includes('--migration')){const t=n.toLowerCase()+'s';const mp='database/migrations/2026_10_10_'+String(100000+Object.keys(this.files).length).slice(1)+'_create_'+t+'_table.php';this.files[mp]="<?php\n\nuse Illuminate\\Database\\Migrations\\Migration;\nuse Illuminate\\Database\\Schema\\Blueprint;\nuse Illuminate\\Support\\Facades\\Schema;\n\nreturn new class extends Migration\n{\n    public function up(): void\n    {\n        Schema::create('"+t+"', function (Blueprint $table) {\n            $table->id();\n            $table->timestamps();\n        });\n    }\n};\n";msg+='\n  INFO  Migration ['+mp+'] created successfully.'}this.renderTabs();return R2(msg)}
  if(cmd==='make:controller'){const n=a[1];if(!n)return R2('  ERROR  Not enough arguments (missing: "name").',true);const p='app/Http/Controllers/'+n+'.php';this.files[p]='<?php\n\nnamespace App\\Http\\Controllers;\n\nuse Illuminate\\Http\\Request;\n\nclass '+n+' extends Controller\n{\n    //\n}\n';this.renderTabs();return R2('  INFO  Controller ['+p+'] created successfully.')}
  if(cmd==='serve')return R2('  INFO  Server running on [http://127.0.0.1:8000].\n\n  Press Ctrl+C to stop the server\n{m}(use the request panel to send requests){/}');
  if(cmd==='tinker')return R2('{m}(tinker is not available here: use routes and the request panel){/}');
  return R2('  ERROR  Command "'+cmd+'" is not defined.',true)},
 async solve(t){if(t.sol!=null)this.setCode(t.sol);if(t.url&&$('#cUrl')){$('#cUrl').value=t.url;this.url=t.url}if(t.term){for(const c of [].concat(t.term))await this.term.submit(c)}else await this.run();if(t.req){for(const rq of [].concat(t.req)){$('#rMethod').value=rq.m||'GET';$('#rUrl').value=rq.u;$('#rBody').value=rq.body?JSON.stringify(rq.body):'';await this.send()}}if(t.act)await t.act(this.ctx);if(t.act)await checkTasks(this.ctx)}
};
