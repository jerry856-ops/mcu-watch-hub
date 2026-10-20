const DATA={"chronological":[{"title":"Captain America: The First Avenger","year":2011},{"title":"Captain Marvel","year":2019},{"title":"Iron Man","year":2008},{"title":"Iron Man 2","year":2010},{"title":"The Incredible Hulk","year":2008},{"title":"Thor","year":2011},{"title":"The Avengers","year":2012},{"title":"Thor: The Dark World","year":2013},{"title":"Iron Man 3","year":2013},{"title":"Captain America: The Winter Soldier","year":2014},{"title":"Guardians of the Galaxy","year":2014},{"title":"Guardians of the Galaxy Vol. 2","year":2017},{"title":"Avengers: Age of Ultron","year":2015},{"title":"Ant-Man","year":2015},{"title":"Captain America: Civil War","year":2016},{"title":"Black Widow","year":2021},{"title":"Black Panther","year":2018},{"title":"Spider-Man: Homecoming","year":2017},{"title":"Doctor Strange","year":2016},{"title":"Thor: Ragnarok","year":2017},{"title":"Ant-Man and the Wasp","year":2018},{"title":"Avengers: Infinity War","year":2018},{"title":"Avengers: Endgame","year":2019},{"title":"Shang-Chi and the Legend of the Ten Rings","year":2021},{"title":"Spider-Man: Far From Home","year":2019},{"title":"Eternals","year":2021},{"title":"Spider-Man: No Way Home","year":2021},{"title":"Doctor Strange in the Multiverse of Madness","year":2022},{"title":"Black Panther: Wakanda Forever","year":2022},{"title":"Thor: Love and Thunder","year":2022},{"title":"Ant-Man and the Wasp: Quantumania","year":2023},{"title":"Guardians of the Galaxy Vol. 3","year":2023},{"title":"The Marvels","year":2023},{"title":"Deadpool & Wolverine","year":2024},{"title":"Captain America: Brave New World","year":2025},{"title":"Thunderbolts*","year":2025},{"title":"The Fantastic Four: First Steps","year":2025},{"title":"Spider-Man: Brand New Day","year":2026}],"release":[{"title":"Iron Man","year":2008},{"title":"The Incredible Hulk","year":2008},{"title":"Iron Man 2","year":2010},{"title":"Thor","year":2011},{"title":"Captain America: The First Avenger","year":2011},{"title":"The Avengers","year":2012},{"title":"Iron Man 3","year":2013},{"title":"Thor: The Dark World","year":2013},{"title":"Captain America: The Winter Soldier","year":2014},{"title":"Guardians of the Galaxy","year":2014},{"title":"Avengers: Age of Ultron","year":2015},{"title":"Ant-Man","year":2015},{"title":"Captain America: Civil War","year":2016},{"title":"Doctor Strange","year":2016},{"title":"Guardians of the Galaxy Vol. 2","year":2017},{"title":"Spider-Man: Homecoming","year":2017},{"title":"Thor: Ragnarok","year":2017},{"title":"Black Panther","year":2018},{"title":"Avengers: Infinity War","year":2018},{"title":"Ant-Man and the Wasp","year":2018},{"title":"Captain Marvel","year":2019},{"title":"Avengers: Endgame","year":2019},{"title":"Spider-Man: Far From Home","year":2019},{"title":"Black Widow","year":2021},{"title":"Shang-Chi and the Legend of the Ten Rings","year":2021},{"title":"Eternals","year":2021},{"title":"Spider-Man: No Way Home","year":2021},{"title":"Doctor Strange in the Multiverse of Madness","year":2022},{"title":"Thor: Love and Thunder","year":2022},{"title":"Black Panther: Wakanda Forever","year":2022},{"title":"Ant-Man and the Wasp: Quantumania","year":2023},{"title":"Guardians of the Galaxy Vol. 3","year":2023},{"title":"The Marvels","year":2023},{"title":"Deadpool & Wolverine","year":2024},{"title":"Captain America: Brave New World","year":2025},{"title":"Thunderbolts*","year":2025},{"title":"The Fantastic Four: First Steps","year":2025},{"title":"Spider-Man: Brand New Day","year":2026}],"doomsday":[{"title":"The Avengers","year":"Movie"},{"title":"Avengers: Age of Ultron","year":"Movie"},{"title":"Captain America: Civil War","year":"Movie"},{"title":"Avengers: Infinity War","year":"Movie"},{"title":"Avengers: Endgame","year":"Movie"},{"title":"WandaVision","year":"Series"},{"title":"Loki — Season 1","year":"Series"},{"title":"Loki — Season 2","year":"Series"},{"title":"Spider-Man: No Way Home","year":"Movie"},{"title":"Doctor Strange in the Multiverse of Madness","year":"Movie"},{"title":"Deadpool & Wolverine","year":"Movie"},{"title":"Captain America: Brave New World","year":"Movie"},{"title":"Thunderbolts*","year":"Movie"},{"title":"The Fantastic Four: First Steps","year":"Movie"}]};

