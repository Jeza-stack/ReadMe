/* A2 Grammar Lesson Engine — static, no dependencies */
(function(){
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  const state = {
    score: 0,
    answered: 0,
    neededToPass: 0.7,
    timer: null,
    timeLeft: 0,
    meta: {}
  };

  // read initial data injected into the page
  const payload = JSON.parse(document.getElementById('lesson-data').textContent);
  const keyPrefix = `a2:${payload.slug}`;

  function save(k,v){localStorage.setItem(`${keyPrefix}:${k}`,JSON.stringify(v))}
  function load(k,def){try{return JSON.parse(localStorage.getItem(`${keyPrefix}:${k}`)) ?? def}catch{return def}}

  // Progress bar
  const bar = $('#progress');
  function drawProgress(){
    const total = getTotalItems();
    const pct = total > 0 ? Math.round((state.answered/total)*100) : 0;
    bar.style.width = pct + '%';
  }

  function getTotalItems(){
    if(payload.task && payload.task.type){
      switch(payload.task.type){
        case 'dragmatch': return (payload.task.pairs||[]).length;
        case 'correct': return (payload.task.items||[]).length;
        case 'timedQA': return (payload.task.items||[]).length;
        case 'interview': return (payload.task.items||[]).length;
        case 'storyOrder': return (payload.task.lines||[]).length;
      }
    }
    return (payload.questions||[]).length;
  }

  function markOption(el, ok){
    el.classList.add(ok? 'correct':'incorrect');
    el.setAttribute('aria-pressed','true');
  }

  function onChoose(e){
    const btn = e.currentTarget;
    if(btn.dataset.done) return; // prevent double
    btn.dataset.done = '1';
    const correct = btn.dataset.correct === 'true';
    markOption(btn, correct);
    state.answered++;
    if(correct) state.score++;
    save('score',{score:state.score,answered:state.answered});
    drawProgress();
    // disable siblings
    btn.parentElement.querySelectorAll('.option').forEach(b=>b.onclick=null);
    maybeFinish();
  }

  function renderMCQs(){
    const wrap = $('#practice');
    (payload.questions||[]).forEach((q,i)=>{
      const card = document.createElement('div');
      card.className='card';
      const title = document.createElement('h3');
      title.textContent = `Q${i+1}. ${q.prompt}`;
      card.appendChild(title);
      const box = document.createElement('div');
      box.className='options';
      q.options.forEach(opt=>{
        const b = document.createElement('button');
        b.className='option';
        b.textContent = opt.text;
        b.dataset.correct = String(!!opt.correct);
        b.onclick = onChoose;
        box.appendChild(b);
      });
      card.appendChild(box);
      wrap.appendChild(card);
    });
  }

  // dragmatch: click-to-match base→past pairs
  function renderDragMatch(){
    const pairs = (payload.task && payload.task.pairs) || [];
    const left = pairs.map(p=>({side:'base', text:p.base, match:p.past}));
    const right = pairs.map(p=>({side:'past', text:p.past, match:p.base}));
    // shuffle
    right.sort(()=>Math.random()-0.5);
    const wrap = $('#practice');
    const card = document.createElement('div');
    card.className='card';
    const title = document.createElement('h3');
    title.textContent = 'Match base verbs to their past forms';
    card.appendChild(title);
    const row = document.createElement('div');
    row.className='row';

    const leftCol = document.createElement('div');
    leftCol.className='col';
    left.forEach(item=>{
      const btn = document.createElement('button');
      btn.className='option';
      btn.textContent = item.text;
      btn.dataset.val = item.text;
      btn.onclick = ()=>selectMatch(btn, 'left');
      leftCol.appendChild(btn);
    });

    const rightCol = document.createElement('div');
    rightCol.className='col';
    right.forEach(item=>{
      const btn = document.createElement('button');
      btn.className='option';
      btn.textContent = item.text;
      btn.dataset.val = item.text;
      btn.onclick = ()=>selectMatch(btn, 'right');
      rightCol.appendChild(btn);
    });

    row.appendChild(leftCol); row.appendChild(rightCol);
    card.appendChild(row);
    wrap.appendChild(card);

    let pendingLeft = null;
    let pendingRight = null;

    function selectMatch(btn, side){
      if(side==='left'){
        pendingLeft = btn; btn.classList.add('correct');
      } else {
        pendingRight = btn; btn.classList.add('correct');
      }
      if(pendingLeft && pendingRight){
        const l = pendingLeft.dataset.val;
        const r = pendingRight.dataset.val;
        const ok = !!pairs.find(p=>p.base===l && p.past===r);
        if(ok){
          pendingLeft.disabled = true; pendingRight.disabled = true;
          state.answered++; state.score++;
        } else {
          pendingLeft.classList.remove('correct');
          pendingRight.classList.remove('correct');
        }
        pendingLeft = null; pendingRight = null;
        drawProgress(); maybeFinish();
      }
    }
  }

  function normalize(s){return s.toLowerCase().replace(/\s+/g,' ').trim();}
  function renderCorrector(){
    const items = (payload.task && payload.task.items) || [];
    const wrap = $('#practice');
    items.forEach((it,i)=>{
      const card = document.createElement('div');
      card.className='card';
      const title = document.createElement('h3');
      title.textContent = `Sentence ${i+1}`;
      const input = document.createElement('input');
      input.type='text'; input.value = it.bad; input.setAttribute('aria-label','Correct the sentence');
      const checkBtn = document.createElement('button');
      checkBtn.className='btn'; checkBtn.textContent='Check';
      const res = document.createElement('p'); res.className='small';
      checkBtn.onclick = ()=>{
        if(input.dataset.done) return;
        const ok = normalize(input.value)=== normalize(it.good);
        res.textContent = ok? '✓ Correct' : `✗ Expected: ${it.good}`;
        if(!input.dataset.done){ state.answered++; if(ok) state.score++; input.dataset.done='1'; drawProgress(); maybeFinish(); }
      };
      card.appendChild(title); card.appendChild(input); card.appendChild(checkBtn); card.appendChild(res);
      wrap.appendChild(card);
    });
  }

  function renderTimedQA(){
    const items = (payload.task && payload.task.items) || [];
    const wrap = $('#practice');
    const card = document.createElement('div'); card.className='card';
    const qEl = document.createElement('h3'); qEl.textContent = 'Start the timed Q&A!';
    const yesBtn = document.createElement('button'); yesBtn.className='btn'; yesBtn.textContent='Yes'; yesBtn.disabled=true;
    const noBtn = document.createElement('button'); noBtn.className='btn'; noBtn.textContent='No'; noBtn.disabled=true;
    const startBtn = document.createElement('button'); startBtn.className='btn'; startBtn.textContent='Start 30s';
    let idx = 0;

    function show(){
      if(idx>=items.length){ maybeFinish(true); yesBtn.disabled=true; noBtn.disabled=true; return; }
      qEl.textContent = items[idx].q;
      yesBtn.disabled=false; noBtn.disabled=false;
    }

    yesBtn.onclick = ()=>{ answer('Yes'); };
    noBtn.onclick = ()=>{ answer('No'); };
    function answer(a){
      if(yesBtn.disabled) return;
      const ok = items[idx].a === a;
      if(ok) state.score++;
      state.answered++;
      idx++;
      drawProgress(); show();
    }

    startBtn.onclick = ()=>{
      startBtn.disabled = true; startTimer(30); show();
    };

    card.appendChild(qEl);
    card.appendChild(document.createElement('div')).appendChild(startBtn);
    const btnRow = document.createElement('div'); btnRow.className='row';
    const c1 = document.createElement('div'); c1.className='col'; c1.appendChild(yesBtn);
    const c2 = document.createElement('div'); c2.className='col'; c2.appendChild(noBtn);
    btnRow.appendChild(c1); btnRow.appendChild(c2); card.appendChild(btnRow);
    wrap.appendChild(card);
  }

  function renderInterview(){
    const items = (payload.task && payload.task.items) || [];
    const wrap = $('#practice');
    items.forEach((it,i)=>{
      const card = document.createElement('div'); card.className='card';
      const title = document.createElement('h3'); title.textContent = `Q${i+1}. Choose the best Wh‑word`;
      const prompt = document.createElement('p'); prompt.textContent = it.prompt;
      const box = document.createElement('div'); box.className='options';
      it.choices.forEach(ch=>{
        const b = document.createElement('button'); b.className='option'; b.textContent=ch;
        b.onclick = ()=>{
          if(b.dataset.done) return;
          b.dataset.done='1';
          const ok = ch===it.answer; markOption(b, ok);
          state.answered++; if(ok) state.score++; drawProgress(); maybeFinish();
          box.querySelectorAll('.option').forEach(x=>x.onclick=null);
        };
        box.appendChild(b);
      });
      card.appendChild(title); card.appendChild(prompt); card.appendChild(box); wrap.appendChild(card);
    });
  }

  function renderStoryOrder(){
    const lines = ((payload.task && payload.task.lines) || []).slice();
    const correct = ((payload.task && payload.task.lines) || []).slice();
    const shuffled = lines.slice().sort(()=>Math.random()-0.5);
    const wrap = $('#practice');
    const card = document.createElement('div'); card.className='card';
    const title = document.createElement('h3'); title.textContent='Reorder the story';
    const list = document.createElement('ol');
    function renderList(){
      list.innerHTML='';
      shuffled.forEach((line, i)=>{
        const li = document.createElement('li');
        li.className='small';
        const up = document.createElement('button'); up.className='btn'; up.textContent='↑'; up.onclick=()=>{ if(i>0){ const t=shuffled[i-1]; shuffled[i-1]=shuffled[i]; shuffled[i]=t; renderList(); } };
        const down = document.createElement('button'); down.className='btn'; down.textContent='↓'; down.onclick=()=>{ if(i<shuffled.length-1){ const t=shuffled[i+1]; shuffled[i+1]=shuffled[i]; shuffled[i]=t; renderList(); } };
        const span = document.createElement('span'); span.textContent = ' ' + line;
        li.appendChild(up); li.appendChild(down); li.appendChild(span);
        list.appendChild(li);
      });
    }
    renderList();
    const check = document.createElement('button'); check.className='btn'; check.textContent='Check Order';
    const res = document.createElement('p'); res.className='small';
    check.onclick=()=>{
      let correctCount=0; shuffled.forEach((line,i)=>{ if(line===correct[i]) correctCount++; });
      state.answered = correct.length; state.score = correctCount; drawProgress();
      res.textContent = `Correct in position: ${correctCount}/${correct.length}`;
      maybeFinish(true);
    };
    card.appendChild(title); card.appendChild(list); card.appendChild(check); card.appendChild(res); wrap.appendChild(card);
  }

  function renderPractice(){
    if(payload.task && payload.task.type){
      switch(payload.task.type){
        case 'dragmatch': return renderDragMatch();
        case 'correct': return renderCorrector();
        case 'timedQA': return renderTimedQA();
        case 'interview': return renderInterview();
        case 'storyOrder': return renderStoryOrder();
        default: return renderMCQs();
      }
    }
    renderMCQs();
  }

  function startTimer(seconds){
    state.timeLeft = seconds;
    $('.timer').textContent = `Time left: ${state.timeLeft}s`;
    clearInterval(state.timer);
    state.timer = setInterval(()=>{
      state.timeLeft--;
      $('.timer').textContent = `Time left: ${state.timeLeft}s`;
      if(state.timeLeft<=0){
        clearInterval(state.timer);
        $('#challengeBtn').disabled=true;
        maybeFinish(true);
      }
    },1000);
  }

  function startChallenge(){
    $('#challengeBtn').disabled=true;
    startTimer(payload.challengeSeconds || 60);
  }

  function maybeFinish(fromTimer){
    const total = getTotalItems();
    if(state.answered < total && !fromTimer) return;
    // compute result
    const passed = total>0 ? (state.score / total) >= state.neededToPass : false;
    const result = { total, score: state.score, passed, at: Date.now() };
    save('result', result);
    const xp = passed ? (10 + state.score*2) : Math.max(2,state.score);
    const globalXP = JSON.parse(localStorage.getItem('a2:xp')||'0') + xp;
    localStorage.setItem('a2:xp', JSON.stringify(globalXP));
    // badge
    if(passed){
      const bKey = `badge:${payload.topicKey}`;
      if(!localStorage.getItem(bKey)){
        localStorage.setItem(bKey,'earned');
      }
      $('.badge').classList.add('show');
    }
    // unlock next
    if(passed && payload.nextSlug){
      localStorage.setItem(`a2:unlocked:${payload.nextSlug}`,'1');
    }
    $('#summary').innerHTML = `You scored <strong>${state.score}/${total}</strong> — ${passed? 'Passed ✅':'Keep practicing'} <span class="small">(+${xp} XP)</span>`;
  }

  // Init
  document.addEventListener('DOMContentLoaded', ()=>{
    // header meta
    $('#topicName').textContent = payload.topic;
    $('#canDo').textContent = payload.canDo;
    $('#rule').innerHTML = payload.ruleHTML;
    $('#examples').innerHTML = payload.examplesHTML;
    $('#badgeImg').src = payload.badge;

    renderPractice();
    drawProgress();
    $('#challengeBtn').addEventListener('click', startChallenge);

    // enforce unlock gate if desired
    const locked = payload.locked && !localStorage.getItem(`a2:unlocked:${payload.slug}`);
    if(locked){
      $('#gate').style.display='block';
      $('#content').style.display='none';
    }
  });
})();