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
    const total = payload.questions.length;
    const pct = Math.round((state.answered/total)*100);
    bar.style.width = pct + '%';
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

  function renderQuestions(){
    const wrap = $('#practice');
    payload.questions.forEach((q,i)=>{
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
    const total = payload.questions.length;
    if(state.answered < total && !fromTimer) return;
    // compute result
    const passed = (state.score / total) >= state.neededToPass;
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

    renderQuestions();
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