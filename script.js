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
    // TINCH FUQARO
    { name: 'Fuqaro',       type: 'civ',  img: 'rollar/fuqaro.png',       desc: 'Oddiy shahar aholisi. Mafiyani toping va ovoz bering.', meta: 'Kun ovozida qatnashadi · maxsus qobiliyati yo\'q' },
    { name: 'Doktor',       type: 'civ',  img: 'rollar/doktor.png',        desc: 'Tunda bitta kishini o\'lim va blokladdan himoya qiladi.', meta: 'O\'zini ham himoya qila oladi (1 marta)' },
    { name: 'Komissar',     type: 'civ',  img: 'rollar/komissar.png',      desc: 'Har tunda bitta shaxsni tekshiradi — mafiyami yoki yo\'q.', meta: 'Tunda harakatlanadi · kuchli axborot roli' },
    { name: 'Advokat',      type: 'civ',  img: 'rollar/advokat.png',       desc: 'Kunduzi bir kishini chiqarishdan himoya qiladi.', meta: 'Ovoz natijasini bekor qila oladi' },
    { name: 'Jurnalist',    type: 'civ',  img: 'rollar/jurnalist.png',     desc: 'Har kechasi bir kishining rolini aniqlaydi.', meta: 'Tekshiruv natijasi umumiy turiga qarab keladi' },
    { name: 'Qo\'riqchi',   type: 'civ',  img: 'rollar/qoriqchi.png',      desc: 'Tunda bir kishini kuzatadi — kim bordi-yu keldi.', meta: 'Harakat izini ko\'radi, ammo kimligini emas' },
    { name: 'Serjant',      type: 'civ',  img: 'rollar/serjant.png',       desc: 'Ovozda ikki ovoz berish imkoniga ega. Shahar qo\'shinining sardori.', meta: 'Roli ochiq yoki yopiq bo\'lishi mumkin' },
    { name: 'Ovchi',        type: 'civ',  img: 'rollar/ovchi.png',         desc: 'O\'yin davomida bitta marta otish imkoniga ega.', meta: 'Nishon to\'g\'ri bo\'lsa davom etadi · noto\'g\'ri bo\'lsa chiqadi' },
    { name: 'Janob',        type: 'civ',  img: 'rollar/janob.png',         desc: 'Bir hududni qurshov ga oladi — tunda harakat mumkin emas.', meta: 'Blok zonasi o\'rnatadi' },
    { name: 'Omadli',       type: 'civ',  img: 'rollar/omadli.png',        desc: 'O\'lim hujumlaridan tasodifiy omon qoladi.', meta: 'Har hujumda 50% omon qolish ehtimoli' },
    { name: 'Kezuvchi',     type: 'civ',  img: 'rollar/kezuvchi.png',      desc: 'Shahar bo\'ylab sayohat qiladi — hech kim uni ko\'ra olmaydi.', meta: 'Tunda ko\'rinmas · axborot yig\'adi' },

    // MAFIYA
    { name: 'Mafia',        type: 'maf',  img: 'rollar/mafia.png',         desc: 'Asosiy mafiya a\'zosi. Tunda bitta o\'yinchini o\'ldiradi.', meta: 'Mafiya guruhi bilan koordinatsiyada ishlaydi' },
    { name: 'Don',          type: 'maf',  img: 'rollar/don.png',           desc: 'Mafiya boshlig\'i. Komissar uni oddiy fuqaro deb ko\'radi.', meta: 'Eng kuchli mafiya roli · yashirin identifikatsiya' },
    { name: 'Qotil',        type: 'maf',  img: 'rollar/qotil.png',         desc: 'Maxsus qotil — tunda ikki harakatlanish imkoni.', meta: 'Himoya qiluvchini aylanib o\'ta oladi (50% ehtimol)' },
    { name: 'Kissavur',     type: 'maf',  img: 'rollar/kissavur.png',      desc: 'Tinch fuqarolarning pulini o\'g\'irlaydi. Boylik yig\'adi.', meta: 'Iqtisodiy mafiya roli' },
    { name: 'Virus',        type: 'maf',  img: 'rollar/virus.png',         desc: 'Zahar tarqatadi — doktor ham saqlay olmaydi.', meta: 'Zahar effekti 2 kechada ko\'rinadi' },
    { name: 'Sotqin',       type: 'maf',  img: 'rollar/sotqin.png',        desc: 'Tinch fuqaro sifatida yashirinadi — ikki tomonni ham aldaydi.', meta: 'Eng xavfli yashirin mafiya roli' },
    { name: 'Terminator',   type: 'maf',  img: 'rollar/terminator.png',    desc: 'To\'xtab bo\'lmaydigan qotil. Har kecha hujum qiladi.', meta: 'Himoyadan o\'ta oladi · kuchli hujum' },
    { name: 'Qora Ritsar',  type: 'maf',  img: 'rollar/qora_ritsar.png',   desc: 'Zulmat ritsari. Kunduz ovozini manipulyatsiya qiladi.', meta: 'Ovoz urushi bo\'limi · kuchli ta\'sir' },

    // NEYTRAL
    { name: 'Joker',        type: 'solo', img: 'rollar/joker.png',         desc: 'Chiqarilsangiz g\'alaba. Ovozga tushiring!', meta: 'Aktyorlik va aldash zarur · yolg\'iz g\'alaba' },
    { name: 'Bo\'ri',        type: 'solo', img: 'rollar/bori.png',          desc: 'Har kechasi bitta o\'yinchini o\'ldiradi. Maqsad — yolg\'iz g\'alaba.', meta: 'Mafiya ham, tinch ham dushman' },
    { name: 'Tulki',        type: 'solo', img: 'rollar/tulki.png',         desc: 'Aldaydi, yashirinadi, omboridan foydalanadi. Eng hiylagar neytral.', meta: 'Hech kimga ishonmaydi · o\'z yo\'li bilan g\'alaba' },
    { name: 'Qasoskor',     type: 'solo', img: 'rollar/qasoskor.png',      desc: 'Bitta dushmani bor — uni yo\'q qilsa g\'alaba.', meta: 'Maqsadli qasoskor · bir nishon' },
    { name: 'Suidsid',      type: 'solo', img: 'rollar/suidsid.png',       desc: 'O\'zini o\'zi portlatish orqali dushmanni yo\'q qiladi.', meta: 'Oxirgi chora · birgalikda o\'lim' },

    // MAXSUS
    { name: 'Aferist',      type: 'dark', img: 'rollar/aferist.png',       desc: 'Boshqa o\'yinchilarning rolini o\'g\'irlaydi va ularga aylanadi.', meta: 'Rol o\'g\'irlash · eng murakkab rol' },
    { name: 'Aktyor',       type: 'dark', img: 'rollar/aktyor.png',        desc: 'Istalgan rolni o\'ynaydi — haqiqiy roli hech qachon aniqlanmaydi.', meta: 'Kamuflyaj ustasi · ko\'rinmas identifikatsiya' },
    { name: 'Gazabkor',     type: 'dark', img: 'rollar/gazabkor.png',      desc: 'G\'azab bilan to\'lgan — o\'lgan kechasi barcha belgilarni buzadi.', meta: 'O\'lim effekti · olis ta\'sir' },
    { name: 'Gipnotizyor',  type: 'dark', img: 'rollar/gipnotizyor.png',   desc: 'Bitta kishini gipnozga soladi — uning harakati boshqariladi.', meta: 'Aql nazorati · 1 kecha' },
    { name: 'Jin',          type: 'dark', img: 'rollar/jin.png',           desc: 'Ko\'rinmas kuch — tunda hech kim uni bloklayolmaydi.', meta: 'Ghost mode · izlab bo\'lmaydi' },
    { name: 'Daydi',        type: 'dark', img: 'rollar/daydi.png',         desc: 'Shahar bo\'ylab sanqiydi — tasodifiy o\'yinchilarni bloklaydi.', meta: 'Tasodifiy bloklash · har kecha' },
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
    rolesGrid.innerHTML = toShow.map((r) => `
      <div class="em-role-card" data-type="${r.type}" data-idx="${ROLES.indexOf(r)}"
           tabindex="0" role="button" aria-label="${r.name}">
        <div class="em-role-img-wrap">
          ${r.img
            ? `<img src="./${r.img}" alt="${r.name}" class="em-role-img" loading="eager" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
               <div class="em-role-icon-fb" style="display:none">🎭</div>`
            : `<div class="em-role-icon">🎭</div>`
          }
        </div>
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
    if (modalDesc) modalDesc.textContent = r.desc;
    if (modalMeta) modalMeta.textContent = r.meta;
    if (modalMedia) {
      modalMedia.style.background = typeColors[r.type] + '15';
      // Rasm yoki emoji ko'rsatish
      const existingImg = modalMedia.querySelector('.em-role-modal-img-real');
      if (existingImg) existingImg.remove();
      if (r.img) {
        const imgEl = document.createElement('img');
        imgEl.src = r.img;
        imgEl.alt = r.name;
        imgEl.className = 'em-role-modal-img-real';
        imgEl.onerror = function() { this.style.display='none'; if(modalPh) modalPh.style.display='flex'; };
        imgEl.onload  = function() { if(modalPh) modalPh.style.display='none'; };
        modalMedia.insertBefore(imgEl, modalMedia.firstChild);
        if(modalPh) modalPh.style.display='none';
      } else {
        if(modalPh) { modalPh.textContent = r.icon || '🎭'; modalPh.style.display='flex'; }
      }
    }
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
     TELEGRAM NFT GIFTS MARKET
     ============================================================ */
  const NFT_ITEMS = [
    // EMPIRE MAFIA MAXSUS GIFLAR
    { id: 'nft01', cat: 'character', rarity: 'legendary', name: 'Empire Don',        bg: 'linear-gradient(135deg,#1a0a00,#3d1a00)', emoji: '🤵', supply: '100 ta',   price: '500 ⭐',  floor: '0.5 TON', desc: 'Empire Mafiyasining Don si. Faqat 100 ta chiqarilgan maxsus Telegram Gift.' },
    { id: 'nft02', cat: 'character', rarity: 'epic',      name: 'Shadow Komissar',   bg: 'linear-gradient(135deg,#000d1a,#001a33)', emoji: '🕵️', supply: '500 ta',  price: '200 ⭐',  floor: '0.18 TON', desc: 'Maxfiy komissar. Profilda ko\'rinadigan premium Telegram Gift NFT.' },
    { id: 'nft03', cat: 'character', rarity: 'epic',      name: 'Dark Joker',        bg: 'linear-gradient(135deg,#0d001a,#1a003d)', emoji: '🃏', supply: '500 ta',  price: '150 ⭐',  floor: '0.12 TON', desc: 'Joker belgisi bilan maxsus chiqarilgan Telegram NFT Gift.' },
    { id: 'nft04', cat: 'character', rarity: 'rare',      name: 'Golden Sniper',     bg: 'linear-gradient(135deg,#1a1200,#3d2d00)', emoji: '🎯', supply: '1000 ta', price: '99 ⭐',   floor: '0.07 TON', desc: 'Oltin nishonchi — rare darajali Empire Mafia Telegram Gift.' },
    { id: 'nft05', cat: 'weapon',    rarity: 'legendary', name: 'Imperator Sword',   bg: 'linear-gradient(135deg,#1a0000,#3d0000)', emoji: '⚔️', supply: '50 ta',   price: '800 ⭐',  floor: '1.2 TON',  desc: 'Imperator qilichi. Eng noyob qurol Gift. Faqat 50 ta mavjud.' },
    { id: 'nft06', cat: 'weapon',    rarity: 'epic',      name: 'Dark Dagger',       bg: 'linear-gradient(135deg,#1a001a,#2d002d)', emoji: '🗡', supply: '300 ta',  price: '250 ⭐',  floor: '0.22 TON', desc: 'Zulmat xanjari. Epic darajali qurol Telegram NFT.' },
    { id: 'nft07', cat: 'weapon',    rarity: 'rare',      name: 'Silver Pistol',     bg: 'linear-gradient(135deg,#0a0a0a,#1a1a1a)', emoji: '🔫', supply: '800 ta',  price: '120 ⭐',  floor: '0.09 TON', desc: 'Kumush to\'pponcha. Rare qurol Gift NFT.' },
    { id: 'nft08', cat: 'crown',     rarity: 'legendary', name: 'Empire Crown',      bg: 'linear-gradient(135deg,#1a1000,#4d3000)', emoji: '👑', supply: '100 ta',  price: '1000 ⭐', floor: '2.0 TON',  desc: 'Imperiya toji. Telegram da eng qimmat Empire Mafia Gift NFT. Floor 2 TON.' },
    { id: 'nft09', cat: 'crown',     rarity: 'epic',      name: 'Crimson Crown',     bg: 'linear-gradient(135deg,#1a0000,#3d0011)', emoji: '🔱', supply: '200 ta',  price: '300 ⭐',  floor: '0.35 TON', desc: 'Qizil toj. Epic darajali imperator belgisi Telegram Gift.' },
    { id: 'nft10', cat: 'crown',     rarity: 'rare',      name: 'Shadow Ring',       bg: 'linear-gradient(135deg,#0d0d0d,#1a0d2d)', emoji: '💍', supply: '600 ta',  price: '89 ⭐',   floor: '0.06 TON', desc: 'Soya uzugi. Rare darajali unvon belgisi Telegram NFT Gift.' },
    { id: 'nft11', cat: 'special',   rarity: 'legendary', name: 'Black Market Pass', bg: 'linear-gradient(135deg,#000000,#1a001a)', emoji: '🎟', supply: '200 ta',  price: '600 ⭐',  floor: '0.8 TON',  desc: 'Qora bozorga kirish kartasi. Maxsus imtiyozlar beruvchi Legendary Gift.' },
    { id: 'nft12', cat: 'special',   rarity: 'epic',      name: 'Night Owl',         bg: 'linear-gradient(135deg,#001a1a,#002d2d)', emoji: '🦉', supply: '400 ta',  price: '180 ⭐',  floor: '0.15 TON', desc: 'Tun boyqushi. Kechki o\'yinlarda bonus beruvchi maxsus NFT.' },
  ];

  const RARITY_CONFIG = {
    legendary: { label: 'LEGENDARY', color: '#f6a623', glow: 'rgba(246,166,35,0.5)' },
    epic:      { label: 'EPIC',      color: '#b794f4', glow: 'rgba(183,148,244,0.45)' },
    rare:      { label: 'RARE',      color: '#4fd1c5', glow: 'rgba(79,209,197,0.4)'  },
    common:    { label: 'COMMON',    color: '#718096', glow: 'rgba(113,128,150,0.3)'  },
  };

  let nftFilter = 'all';
  const nftGrid = document.getElementById('nftGrid');

  function renderNFT() {
    if (!nftGrid) return;
    const items = nftFilter === 'all' ? NFT_ITEMS : NFT_ITEMS.filter(n => n.cat === nftFilter);
    nftGrid.innerHTML = items.map(n => {
      const rc = RARITY_CONFIG[n.rarity];
      return `
        <div class="em-nft-card" data-rarity="${n.rarity}" data-nft-id="${n.id}"
             tabindex="0" role="button" aria-label="${n.name}"
             style="--nft-color:${rc.color};--nft-glow:${rc.glow}">
          <div class="em-nft-card-bg" style="background:${n.bg}">
            <div class="em-nft-card-emoji">${n.emoji}</div>
            <div class="em-nft-rarity-badge">${rc.label}</div>
          </div>
          <div class="em-nft-card-info">
            <div class="em-nft-card-name">${n.name}</div>
            <div class="em-nft-card-meta">
              <span class="em-nft-supply">${n.supply}</span>
              <span class="em-nft-floor">${n.floor}</span>
            </div>
            <div class="em-nft-card-price">${n.price}</div>
          </div>
        </div>`;
    }).join('');
    nftGrid.querySelectorAll('.em-nft-card').forEach(card => {
      card.addEventListener('click', () => openNFTModal(card.dataset.nftId));
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openNFTModal(card.dataset.nftId); });
    });
  }

  document.querySelectorAll('.em-nft-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.em-nft-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      nftFilter = this.dataset.nftFilter;
      renderNFT();
    });
  });

  const nftModal      = document.getElementById('nftModal');
  const nftModalClose = document.getElementById('nftModalClose');

  function openNFTModal(id) {
    const n = NFT_ITEMS.find(x => x.id === id);
    if (!n || !nftModal) return;
    const rc = RARITY_CONFIG[n.rarity];
    document.getElementById('nftModalPreview').innerHTML =
      `<div class="em-nft-modal-bg" style="background:${n.bg}">
         <div class="em-nft-modal-emoji" style="filter:drop-shadow(0 0 30px ${rc.glow})">${n.emoji}</div>
       </div>`;
    document.getElementById('nftModalRarity').textContent = rc.label;
    document.getElementById('nftModalRarity').style.color = rc.color;
    document.getElementById('nftModalName').textContent = n.name;
    document.getElementById('nftModalDesc').textContent = n.desc;
    document.getElementById('nftModalPrice').innerHTML =
      `<span>${n.price}</span><small> · Floor: ${n.floor}</small>`;
    document.getElementById('nftModalSupply').textContent = 'Chiqarilgan: ' + n.supply;
    const cfg = window.EMPIRE_CONFIG;
    document.getElementById('nftBuyBtn').href = 'https://fragment.com';
    nftModal.hidden = false;
    nftModal.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeNFTModal() {
    if (nftModal) { nftModal.hidden = true; nftModal.setAttribute('aria-hidden', 'true'); }
    document.body.style.overflow = '';
  }

  if (nftModalClose) nftModalClose.addEventListener('click', closeNFTModal);
  if (nftModal) nftModal.addEventListener('click', e => { if (e.target === nftModal) closeNFTModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nftModal && !nftModal.hidden) closeNFTModal(); });

  renderNFT();

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

    { id: 'nft02', cat: 'avatar', rarity: 'epic',      name: 'Qora Qalqon',         emoji: '🛡', price: 60,  desc: 'Qora metall qalqon chegarasi. Epic darajali. VIP foydalanuvchilarga chegirma.' },
    { id: 'nft03', cat: 'avatar', rarity: 'rare',      name: 'Oltin Doira',          emoji: '⭕', price: 35,  desc: 'Oltin yorqin doira avatar chegarasi. Profilda jilolanib turadi.' },
    { id: 'nft04', cat: 'avatar', rarity: 'common',    name: 'Kumush Naqsh',         emoji: '🌀', price: 12,  desc: 'Kumush naqshli avatar chegarasi. Yangi o\'yinchilar uchun qulay narx.' },

    // ROL SKINLARI
    { id: 'nft05', cat: 'skin',   rarity: 'legendary', name: 'Don Maxsus Skin',      emoji: '🤵', price: 150, desc: 'Don roli uchun maxsus qora kostyum. Tunda ko\'rinmas, ammo barchaga ma\'lum — siz DONsiz.' },
    { id: 'nft06', cat: 'skin',   rarity: 'epic',      name: 'Joker Neon Skin',      emoji: '🃏', price: 80,  desc: 'Joker roli uchun neon rangdagi maxsus skin. Ovoz berish jarayonida alohida ko\'rinadi.' },
    { id: 'nft07', cat: 'skin',   rarity: 'epic',      name: 'Komissar Oltin Skin',  emoji: '🏅', price: 75,  desc: 'Komissar roli uchun oltin nishonli premium skin. Tekshiruv natijasida maxsus belgi.' },
    { id: 'nft08', cat: 'skin',   rarity: 'rare',      name: 'Mafia Qizil Skin',     emoji: '🔴', price: 40,  desc: 'Mafia roli uchun qizil rangdagi skin. Kechasi qonga botgan ko\'rinish.' },

    // EFFEKTLAR
    { id: 'nft09', cat: 'effect', rarity: 'legendary', name: 'Zulmat Effekti',       emoji: '🌑', price: 200, desc: 'Profil atrofida zulmat buluti effekti. Eng noyob effekt — faqat 50 ta mavjud.' },
    { id: 'nft10', cat: 'effect', rarity: 'epic',      name: 'Oltin Yulduz Effekti', emoji: '✨', price: 90,  desc: 'Profildan oltin yulduzlar sachrab turadi. Har xabarga qo\'shiladi.' },
    { id: 'nft11', cat: 'effect', rarity: 'rare',      name: 'Muz Muzlash',          emoji: '❄️', price: 45,  desc: 'Profil atrofida muzlash animatsiyasi. Raqiblarni psixologik bosim qiladi.' },
    { id: 'nft12', cat: 'effect', rarity: 'common',    name: 'Olov Alangasi',        emoji: '🔥', price: 18,  desc: 'Engil olov effekti. Profilga harakat va dinamik ko\'rinish beradi.' },

    // KOLLEKSIYA KARTALARI
    { id: 'nft13', cat: 'card',   rarity: 'legendary', name: 'Birinchi Imperator',   emoji: '📜', price: 500, desc: 'Empire Mafia tarixidagi birinchi imperator kartasi. Abadiy kolleksiya. Faqat 10 ta mavjud.' },
    { id: 'nft14', cat: 'card',   rarity: 'epic',      name: 'Urush Kartasi #1',     emoji: '⚔️', price: 100, desc: 'Birinchi klan urushining yodgorlik kartasi. Tarixiy kolleksiya asar.' },
    { id: 'nft15', cat: 'card',   rarity: 'rare',      name: 'Yangi Mavsum Kartasi', emoji: '🗓', price: 55,  desc: 'Har yangi mavsum chiqadigan maxsus karta. Mavsumiy kollektor narsasi.' },
    { id: 'nft16', cat: 'card',   rarity: 'common',    name: 'Imperiya Belgisi',     emoji: '🏰', price: 20,  desc: 'Imperiya gerbini aks ettiruvchi standart karta. Yangi o\'yinchilar uchun.' },
  ];

  const RARITY_CONFIG = {
    legendary: { label: 'LEGENDARY', color: '#f6a623', glow: 'rgba(246,166,35,0.4)' },
    epic:      { label: 'EPIC',      color: '#b794f4', glow: 'rgba(183,148,244,0.35)' },
    rare:      { label: 'RARE',      color: '#4fd1c5', glow: 'rgba(79,209,197,0.35)' },
    common:    { label: 'COMMON',    color: '#718096', glow: 'rgba(113,128,150,0.25)' },
  };

  let nftFilter = 'all';
  const nftGrid = document.getElementById('nftGrid');

  function renderNFT() {
    if (!nftGrid) return;
    const items = nftFilter === 'all' ? NFT_ITEMS : NFT_ITEMS.filter(n => n.cat === nftFilter);
    nftGrid.innerHTML = items.map(n => {
      const rc = RARITY_CONFIG[n.rarity];
      return `
        <div class="em-nft-card" data-rarity="${n.rarity}" data-nft-id="${n.id}"
             tabindex="0" role="button" aria-label="${n.name}"
             style="--nft-color:${rc.color};--nft-glow:${rc.glow}">
          <div class="em-nft-card-img">${n.emoji}</div>
          <div class="em-nft-rarity-badge">${rc.label}</div>
          <div class="em-nft-card-name">${n.name}</div>
          <div class="em-nft-card-price">
            <span>${n.price} 💎</span>
          </div>
        </div>`;
    }).join('');
    nftGrid.querySelectorAll('.em-nft-card').forEach(card => {
      card.addEventListener('click', () => openNFTModal(card.dataset.nftId));
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openNFTModal(card.dataset.nftId); });
    });
  }

  document.querySelectorAll('.em-nft-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.em-nft-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      nftFilter = this.dataset.nftFilter;
      renderNFT();
    });
  });

  const nftModal    = document.getElementById('nftModal');
  const nftModalClose = document.getElementById('nftModalClose');

  function openNFTModal(id) {
    const n = NFT_ITEMS.find(x => x.id === id);
    if (!n || !nftModal) return;
    const rc = RARITY_CONFIG[n.rarity];
    document.getElementById('nftModalPreview').innerHTML =
      `<div class="em-nft-modal-emoji" style="text-shadow:0 0 40px ${rc.glow}">${n.emoji}</div>`;
    document.getElementById('nftModalRarity').textContent = rc.label;
    document.getElementById('nftModalRarity').style.color = rc.color;
    document.getElementById('nftModalName').textContent = n.name;
    document.getElementById('nftModalDesc').textContent = n.desc;
    document.getElementById('nftModalPrice').textContent = n.price + ' 💎';
    const cfg = window.EMPIRE_CONFIG;
    document.getElementById('nftBuyBtn').href = (cfg && cfg.BOT_URL) ? cfg.BOT_URL : '#';
    nftModal.hidden = false;
    nftModal.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeNFTModal() {
    if (nftModal) { nftModal.hidden = true; nftModal.setAttribute('aria-hidden', 'true'); }
    document.body.style.overflow = '';
  }

  if (nftModalClose) nftModalClose.addEventListener('click', closeNFTModal);
  if (nftModal) nftModal.addEventListener('click', e => { if (e.target === nftModal) closeNFTModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nftModal && !nftModal.hidden) closeNFTModal(); });

  renderNFT();


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