const KEY='mcu-watch-hub-v1';
const $=id=>document.getElementById(id);
const icon=name=>`<svg aria-hidden="true"><use href="icons.svg#i-${name}"></use></svg>`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let watched={};try{let v=JSON.parse(localStorage.getItem(KEY)||'{}');if(v&&typeof v==='object'&&!Array.isArray(v))watched=v}catch(e){}
let page='home',order='chronological',query='',detailTitle=null;
const titles=DATA.chronological;
// Details and ratings: built-in runtimes, user reviews, optional live OMDb metadata.
const RUNTIMES={"Captain America: The First Avenger": 124, "Captain Marvel": 123, "Iron Man": 126, "Iron Man 2": 124, "The Incredible Hulk": 112, "Thor": 115, "The Avengers": 143, "Thor: The Dark World": 112, "Iron Man 3": 130, "Captain America: The Winter Soldier": 136, "Guardians of the Galaxy": 121, "Guardians of the Galaxy Vol. 2": 136, "Avengers: Age of Ultron": 141, "Ant-Man": 117, "Captain America: Civil War": 147, "Black Widow": 134, "Black Panther": 134, "Spider-Man: Homecoming": 133, "Doctor Strange": 115, "Thor: Ragnarok": 130, "Ant-Man and the Wasp": 118, "Avengers: Infinity War": 149, "Avengers: Endgame": 181, "Shang-Chi and the Legend of the Ten Rings": 132, "Spider-Man: Far From Home": 129, "Eternals": 156, "Spider-Man: No Way Home": 148, "Doctor Strange in the Multiverse of Madness": 126, "Black Panther: Wakanda Forever": 161, "Thor: Love and Thunder": 119, "Ant-Man and the Wasp: Quantumania": 124, "Guardians of the Galaxy Vol. 3": 150, "The Marvels": 105, "Deadpool & Wolverine": 128, "Captain America: Brave New World": 118, "Thunderbolts*": 127, "The Fantastic Four: First Steps": 115};
const PLOTS={"Iron Man": "After being captured, industrialist Tony Stark builds a powerful suit of armor and rethinks the legacy of his weapons business.", "The Avengers": "Earth's mightiest heroes must learn to work together when Loki threatens the planet.", "Avengers: Age of Ultron": "The Avengers face an artificial intelligence that sees humanity as a threat.", "Avengers: Infinity War": "The Avengers and their allies race to stop Thanos from collecting the Infinity Stones.", "Avengers: Endgame": "The surviving heroes search for a way to undo the devastating consequences of Thanos's victory.", "Captain America: Civil War": "A dispute over superhero oversight splits the Avengers into opposing sides.", "Spider-Man: No Way Home": "Peter Parker turns to Doctor Strange after his identity is exposed, triggering a multiverse crisis.", "Doctor Strange in the Multiverse of Madness": "Doctor Strange travels through alternate realities while protecting a young multiverse traveler.", "Deadpool & Wolverine": "Deadpool and Wolverine are pulled into a chaotic mission involving the multiverse.", "WandaVision": "Wanda Maximoff and Vision live an unusual suburban life as a mystery unfolds around their town.", "Loki — Season 1": "The Time Variance Authority recruits Loki into a mystery that challenges the nature of time.", "Loki — Season 2": "Loki faces the consequences of a fractured timeline and the fate of the multiverse.", "The Fantastic Four: First Steps": "A family of extraordinary explorers faces a cosmic threat in a retro-futuristic alternate universe.", "Thunderbolts*": "A group of unlikely antiheroes is forced to confront their pasts and work together.", "Shang-Chi and the Legend of the Ten Rings": "Shang-Chi must confront the past he tried to leave behind and his father's mysterious organization."};
const RATINGS_KEY='mcu-watch-hub-ratings-v1',OMDB_KEY='mcu-watch-hub-omdb-key';
let personalRatings={};try{const saved=JSON.parse(localStorage.getItem(RATINGS_KEY)||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))personalRatings=saved}catch(e){}
let omdbKey='e2198535';try{omdbKey=localStorage.getItem(OMDB_KEY)||omdbKey}catch(e){}
const omdbCache=new Map();

