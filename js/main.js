document.addEventListener('DOMContentLoaded', () => {

  /* NAV SCROLL */
  window.addEventListener('scroll', () => {
    document.querySelector('nav').style.boxShadow =
      window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,0.1)' : '0 2px 16px rgba(0,0,0,0.06)';
  });

  /* MODE TOGGLE */
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.body.classList.toggle('investor', btn.dataset.mode === 'investor');
    });
  });

  /* TABS */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.tabs-group');
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = group.querySelector('#' + btn.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  /* EPIC CARDS */
  document.querySelectorAll('.epic-card').forEach(card => {
    card.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      document.querySelectorAll('.epic-card.open').forEach(c => c.classList.remove('open'));
      if (!isOpen) card.classList.add('open');
    });
  });

  /* REVEAL ON SCROLL */
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('on'), i * 70);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* PROGRESS BARS */
  const progObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.prog-fill').forEach(f => {
          setTimeout(() => { f.style.width = f.dataset.w + '%'; }, 200);
        });
        progObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.prog-group').forEach(el => progObs.observe(el));

  /* COUNTERS */
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const end = parseFloat(el.dataset.to);
        const pre = el.dataset.pre || '';
        const suf = el.dataset.suf || '';
        const dur = 1600;
        const start = performance.now();
        const isFloat = String(end).includes('.');
        const step = now => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const v = eased * end;
          el.textContent = pre + (isFloat ? v.toFixed(1) : Math.floor(v).toLocaleString('es-GT')) + suf;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countObs.unobserve(el);
      }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-to]').forEach(el => countObs.observe(el));

  /* SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});