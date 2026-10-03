
(function(){
  const form = document.getElementById('leadForm');
  if(!form) return;

  let step = 1;
  const steps = [...document.querySelectorAll('.form-step')];
  const progress = document.getElementById('progressBar');
  const summary = document.getElementById('summaryBox');

  const params = new URLSearchParams(window.location.search);
  ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'].forEach(key=>{
    const value = params.get(key);
    if(value) sessionStorage.setItem('tm_'+key,value);
  });

  // Hide the fixed mobile shortcuts whenever the form is visible or focused.
  // Observing the whole form also covers tall steps and viewport/keyboard changes.
  let formInView = false;
  function updateMobileActions(){
    document.body.classList.toggle('form-in-view',
      formInView || form.contains(document.activeElement));
  }
  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver(entries=>{
      formInView = entries[0].isIntersecting;
      updateMobileActions();
    });
    observer.observe(form);
  }
  form.addEventListener('focusin', updateMobileActions);
  form.addEventListener('focusout', ()=>requestAnimationFrame(updateMobileActions));

  function showStep(n){
    step = n;
    steps.forEach(s=>s.classList.toggle('active', Number(s.dataset.step)===n));
    progress.style.width = (n*25)+'%';
    if(n===4) buildSummary();
    const mobile = window.matchMedia('(max-width:620px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    form.scrollIntoView({
      behavior:reducedMotion ? 'instant' : 'smooth',
      block:mobile ? 'start' : 'center'
    });
  }

  function currentValid(){
    const active = document.querySelector('.form-step.active');
    const fields = [...active.querySelectorAll('input,select,textarea')];
    const invalid = fields.find(el=>!el.checkValidity());
    if(invalid){
      invalid.reportValidity();
      return false;
    }
    return true;
  }

  function buildSummary(){
    const service = document.getElementById('service').value || '—';
    const postal = document.getElementById('postal').value || '—';
    const urgency = document.getElementById('urgency').value || '—';
    const name = document.getElementById('name').value || '—';
    summary.innerHTML = `
      <strong>${escapeHtml(service)}</strong><br>
      ${escapeHtml(postal)} · ${escapeHtml(urgency)}<br>
      Demande au nom de ${escapeHtml(name)}
    `;
  }

  document.querySelectorAll('.next-step').forEach(btn=>btn.addEventListener('click',()=>{
    if(currentValid()) showStep(Math.min(4,step+1));
  }));
  document.querySelectorAll('.prev-step').forEach(btn=>btn.addEventListener('click',()=>showStep(Math.max(1,step-1))));

  document.querySelectorAll('.issue-choice').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const service = btn.dataset.service;
      document.getElementById('service').value = service;
      document.getElementById('demande').scrollIntoView({behavior:'smooth'});
    });
  });

  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!currentValid()) return;

    // Production: replace this block with a POST to your CRM / automation endpoint.
    const payload = Object.fromEntries(new FormData(form).entries());
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'].forEach(key=>{
      payload[key] = sessionStorage.getItem('tm_'+key) || '';
    });
    console.log('TravauxMinute lead payload (demo only)', payload);

    steps.forEach(s=>s.classList.remove('active'));
    document.querySelector('.form-success').classList.add('active');
    progress.style.width='100%';
  });

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  }
})();