const TMDB_API_KEY='e0fdbd2502cc41435b3f96f455ff5a22';
const WATCHLIST_KEY='mcu-watch-hub-watchlist-v1';
let watchlist={};try{watchlist=JSON.parse(localStorage.getItem(WATCHLIST_KEY)||'{}')}catch(e){}
const tmdbCache=new Map();
const tmdbPending=new Map();
const tmdbImage=(path,size='w342')=>path?'https://image.tmdb.org/t/p/'+size+path:'';
const cleanTmdbTitle=t=>t.replace(/ — Season [12]$/,'');
const isTvTitle=t=>t==='WandaVision'||/^Loki — Season [12]$/.test(t);
async function fetchTmdb(t){
  if(tmdbCache.has(t))return tmdbCache.get(t);
  if(tmdbPending.has(t))return tmdbPending.get(t);
  const job=(async()=>{
    const endpoint=isTvTitle(t)?'tv':'movie', q=cleanTmdbTitle(t);
    const u=new URL('https://api.themoviedb.org/3/search/'+endpoint);
    u.searchParams.set('api_key',TMDB_API_KEY);
    u.searchParams.set('query',q);
    const year=DATA.chronological.find(x=>x.title===t)?.year;
    if(year&&endpoint==='movie')u.searchParams.set('year',year);
    const res=await fetch(u);
    if(!res.ok)throw Error('TMDB search '+res.status);
    const matches=(await res.json()).results||[];
    const normalized=x=>String(x||'').toLowerCase().replace(/[^a-z0-9]/g,'');
    const match=matches.find(x=>normalized(x.title||x.name)===normalized(q))||matches[0];
    if(!match)return null;
    const durl=new URL('https://api.themoviedb.org/3/'+endpoint+'/'+match.id);
    durl.searchParams.set('api_key',TMDB_API_KEY);
    durl.searchParams.set('append_to_response','videos');
    const dr=await fetch(durl);
    const detail=dr.ok?await dr.json():match;
    tmdbCache.set(t,detail);
    return detail;
  })();
  tmdbPending.set(t,job);
  try{return await job}finally{tmdbPending.delete(t)}
}
async function loadTmdb(t){
  try{const d=await fetchTmdb(t);if(d&&detailTitle===t)showTmdb(t,d)}
  catch(e){console.warn('TMDB details unavailable:',e)}
}
function showTmdb(t,d){
  if(detailTitle!==t)return;
  setDetailArtwork(d.poster_path,d.backdrop_path);
  if(d.overview&&$('detailPlot').textContent.startsWith('Explore this MCU'))$('detailPlot').textContent=d.overview;
  const videos=d.videos?.results||[];
  const trailer=videos.find(v=>v.site==='YouTube'&&v.type==='Trailer'&&v.official)||videos.find(v=>v.site==='YouTube'&&v.type==='Trailer');
  if(trailer){
    const a=$('reviewLinks').querySelector('[data-trailer]');
    if(a){a.href='https://www.youtube.com/watch?v='+encodeURIComponent(trailer.key);a.textContent='▶ Watch trailer ↗'}
  }
}
function setDetailArtwork(posterPath,backdropPath){
  const art=$('detailArt'),img=$('detailPoster');
  if(posterPath){
    img.src=tmdbImage(posterPath,'w780');
    img.hidden=false;
    art.classList.add('has-official-art');
    $('detailArtTitle').hidden=true;
  }
  if(backdropPath)art.style.setProperty('--movie-backdrop',`url("${tmdbImage(backdropPath,'w1280')}")`);
}
function updatePosterNodes(t,d){
  if(!d?.poster_path)return;
  document.querySelectorAll('.poster[data-title]').forEach(node=>{
    if(node.dataset.title!==t)return;
    if(node.querySelector('img'))return;
    const img=document.createElement('img');
    img.loading='lazy';img.decoding='async';
    img.alt='';img.src=tmdbImage(d.poster_path,'w342');
    img.onerror=()=>img.remove();
    node.prepend(img);node.classList.add('has-poster');
  });
}
async function hydratePosters(){
  const unique=[...new Set([...DATA.chronological,...DATA.doomsday].map(x=>x.title))];
  // Keep requests paced to avoid a burst of simultaneous calls on mobile networks.
  let next=0;
  async function worker(){
    while(next<unique.length){
      const t=unique[next++];
      try{
        const d=await fetchTmdb(t);
        if(d)updatePosterNodes(t,d);
      }catch(e){console.warn('Poster unavailable for',t)}
    }
  }
  await Promise.all(Array.from({length:3},worker));
}
async function loadHero(){
  const hero=document.querySelector('.heroart img');
  if(!hero)return;
  try{
    const d=await fetchTmdb('Avengers: Endgame');
    if(d?.backdrop_path){
      hero.onerror=()=>{hero.onerror=null;hero.removeAttribute('src');hero.classList.add('unavailable')};
      hero.src=tmdbImage(d.backdrop_path,'w1280');
      hero.alt='Avengers: Endgame official backdrop artwork';
    }
  }catch(e){hero.removeAttribute('src');hero.classList.add('unavailable')}
}

