/* ============================================================
   EMPIRE MAFIA — JavaScript Logic
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     SPLASH SCREEN
     ============================================================ */
  const splash = document.getElementById('empSplash');
  const splashBar = document.getElementById('splashBarFill');
  let progress = 0;

  const splashInterval = setInterval(() => {
    progress += Math.random() * 12 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(splashInterval);
      setTimeout(() => {
        if (splash) { splash.classList.add('hidden'); }
      }, 300);
    }
    if (splashBar) splashBar.style.width = progress + '%';
  }, 60);

  /* ============================================================
     PARTICLES
     ============================================================ */
  const canvas = document.getElementById('emParticles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const COLORS = ['rgba(201,162,39,0.6)', 'rgba(201,162,39,0.3)', 'rgba(139,0,0,0.4)', 'rgba(106,13,173,0.3)', 'rgba(255,255,255,0.15)'];
    const N = 60;
    const particles = [];

    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.1),
        alpha: Math.random() * 0.6 + 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: Math.random() * 100,
        maxLife: 80 + Math.random() * 120,
      });
    }

    function resetParticle(p) {
      p.x = Math.random() * W;
      p.y = H + 10;
      p.r = Math.random() * 1.8 + 0.4;
      p.vx = (Math.random() - 0.5) * 0.3;
      p.vy = -(Math.random() * 0.4 + 0.1);
      p.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      p.life = 0;
      p.maxLife = 80 + Math.random() * 120;
    }

    function drawParticles() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        if (p.life > p.maxLife || p.y < -10) resetParticle(p);
        const fade = p.life < 20 ? p.life / 20 : p.life > p.maxLife - 20 ? (p.maxLife - p.life) / 20 : 1;
        ctx.save();
        ctx.globalAlpha = p.alpha * fade;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();

    window.addEventListener('resize', () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });
  }

  /* ============================================================
     AMBIENT GLOW PARALLAX
     ============================================================ */
  const glowA = document.getElementById('glowA');
  const glowB = document.getElementById('glowB');
  let mx = 0, my = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX / window.innerWidth;
    my = e.clientY / window.innerHeight;
    if (glowA) glowA.style.transform = `translate(${mx * 30}px, ${my * 20}px)`;
    if (glowB) glowB.style.transform = `translate(${-mx * 20}px, ${-my * 15}px)`;
  });

  /* ============================================================
     HEADER SCROLL
     ============================================================ */
  const header = document.getElementById('emHeader');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) scrollTopBtn.hidden = window.scrollY < 300;
  });

  /* ============================================================
     SCROLL TO TOP
     ============================================================ */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     TICKER — duplicate for seamless loop
     ============================================================ */
  const ticker = document.getElementById('tickerTrack');
  if (ticker) {
    ticker.innerHTML += ticker.innerHTML;
  }

  /* ============================================================
     DRAWER NAV
     ============================================================ */
  const drawer   = document.getElementById('sideDrawer');
  const overlay  = document.getElementById('overlay');
  const navHam   = document.getElementById('navHam');
  const drawerX  = document.getElementById('drawerClose');

  function openDrawer() {
    if (drawer)  drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (drawer)  drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navHam)  navHam.addEventListener('click', openDrawer);
  if (drawerX) drawerX.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Close on anchor link click inside drawer
  document.querySelectorAll('.em-drawer-link[href^="#"]').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* ============================================================
     AUDIO BUTTON (placeholder)
     ============================================================ */
  const audioBtn = document.getElementById('audioBtn');
  let audioOn = false;
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      audioOn = !audioOn;
      audioBtn.textContent = audioOn ? '🔊' : '🔇';
    });
  }

  /* ============================================================
     RATING TABS
     ============================================================ */
  const ratingData = {
    score: [
      ['🥇', '👑 Alisher_Empire', '18,420', '342', '24'],
      ['🥈', '⭐ Sardor_Khan', '16,890', '298', '18'],
      ['🥉', '💎 Zafar_Mafia', '15,340', '276', '15'],
      ['4',  '🎭 Jasur_Night', '14,200', '251', '12'],
      ['5',  '🗡 Otabek_Dark', '13,750', '238', '10'],
      ['6',  '🌙 Nodir_Shadow', '12,900', '221', '9'],
      ['7',  '⚔️ Sherzod_War', '11,800', '209', '8'],
      ['8',  '🔥 Kamol_Fire', '10,950', '195', '7'],
      ['9',  '💫 Ulugbek_Star', '10,100', '182', '6'],
      ['10', '🏆 Bobur_Ace', '9,600', '174', '5'],
    ],
    games: [
      ['🥇', '⚔️ Sherzod_War', '11,800', '421', '8'],
      ['🥈', '👑 Alisher_Empire', '18,420', '342', '24'],
      ['🥉', '🔥 Kamol_Fire', '10,950', '330', '7'],
      ['4',  '⭐ Sardor_Khan', '16,890', '298', '18'],
      ['5',  '🎭 Jasur_Night', '14,200', '251', '12'],
      ['6',  '💎 Zafar_Mafia', '15,340', '276', '15'],
      ['7',  '🗡 Otabek_Dark', '13,750', '238', '10'],
      ['8',  '🌙 Nodir_Shadow', '12,900', '221', '9'],
      ['9',  '🏆 Bobur_Ace', '9,600', '208', '5'],
      ['10', '💫 Ulugbek_Star', '10,100', '182', '6'],
    ],
    streak: [
      ['🥇', '👑 Alisher_Empire', '18,420', '342', '24'],
      ['🥈', '⭐ Sardor_Khan', '16,890', '298', '18'],
      ['🥉', '💎 Zafar_Mafia', '15,340', '276', '15'],
      ['4',  '🎭 Jasur_Night', '14,200', '251', '12'],
      ['5',  '⚔️ Sherzod_War', '11,800', '209', '11'],
      ['6',  '🗡 Otabek_Dark', '13,750', '238', '10'],
      ['7',  '🌙 Nodir_Shadow', '12,900', '221', '9'],
      ['8',  '🔥 Kamol_Fire', '10,950', '195', '7'],
      ['9',  '💫 Ulugbek_Star', '10,100', '182', '6'],
      ['10', '🏆 Bobur_Ace', '9,600', '174', '5'],
    ],
  };

  const ratingBody = document.getElementById('ratingBody');
  function renderRating(sort) {
    if (!ratingBody) return;
    const rows = ratingData[sort] || ratingData.score;
    const classes = ['top1', 'top2', 'top3'];
    ratingBody.innerHTML = rows.map((r, i) =>
      `<tr class="${classes[i] || ''}">
        <td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td>
      </tr>`
    ).join('');
  }
  renderRating('score');

  document.querySelectorAll('.em-rtab').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.em-rtab').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderRating(this.dataset.sort);
    });
  });

  /* ============================================================
     ROLES DATA (33 roles)
     ============================================================ */
  const ROLES = [
    // TINCH (14)
    { name: 'Shahar aholisi',     type: 'civ',  icon: '👤', desc: 'Oddiy fuqaro. Mafiyani toping va ovoz bering.', meta: 'Kun ovozida qatnashadi · shaxsiy maxsus qobiliyati yo'q' },
    { name: 'Tergovchi',          type: 'civ',  icon: '🔍', desc: 'Har tunda bitta shaxsni tekshiradi — mafiyami yoki yo\'q.', meta: 'Tunda harakatlanadi · kuchli axborot roli' },
    { name: 'Doktor',             type: 'civ',  icon: '💊', desc: 'Tunda bitta kishini o\'lim va blokladdan himoya qiladi.', meta: 'O\'zini ham himoya qila oladi (1 marta)' },
    { name: 'Snayper',            type: 'civ',  icon: '🎯', desc: 'O\'yin davomida bitta marta otish imkoniga ega.', meta: 'Nishon to\'g\'ri bo\'lsa davom etadi · noto\'g\'ri bo\'lsa chiqadi' },
    { name: 'Himoyachi',          type: 'civ',  icon: '🛡', desc: 'Mafiya hujumidan bir kishini kecha himoyalaydi.', meta: 'Doktordan farqi: tergovchi ko\'rmaydi uni' },
    { name: 'Jurnalist',          type: 'civ',  icon: '📰', desc: 'Har kechasi bir kishining rolini aniqlaydi.', meta: 'Tekshiruv natijasi "umumiy" turiga qarab keladi' },
    { name: 'Mayor',              type: 'civ',  icon: '🎖', desc: 'Ovozda ikki ovoz berish imkoniga ega.', meta: 'Roli ochiq yoki yopiq bo\'lishi mumkin' },
    { name: 'Sehrgar',            type: 'civ',  icon: '🔮', desc: 'Bitta kishining rolini ko\'radi — bir marta.', meta: 'Noyob bir martalik qobiliyat' },
    { name: 'Qo\'riqchi',         type: 'civ',  icon: '👁', desc: 'Tunda bir kishini kuzatadi — kim bordi-yu keldi.', meta: 'Harakat izini ko\'radi, ammo kimligini emas' },
    { name: 'Psixolog',           type: 'civ',  icon: '🧠', desc: 'Bir kishini blokda ushlab qo\'yadi, harakatini to\'xtatadi.', meta: 'Doktor va mafiyani bloklaydi' },
    { name: 'Advokat',            type: 'civ',  icon: '⚖️', desc: 'Kunduzi bir kishini chiqarishdan himoya qiladi.', meta: 'Ovoz natijasini bekor qila oladi' },
    { name: 'Razvedkachi',        type: 'civ',  icon: '🕵️', desc: 'Mafiya a\'zolarini kechqurun kuzatadi.', meta: 'Kim kimga hujum qilganini ko\'radi' },
    { name: 'Politsiya boshlig\'i', type: 'civ', icon: '👮', desc: 'Tergovchi va Himoyachini biladi — ular yashirinadi.', meta: 'Qo\'shimcha ma\'lumot kanaliga ega' },
    { name: 'Muhandis',           type: 'civ',  icon: '🔧', desc: 'Bir hududni "qurshov"ga oladi — tunda harakat mumkin emas.', meta: 'Blok zonasi o\'rnatadi' },

    // MAFIYA (9)
    { name: 'Mafiya',             type: 'maf',  icon: '🔫', desc: 'Asosiy mafiya a\'zosi. Tunda bitta o\'yinchini o\'ldiradi.', meta: 'Mafiya guruhi bilan koordinatsiyada ishlaydi' },
    { name: 'Don',                type: 'maf',  icon: '🤵', desc: 'Mafiya boshlig\'i. Tergovchi uni oddiy fuqaro deb ko\'radi.', meta: 'Eng kuchli mafiya roli · yashirin' },
    { name: 'Qotil',              type: 'maf',  icon: '🗡', desc: 'Maxsus qotil — tunda ikki harakatlanish imkoni.', meta: 'Himoya qiluvchini aylanib o\'ta oladi (50% ehtimol)' },
    { name: 'Josusvoy',          type: 'maf',  icon: '🕶', desc: 'Tinch fuqarolarning muloqotini eshitadi.', meta: 'Kecha guruh chatini ko\'radi' },
    { name: 'Zaharlovchi',        type: 'maf',  icon: '🧪', desc: 'Zahar bilan o\'ldiradi — doktor ham saqlay olmaydi.', meta: 'Zahar effekti 2 kechada ko\'rinadi' },
    { name: 'Qora beva',          type: 'maf',  icon: '🩸', desc: 'Mafiya — kunduzgi ovozda ko\'pchilikka tazyiq o\'tkazadi.', meta: 'Manipulatsiya qobiliyati bor' },
    { name: 'Portlovchi',         type: 'maf',  icon: '💣', desc: 'O\'zini portlatib, qoʻshni o\'yinchilarni oʻldiradi.', meta: 'Bitta marta ishlatiladi — oxirgi chora' },
    { name: 'Buzg\'unchi',        type: 'maf',  icon: '⚡', desc: 'Tergovchi tekshiruvini noto\'g\'ri natijaga o\'zgartiradi.', meta: 'Axborot urushi bo\'limi' },
    { name: 'Manipulyator',       type: 'maf',  icon: '🎭', desc: 'Bitta tinch fuqaroni boshqaradi — uning ovozi mafiyaga ishlaydi.', meta: 'Ruhiy ta\'sir — 1 kecha' },

    // NEYTRAL (5)
    { name: 'Maniak',             type: 'solo', icon: '🔪', desc: 'Har kechasi bitta o\'yinchini o\'ldiradi. Maqsad — yolg\'iz g\'alaba.', meta: 'Mafiya ham, tinch ham dushman' },
    { name: 'Masxaraboz',         type: 'solo', icon: '🃏', desc: 'Chiqarilsangiz g\'alaba. Ovozga tushiring!', meta: 'Aktyorlik va aldash zarur' },
    { name: 'Anarchist',          type: 'solo', icon: '⚔️', desc: 'Mafiya va tinch fuqarolarni yo\'q qiladi. Yolg\'iz qoladi — yutadi.', meta: 'Ikki tomonlama dushman' },
    { name: 'Oshiq',              type: 'solo', icon: '💘', desc: 'Sevgilisi bilan bog\'langan — biri o\'lsa, ikkalasi ham chiqadi.', meta: 'Birgalikda g\'alaba yoki mag\'lubiyat' },
    { name: 'Arvoh',              type: 'solo', icon: '👻', desc: 'O\'lganidan keyin ham ovoz bera oladi.', meta: 'Kuchli endgame roli — chiqmaganlar bilmaydi' },

    // DARK TRIAD (5)
    { name: 'Triad Zulmat',       type: 'dark', icon: '🖤', desc: 'Dark Triad boshliq\'i. Ikki tomonni ham boshqaradi.', meta: 'Faqat /darkgame da · eng kuchli rol' },
    { name: 'Triad Qo\'g\'irchoq', type: 'dark', icon: '🪆', desc: 'Bitta o\'yinchini qo\'g\'irchoqqa aylantiradi — roliga ega bo\'ladi.', meta: 'Rol o\'g\'irlash qobiliyati' },
    { name: 'Triad Aql',          type: 'dark', icon: '🧿', desc: 'Boshqa o\'yinchilarning harakatlarini oldindan biladi.', meta: 'Bashorat qobiliyati · meta-o\'yinchi' },
    { name: 'Triad Soya',         type: 'dark', icon: '🌑', desc: 'Ko\'rinmas harakat — hech qanday log da aks etmaydi.', meta: 'Ghost mode · izlanib bo\'lmaydi' },
    { name: 'Triad Vassa',        type: 'dark', icon: '⛓', desc: 'Bir o\'yinchini o\'ziga zanjirlab qo\'yadi — harakatsiz qiladi.', meta: 'Kuchli bloklash + o\'lim bilan bog\'liq' },
  ];

  const VISIBLE_INIT = 18;
  let currentFilter = 'all';
  let showAll = false;
  const rolesGrid = document.getElementById('rolesGrid');
  const moreBtn   = document.getElementById('rolesMoreBtn');

  function renderRoles() {
    if (!rolesGrid) return;
    const filtered = currentFilter === 'all' ? ROLES : ROLES.filter(r => r.type === currentFilter);
    const toShow = showAll ? filtered : filtered.slice(0, VISIBLE_INIT);
    rolesGrid.innerHTML = toShow.map((r, i) => `
      <div class="em-role-card" data-type="${r.type}" data-idx="${ROLES.indexOf(r)}"
           tabindex="0" role="button" aria-label="${r.name}">
        <div class="em-role-icon">${r.icon}</div>
        <div class="em-role-name">${r.name}</div>
        <div class="em-role-type">${typeLabel(r.type)}</div>
      </div>
    `).join('');
    if (moreBtn) {
      moreBtn.hidden = filtered.length <= VISIBLE_INIT || showAll;
    }
    rolesGrid.querySelectorAll('.em-role-card').forEach(card => {
      card.addEventListener('click', () => openRoleModal(parseInt(card.dataset.idx)));
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openRoleModal(parseInt(card.dataset.idx)); });
    });
  }

  function typeLabel(t) {
    return { civ: 'TINCH', maf: 'MAFIYA', solo: 'NEYTRAL', dark: 'DARK TRIAD' }[t] || t.toUpperCase();
  }

  document.querySelectorAll('.em-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.em-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.filter;
      showAll = false;
      renderRoles();
    });
  });

  if (moreBtn) {
    moreBtn.addEventListener('click', () => { showAll = true; renderRoles(); });
  }

  renderRoles();

  /* ============================================================
     ROLE MODAL
     ============================================================ */
  const modal    = document.getElementById('roleModal');
  const modalClose = document.getElementById('roleModalClose');
  const modalTag  = document.getElementById('roleModalTag');
  const modalName = document.getElementById('roleModalName');
  const modalPh   = document.getElementById('roleModalPh');
  const modalDesc = document.getElementById('roleModalDesc');
  const modalMeta = document.getElementById('roleModalMeta');
  const modalMedia= document.getElementById('roleModalMedia');

  const typeColors = { civ: '#4fd1c5', maf: '#c41e3a', solo: '#b794f4', dark: '#718096' };

  function openRoleModal(idx) {
    const r = ROLES[idx];
    if (!r || !modal) return;
    if (modalTag)  { modalTag.textContent = typeLabel(r.type); modalTag.style.background = typeColors[r.type] + '22'; modalTag.style.color = typeColors[r.type]; modalTag.style.borderColor = typeColors[r.type] + '55'; }
    if (modalName) modalName.textContent = r.name;
    if (modalPh)   modalPh.textContent = r.icon;
    if (modalDesc) modalDesc.textContent = r.desc;
    if (modalMeta) modalMeta.textContent = r.meta;
    if (modalMedia) modalMedia.style.background = typeColors[r.type] + '15';
    modal.hidden = false;
    modal.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeRoleModal() {
    if (modal) { modal.hidden = true; modal.setAttribute('aria-hidden', 'true'); }
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeRoleModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeRoleModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal && !modal.hidden) closeRoleModal(); });

  /* ============================================================
     SHOP — ID search (demo)
     ============================================================ */
  const shopInput  = document.getElementById('shopInput');
  const shopSearch = document.getElementById('shopSearch');
  const shopErr    = document.getElementById('shopErr');
  const shopAv     = document.getElementById('shopAv');
  const shopName   = document.getElementById('shopName');
  const shopDia    = document.getElementById('shopDia');
  const shopUserCard = document.getElementById('shopUserCard');
  const pkgsGrid   = document.getElementById('pkgsGrid');
  const pkgsHint   = document.getElementById('pkgsHint');

  const DEMO_USERS = {
    '12345': { name: 'Alisher_Empire', dia: 250, av: '👑' },
    '54321': { name: 'Sardor_Khan',    dia: 80,  av: '⭐' },
    '11111': { name: 'Demo_User',      dia: 0,   av: '🎭' },
  };

  function handleShopSearch() {
    if (!shopInput || !shopErr) return;
    const val = shopInput.value.trim();
    if (!val) { shopErr.textContent = 'Raqam kiriting!'; return; }
    shopErr.textContent = '';
    const user = DEMO_USERS[val];
    if (user) {
      if (shopAv)   shopAv.textContent  = user.av;
      if (shopName) shopName.textContent = user.name;
      if (shopDia)  shopDia.textContent = user.dia;
      if (shopUserCard) shopUserCard.style.opacity = '1';
      if (pkgsHint) pkgsHint.textContent = 'Paket tanlang:';
      // Unlock packages
      if (pkgsGrid) {
        pkgsGrid.querySelectorAll('.em-pkg-card').forEach(c => c.classList.remove('locked'));
      }
      // Step 2 active
      const step2 = document.querySelector('.em-step[data-step="2"]');
      if (step2) step2.classList.add('active');
    } else {
      shopErr.textContent = 'Foydalanuvchi topilmadi. Demo: 12345, 54321, 11111';
    }
  }

  if (shopSearch) shopSearch.addEventListener('click', handleShopSearch);
  if (shopInput) shopInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleShopSearch(); });

  // Package click demo
  if (pkgsGrid) {
    pkgsGrid.addEventListener('click', e => {
      const card = e.target.closest('.em-pkg-card');
      if (!card || card.classList.contains('locked')) return;
      pkgsGrid.querySelectorAll('.em-pkg-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      card.style.borderColor = 'var(--gold)';
      card.style.background = 'rgba(201,162,39,0.1)';
      const step3 = document.querySelector('.em-step[data-step="3"]');
      if (step3) step3.classList.add('active');
    });
  }

  /* ============================================================
     COUNTER ANIMATION
     ============================================================ */
  function animateCount(el, target, suffix = '') {
    if (!el) return;
    const num = parseInt(target.replace(/,/g, ''));
    let current = 0;
    const step = Math.ceil(num / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, num);
      el.textContent = current.toLocaleString() + suffix;
      if (current >= num) clearInterval(timer);
    }, 20);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(document.getElementById('statGames'), '247');
        animateCount(document.getElementById('statUsers'), '14832');
        animateCount(document.getElementById('statRoles'), '33');
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const heroSection = document.getElementById('hero');
  if (heroSection) observer.observe(heroSection);

  /* ============================================================
     SMOOTH ACTIVE NAV LINKS
     ============================================================ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.em-header-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          link.style.background = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-60px 0px' });

  sections.forEach(s => navObserver.observe(s));

  console.log('%cEMPIRE MAFIA 👑', 'color:#c9a227;font-size:24px;font-weight:900;font-family:serif');
  console.log('%cTelegram Mafia O\'yini | 33 Rol | VIP Obuna', 'color:#e8e0d0;font-size:12px');

})();
