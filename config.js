/**
 * ============================================================
 *  EMPIRE MAFIA — Sayt konfiguratsiyasi
 *  Shu yerga o'z linklar va ma'lumotlaringizni kiriting
 * ============================================================
 */

const EMPIRE_CONFIG = {

   /* ----------------------------------------------------------
      BOT LINKI
      Telegram botingizning to'liq manzili
   ---------------------------------------------------------- */
   BOT_URL: "https://t.me/TuronMafia_Bot",   // <-- O'zgartiring

   /* ----------------------------------------------------------
      KANAL / GURUH LINKI
   ---------------------------------------------------------- */
   CHANNEL_URL: "https://t.me/Empire_yangiliklar",  // <-- O'zgartiring
   GROUP_URL: "https://t.me/savdo_empire", // <-- O'zgartiring

   /* ----------------------------------------------------------
      SAYT MA'LUMOTLARI
   ---------------------------------------------------------- */
   SITE_NAME: "EMPIRE MAFIA",
   SITE_URL: "https://empire.uz",           // <-- O'zgartiring
   SITE_LANG: "uz",

   /* ----------------------------------------------------------
      SEO — Google qidiruv natijalari uchun
      Saytingiz Google'da qanday ko'rinishi
   ---------------------------------------------------------- */
   SEO: {
      TITLE: "EMPIRE MAFIA — Telegram Mafia O'yini",
      DESCRIPTION: "EMPIRE MAFIA — O'zbekistondagi Telegram Mafia boti: 33 noyob rol, VIP obuna, klan urushi va imperiya iqtisodiyoti. Guruhda o'ynang!",
      KEYWORDS: "EMPIRE MAFIA, Telegram Mafia, mafia bot, o'yin bot, O'zbekiston",
      OG_IMAGE: "https://empire.uz/static/empire.png", // <-- O'zgartiring
   },

   /* ----------------------------------------------------------
      TO'LOV METODLARI (ko'rsatish / yashirish)
   ---------------------------------------------------------- */
   PAYMENT: {
      STARS: true,
      CLICK: true,
      PAYME: true,
      PAYNET: true,
   },

   /* ----------------------------------------------------------
      VIP NARXLARI
      STARS = Telegram Stars | DIAMOND = Olmos
   ---------------------------------------------------------- */
   VIP_PRICES: {
      DAYS_7:  { stars: 89,  diamond: 12  },
      DAYS_15: { stars: 170, diamond: 25  },
      DAYS_30: { stars: 300, diamond: 45  },
   },

   /* ----------------------------------------------------------
      STATISTIKA (real API bo'lmasa shu ko'rsatiladi)
   ---------------------------------------------------------- */
   DEMO_STATS: {
      GAMES: 247,
      USERS: 14832,
      ROLES: 33,
   },

};

// ============================================================
//  Bu qatorni o'zgartirmang — sayt avtomatik sozlanadi
// ============================================================
window.EMPIRE_CONFIG = EMPIRE_CONFIG;