const minutes=t=>RUNTIMES[t]||0;
const duration=n=>n?`${Math.floor(n/60)}h ${String(n%60).padStart(2,'0')}m`:'Not available';
const movieURL=t=>`https://www.imdb.com/find/?q=${encodeURIComponent(t)}&s=tt`;
const rtURL=t=>`https://www.rottentomatoes.com/search?search=${encodeURIComponent(t)}`;
const trailerURL=t=>`https://www.youtube.com/results?search_query=${encodeURIComponent(t+' official trailer Marvel')}`;
function ratingStars(t){const val=Number(personalRatings[t]||0);$('yourRatingLabel').textContent=val?`${val} / 5 stars`:'Not rated';$('yourStars').innerHTML=Array.from({length:5},(_,i)=>`<button type="button" class="star ${i<val?'selected':''}" data-rating="${i+1}" aria-label="Rate ${i+1} out of 5 stars" aria-pressed="${i+1===val}">★</button>`).join('')+`<button class="clearRating" type="button" ${val?'':'disabled'}>Clear</button>`;$('yourStars').querySelectorAll('[data-rating]').forEach(b=>b.onclick=()=>setRating(t,Number(b.dataset.rating)));$('yourStars').querySelector('.clearRating').onclick=()=>setRating(t,0)}
function setRating(t,n){if(n)personalRatings[t]=n;else delete personalRatings[t];try{localStorage.setItem(RATINGS_KEY,JSON.stringify(personalRatings))}catch(e){alert('Unable to save rating.')}ratingStars(t);if(page==='stats')renderStats()}
function detailLinks(t,imdbID){const imdb=imdbID?`https://www.imdb.com/title/${encodeURIComponent(imdbID)}/`:movieURL(t);$('reviewLinks').innerHTML=`<a target="_blank" rel="noopener noreferrer" href="${imdb}">IMDb ↗</a><a target="_blank" rel="noopener noreferrer" href="${rtURL(t)}">Rotten Tomatoes ↗</a><a target="_blank" rel="noopener noreferrer" data-trailer href="${trailerURL(t)}">▶ Official trailers ↗</a>`}
async function loadOmdb(t){if(!omdbKey)return;if(omdbCache.has(t)){showOmdb(t,omdbCache.get(t));return}const active=t;try{const match=t.match(/^(Loki) — Season [12]$/);const searchTitle=match?match[1]:t;const year=DATA.chronological.find(x=>x.title===t)?.year;const params=new URLSearchParams({apikey:omdbKey,t:searchTitle,plot:'full'});if(year&&!match)params.set('y',year);const resp=await fetch('https://www.omdbapi.com/?'+params.toString());if(!resp.ok)throw Error('Request failed');const d=await resp.json();if(d.Response==='False')throw Error(d.Error||'No listing found');omdbCache.set(t,d);if(detailTitle===active)showOmdb(t,d)}catch(e){if(detailTitle===active)$('detailPlot').textContent=(PLOTS[t]||'Open IMDb or Rotten Tomatoes to explore the story and reviews.')+' Live metadata unavailable: '+e.message}}
function showOmdb(t,d){if(d.Plot&&d.Plot!=='N/A')$('detailPlot').textContent=d.Plot;detailLinks(t,d.imdbID);const imdb=d.imdbRating&&d.imdbRating!=='N/A'?d.imdbRating+'/10':'Not listed';const rt=d.Ratings?.find(r=>r.Source==='Rotten Tomatoes')?.Value||'Not listed';const area=$('liveScores');if(area)area.innerHTML=`<div class="score"><span>IMDb</span><b>${esc(imdb)}</b></div><div class="score"><span>Rotten Tomatoes</span><b>${esc(rt)}</b></div>`;if(d.Runtime&&d.Runtime!=='N/A')$('detailRuntime').textContent=d.Runtime;}
function enrichDetail(t){$('detailArt').style.removeProperty('--movie-backdrop');$('detailArt').classList.remove('has-official-art');$('detailPoster').hidden=true;$('detailPoster').removeAttribute('src');$('detailArtTitle').hidden=false;$('detailPlot').textContent=PLOTS[t]||'Explore this MCU story, its cast, and reviews through the links below. Add an OMDb API key in Settings for a full description and current review scores.';detailLinks(t);ratingStars(t);$('detailMeta').textContent+=minutes(t)?' · '+duration(minutes(t)):'';const d=$('detailFacts');d.insertAdjacentHTML('afterbegin',`<div class="fact"><span>Runtime</span><b id="detailRuntime">${duration(minutes(t))}</b></div><div class="liveScores" id="liveScores"><div class="score"><span>IMDb rating</span><b>${omdbKey?'Loading…':'Connect OMDb'}</b></div><div class="score"><span>Rotten Tomatoes</span><b>${omdbKey?'Loading…':'Connect OMDb'}</b></div></div>`);loadOmdb(t);loadTmdb(t)}
$('omdbKey').value=omdbKey;$('omdbStatus').textContent=omdbKey?'Key saved on this device.':'No API key saved.';$('saveOmdb').onclick=()=>{omdbKey=$('omdbKey').value.trim();try{if(omdbKey)localStorage.setItem(OMDB_KEY,omdbKey);else localStorage.removeItem(OMDB_KEY)}catch(e){alert('Unable to save API key.')}omdbCache.clear();$('omdbStatus').textContent=omdbKey?'Key saved. Open a movie to load live ratings.':'Key removed.'};

const palette=[['#3e2024','#080d17','#a62532'],['#162f4b','#090f1b','#1e7ba0'],['#46301b','#100e13','#d09130'],['#302347','#0c0c18','#744ac7'],['#123e37','#071218','#2d987e'],['#43311c','#10151c','#a57438']];
const theme=t=>{let i=Math.max(0,titles.findIndex(x=>x.title===t));return palette[i%palette.length]};
const short=t=>t.replace(/^Captain America: /,'').replace(/^Avengers: /,'').replace(/^Spider-Man: /,'').replace('Guardians of the Galaxy','Guardians').split(' ').slice(0,5).join(' ');
const cssVars=t=>{let [a,b,glow]=theme(t);return `--a:${a};--b:${b};--glow:${glow}`};
const percent=arr=>arr.length?Math.round(arr.filter(x=>watched[x.title]).length/arr.length*100):0;
function save(){try{localStorage.setItem(KEY,JSON.stringify(watched))}catch(e){alert('Could not save progress. Please export a backup.')}}
function toggle(t){watched[t]=!watched[t];save();render();if(detailTitle)renderDetail(detailTitle)}
function poster(t){const d=tmdbCache.get(t);return `<div class="poster" data-title="${esc(t)}" style="${cssVars(t)}">${d?.poster_path?`<img loading="lazy" decoding="async" alt="" src="${tmdbImage(d.poster_path,'w342')}">`:''}<span>${esc(short(t))}</span></div>`}
function movieRow(item){const done=!!watched[item.title],title=esc(item.title);const row=document.createElement('article');row.className='movierow'+(done?' iswatched':'');row.innerHTML=poster(item.title)+`<button class="moviemain" aria-label="Details for ${title}"><strong>${title}</strong><small>${esc(item.year||'MCU')} · ${minutes(item.title)?duration(minutes(item.title)):"MCU"}</small></button><button class="watchbutton ${done?'watched':''}" aria-label="${done?'Mark as not watched':'Mark as watched'}: ${title}" aria-pressed="${done}">${icon('check')}</button><button class="row-more" aria-label="More about ${title}">${icon('more')}</button>`;row.querySelector('.row-more').onclick=()=>openDetail(item.title);row.querySelector('.moviemain').onclick=()=>openDetail(item.title);row.querySelector('.watchbutton').onclick=()=>toggle(item.title);return row}
function renderHome(){let arr=DATA[order],done=arr.filter(x=>watched[x.title]).length,p=percent(arr);$('progressPct').textContent=p+'%';$('progressFill').style.width=p+'%';$('progressCount').textContent=`${done} of ${arr.length} watched`;$('progressRemaining').textContent=`${arr.length-done} remaining`;$('progressLabel').textContent=order==='doomsday'?'DOOMSDAY PREPARATION':'MCU PROGRESS';$('orderEyebrow').textContent=order==='chronological'?'STORY ORDER':order==='release'?'THEATRICAL ORDER':'CURATED PREPARATION';$('orderTitle').textContent={chronological:'Chronological timeline',release:'Release order',doomsday:'Doomsday essentials'}[order];$('orderCount').textContent=arr.length+' TITLES';document.querySelectorAll('[data-order]').forEach(b=>{b.classList.toggle('selected',b.dataset.order===order);b.setAttribute('aria-selected',String(b.dataset.order===order))});let list=$('movieList');list.replaceChildren();let filtered=arr.filter(x=>x.title.toLowerCase().includes(query.toLowerCase()));if(!filtered.length){list.innerHTML='<div class="empty">No titles found. Try another search.</div>';return}let group='';for(let i=0;i<filtered.length;i++){let item=filtered[i],phase=order==='release'?getPhase(item.title):order==='doomsday'?'ESSENTIAL VIEWING':getPhase(item.title);if(phase!==group){group=phase;let head=document.createElement('div');head.className='phaseheader';let groupItems=filtered.filter(x=>(order==='doomsday'?'ESSENTIAL VIEWING':getPhase(x.title))===phase);head.innerHTML=`<h2>${esc(phase)}</h2><span>${groupItems.filter(x=>watched[x.title]).length} / ${groupItems.length} <span class="phase-chevron">⌃</span></span>`;list.appendChild(head)}list.appendChild(movieRow(item))}}
function getPhase(title){let idx=DATA.release.findIndex(x=>x.title===title);if(idx<0)return 'SERIES & MULTIVERSE';if(idx<6)return 'PHASE ONE';if(idx<12)return 'PHASE TWO';if(idx<23)return 'PHASE THREE';if(idx<30)return 'PHASE FOUR';if(idx<36)return 'PHASE FIVE';return 'PHASE SIX & BEYOND'}
function renderLists(){let root=$('listCards');root.replaceChildren();[
['chronological','Chronological Order','The story in timeline order','Iron Man'],
['release','Release Order','Watch in release order','Captain America: The First Avenger'],
['doomsday','Doomsday Essentials','Only what you need','Avengers: Infinity War']
].forEach(([key,title,desc,art])=>{let arr=DATA[key],n=arr.filter(x=>watched[x.title]).length;let card=document.createElement('button');card.className='listcard';card.innerHTML=poster(art)+`<div class="cardcontent"><h2>${title}</h2><p>${desc}</p><span class="fraction">${n} / ${arr.length}</span><div class="progressbar"><div style="width:${percent(arr)}%"></div></div></div>${icon('chevron')}`;card.onclick=()=>{order=key;setPage('home')};root.appendChild(card)});
const series=DATA.chronological.filter(x=>isTvTitle(x.title)||String(x.year).toLowerCase()==='series');
if(series.length){const done=series.filter(x=>watched[x.title]).length;let card=document.createElement('button');card.className='listcard';card.innerHTML=poster('Loki — Season 1')+`<div class="cardcontent"><h2>TV Series</h2><p>Marvel series and specials</p><span class="fraction">${done} / ${series.length}</span><div class="progressbar"><div style="width:${percent(series)}%"></div></div></div>${icon('chevron')}`;card.onclick=()=>{order='chronological';setPage('home');query='Loki';$('searchInput').value='Loki';$('searchBox').classList.remove('hidden');render()};root.appendChild(card)}
}
function renderStats(){let n=titles.filter(x=>watched[x.title]).length,p=percent(titles),d=DATA.doomsday.filter(x=>watched[x.title]).length;let groups=[...new Set(DATA.release.map(x=>getPhase(x.title)))];$('statsContent').innerHTML=`<div class="statsgrid"><div class="statcard ringcard"><div class="ring" style="--percent:${p}%"><b>${p}%</b></div><div><span class="overline">TOTAL COMPLETION</span><strong>${n} / ${titles.length}</strong><small>Movies completed</small></div></div><div class="statcard"><span class="stat-emoji">🎬</span><strong>${duration(titles.filter(x=>watched[x.title]).reduce((s,x)=>s+minutes(x.title),0))}</strong><small>Total watch time</small></div><div class="statcard"><span class="stat-emoji">▦</span><strong>${titles.length-n}</strong><small>Remaining</small></div><div class="statcard"><span class="stat-emoji">☆</span><strong>${Object.keys(personalRatings).length?(Object.values(personalRatings).reduce((s,v)=>s+v,0)/Object.keys(personalRatings).length).toFixed(1):'—'}</strong><small>Average rating</small></div><div class="statcard"><span class="overline">DOOMSDAY PREP</span><strong>${d} / ${DATA.doomsday.length}</strong><small>Essentials completed</small></div></div><div class="statssection"><h2>Phase progress</h2>${groups.map(g=>{let arr=DATA.release.filter(x=>getPhase(x.title)===g),done=arr.filter(x=>watched[x.title]).length;return `<div class="statline"><div><span>${g.replace('PHASE','Phase').replace('ONE','One').replace('TWO','Two').replace('THREE','Three').replace('FOUR','Four').replace('FIVE','Five').replace('SIX','Six').replace('BEYOND','Beyond')}</span><b>${done} / ${arr.length}</b></div><div class="progressbar"><div style="width:${percent(arr)}%"></div></div></div>`}).join('')}</div>`}
function setPage(p){page=p;['home','lists','stats','settings'].forEach(k=>{$(k+'Page').classList.toggle('hidden',k!==p)});document.querySelectorAll('[data-page]').forEach(b=>{b.classList.toggle('active',b.dataset.page===p);b.setAttribute('aria-current',b.dataset.page===p?'page':'false')});$('searchToggle').classList.toggle('hidden',p!=='home');render();window.scrollTo({top:0,behavior:'instant'})}
function render(){if(page==='home')renderHome();if(page==='lists')renderLists();if(page==='stats')renderStats();for(const [t,d] of tmdbCache)updatePosterNodes(t,d)}
function openDetail(t){detailTitle=t;renderDetail(t);$('detailOverlay').classList.remove('hidden');document.body.style.overflow='hidden';$('closeDetail').focus()}
function closeDetail(){detailTitle=null;$('detailOverlay').classList.add('hidden');document.body.style.overflow=''}
function renderDetail(t){let item=[...DATA.chronological,...DATA.doomsday].find(x=>x.title===t)||{title:t,year:''};$('detailTitle').textContent=t;$('detailArtTitle').textContent=t;$('detailArt').setAttribute('style',cssVars(t));$('detailType').textContent=String(item.year).toLowerCase()==='series'?'MCU SERIES':'MARVEL CINEMATIC UNIVERSE';$('detailMeta').textContent=`${item.year||'MCU'} · ${getPhase(t)}`;let btn=$('detailWatch');btn.classList.toggle('watched',!!watched[t]);btn.querySelector('span').textContent=watched[t]?'MARK AS NOT WATCHED':'MARK AS WATCHED';btn.onclick=()=>toggle(t);let chrono=DATA.chronological.findIndex(x=>x.title===t),rel=DATA.release.findIndex(x=>x.title===t),doom=DATA.doomsday.findIndex(x=>x.title===t);$('detailWatchlist').classList.toggle('saved',!!watchlist[t]);$('detailWatchlist').querySelector('span').textContent=watchlist[t]?'REMOVE FROM WATCHLIST':'ADD TO WATCHLIST';$('detailWatchlist').onclick=()=>{watchlist[t]=!watchlist[t];try{localStorage.setItem(WATCHLIST_KEY,JSON.stringify(watchlist))}catch(e){}renderDetail(t)};$('detailFacts').innerHTML=[['Chronological position',chrono>=0?'#'+(chrono+1):'—'],['Release position',rel>=0?'#'+(rel+1):'—'],['Doomsday essentials',doom>=0?'Included':'Not on this list'],['Status',watched[t]?'Watched':'Not watched']].map(([k,v])=>`<div class="fact"><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join('');enrichDetail(t)}
document.querySelectorAll('[data-order]').forEach(b=>b.onclick=()=>{order=b.dataset.order;query='';$('searchInput').value='';render()});document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>setPage(b.dataset.page));$('searchToggle').onclick=()=>{$('searchBox').classList.toggle('hidden');if(!$('searchBox').classList.contains('hidden'))$('searchInput').focus();else{query='';$('searchInput').value='';render()}};$('searchInput').oninput=e=>{query=e.target.value;render()};$('clearSearch').onclick=()=>{query='';$('searchInput').value='';render();$('searchInput').focus()};$('closeDetail').onclick=closeDetail;$('detailOverlay').onclick=e=>{if(e.target===$('detailOverlay'))closeDetail()};document.addEventListener('keydown',e=>{if(e.key==='Escape'&&detailTitle)closeDetail()});
$('exportBtn').onclick=()=>{let blob=new Blob([JSON.stringify({app:'MCU Watch Hub',version:3,watched,ratings:personalRatings,exported:new Date().toISOString()},null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='mcu-watch-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000)};$('importBtn').onclick=()=>$('importFile').click();$('importFile').onchange=async e=>{let f=e.target.files[0];if(!f)return;try{let obj=JSON.parse(await f.text());if(!obj.watched||typeof obj.watched!=='object'||Array.isArray(obj.watched))throw Error('invalid');if(!confirm('Replace your current watch progress with this backup?'))return;watched=Object.fromEntries(Object.entries(obj.watched).filter(([k,v])=>typeof k==='string'&&typeof v==='boolean'));if(obj.ratings&&typeof obj.ratings==='object'&&!Array.isArray(obj.ratings)){personalRatings=Object.fromEntries(Object.entries(obj.ratings).filter(([k,v])=>typeof k==='string'&&Number.isInteger(v)&&v>=1&&v<=5));localStorage.setItem(RATINGS_KEY,JSON.stringify(personalRatings))}save();render();alert('Your progress has been restored.')}catch(e){alert('Invalid MCU Watch Hub backup.')}finally{e.target.value=''}};$('resetBtn').onclick=()=>{if(confirm('Reset all watch progress? Export a backup first if you want to keep it.')){watched={};personalRatings={};try{localStorage.removeItem(RATINGS_KEY)}catch(e){}save();render()}};render();hydratePosters();loadHero();
