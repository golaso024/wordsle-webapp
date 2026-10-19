/* Wordle Mini App — wordslebot
   Дизайн: Telegram Web (telegram-tt). Бэкенд: endpoints через Serverless.call */

const tg = window.Telegram && window.Telegram.WebApp;
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

/* ─────────────────────────── i18n ─────────────────────────── */
const L = {
  ru: {
    continue: 'Продолжить', nickLabel: 'Ник в игре',
    nickHint: 'Как в Telegram или свой — 2–24 символа',
    nickBad: 'Ник: 2–24 символа — буквы, цифры, пробел, . - _',
    saved: 'Сохранено', loading: 'Загрузка…',
    menu_solo: 'Соло-игра', solo_sub: 'Одно слово, 6 попыток',
    menu_party: 'Пати-комната', party_sub: 'Друзья от 2 и до бесконечности',
    menu_board: 'Лидерборд', board_sub: 'ТОП-10 игроков',
    menu_settings: 'Настройки',
    active_rooms: 'Активные комнаты', enter: 'Войти →',
    wins: 'побед', streak: 'серия', games: 'игр',
    solo_title: 'Соло', new_word: 'Новое слово', give_up: 'Сдаться',
    you_won: '🎉 Слово отгадано!', you_lost: '💀 Слово: {word}',
    party_title: 'Пати', create_room: 'Создать комнату',
    join_lbl: 'Код комнаты', join_btn: 'Войти по коду', code_ph: 'ABCDE',
    room_title: 'Комната', code_hint: 'Нажмите, чтобы скопировать',
    copied: 'Код скопирован', invite: 'Пригласить друзей',
    invite_text: 'Заходи в пати Wordle! Код комнаты: {code}',
    players: 'Игроки', you: '(вы)', host: 'хост',
    waiting_host: 'Ждём, пока хост начнёт раунд…',
    start_round: 'Начать раунд', need_two: 'Нужно минимум 2 игрока — позовите друзей!',
    leave: 'Покинуть', finish: 'Завершить раунд',
    round_lang: 'Слова раунда',
    waiting_others: 'Ждём остальных игроков…',
    chat: 'Чат', chat_hint: 'История чата удалится после раунда',
    msg_ph: 'Сообщение…', chat_closed: 'Раунд окончен — чат удалён',
    results: 'Результаты', word_was: 'Слово было: {word}',
    new_room: 'Новая комната', home_btn: 'Домой',
    lb_title: 'Лидерборд', lb_empty: 'Пока никто не сыграл — будьте первым!',
    settings_title: 'Настройки', lang: 'Язык',
    theme: 'Тема', theme_auto: 'Авто', theme_light: 'Светлая', theme_dark: 'Тёмная',
    about: 'Wordle Mini App · @wordslebot',
    room_not_found: 'Комната не найдена — проверьте код',
    room_finished_err: 'Раунд в этой комнате уже закончился',
    joined: 'Вы в комнате!', guess_error: 'Нужно слово из 5 букв',
    need_nick: 'Сначала выберите ник',
    update_app: 'Обновите Telegram до последней версии',
    open_in_tg: 'Откройте приложение через Telegram',
    surrender_ok: 'Вы сдались', left_room: 'Вы покинули комнату',
    st_PLAYING: 'играет', st_WON: 'угадал', st_LOST: 'не угадал', st_GAVE_UP: 'сдался',
    st_WAITING: 'ждёт', st_LATE: 'догоняет',
    err: 'Ошибка: {msg}', err_net: 'Нет связи. Попробуйте ещё раз',
    words_ru: 'русские', words_en: 'английские',
    set_at_create: '— задаётся при создании комнаты',
    refresh: 'Обновить',
    menu_friends: 'Друзья', friends_sub: 'Чат и приглашения в пати',
    friends_title: 'Друзья', fr_incoming: 'Запросы в друзья', fr_outgoing: 'Отправленные', fr_my: 'Мои друзья',
    fr_accept: 'Принять', fr_decline: 'Отклонить', fr_cancel: 'Отменить',
    friends_empty: 'Пока никого. Откройте Лидерборд и нажмите ⓘ рядом с игроком, чтобы отправить заявку.',
    fr_sent_ok: 'Заявка отправлена', fr_accept_ok: 'Теперь вы друзья!', fr_gone: 'Заявка не найдена',
    fr_only: 'Доступно только друзьям', invite_sent: 'Приглашение отправлено', invite_btn: 'Пригласить в пати',
    inv_title: 'Пригласить друзей', inv_share: '📤 Поделиться ссылкой',
    inv_none: 'Пока друзей нет. Отправьте заявку через Лидерборд (ⓘ) или поделитесь ссылкой ниже.',
    invite_card: 'Приглашение в пати', invite_join: 'Присоединиться', invite_open: 'Открыть комнату',
    pill_left: '{name} покинул игру', pill_joined: '{name} присоединился',
    pill_invite: '{name} приглашает в пати!', pill_invite_sub: 'Нажмите, чтобы войти',
    pill_request: '{name} хочет добавить вас в друзья', pill_msg: '{name}: {text}',
    pi_title: 'Профиль игрока', pi_since: 'В Wordle с', pi_winrate: 'винрейт',
    btn_add_friend: 'Отправить запрос в друзья', btn_req_sent: 'Запрос отправлен',
    btn_in_friends: 'Уже в друзьях', btn_accept_fr: 'Принять запрос в друзья', btn_write: 'Написать сообщение',
    tab_play: 'Игра', tab_lobby: 'Лобби',
    lobby_empty: 'Открытых комнат нет — создайте свою!',
    lobby_join: 'Войти', lobby_you: 'ваша комната',
    players_n: '{n} игр.',
    show_in_lobby: 'Показывать в лобби',
    mode_label: 'Кто загадывает слова',
    mode_classic: '🎲 Бот', mode_custom: '🎯 Игроки',
    mode_custom_sub: 'Игроки загадывают по кругу: своё слово + подсказка',
    set_word_title: 'Загадайте слово', set_word_ph: 'Слово из 5 букв',
    set_hint_ph: 'Подсказка для игроков', set_word_btn: 'Загадать',
    setter_wait: '🔒 {name} загадывает слово…',
    hint_of: '💡 {hint}', set_by: 'Загадал: {name}',
    you_set: 'Вы загадали: {word}', players_guessing: 'Игроки угадывают…',
    round_n: 'Раунд {n}', last_word_was: 'Прошлое слово: «{word}»',
    points: 'очк.', solo_lang: 'Слово на',
    err_setter_guess: 'Загадывающий не угадывает',
    err_word_not_set: 'Слово ещё не загадано',
    err_hint_required: 'Напишите подсказку',
    menu_daily: 'Слово дня', daily_title: 'Слово дня', daily_sub_new: 'Одно слово для всех · серия {n}',
    daily_sub_done: 'Сегодня разгадано · серия {n}',
    daily_next: 'Новое слово через {t}',
    daily_streak: 'серия', daily_best: 'рекорд',
    share_btn: '📤 Поделиться', copy_btn: '📋 Копировать',
    err_daily_played: 'Слово дня на сегодня уже разгадано',
    remind_lbl: 'Напоминания о слове дня', remind_on_l: 'Вкл', remind_off_l: 'Выкл',
  },
  en: {
    continue: 'Continue', nickLabel: 'In-game nickname',
    nickHint: 'Your Telegram name or your own — 2–24 chars',
    nickBad: 'Nickname: 2–24 chars — letters, digits, space, . - _',
    saved: 'Saved', loading: 'Loading…',
    menu_solo: 'Solo game', solo_sub: 'One word, six guesses',
    menu_party: 'Party room', party_sub: 'Friends from 2 to infinity',
    menu_board: 'Leaderboard', board_sub: 'Top 10 players',
    menu_settings: 'Settings',
    active_rooms: 'Active rooms', enter: 'Enter →',
    wins: 'wins', streak: 'streak', games: 'games',
    solo_title: 'Solo', new_word: 'New word', give_up: 'Give up',
    you_won: '🎉 You guessed it!', you_lost: '💀 The word was: {word}',
    party_title: 'Party', create_room: 'Create a room',
    join_lbl: 'Room code', join_btn: 'Join by code', code_ph: 'ABCDE',
    room_title: 'Room', code_hint: 'Tap to copy the code',
    copied: 'Code copied', invite: 'Invite friends',
    invite_text: 'Join my Wordle party! Room code: {code}',
    players: 'Players', you: '(you)', host: 'host',
    waiting_host: 'Waiting for the host to start…',
    start_round: 'Start the round', need_two: 'You need at least 2 players — invite friends!',
    leave: 'Leave', finish: 'Finish the round',
    round_lang: 'Round language',
    waiting_others: 'Waiting for the others…',
    chat: 'Chat', chat_hint: 'Chat history is wiped after the round',
    msg_ph: 'Message…', chat_closed: 'Round over — chat deleted',
    results: 'Results', word_was: 'The word was: {word}',
    new_room: 'New room', home_btn: 'Home',
    lb_title: 'Leaderboard', lb_empty: 'Nobody has played yet — be the first!',
    settings_title: 'Settings', lang: 'Language',
    theme: 'Theme', theme_auto: 'Auto', theme_light: 'Light', theme_dark: 'Dark',
    about: 'Wordle Mini App · @wordslebot',
    room_not_found: 'Room not found — check the code',
    room_finished_err: 'The round in this room is already over',
    joined: 'You are in!', guess_error: 'A 5-letter word, please',
    need_nick: 'Pick a nickname first',
    update_app: 'Please update Telegram to the latest version',
    open_in_tg: 'Open this app via Telegram',
    surrender_ok: 'You gave up', left_room: 'You left the room',
    st_PLAYING: 'playing', st_WON: 'guessed', st_LOST: 'missed', st_GAVE_UP: 'gave up',
    st_WAITING: 'waiting', st_LATE: 'catching up',
    err: 'Error: {msg}', err_net: 'No connection. Try again',
    words_ru: 'Russian', words_en: 'English',
    set_at_create: '— set when the room is created',
    refresh: 'Refresh',
    menu_friends: 'Friends', friends_sub: 'Chat & party invites',
    friends_title: 'Friends', fr_incoming: 'Friend requests', fr_outgoing: 'Sent requests', fr_my: 'My friends',
    fr_accept: 'Accept', fr_decline: 'Decline', fr_cancel: 'Cancel',
    friends_empty: 'Nobody yet. Open the Leaderboard and tap ⓘ next to a player to send a request.',
    fr_sent_ok: 'Request sent', fr_accept_ok: 'You are friends now!', fr_gone: 'Request not found',
    fr_only: 'Friends only', invite_sent: 'Invite sent', invite_btn: 'Invite to party',
    inv_title: 'Invite friends', inv_share: '📤 Share link',
    inv_none: 'No friends yet. Send a request via the Leaderboard (ⓘ) or share the link below.',
    invite_card: 'Party invite', invite_join: 'Join', invite_open: 'Open room',
    pill_left: '{name} left the game', pill_joined: '{name} joined',
    pill_invite: '{name} invites you to a party!', pill_invite_sub: 'Tap to join',
    pill_request: '{name} sent you a friend request', pill_msg: '{name}: {text}',
    pi_title: 'Player profile', pi_since: 'In Wordle since', pi_winrate: 'win rate',
    btn_add_friend: 'Send friend request', btn_req_sent: 'Request sent',
    btn_in_friends: 'Already friends', btn_accept_fr: 'Accept friend request', btn_write: 'Send message',
    tab_play: 'Play', tab_lobby: 'Lobby',
    lobby_empty: 'No open rooms — create one!',
    lobby_join: 'Join', lobby_you: 'your room',
    players_n: '{n} players',
    show_in_lobby: 'Show in lobby',
    mode_label: 'Who sets the words',
    mode_classic: '🎲 Bot', mode_custom: '🎯 Players',
    mode_custom_sub: 'Players take turns: their word + a hint',
    set_word_title: 'Set the word', set_word_ph: '5-letter word',
    set_hint_ph: 'Hint for players', set_word_btn: 'Set word',
    setter_wait: '🔒 {name} is setting the word…',
    hint_of: '💡 {hint}', set_by: 'Set by {name}',
    you_set: 'You set: {word}', players_guessing: 'Players are guessing…',
    round_n: 'Round {n}', last_word_was: 'Last word: “{word}”',
    points: 'pts', solo_lang: 'Words in',
    err_setter_guess: 'The setter doesn\'t guess',
    err_word_not_set: 'The word is not set yet',
    err_hint_required: 'Write a hint',
    menu_daily: 'Daily word', daily_title: 'Daily word', daily_sub_new: 'One word for all · streak {n}',
    daily_sub_done: 'Solved today · streak {n}',
    daily_next: 'Next word in {t}',
    daily_streak: 'streak', daily_best: 'best',
    share_btn: '📤 Share', copy_btn: '📋 Copy',
    err_daily_played: 'The daily word is already solved today',
    remind_lbl: 'Daily word reminders', remind_on_l: 'On', remind_off_l: 'Off',
  },
};

/* ─────────────────────────── state ─────────────────────────── */
const S = {
  lang: 'ru',
  profile: null, stats: null, solo: null, rooms: [],
  view: 'loading',
  navStack: [],
  room: null, roomSig: '',
  chat: [], chatLastId: 0, unread: 0,
  soloCur: '', roomCur: '', dailyCur: '',
  dailyFull: null, dailyTimer: null,
  pollTimer: null, pollBusy: false,
  busy: false,
  themePref: localStorage.getItem('wTheme') || 'auto',
  pendingRoom: null,
  chatOpen: false,
  lastSoloRow: -1, lastRoomRow: -1,
  // соло: выбранный язык слова (не зависит от языка интерфейса)
  soloLangPref: localStorage.getItem('wSoloLang') || null,
  // пати: активная вкладка хаба и состояние вкладки «Лобби»
  partyTab: 'play',
  partyMode: 'classic', partyPublic: 1,
  lobbyRooms: [], lobbyTimer: null, lobbyBusy: false, lobbySeenAt: 0,
  // друзья
  friends: [], frIn: [], frOut: [],
  friendsCursor: Number(localStorage.getItem('wFCursor')) || 0,
  unreadByPeer: (() => { try { return JSON.parse(localStorage.getItem('wFUnread')) || {}; } catch (e) { return {}; } })(),
  friendPoll: null, friendPollBusy: false,
  fchat: null, fchatTimer: null, fchatBusy: false,
};
function t(key, params) {
  let s = (L[S.lang] && L[S.lang][key]) != null ? L[S.lang][key] : (L.ru[key] != null ? L.ru[key] : key);
  if (params) for (const [k, v] of Object.entries(params)) s = s.split(`{${k}}`).join(String(v));
  return s;
}
function esc(s) {
  return String(s == null ? '' : s)
    .split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;')
    .split('"').join('&quot;').split("'").join('&#39;');
}

/* ─────────────────────────── SDK / API ─────────────────────────── */
function apiCall(name, data) {
  return new Promise((resolve, reject) => {
    if (!tg || !tg.Serverless || typeof tg.Serverless.call !== 'function') {
      reject({ type: 'NO_SDK', message: t('update_app') });
      return;
    }
    try {
      tg.Serverless.call(name, data || {}, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    } catch (e) {
      reject({ type: 'CLIENT', message: e && e.message });
    }
  });
}

function haptic(style, val) {
  try {
    if (!tg || !tg.HapticFeedback) return;
    if (style === 'notify') tg.HapticFeedback.notificationOccurred(val || 'success');
    else tg.HapticFeedback.impactOccurred(style || 'light');
  } catch (e) {}
}

let toastTimer = null;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

/* ─── Pill-уведомления сверху (въезжают и выезжают, стиль ТГ) ─── */
const pillQueue = [];
let pillActive = false;
function showPill(opts) {
  pillQueue.push(opts);
  if (pillQueue.length > 4) pillQueue.splice(0, pillQueue.length - 4); // без спама
  pumpPills();
}
function pumpPills() {
  if (pillActive || !pillQueue.length) return;
  const opts = pillQueue.shift();
  pillActive = true;
  let host = $('#pillHost');
  if (!host) {
    host = document.createElement('div');
    host.id = 'pillHost';
    document.body.appendChild(host);
  }
  const pill = document.createElement('div');
  pill.className = 'pill' + (opts.onClick ? ' tappable' : '');
  pill.innerHTML = (opts.avatarHtml || '') + `<div class="pill-col"><div class="pill-text">${opts.text}</div>${opts.sub ? `<div class="pill-sub">${opts.sub}</div>` : ''}</div>`;
  let dismissed = false;
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    pill.classList.remove('in');
    pill.classList.add('out');
    setTimeout(() => { pill.remove(); pillActive = false; pumpPills(); }, 400);
  };
  if (opts.onClick) pill.addEventListener('click', () => { dismiss(); try { opts.onClick(); } catch (e) {} });
  host.appendChild(pill);
  requestAnimationFrame(() => requestAnimationFrame(() => pill.classList.add('in')));
  haptic('light');
  setTimeout(dismiss, opts.ttl || 3200);
}
function pillFor(avatarId, avatarName, text, sub, onClick) {
  showPill({ avatarHtml: avatarHtml(avatarId, avatarName, 34), text: esc(text), sub: sub ? esc(sub) : '', onClick });
}

function apiErrToast(e) {
  const msg = (e && e.message) ? e.message : t('err_net');
  toast(msg.includes(' ') ? msg : t('err', { msg }));
}

/* ─────────────────────────── тема ─────────────────────────── */
function applyTheme() {
  let dark;
  if (S.themePref === 'dark') dark = true;
  else if (S.themePref === 'light') dark = false;
  else dark = tg ? tg.colorScheme === 'dark' : false;
  document.documentElement.classList.toggle('dark', dark);
  try {
    if (tg) {
      tg.setHeaderColor(dark ? 'secondary_bg_color' : 'bg_color');
      tg.setBackgroundColor(dark ? '#0F0F0F' : '#FFFFFF');
    }
  } catch (e) {}
}
if (tg && tg.onEvent) tg.onEvent('themeChanged', applyTheme);

/* ─────────────────────────── аватары (ТГ-градиенты) ─────────────────────────── */
const GRADS = [
  ['#FF885E', '#FF516A'], ['#FFCD6A', '#FFA85C'], ['#82B1FF', '#665FFF'],
  ['#A0DE7E', '#54CB68'], ['#53EDD6', '#28C9B7'], ['#72D5FD', '#2A9EF1'],
  ['#E0A2F3', '#D669ED'],
];
function gradFor(id, name) {
  let h = 0;
  const key = String(id != null ? id : name || '');
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return GRADS[h % GRADS.length];
}
function avatarHtml(id, name, size) {
  const sz = size || 40;
  const [a, b] = gradFor(id, name);
  const ch = esc(String(name || '?').trim().charAt(0));
  return `<span class="avatar" style="width:${sz}px;height:${sz}px;font-size:${Math.round(sz * 0.42)}px;background:linear-gradient(180deg,${a} 0%,${b} 100%)">${ch}</span>`;
}

/* ─────────────────────────── навигация ─────────────────────────── */
function setScreen(html, opts) {
  opts = opts || {};
  const stage = $('#stage');
  const old = stage.firstElementChild;
  if (old) old.remove(); // мгновенно — чтобы id не дублировались во время анимации
  const el = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = html;
  stage.appendChild(el);
  if (!opts.silent) el.classList.add(opts.back ? 'anim-in-back' : 'anim-in');

  // хедер-тень при скролле
  const page = $('.page', el);
  if (page) {
    page.addEventListener('scroll', () => {
      const h = $('.header', el);
      if (h) h.classList.toggle('scrolled', page.scrollTop > 4);
    }, { passive: true });
  }

  try {
    if (tg && tg.BackButton) {
      if (S.navStack.length > 0) tg.BackButton.show();
      else tg.BackButton.hide();
    }
  } catch (e) {}
}

function nav(view, params) {
  if (S.view !== 'loading') S.navStack.push({ view: S.view });
  renderView(view, params, false);
}
function goBack() {
  const prev = S.navStack.pop() || { view: 'home' };
  if (prev.view === 'room') { // не resurrect мёртвую комнату — домой
    renderView('home', null, true);
    return;
  }
  renderView(prev.view, null, true);
}
function goHome() {
  S.navStack = [];
  if (S.pollTimer) { clearInterval(S.pollTimer); S.pollTimer = null; }
  renderView('home', null, false);
  try { if (tg && tg.BackButton) tg.BackButton.hide(); } catch (e) {}
}

function renderView(view, params, isBack) {
  if (S.pollTimer && view !== 'room') { clearInterval(S.pollTimer); S.pollTimer = null; }
  if (S.fchatTimer && view !== 'fchat') { clearInterval(S.fchatTimer); S.fchatTimer = null; }
  if (S.lobbyTimer && view !== 'party') { clearInterval(S.lobbyTimer); S.lobbyTimer = null; }
  if (S.dailyTimer && view !== 'daily') { clearInterval(S.dailyTimer); S.dailyTimer = null; }
  S.view = view;
  if (view === 'onboarding') renderOnboarding(isBack);
  else if (view === 'home') renderHome(isBack);
  else if (view === 'solo') renderSolo(isBack);
  else if (view === 'daily') renderDaily(isBack);
  else if (view === 'party') renderParty(isBack);
  else if (view === 'room') renderRoom(isBack);
  else if (view === 'leaderboard') renderLeaderboard(isBack);
  else if (view === 'friends') renderFriends(isBack);
  else if (view === 'fchat') renderFchat(isBack);
  else if (view === 'settings') renderSettings(isBack);
  else if (view === 'loading') renderLoading();
}

/* ─────────────────────────── табло и клавиатура ─────────────────────────── */
const KEY_ROWS = {
  ru: [['Й','Ц','У','К','Е','Н','Г','Ш','Щ','З','Х','Ъ'], ['Ф','Ы','В','А','П','Р','О','Л','Д','Ж','Э'], ['Я','Ч','С','М','И','Т','Ь','Б','Ю']],
  en: [['Q','W','E','R','T','Y','U','I','O','P'], ['A','S','D','F','G','H','J','K','L'], ['Z','X','C','V','B','N','M']],
};

/* классы состояний: judge() возвращает 'G'|'Y'|'B' → CSS-классы корректных плиток/клавиш */
const ST_CLS = { g: 'correct', y: 'present', b: 'absent' };
function stCls(st) { return ST_CLS[String(st || '').toLowerCase()] || st || ''; }

function tileHtml(ch, state, small, animIdx, animate) {
  const cls = ['tile'];
  if (small) cls.push('small');
  if (ch) cls.push('filled');
  if (state) cls.push(stCls(state));
  if (state && !animate) cls.push('still');
  const style = state && animate && animIdx != null ? ` style="animation-delay:${animIdx * 260}ms"` : '';
  return `<div class="${cls.join(' ')}"${style}>${esc(ch || '')}</div>`;
}

function boardHtml(attempts, colors, current, opts) {
  opts = opts || {};
  const small = !!opts.small;
  let html = '<div class="board">';
  for (let r = 0; r < 6; r++) {
    html += '<div class="row">';
    const attempt = attempts[r];
    const rowColors = colors && colors[r];
    const animate = opts.animateRow === r;
    for (let c = 0; c < 5; c++) {
      if (attempt) {
        html += tileHtml(attempt[c], rowColors ? rowColors[c].toLowerCase() : null, small, c, animate);
      } else if (!colors || r === attempts.length) {
        html += tileHtml((current || '')[c] || '', null, small, null, false);
      } else {
        html += tileHtml('', null, small, null, false);
      }
    }
    html += '</div>';
  }
  html += '</div>';
  return html;
}

function keyStatesFrom(attempts, colors) {
  const best = {};
  const rank = { b: 1, y: 2, g: 3 };
  (attempts || []).forEach((word, r) => {
    const row = (colors || [])[r] || [];
    for (let i = 0; i < 5; i++) {
      const ch = word[i];
      const st = row[i] ? String(row[i]).toLowerCase() : 'b';
      if (!best[ch] || rank[st] > rank[best[ch]]) best[ch] = st;
    }
  });
  return best;
}

function keyboardHtml(lang, states, enterLabel) {
  const rows = KEY_ROWS[lang] || KEY_ROWS.ru;
  let html = '<div class="kb">';
  rows.forEach((row, ri) => {
    html += '<div class="kb-row">';
    if (ri === 2) html += `<button class="key wide" data-k="⏎">${esc(enterLabel || 'ENTER')}</button>`;
    row.forEach((ch) => {
      const st = states[ch] ? stCls(states[ch]) : '';
      html += `<button class="key ${st}" data-k="${ch}">${ch}</button>`;
    });
    if (ri === 2) html += `<button class="key wide" data-k="⌫">⌫</button>`;
    html += '</div>';
  });
  html += '</div>';
  return html;
}

function statusBanner(kind, text) {
  const icon = kind === 'win' ? '🎉' : kind === 'lose' ? '💀' : '⏳';
  const color = kind === 'win' ? 'var(--tile-correct)' : kind === 'lose' ? 'var(--danger)' : 'var(--text-secondary)';
  return `<div style="text-align:center;padding:10px 16px 2px;font-weight:600;font-size:15px;color:${color}">${icon} ${text}</div>`;
}

/* ═════════════════════════ ЭКРАНЫ ═════════════════════════ */

function renderLoading() {
  setScreen(`
    <div class="header"><div class="h-title">Wordle</div></div>
    <div class="page"><div class="center-wrap"><div class="spin"></div>${esc(t('loading'))}</div></div>`);
}

function renderErrorScreen(msg) {
  setScreen(`
    <div class="header"><div class="h-title">Wordle</div></div>
    <div class="page"><div class="empty-note">${esc(msg)}</div></div>`);
}

/* ── Онбординг: ник + язык ── */
function renderOnboarding() {
  const tgName = (S.profile && S.profile.tgName) ||
    (tg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.first_name) || '';
  const lang0 = S.lang;
  setScreen(`
    <div class="screen-inner" style="position:absolute;inset:0;display:flex;flex-direction:column">
      <div class="onb">
        <div class="onb-logo"><div class="tile"></div><div class="tile"></div><div class="tile"></div></div>
        <div class="onb-title">Wordle</div>
        <div class="onb-sub">${esc(t('nickHint'))}</div>

        <div class="field-label">${esc(t('nickLabel'))}</div>
        <input class="input" id="nickInput" maxlength="24" value="${esc(tgName)}" autocapitalize="off" autocomplete="off">

        <div class="field-label">${esc(t('lang'))}</div>
        <div class="seg" id="langSeg">
          <button data-lang="ru" class="${lang0 === 'ru' ? 'on' : ''}">🇷🇺 Русский</button>
          <button data-lang="en" class="${lang0 === 'en' ? 'on' : ''}">🇬🇧 English</button>
        </div>

        <div style="height:22px"></div>
        <button class="btn btn-primary" id="onbSave">${esc(t('continue'))}</button>
      </div>
    </div>`);

  $('#langSeg').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    haptic('light');
    S.lang = b.dataset.lang;
    $$('#langSeg button').forEach((x) => x.classList.toggle('on', x === b));
  });
  $('#onbSave').addEventListener('click', saveOnboarding);
  $('#nickInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') saveOnboarding(); });
}

async function saveOnboarding() {
  if (S.busy) return;
  const nick = $('#nickInput').value.replace(/\s+/g, ' ').trim();
  if (nick.length < 2 || nick.length > 24 || /^(.)\1+$/.test(nick) || /https?:|www\.|t\.me\//i.test(nick)) {
    toast(t('nickBad'));
    haptic('notify', 'error');
    return;
  }
  S.busy = true;
  try {
    const res = await apiCall('setProfile', { nickname: nick, lang: S.lang });
    S.profile.nickname = res.nickname;
    S.lang = res.lang;
    toast(t('saved'));
    haptic('notify', 'success');
    if (S.pendingRoom) {
      const code = S.pendingRoom; S.pendingRoom = null;
      await joinRoomFlow(code);
    } else {
      goHome();
    }
  } catch (e) {
    apiErrToast(e);
    if (e && e.parameters && e.parameters.code === 'BAD_NICK') toast(t('nickBad'));
  } finally {
    S.busy = false;
  }
}

/* ── Домашний экран ── */
function renderHome() {
  const p = S.profile || {};
  const st = S.stats || {};
  let roomsHtml = '';
  if (S.rooms && S.rooms.length) {
    roomsHtml = `<div class="island"><div class="island-title">${esc(t('active_rooms'))}</div><div class="list">${
      S.rooms.map((r) => `
      <div class="list-item" data-room="${esc(r.code)}">
        <div class="li-ico" style="background:${r.status === 'WAITING' ? 'linear-gradient(180deg,#72D5FD,#2A9EF1)' : 'linear-gradient(180deg,#A0DE7E,#54CB68)'}">⚔️</div>
        <div class="li-text">
          <div class="li-title">${esc(r.code)}</div>
          <div class="li-sub">${r.status === 'WAITING' ? esc(t('st_WAITING')) : esc(t('round_lang')) + ': ' + esc(r.lang === 'en' ? t('words_en') : t('words_ru'))}</div>
        </div>
        <span class="badge ${r.status === 'WAITING' ? '' : 'green'}">${r.status === 'WAITING' ? esc(t('st_WAITING')) : '▶︎'}</span>
        <div class="li-chevron"></div>
      </div>`).join('')
    }</div></div>`;
  }

  setScreen(`
    <div class="header">
      ${avatarHtml(p.userId, p.nickname || p.tgName, 34)}
      <div class="h-title">${esc(p.nickname || '')}</div>
    </div>
    <div class="page">
      <div class="island">
        <div class="profile-card">
          ${avatarHtml(p.userId, p.nickname || p.tgName, 56)}
          <div>
            <div class="profile-name">${esc(p.nickname || '')}</div>
            <div class="profile-sub">${esc(p.tgName || '')}</div>
          </div>
        </div>
        <div class="stats-row">
          <div class="stat"><div class="stat-num">${st.wins || 0}</div><div class="stat-label">${esc(t('wins'))}</div></div>
          <div class="stat"><div class="stat-num">${st.streak || 0}</div><div class="stat-label">${esc(t('streak'))}</div></div>
          <div class="stat"><div class="stat-num">${st.gamesPlayed || 0}</div><div class="stat-label">${esc(t('games'))}</div></div>
        </div>
      </div>
      ${roomsHtml}
      <div class="island"><div class="list">
        <button class="list-item" id="mDaily">
          <div class="li-ico" style="background:linear-gradient(180deg,#FFD54F,#FF9800)">🎯</div>
          <div class="li-text"><div class="li-title">${esc(t('menu_daily'))}</div><div class="li-sub">${esc(S.daily && S.daily.played ? t('daily_sub_done', { n: S.daily.streak || 0 }) : t('daily_sub_new', { n: (S.daily && S.daily.streak) || 0 }))}</div></div>
          ${S.daily && S.daily.played ? '<span class="badge green">✓</span>' : ''}
          <div class="li-chevron"></div>
        </button>
        <button class="list-item" id="mSolo">
          <div class="li-ico" style="background:linear-gradient(180deg,#4FAE4E,#2E8B37)">🎮</div>
          <div class="li-text"><div class="li-title">${esc(t('menu_solo'))}</div><div class="li-sub">${esc(t('solo_sub'))}</div></div>
          <div class="li-chevron"></div>
        </button>
        <button class="list-item" id="mParty">
          <div class="li-ico" style="background:linear-gradient(180deg,#FFCD6A,#FFA85C)">⚔️</div>
          <div class="li-text"><div class="li-title">${esc(t('menu_party'))}</div><div class="li-sub">${esc(t('party_sub'))}</div></div>
          <div class="li-chevron"></div>
        </button>
        <button class="list-item" id="mBoard">
          <div class="li-ico" style="background:linear-gradient(180deg,#FF885E,#FF516A)">🏆</div>
          <div class="li-text"><div class="li-title">${esc(t('menu_board'))}</div><div class="li-sub">${esc(t('board_sub'))}</div></div>
          <div class="li-chevron"></div>
        </button>
        <button class="list-item" id="mFriends">
          <div class="li-ico" style="background:linear-gradient(180deg,#E0A2F3,#D669ED)">👥</div>
          <div class="li-text"><div class="li-title">${esc(t('menu_friends'))}</div><div class="li-sub">${esc(t('friends_sub'))}</div></div>
          <span class="badge red" id="friendsBadge" style="display:none"></span>
          <div class="li-chevron"></div>
        </button>
        <button class="list-item" id="mSettings">
          <div class="li-ico" style="background:linear-gradient(180deg,#82B1FF,#665FFF)">⚙️</div>
          <div class="li-text"><div class="li-title">${esc(t('menu_settings'))}</div></div>
          <div class="li-chevron"></div>
        </button>
      </div></div>
    </div>`);

  $('#mDaily').addEventListener('click', () => { haptic('light'); nav('daily'); });
  $('#mSolo').addEventListener('click', () => { haptic('light'); nav('solo'); });
  $('#mParty').addEventListener('click', () => { haptic('light'); nav('party'); });
  $('#mBoard').addEventListener('click', () => { haptic('light'); nav('leaderboard'); });
  $('#mFriends').addEventListener('click', () => { haptic('light'); nav('friends'); });
  $('#mSettings').addEventListener('click', () => { haptic('light'); nav('settings'); });
  $$('.list-item[data-room]').forEach((el) => {
    el.addEventListener('click', () => { haptic('light'); joinRoomFlow(el.dataset.room); });
  });
  updateFriendsBadge();
}

/* ── Соло ── */
// Язык слова: активная игра навязывает свой язык (персистится на сервере),
// до старта — выбор игрока (не зависит от языка интерфейса)
function soloPrefLang() {
  if (!S.soloLangPref) S.soloLangPref = (S.lang === 'en' ? 'en' : 'ru');
  return S.soloLangPref;
}
function renderSolo() {
  const solo = S.solo || { status: 'IDLE', attempts: [], colors: [] };
  const inProgress = solo.status === 'IN_PROGRESS';
  const finished = solo.status === 'WON' || solo.status === 'LOST';
  // язык КЛАВИАТУРЫ = язык слова игры; не даём русской клавиатуре английское слово и наоборот
  const gameLang = inProgress && solo.lang ? solo.lang : null;
  const kbLang = gameLang || soloPrefLang();

  let banner = '';
  if (finished) banner = statusBanner(solo.status === 'WON' ? 'win' : 'lose',
    solo.status === 'WON' ? t('you_won') : t('you_lost', { word: solo.targetWord || '' }));

  // переключатель языка слова — когда нет активной игры
  const langSeg = !inProgress ? `
    <div class="seg" id="soloLangSeg" style="margin:0 auto 10px;width:max-content">
      <button data-lang="ru" class="${kbLang === 'ru' ? 'on' : ''}">🇷🇺 Русский</button>
      <button data-lang="en" class="${kbLang === 'en' ? 'on' : ''}">🇬🇧 English</button>
    </div>` : '';

  setScreen(`
    <div class="header">
      <button class="h-btn" data-back><svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></button>
      <div class="h-title">${esc(t('solo_title'))}</div>
      ${inProgress ? `<button class="h-action" id="soloGiveUp">${esc(t('give_up'))}</button>` : `<button class="h-action" id="soloNew">${esc(t('new_word'))}</button>`}
    </div>
    <div class="page" style="display:flex;flex-direction:column">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center">
        ${banner}
        ${langSeg}
        <div id="soloBoard">${boardHtml(solo.attempts, solo.colors, S.soloCur, { animateRow: S.lastSoloRow })}</div>
      </div>
      ${inProgress ? `<div id="soloKb">${keyboardHtml(kbLang, keyStatesFrom(solo.attempts, solo.colors), kbLang === 'ru' ? 'ВВОД' : 'ENTER')}</div>` : ''}
    </div>`);

  bindBack();
  const seg = $('#soloLangSeg');
  if (seg) seg.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    haptic('light');
    S.soloLangPref = b.dataset.lang;
    localStorage.setItem('wSoloLang', S.soloLangPref);
    renderSolo();
  });
  if (inProgress) {
    bindKeyboard('soloKb', {
      get: () => S.soloCur,
      set: (v) => { S.soloCur = v; },
      submit: submitSolo,
      refresh: () => {
        const b = $('#soloBoard');
        if (b) b.innerHTML = boardHtml(S.solo.attempts, S.solo.colors, S.soloCur, { animateRow: -1 });
        const kb = $('#soloKb');
        if (kb) kb.innerHTML = keyboardHtml(kbLang, keyStatesFrom(S.solo.attempts, S.solo.colors), kbLang === 'ru' ? 'ВВОД' : 'ENTER');
      },
    });
    const gu = $('#soloGiveUp');
    if (gu) gu.addEventListener('click', async () => {
      try { await apiCall('soloAction', { action: 'giveup' }); toast(t('surrender_ok')); S.soloCur = ''; await refreshState(); renderSolo(); }
      catch (e) { apiErrToast(e); }
    });
  } else {
    const nw = $('#soloNew');
    if (nw) nw.addEventListener('click', startSolo);
  }
}

async function startSolo() {
  if (S.busy) return;
  S.busy = true;
  try {
    const res = await apiCall('soloAction', { action: 'new', lang: soloPrefLang() });
    S.solo = { ...S.solo, ...res };
    S.soloCur = '';
    S.lastSoloRow = -1;
    haptic('light');
    renderSolo();
  } catch (e) {
    if (e && e.parameters && e.parameters.code === 'NO_NICKNAME') { toast(t('need_nick')); nav('onboarding'); return; }
    apiErrToast(e);
  } finally { S.busy = false; }
}

async function submitSolo() {
  const word = S.soloCur;
  if (word.length !== 5 || S.busy) return;
  S.busy = true;
  try {
    const res = await apiCall('soloAction', { action: 'guess', word });
    const wasRow = (S.solo.attempts || []).length;
    S.solo = { ...S.solo, ...res };
    S.soloCur = '';
    S.lastSoloRow = wasRow;
    if (res.status === 'WON') haptic('notify', 'success');
    else if (res.status === 'LOST') haptic('notify', 'error');
    else haptic('medium');
    renderSolo();
  } catch (e) {
    haptic('notify', 'error');
    const code = e && e.parameters && e.parameters.code;
    toast(code === 'BAD_WORD' ? t('guess_error') : (e && e.message) || t('err_net'));
    const rowEl = $$('#soloBoard .row')[(S.solo.attempts || []).length];
    if (rowEl) { rowEl.classList.add('shake'); setTimeout(() => rowEl.classList.remove('shake'), 550); }
  } finally { S.busy = false; }
}

/* ── Слово дня: одно на всех, одна попытка в день ── */
async function renderDaily() {
  try {
    S.dailyFull = await apiCall('daily', { action: 'state' });
  } catch (e) { apiErrToast(e); return; }
  const d = S.dailyFull;
  S.dailyCur = '';
  const finished = !!d.played;
  const kbLang = d.lang === 'en' ? 'en' : 'ru';

  let banner = '';
  if (finished) {
    const won = d.status === 'WON';
    banner = statusBanner(won ? 'win' : 'lose',
      won ? t('you_won') : t('you_lost', { word: d.targetWord || '' }));
  }

  const resultCard = finished ? `
    <div class="share-row">
      <button class="btn btn-primary" id="dailyShare">${esc(t('share_btn'))}</button>
      <button class="btn" id="dailyCopy">${esc(t('copy_btn'))}</button>
    </div>
    <div class="daily-meta">${esc(t('daily_streak'))}: <b>${d.stats.dailyStreak}</b> · ${esc(t('daily_best'))}: <b>${d.stats.dailyBest}</b></div>
    <div class="daily-count" id="dailyCount">${esc(t('daily_next', { t: fmtNext(d.nextIn) }))}</div>` : '';

  setScreen(`
    <div class="header">
      <button class="h-btn" data-back><svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></button>
      <div class="h-title">${esc(t('daily_title'))} #${d.day}</div>
      <div class="h-action" style="color:var(--accent)">🔥 ${d.stats.dailyStreak}</div>
    </div>
    <div class="page" style="display:flex;flex-direction:column">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center">
        ${banner}
        <div id="dailyBoard">${boardHtml(d.attempts, d.colors, S.dailyCur, {})}</div>
        ${resultCard}
      </div>
      ${!finished ? `<div id="dailyKb">${keyboardHtml(kbLang, keyStatesFrom(d.attempts, d.colors), kbLang === 'ru' ? 'ВВОД' : 'ENTER')}</div>` : ''}
    </div>`);

  bindBack();
  if (!finished) {
    bindKeyboard('dailyKb', {
      get: () => S.dailyCur,
      set: (v) => { S.dailyCur = v; },
      submit: submitDaily,
      refresh: () => {
        const b = $('#dailyBoard');
        if (b) b.innerHTML = boardHtml(S.dailyFull.attempts, S.dailyFull.colors, S.dailyCur, { animateRow: -1 });
        const kb = $('#dailyKb');
        if (kb) kb.innerHTML = keyboardHtml(kbLang, keyStatesFrom(S.dailyFull.attempts, S.dailyFull.colors), kbLang === 'ru' ? 'ВВОД' : 'ENTER');
      },
    });
  }
  if (finished) {
    const sh = $('#dailyShare');
    if (sh) sh.addEventListener('click', shareDaily);
    const cp = $('#dailyCopy');
    if (cp) cp.addEventListener('click', () => copyText(dailyShareText()));
    if (S.dailyTimer) clearInterval(S.dailyTimer);
    S.dailyTimer = setInterval(() => {
      const el = $('#dailyCount');
      if (!el) { clearInterval(S.dailyTimer); S.dailyTimer = null; return; }
      d.nextIn = Math.max(0, (d.nextIn || 0) - 1);
      el.textContent = t('daily_next', { t: fmtNext(d.nextIn) });
    }, 1000);
  }
}

function fmtNext(sec) {
  sec = Math.max(0, sec | 0);
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  if (h > 0) return h + ' ч ' + m + ' мин';
  if (m > 0) return m + ' мин ' + s + ' с';
  return s + ' с';
}

// Сетка без спойлера слова + реф-ссылка игрока (каждая паста = атрибуция)
function dailyShareText() {
  const d = S.dailyFull || {};
  const EMO = { G: '🟩', Y: '🟨', B: '⬛' };
  const grid = (d.colors || []).map((row) => (row || []).map((c) => EMO[c] || '⬛').join('')).join('\n');
  const uid = (S.profile && S.profile.userId) || 0;
  const n = (d.attempts || []).length;
  const head = d.status === 'WON'
    ? 'Слово дня #' + d.day + ' — ' + n + '/6 🔥'
    : 'Слово дня #' + d.day + ' — X/6';
  return grid + '\n\n' + head + '\nУгадай и ты 👉 https://t.me/wordslebot?start=ref_' + uid;
}

function shareDaily() {
  const uid = (S.profile && S.profile.userId) || 0;
  const url = 'https://t.me/share/url?url=' + encodeURIComponent('https://t.me/wordslebot?start=ref_' + uid) +
    '&text=' + encodeURIComponent(dailyShareText());
  try { if (tg && tg.openTelegramLink) { tg.openTelegramLink(url); return; } } catch (e) {}
  window.open(url, '_blank');
}

async function submitDaily() {
  const word = S.dailyCur;
  if (word.length !== 5 || S.busy) return;
  S.busy = true;
  try {
    const res = await apiCall('daily', { action: 'guess', word });
    S.dailyFull = res;
    S.dailyCur = '';
    if (res.status === 'WON') haptic('notify', 'success');
    else if (res.status === 'LOST') haptic('notify', 'error');
    else haptic('medium');
    renderDaily();
  } catch (e) {
    haptic('notify', 'error');
    const code = e && e.parameters && e.parameters.code;
    toast(code === 'BAD_WORD' ? t('guess_error')
      : code === 'ALREADY_PLAYED' ? t('err_daily_played')
      : (e && e.message) || t('err_net'));
    const rowEl = $$('#dailyBoard .row')[((S.dailyFull || {}).attempts || []).length];
    if (rowEl) { rowEl.classList.add('shake'); setTimeout(() => rowEl.classList.remove('shake'), 550); }
  } finally { S.busy = false; }
}

/* ── Пати-хаб: вкладки «Игра» / «Лобби» ── */
function stopLobbyPoll() {
  if (S.lobbyTimer) { clearInterval(S.lobbyTimer); S.lobbyTimer = null; }
}

function renderParty() {
  stopLobbyPoll();
  const tab = S.partyTab === 'lobby' ? 'lobby' : 'play';

  const tabs = `
    <div class="seg" id="partyTabs" style="margin:10px 10px 2px">
      <button data-tab="play" class="${tab === 'play' ? 'on' : ''}">🎮 ${esc(t('tab_play'))}</button>
      <button data-tab="lobby" class="${tab === 'lobby' ? 'on' : ''}">🌐 ${esc(t('tab_lobby'))}</button>
    </div>`;

  const playTab = `
    <div class="island" style="padding:14px 16px">
      <button class="btn btn-primary" id="createRoom">${esc(t('create_room'))}</button>
      <div class="field-label" style="margin-top:14px">${esc(t('mode_label'))}</div>
      <div class="seg" id="modeSeg">
        <button data-mode="classic" class="${S.partyMode !== 'custom' ? 'on' : ''}">${esc(t('mode_classic'))}</button>
        <button data-mode="custom" class="${S.partyMode === 'custom' ? 'on' : ''}">${esc(t('mode_custom'))}</button>
      </div>
      <div class="empty-note" style="padding:6px 2px 0;text-align:left">${esc(S.partyMode === 'custom' ? t('mode_custom_sub') : t('party_sub'))}</div>
      <div class="field-label" style="margin-top:12px">${esc(t('show_in_lobby'))}</div>
      <div class="seg" id="pubSeg">
        <button data-pub="1" class="${S.partyPublic !== 0 ? 'on' : ''}">✓</button>
        <button data-pub="0" class="${S.partyPublic === 0 ? 'on' : ''}">✕</button>
      </div>
      <div class="field-label" style="margin-top:14px">${esc(t('join_lbl'))}</div>
      <div style="display:flex;gap:8px">
        <input class="input" id="joinCode" placeholder="${esc(t('code_ph'))}" maxlength="8" style="flex:1;text-transform:uppercase;letter-spacing:3px;font-weight:700" autocapitalize="characters">
        <button class="btn btn-tint" id="joinBtn" style="width:auto;padding:0 22px">${esc(t('join_btn'))}</button>
      </div>
    </div>
    <div class="empty-note" style="padding-top:8px">💬 ${esc(t('chat_hint'))}</div>`;

  const lobbyTab = `
    <div class="island" style="padding:12px 12px 8px">
      <div id="lobbyList">${lobbyListHtml()}</div>
      <div style="display:flex;justify-content:center;padding:4px 0 8px">
        <button class="btn btn-tint" id="lobbyRefresh" style="width:auto;padding:6px 18px">⟳ ${esc(t('refresh'))}</button>
      </div>
    </div>
    <div class="empty-note" style="padding-top:6px">🌐 ${esc(t('show_in_lobby'))}: ${esc(t('tab_lobby'))}</div>`;

  setScreen(`
    <div class="header">
      <button class="h-btn" data-back><svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></button>
      <div class="h-title">${esc(t('party_title'))}</div>
    </div>
    <div class="page">
      ${tabs}
      ${tab === 'play' ? playTab : lobbyTab}
    </div>`);

  bindBack();
  $('#partyTabs').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    haptic('light');
    S.partyTab = b.dataset.tab;
    renderParty();
  });

  if (tab === 'play') {
    $('#modeSeg').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      haptic('light');
      S.partyMode = b.dataset.mode;
      renderParty();
    });
    $('#pubSeg').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      haptic('light');
      S.partyPublic = Number(b.dataset.pub);
      renderParty();
    });
    $('#createRoom').addEventListener('click', async () => {
      if (S.busy) return;
      S.busy = true;
      try {
        const res = await apiCall('roomCreate', {
          lang: S.lang,
          mode: S.partyMode === 'custom' ? 'custom' : 'classic',
          isPublic: S.partyPublic === 0 ? 0 : 1,
        });
        haptic('notify', 'success');
        await openRoom(res.code);
      } catch (e) {
        if (e && e.parameters && e.parameters.code === 'NO_NICKNAME') { toast(t('need_nick')); nav('onboarding'); return; }
        apiErrToast(e);
      } finally { S.busy = false; }
    });
    const doJoin = () => {
      const code = $('#joinCode').value.trim().toUpperCase();
      if (!code) return;
      joinRoomFlow(code);
    };
    $('#joinBtn').addEventListener('click', doJoin);
    $('#joinCode').addEventListener('keydown', (e) => { if (e.key === 'Enter') doJoin(); });
  } else {
    $('#lobbyRefresh').addEventListener('click', () => { haptic('light'); fetchLobby(true); });
    $('#lobbyList').addEventListener('click', (e) => {
      const b = e.target.closest('[data-join]');
      if (!b) return;
      haptic('light');
      joinRoomFlow(b.dataset.join);
    });
    fetchLobby(false);
    S.lobbyTimer = setInterval(() => fetchLobby(false), 4000);
  }
}

function lobbyListHtml() {
  if (!S.lobbyRooms.length) {
    return `<div class="empty-note" style="padding:10px 4px">🗝 ${esc(t('lobby_empty'))}</div>`;
  }
  const meId = S.profile && S.profile.userId;
  return `<div class="list">${
    S.lobbyRooms.map((r) => `
      <div class="player-row">
        ${avatarHtml(r.hostId, r.hostNick, 38)}
        <div class="li-text">
          <div class="li-title">${esc(r.hostNick)}${r.hostId === meId ? ` <span style="color:var(--text-secondary)">· ${esc(t('lobby_you'))}</span>` : ''}</div>
          <div class="li-sub">${esc(r.code)} · ${esc(t('players_n', { n: r.players }))} · ${r.mode === 'custom' ? esc(t('mode_custom')) : esc(t('mode_classic'))} · ${r.lang === 'en' ? '🇬🇧' : '🇷🇺'}</div>
        </div>
        <button class="btn btn-tint" data-join="${esc(r.code)}" style="width:auto;padding:6px 16px">${esc(t('lobby_join'))}</button>
      </div>`).join('')
  }</div>`;
}

async function fetchLobby(manual) {
  if (S.lobbyBusy) return;
  S.lobbyBusy = true;
  try {
    const res = await apiCall('lobby', {});
    S.lobbyRooms = res.rooms || [];
    S.lobbySeenAt = Date.now();
    const el = $('#lobbyList');
    if (el && S.view === 'party') el.innerHTML = lobbyListHtml();
    if (manual && !S.lobbyRooms.length) toast(t('lobby_empty'));
  } catch (e) { if (manual) apiErrToast(e); }
  finally { S.lobbyBusy = false; }
}

/* ── Комната ── */
async function joinRoomFlow(code) {
  code = String(code || '').trim().toUpperCase().replace(/^ROOM_/, '');
  if (!code) return;
  try {
    const r = await apiCall('roomJoin', { code });
    toast(t('joined'));
    haptic('notify', 'success');
    await openRoom(r.code);
  } catch (e) {
    const c = e && e.parameters && e.parameters.code;
    if (c === 'NO_NICKNAME') { S.pendingRoom = code; toast(t('need_nick')); nav('onboarding'); return; }
    toast(c === 'ROOM_NOT_FOUND' ? t('room_not_found') : c === 'ROOM_FINISHED' ? t('room_finished_err') : (e && e.message) || t('err_net'));
    haptic('notify', 'error');
  }
}

async function openRoom(code) {
  try {
    const st = await apiCall('roomInfo', { code });
    S.chat = [];
    S.chatLastId = 0;
    S.unread = 0;
    S.room = st;
    S.roomSig = '';
    S.roomCur = '';
    S.chat = st.chat || [];
    S.chatLastId = st.chatLastId || 0;
    S.lastRoomRow = -1;
    nav('room');
    startPoll();
  } catch (e) {
    apiErrToast(e);
  }
}

function startPoll() {
  if (S.pollTimer) clearInterval(S.pollTimer);
  S.pollTimer = setInterval(pollRoom, 2000);
  pollRoom();
}

async function pollRoom() {
  if (!S.room || S.view !== 'room' || S.pollBusy) return;
  if (document.visibilityState === 'hidden') return;
  S.pollBusy = true;
  try {
    const st = await apiCall('roomInfo', { code: S.room.code, sinceChatId: S.chatLastId });
    mergeRoom(st);
  } catch (e) {
    const c = e && e.parameters && e.parameters.code;
    if (c === 'ROOM_NOT_FOUND') {
      if (S.pollTimer) { clearInterval(S.pollTimer); S.pollTimer = null; }
      toast(t('room_not_found'));
      goHome();
    }
  } finally { S.pollBusy = false; }
}

function mergeRoom(st) {
  // чат-дельта — сразу дорисовываем открытый чат (иначе новые сообщения
  // появлялись только после своего сообщения)
  let chatChanged = false;
  if (st.chat && st.chat.length) {
    const me = S.profile && S.profile.userId;
    for (const m of st.chat) {
      if (!S.chat.some((x) => x.id === m.id)) {
        S.chat.push(m);
        if (m.userId !== me) {
          chatChanged = true;
          if (S.chatOpen) renderChatMessages();
          else S.unread++;
        }
      }
    }
    S.chat.sort((a, b) => a.id - b.id);
  }
  if (st.chatLastId != null) S.chatLastId = st.chatLastId;

  // pill: кто вышел / кто присоединился (сравниваем с прошлым составом)
  detectRosterChanges(st);

  const sig = JSON.stringify([st.status, st.opponents, st.me, st.results, st.hostId, st.mode, st.roundNo, st.setterId, st.hint, st.word, st.lastRound, st.myPoints]);
  const prevStatus = S.room.status;
  S.room = { ...S.room, ...st, chat: S.chat };
  if (chatChanged) updateChatBadge();
  if (sig !== S.roomSig) {
    S.roomSig = sig;
    if (st.status === 'FINISHED' && prevStatus !== 'FINISHED') {
      haptic('notify', 'success');
      if (S.pollTimer) { clearInterval(S.pollTimer); S.pollTimer = null; }
      if (S.chatOpen) closeChat();
    }
    renderRoom(false);
    updateChatBadge();
  }
}

// Появление/уход игроков: в лобби список живой, в раунде уход = GAVE_UP
function detectRosterChanges(st) {
  if (!S.room || !st.opponents) return;
  const prev = S.room.opponents || [];
  const prevById = {};
  prev.forEach((p) => { prevById[p.userId] = p; });
  const nowList = st.opponents;
  for (const p of prev) {
    const cur = nowList.find((x) => x.userId === p.userId);
    if (!cur) {
      pillFor(p.userId, p.nickname, t('pill_left', { name: p.nickname }));
    } else if (cur.status === 'GAVE_UP' && p.status !== 'GAVE_UP') {
      pillFor(p.userId, p.nickname, t('pill_left', { name: p.nickname }));
    }
  }
  if (st.status === 'WAITING' && prev.length) {
    for (const p of nowList) {
      if (!prevById[p.userId]) {
        pillFor(p.userId, p.nickname, t('pill_joined', { name: p.nickname }));
      }
    }
  }
}

function oppStatus(p) {
  if (p.status === 'WON') return `<span class="opp-status done">${esc(t('st_WON'))} · ${p.attemptsCount}/6</span>`;
  if (p.status === 'LOST') return `<span class="opp-status done">${esc(t('st_LOST'))}</span>`;
  if (p.status === 'GAVE_UP') return `<span class="opp-status done">${esc(t('st_GAVE_UP'))}</span>`;
  return `<span class="opp-status">${p.attemptsCount}/6 · ${esc(t('st_PLAYING'))}</span>`;
}

function renderRoom(isNav) {
  const r = S.room;
  if (!r) return;
  const isHost = r.hostId === (S.profile && S.profile.userId);
  const meDone = r.me && (r.me.status === 'WON' || r.me.status === 'LOST' || r.me.status === 'GAVE_UP');
  const kbLang = r.lang === 'en' ? 'en' : 'ru';
  const custom = r.mode === 'custom';
  const amSetter = custom && r.setterId === (S.profile && S.profile.userId);
  // «слово уже загадано»: у угадывающих маркер — непустая подсказка; сам автор видит своё слово
  const wordIsSet = custom ? !!(r.hint && r.hint.length) || (amSetter && r.word) : true;
  const showKb = r.status === 'IN_PROGRESS' && !meDone && !(custom && (amSetter || !wordIsSet));

  let body = '';

  if (r.status === 'WAITING') {
    body = `
      <div class="island">
        <div class="code-box" id="copyCode"><div class="code-val">${esc(r.code)}</div></div>
        <div class="empty-note" style="padding:0 16px 12px">${esc(t('code_hint'))}</div>
        <div style="padding:0 16px 14px"><button class="btn btn-tint" id="inviteBtn">📤 ${esc(t('invite'))}</button></div>
      </div>
      <div class="island">
        <div class="island-title">${esc(t('players'))} · ${1 + (r.opponents || []).length}</div>
        <div class="list">
          ${[{ userId: S.profile.userId, nickname: (S.profile.nickname || '') + ' ' + t('you'), status: r.me ? r.me.status : 'PLAYING' },
             ...(r.opponents || [])].map((p) => `
            <div class="player-row">
              ${avatarHtml(p.userId, p.nickname, 38)}
              <div class="li-text"><div class="li-title">${esc(p.nickname)}</div></div>
              ${p.userId === r.hostId ? `<span class="badge">👑 ${esc(t('host'))}</span>` : ''}
              <span class="badge gray">${esc((t('st_' + (p.status || 'PLAYING')) || ''))}</span>
            </div>`).join('')}
        </div>
      </div>
      ${isHost ? `
      <div class="island" style="padding:14px 16px">
        <div class="field-label" style="margin-top:0">${esc(t('round_lang'))}</div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="badge green">${r.lang === 'en' ? '🇬🇧 ' + esc(t('words_en')) : '🇷🇺 ' + esc(t('words_ru'))}</span>
          <span class="badge ${custom ? '' : 'gray'}">${custom ? esc(t('mode_custom')) : esc(t('mode_classic'))}</span>
        </div>
        ${custom ? `<div class="empty-note" style="padding:8px 0 0;text-align:left">🎯 ${esc(t('mode_custom_sub'))}</div>` : ''}
        <div style="height:12px"></div>
        <button class="btn btn-primary" id="startRound" ${(1 + (r.opponents || []).length) < 2 ? 'disabled' : ''}>▶︎ ${esc(t('start_round'))}</button>
        ${(1 + (r.opponents || []).length) < 2 ? `<div class="empty-note" style="padding:8px 0 0">${esc(t('need_two'))}</div>` : ''}
      </div>` : `
      <div class="center-wrap">⏳ ${esc(t('waiting_host'))}</div>`}
      <div style="padding:0 10px"><button class="btn btn-danger" id="leaveRoom">${esc(t('leave'))}</button></div>`;
  } else if (r.status === 'IN_PROGRESS') {
    // ── шапка круга для custom ──
    const roundChip = custom ? `<div style="text-align:center;font-size:12px;color:var(--text-secondary);padding:2px 0 6px">🎯 ${esc(t('round_n', { n: r.roundNo || 1 }))}</div>` : '';

    // ── custom: слово ещё не загадано ──
    let customTop = '';
    if (custom && !wordIsSet) {
      if (amSetter) {
        customTop = `
        <div class="island" style="padding:14px 16px">
          <div class="island-title">🎯 ${esc(t('set_word_title'))}</div>
          <input class="input" id="setWord" maxlength="5" placeholder="${esc(t('set_word_ph'))}" autocapitalize="characters" autocomplete="off" style="text-transform:uppercase;letter-spacing:4px;font-weight:700;text-align:center">
          <input class="input" id="setHint" maxlength="80" placeholder="${esc(t('set_hint_ph'))}" style="margin-top:8px">
          <button class="btn btn-primary" id="setWordBtn" style="margin-top:10px">${esc(t('set_word_btn'))}</button>
        </div>
        ${r.lastRound ? `<div class="empty-note" style="padding-top:4px">${esc(t('last_word_was', { word: (r.lastRound.word || '•••••') }))}</div>` : ''}`;
      } else {
        customTop = `
        ${r.lastRound ? statusBanner('wait', t('last_word_was', { word: r.lastRound.word || '•••••' })) : ''}
        <div class="empty-note" style="padding-top:6px">${esc(t('setter_wait', { name: r.setterNick || '…' }))}</div>`;
      }
    }

    // ── custom: подсказка над сеткой ──
    const hintBanner = custom && wordIsSet ? `
      <div class="hint-banner">
        <div class="hint-text">${esc(t('hint_of', { hint: r.hint || '…' }))}</div>
        <div class="hint-sub">${esc(t('set_by', { name: r.setterNick || '…' }))} · ${esc(t('round_n', { n: r.roundNo || 1 }))}</div>
      </div>` : '';

    // ── custom: я загадывающий, слово введено → карточка вместо сетки ──
    const setterCard = custom && amSetter && wordIsSet ? `
      <div class="island" style="padding:14px 16px;text-align:center">
        <div class="island-title">🎯 ${esc(t('you_set', { word: r.word || '•••••' }))}</div>
        <div class="empty-note" style="padding:4px 0 0">${esc(t('players_guessing'))}</div>
      </div>` : '';
    body = `
      <div class="opp-strip" id="oppStrip">
        ${(r.opponents || []).map((p) => `
          <div class="opp-card">
            <div class="opp-top">
              ${avatarHtml(p.userId, p.nickname, 26)}
              <div style="min-width:0">
                <div class="opp-name">${esc(p.nickname)}${custom && p.userId === r.setterId ? ' 🎯' : ''}</div>
                ${oppStatus(p)}
              </div>
            </div>
            ${(p.colors || []).slice(-6).map((row) => `<div class="mini-row">${row.map((c) => `<span class="mini ${String(c).toLowerCase()}"></span>`).join('')}</div>`).join('') || `<div class="mini-row">${'<span class="mini"></span>'.repeat(5)}</div>`}
          </div>`).join('')}
      </div>
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center">
        ${roundChip}
        ${customTop}
        ${hintBanner}
        ${setterCard}
        ${meDone ? statusBanner(r.me.status === 'WON' ? 'win' : 'wait', r.me.status === 'WON' ? t('you_won') : (r.me.status === 'GAVE_UP' ? t('surrender_ok') : t('you_lost', { word: r.word || '•••••' }))) : ''}
        ${meDone ? `<div class="empty-note" style="padding-top:4px">⏳ ${esc(t('waiting_others'))}</div>` : ''}
        ${!custom || (wordIsSet && !amSetter) ? `<div id="roomBoard">${boardHtml(r.myAttempts, r.myColors, S.roomCur, { small: (r.opponents || []).length > 3, animateRow: S.lastRoomRow })}</div>` : ''}
      </div>
      ${showKb ? `<div id="roomKb">${keyboardHtml(kbLang, keyStatesFrom(r.myAttempts, r.myColors), kbLang === 'ru' ? 'ВОД' : 'ENTER')}</div>`
               : `<div style="padding:0 10px 4px"><button class="btn" id="leaveRoom2">${esc(t('leave'))}</button></div>`}`;
  } else if (r.status === 'FINISHED') {
    const res = r.results || { podium: [], rest: [], word: r.word, custom: false };
    const medals = ['🥇', '🥈', '🥉'];
    body = `
      <div class="island">
        <div class="island-title">🏁 ${esc(t('results'))}${res.custom ? ' · 🎯' : ''}</div>
        <div class="podium">
          ${res.podium.slice(0, 3).map((p, i) => `
            <div class="pod" style="${i === 0 ? 'order:2' : i === 1 ? 'order:1' : 'order:3'}">
              <div class="pod-place">${medals[i]}</div>
              ${avatarHtml(p.userId, p.nickname, i === 0 ? 56 : 46)}
              <div class="pod-name">${esc(p.nickname)}</div>
              <div class="pod-guesses">${res.custom ? `${p.points || 0} ${esc(t('points'))}` : `${p.guesses}/6`}</div>
            </div>`).join('')}
        </div>
        ${(res.rest || []).length ? `<div class="list">${res.rest.map((p) => `
          <div class="player-row">
            ${avatarHtml(p.userId, p.nickname, 32)}
            <div class="li-text"><div class="li-title">${esc(p.nickname)}</div></div>
            <span class="badge gray">${esc(t('st_' + p.status) || p.status)}</span>
            <span class="li-value">${p.guesses}/6</span>
          </div>`).join('')}</div>` : ''}
        <div style="text-align:center;padding:10px 16px 16px;font-weight:600">${esc(t('word_was', { word: res.word || '•••••' }))}</div>
      </div>
      <div class="btn-row">
        <button class="btn btn-primary" id="againRoom">${esc(t('new_room'))}</button>
        <button class="btn" id="homeRoom">${esc(t('home_btn'))}</button>
      </div>
      <div class="empty-note">💬 ${esc(t('chat_closed'))}</div>`;
  }

  const headerActions = [];
  if (r.status === 'WAITING' || r.status === 'IN_PROGRESS') headerActions.push(`<button class="h-action" id="chatBtn">💬 ${esc(t('chat'))}</button>`);
  if (r.status === 'IN_PROGRESS' && isHost) headerActions.push(`<button class="h-btn" id="finishBtn" title="${esc(t('finish'))}"><svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg></button>`);

  setScreen(`
    <div class="header">
      <button class="h-btn" data-back><svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></button>
      <div class="h-title">${esc(t('room_title'))} <span style="color:var(--primary)">${esc(r.code)}</span></div>
      ${headerActions.join('')}
    </div>
    <div class="page" style="display:flex;flex-direction:column;position:relative">
      ${body}
    </div>`, { back: !isNav, silent: !isNav });

  bindBack();

  // обработчики по статусам
  if (r.status === 'WAITING') {
    const cc = $('#copyCode');
    if (cc) cc.addEventListener('click', () => copyText(r.code));
    const ib = $('#inviteBtn');
    if (ib) ib.addEventListener('click', () => {
      haptic('light');
      openRoomInviteSheet(r.code);
    });
    const rl = $('#roomLang');
    if (rl) rl.addEventListener('click', () => {}); // язык задаётся при создании (инфо)
    const sr = $('#startRound');
    if (sr) sr.addEventListener('click', async () => {
      if (S.busy) return;
      S.busy = true;
      try {
        await apiCall('roomStart', { code: r.code });
        haptic('notify', 'success');
        const st = await apiCall('roomInfo', { code: r.code });
        mergeRoom(st);
      } catch (e) { apiErrToast(e); }
      finally { S.busy = false; }
    });
    const lv = $('#leaveRoom');
    if (lv) lv.addEventListener('click', async () => {
      try {
        await apiCall('roomLeave', { code: r.code });
        toast(t('left_room'));
        await refreshState();
        goHome();
      } catch (e) { apiErrToast(e); }
    });
  } else if (r.status === 'IN_PROGRESS') {
    if (showKb) {
      bindKeyboard('roomKb', {
        get: () => S.roomCur,
        set: (v) => { S.roomCur = v; },
        submit: submitRoom,
        refresh: () => {
          const b = $('#roomBoard');
          if (b) b.innerHTML = boardHtml(r.myAttempts, r.myColors, S.roomCur, { small: (r.opponents || []).length > 3, animateRow: -1 });
          const kb = $('#roomKb');
          if (kb) kb.innerHTML = keyboardHtml(kbLang, keyStatesFrom(r.myAttempts, r.myColors), kbLang === 'ru' ? 'ВВОД' : 'ENTER');
        },
      });
    }
    // custom: форма «загадай слово»
    const swb = $('#setWordBtn');
    if (swb) {
      swb.addEventListener('click', submitSetWord);
      const sw = $('#setWord');
      const sh = $('#setHint');
      if (sw) sw.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitSetWord(); });
      if (sh) sh.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitSetWord(); });
    }
    const fb = $('#finishBtn');
    if (fb) fb.addEventListener('click', async () => {
      if (S.busy) return;
      S.busy = true;
      try { await apiCall('roomLeave', { code: '' }); } catch (e) {}
      try { await apiCall('roomFinish', { code: r.code }); } catch (e) { apiErrToast(e); }
      S.busy = false;
      pollRoom();
    });
    const lv2 = $('#leaveRoom2');
    if (lv2) lv2.addEventListener('click', async () => {
      try { await apiCall('roomLeave', { code: r.code }); toast(t('surrender_ok')); pollRoom(); }
      catch (e) { apiErrToast(e); }
    });
  } else if (r.status === 'FINISHED') {
    const ar = $('#againRoom');
    if (ar) ar.addEventListener('click', async () => {
      try {
        const res = await apiCall('roomCreate', { lang: r.lang });
        await openRoom(res.code);
      } catch (e) { apiErrToast(e); }
    });
    const hr = $('#homeRoom');
    if (hr) hr.addEventListener('click', goHome);
  }

  const cb = $('#chatBtn');
  if (cb) cb.addEventListener('click', () => { S.unread = 0; openChat(); });
  updateChatBadge();
  if (S.chatOpen && !$('#chatSheet')) openChat(); // чат переживает ререндер
}

async function submitRoom() {
  const r = S.room;
  const word = S.roomCur;
  if (!r || word.length !== 5 || S.busy) return;
  S.busy = true;
  try {
    const res = await apiCall('roomGuess', { code: r.code, word });
    if (res && res.duplicate) {
      toast(t('guess_error'));
      S.busy = false;
      return;
    }
    const wasRow = (r.myAttempts || []).length;
    r.myAttempts = [...(r.myAttempts || []), word];
    r.myColors = [...(r.myColors || []), res.colors];
    r.me = { status: res.status, attemptsCount: res.attempts };
    S.roomCur = '';
    S.lastRoomRow = wasRow;
    if (res.status === 'WON') haptic('notify', 'success');
    else if (res.status === 'LOST') haptic('notify', 'error');
    else haptic('medium');
    renderRoom(false);
    pollRoom();
  } catch (e) {
    haptic('notify', 'error');
    const code = e && e.parameters && e.parameters.code;
    toast(code === 'BAD_WORD' ? t('guess_error')
      : code === 'SETTER_CANT_GUESS' ? t('err_setter_guess')
      : code === 'WORD_NOT_SET' ? t('err_word_not_set')
      : (e && e.message) || t('err_net'));
  } finally { S.busy = false; }
}

// custom: загадывающий отправляет слово + подсказку
async function submitSetWord() {
  const r = S.room;
  if (!r || S.busy) return;
  const w = ($('#setWord') || {}).value || '';
  const h = ($('#setHint') || {}).value || '';
  if (w.replace(/\s/g, '').length !== 5) { toast(t('guess_error')); haptic('notify', 'error'); return; }
  if (!h.trim()) { toast(t('err_hint_required')); haptic('notify', 'error'); return; }
  S.busy = true;
  try {
    await apiCall('roomSet', { code: r.code, word: w, hint: h });
    haptic('notify', 'success');
    pollRoom();
  } catch (e) {
    haptic('notify', 'error');
    apiErrToast(e);
  } finally { S.busy = false; }
}

function copyText(text) {
  const done = () => { toast(t('copied')); haptic('light'); };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else fallbackCopy(text, done);
}
function fallbackCopy(text, done) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    done();
  } catch (e) { toast(text); }
}

/* ── Чат (bottom sheet) ── */
function chatSheetHtml() {
  return `
  <div class="sheet-backdrop" id="sheetBack"></div>
  <div class="sheet" id="chatSheet">
    <div class="sheet-header">
      <div class="sheet-title">💬 ${esc(t('chat'))}</div>
      <button class="h-btn" id="chatRefresh" title="${esc(t('refresh'))}"><svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-8 8s3.57 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg></button>
      <button class="h-btn" id="chatClose"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
    </div>
    <div class="sheet-note">${esc(t('chat_hint'))}</div>
    <div class="chat-list" id="chatList"></div>
    <div class="chat-composer">
      <input class="chat-input" id="chatInput" maxlength="200" placeholder="${esc(t('msg_ph'))}">
      <button class="send-btn" id="chatSend"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
    </div>
  </div>`;
}

function renderChatMessages() {
  const list = $('#chatList');
  if (!list) return;
  const me = S.profile && S.profile.userId;
  const sorted = S.chat.slice().sort((a, b) => a.id - b.id);
  list.innerHTML = sorted.map((m) => `
    <div class="msg ${m.userId === me ? 'mine' : 'theirs'}">
      ${m.userId !== me ? `<div class="msg-nick">${esc(m.nickname)}</div>` : ''}
      <div class="msg-text">${esc(m.text)}</div>
      <div class="msg-time">${fmtTime(m.ts)}</div>
    </div>`).join('');
  scrollChat();
}
// платформа отдаёт timestamp как Date(ISO) или unix-секунды — парсим robustly
function fmtTime(ts) {
  let d;
  if (typeof ts === 'number') d = new Date(ts < 1e12 ? ts * 1000 : ts);
  else if (ts) d = new Date(ts);
  else d = new Date();
  if (isNaN(d.getTime())) return '';
  return d.toLocaleTimeString(S.lang === 'ru' ? 'ru-RU' : 'en-US', { hour: '2-digit', minute: '2-digit' });
}
function scrollChat() {
  const list = $('#chatList');
  if (list) list.scrollTop = list.scrollHeight;
}

function openChat() {
  if (!S.room || S.room.status === 'FINISHED') { toast(t('chat_closed')); return; }
  if ($('#chatSheet')) return;
  const scr = $('#stage').lastElementChild;
  const wrap = document.createElement('div');
  wrap.innerHTML = chatSheetHtml();
  scr.appendChild(wrap);
  S.chatOpen = true;
  renderChatMessages();
  updateChatBadge();
  requestAnimationFrame(() => {
    $('#sheetBack').classList.add('open');
    $('#chatSheet').classList.add('open');
  });
  $('#sheetBack').addEventListener('click', closeChat);
  $('#chatClose').addEventListener('click', closeChat);
  $('#chatRefresh').addEventListener('click', () => {
    const btn = $('#chatRefresh');
    if (btn) btn.classList.add('spinning');
    pollRoom().finally(() => { const b = $('#chatRefresh'); if (b) b.classList.remove('spinning'); });
  });
  $('#chatSend').addEventListener('click', sendChat);
  $('#chatInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') sendChat(); });
  setTimeout(() => { const i = $('#chatInput'); if (i) i.focus(); }, 350);
}

function closeChat() {
  const b = $('#sheetBack');
  const s = $('#chatSheet');
  if (!s) return;
  b.classList.remove('open');
  s.classList.remove('open');
  S.chatOpen = false;
  setTimeout(() => { const w = s.parentElement; if (w) w.remove(); }, 360);
}

async function sendChat() {
  const inp = $('#chatInput');
  const text = (inp && inp.value || '').trim();
  if (!text || !S.room || S.busy) return;
  S.busy = true;
  try {
    const res = await apiCall('roomChat', { code: S.room.code, text, sinceChatId: S.chatLastId });
    if (res.chat && res.chat.length) {
      for (const m of res.chat) if (!S.chat.some((x) => x.id === m.id)) S.chat.push(m);
    }
    if (res.chatLastId != null) S.chatLastId = res.chatLastId;
    renderChatMessages();
    if (inp) { inp.value = ''; inp.focus(); }
    haptic('light');
  } catch (e) {
    const c = e && e.parameters && e.parameters.code;
    toast(c === 'CHAT_CLOSED' ? t('chat_closed') : (e && e.message) || t('err_net'));
  } finally { S.busy = false; }
}

function updateChatBadge() {
  const cb = $('#chatBtn');
  if (!cb) return;
  const old = $('#hdrBadge');
  if (old) old.remove();
  if (S.unread > 0 && S.room && S.room.status !== 'FINISHED') {
    const b = document.createElement('span');
    b.id = 'hdrBadge';
    b.style.cssText = 'background:var(--danger);color:#fff;border-radius:9px;padding:1px 6px;font-size:11px';
    b.textContent = S.unread;
    cb.appendChild(b);
  }
}

/* ── Лидерборд ── */
async function renderLeaderboard() {
  setScreen(`
    <div class="header">
      <button class="h-btn" data-back><svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></button>
      <div class="h-title">🏆 ${esc(t('lb_title'))}</div>
    </div>
    <div class="page"><div class="center-wrap"><div class="spin"></div></div></div>`);
  bindBack();
  try {
    const res = await apiCall('leaderboard', { lang: S.lang });
    const medals = ['🥇', '🥈', '🥉'];
    const html = res.top.length ? `
      <div class="island"><div class="list">
        ${res.top.map((p) => `
          <div class="player-row">
            <div style="width:26px;text-align:center;font-weight:700">${p.place <= 3 ? medals[p.place - 1] : p.place}</div>
            ${avatarHtml(p.userId, p.name, 38)}
            <div class="li-text"><div class="li-title">${esc(p.name)}</div>
              <div class="li-sub">${esc(t('games'))}: ${p.gamesPlayed || 0}</div></div>
            <span class="badge green">🏆 ${p.wins || 0}</span>
            <span class="badge yellow">🔥 ${p.streak || 0}</span>
            <button class="info-btn" data-user="${p.userId}" data-name="${esc(p.name)}" title="${esc(t('pi_title'))}">
              <svg viewBox="0 0 24 24"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/></svg>
            </button>
          </div>`).join('')}
      </div></div>` : `<div class="empty-note">${esc(t('lb_empty'))}</div>`;
    const page = $('.page');
    page.innerHTML = html;
    $$('.info-btn', page).forEach((b) => {
      b.addEventListener('click', () => { haptic('light'); openProfileSheet(Number(b.dataset.user)); });
    });
  } catch (e) {
    apiErrToast(e);
    goBack();
  }
}

/* ── Щит «Пригласить друзей» в лобби комнаты: из списка друзей + ссылка ── */
async function openRoomInviteSheet(code) {
  if ($('#invSheet')) return;
  const scr = $('#stage').lastElementChild;
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div class="sheet-backdrop open" id="invBack"></div>
    <div class="sheet sheet-auto open" id="invSheet">
      <div class="sheet-header">
        <div class="sheet-title">👥 ${esc(t('inv_title'))}</div>
        <button class="h-btn" id="invClose"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
      </div>
      <div style="padding:12px 16px 4px"><button class="btn btn-tint" id="invShare">${esc(t('inv_share'))}</button></div>
      <div id="invList"><div class="center-wrap"><div class="spin"></div></div></div>
    </div>`;
  scr.appendChild(wrap);

  const closeSheet = () => {
    const s = $('#invSheet'), b = $('#invBack');
    if (!s) return;
    s.classList.remove('open');
    b.classList.remove('open');
    setTimeout(() => { const w = s.parentElement; if (w) w.remove(); }, 360);
  };
  $('#invBack').addEventListener('click', closeSheet);
  $('#invClose').addEventListener('click', closeSheet);
  $('#invShare').addEventListener('click', () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent('https://t.me/wordslebot?startapp=room_' + code)}&text=${encodeURIComponent(t('invite_text', { code }))}`;
    try { tg.openTelegramLink(url); } catch (e) {}
  });

  let fr;
  try {
    fr = await apiCall('friends', { action: 'list' });
  } catch (e) {
    closeSheet();
    apiErrToast(e);
    return;
  }
  const listEl = $('#invList');
  if (!listEl) return;
  const friends = (fr && fr.friends) || [];

  if (!friends.length) {
    listEl.innerHTML = `<div class="empty-note" style="padding-bottom:20px">${esc(t('inv_none'))}</div>`;
    return;
  }

  listEl.innerHTML = `<div class="island" style="margin:10px 10px 16px"><div class="list">
    ${friends.map((f) => `
      <div class="player-row">
        ${avatarHtml(f.userId, f.name, 38)}
        <div class="li-text"><div class="li-title">${esc(f.name)}</div></div>
        <button class="btn btn-tint inv-mini" data-fid="${f.userId}">${esc(t('invite_btn'))}</button>
      </div>`).join('')}
  </div></div>`;

  $$('.inv-mini', listEl).forEach((b) => {
    b.addEventListener('click', async () => {
      if (b.disabled || S.busy) return;
      S.busy = true;
      try {
        await apiCall('friends', { action: 'invite', friendId: Number(b.dataset.fid), code });
        haptic('notify', 'success');
        toast(t('invite_sent'));
        b.disabled = true;
        b.textContent = '✓';
      } catch (e) {
        apiErrToast(e);
      } finally { S.busy = false; }
    });
  });
}

/* ── Щит профиля (ⓘ на лидерборде): инфо + запрос в друзья ── */
async function openProfileSheet(userId) {
  userId = Math.floor(Number(userId) || 0);
  if (!userId) return;
  if ($('#pSheet')) return;
  const scr = $('#stage').lastElementChild;
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div class="sheet-backdrop open" id="pBack"></div>
    <div class="sheet sheet-auto open" id="pSheet">
      <div class="sheet-header">
        <div class="sheet-title">👤 ${esc(t('pi_title'))}</div>
        <button class="h-btn" id="pClose"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
      </div>
      <div class="profile-body" id="pBody"><div class="center-wrap"><div class="spin"></div></div></div>
    </div>`;
  scr.appendChild(wrap);

  const closeSheet = () => {
    const s = $('#pSheet'), b = $('#pBack');
    if (!s) return;
    s.classList.remove('open');
    b.classList.remove('open');
    setTimeout(() => { const w = s.parentElement; if (w) w.remove(); }, 360);
  };
  $('#pBack').addEventListener('click', closeSheet);
  $('#pClose').addEventListener('click', closeSheet);

  let p;
  try {
    p = await apiCall('friends', { action: 'profile', userId });
  } catch (e) {
    closeSheet();
    apiErrToast(e);
    return;
  }

  const st = p.stats || {};
  const wr = st.gamesPlayed ? Math.round(100 * (st.wins || 0) / st.gamesPlayed) : 0;
  const since = p.memberSince ? fmtDate(p.memberSince) : '—';
  const fs = p.friendState;
  const isSelf = fs === 'self';

  let btn = '';
  if (fs === 'none') {
    btn = `<button class="btn btn-primary fr-big" data-act="request">
      <svg class="tg-plane" viewBox="0 0 24 24"><path d="M9.04 15.51l-.38 5.35c.54 0 .78-.23 1.06-.51l2.55-2.44 5.28 3.87c.97.53 1.66.25 1.92-.9l3.48-16.3c.31-1.42-.51-1.98-1.45-1.63L1.36 10.24c-1.39.54-1.37 1.32-.24 1.67l5.2 1.62L18.2 6.03c.57-.38 1.09-.17.66.21L9.04 15.51z"/></svg>
      ${esc(t('btn_add_friend'))}</button>`;
  } else if (fs === 'outgoing') {
    btn = `<button class="btn fr-big" disabled>${esc(t('btn_req_sent'))} ✓</button>`;
  } else if (fs === 'incoming') {
    btn = `<button class="btn btn-green fr-big" data-act="accept">${esc(t('btn_accept_fr'))}</button>`;
  } else if (fs === 'friends') {
    btn = `<button class="btn btn-tint fr-big" data-act="write">💬 ${esc(t('btn_write'))}</button>`;
  }

  $('#pBody').innerHTML = `
    <div class="profile-head">
      ${avatarHtml(p.userId, p.name, 64)}
      <div class="profile-head-name">${esc(p.name)}</div>
      <div class="profile-head-sub">${esc(t('pi_since'))} ${esc(since)} · ${p.lang === 'en' ? '🇬🇧' : '🇷🇺'}</div>
    </div>
    <div class="stats-row" style="padding:0 8px 14px">
      <div class="stat"><div class="stat-num">${st.gamesPlayed || 0}</div><div class="stat-label">${esc(t('games'))}</div></div>
      <div class="stat"><div class="stat-num">${st.wins || 0}</div><div class="stat-label">${esc(t('wins'))}</div></div>
      <div class="stat"><div class="stat-num">${wr}%</div><div class="stat-label">${esc(t('pi_winrate'))}</div></div>
      <div class="stat"><div class="stat-num">${st.streak || 0}</div><div class="stat-label">${esc(t('streak'))}</div></div>
    </div>
    ${isSelf ? '' : btn}`;

  const frBtn = $('.fr-big', $('#pBody'));
  if (frBtn) frBtn.addEventListener('click', async () => {
    const act = frBtn.dataset.act;
    if (S.busy) return;
    S.busy = true;
    try {
      if (act === 'request') {
        await apiCall('friends', { action: 'request', friendId: p.userId });
        haptic('notify', 'success');
        toast(t('fr_sent_ok'));
        frBtn.disabled = true;
        frBtn.classList.remove('btn-primary');
        frBtn.innerHTML = esc(t('btn_req_sent')) + ' ✓';
      } else if (act === 'accept') {
        await apiCall('friends', { action: 'accept', friendId: p.userId });
        haptic('notify', 'success');
        toast(t('fr_accept_ok'));
        frBtn.classList.remove('btn-green');
        frBtn.classList.add('btn-tint');
        frBtn.dataset.act = 'write';
        frBtn.innerHTML = '💬 ' + esc(t('btn_write'));
        friendPollTick();
      } else if (act === 'write') {
        closeSheet();
        openFriendChat({ userId: p.userId, name: p.name });
      }
    } catch (e) {
      apiErrToast(e);
    } finally { S.busy = false; }
  });
}

function fmtDate(ts) {
  let d;
  if (typeof ts === 'number') d = new Date(ts < 1e12 ? ts * 1000 : ts);
  else if (ts) d = new Date(ts);
  else return '—';
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(S.lang === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* ── Друзья ── */
async function renderFriends() {
  setScreen(`
    <div class="header">
      <button class="h-btn" data-back><svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></button>
      <div class="h-title">👥 ${esc(t('friends_title'))}</div>
    </div>
    <div class="page" id="friendsPage"><div class="center-wrap"><div class="spin"></div></div></div>`);
  bindBack();
  await loadFriendsData();
}

async function loadFriendsData() {
  try {
    const res = await apiCall('friends', { action: 'list' });
    S.friends = res.friends || [];
    S.frIn = res.incoming || [];
    S.frOut = res.outgoing || [];
    if (S.view === 'friends') renderFriendsData();
    updateFriendsBadge();
  } catch (e) {
    if (S.view === 'friends') {
      const page = $('#friendsPage');
      if (page) page.innerHTML = `<div class="empty-note">${esc(t('err_net'))}</div>`;
    }
  }
}

function renderFriendsData() {
  const page = $('#friendsPage');
  if (!page) return;
  const unreadFor = (id) => S.unreadByPeer[id] || 0;

  const incHtml = S.frIn.length ? `
    <div class="island"><div class="island-title">${esc(t('fr_incoming'))} · ${S.frIn.length}</div><div class="list">
      ${S.frIn.map((u) => `
        <div class="player-row">
          ${avatarHtml(u.userId, u.name, 38)}
          <div class="li-text"><div class="li-title">${esc(u.name)}</div></div>
          <button class="round-btn green" data-act="accept" data-id="${u.userId}" title="${esc(t('fr_accept'))}"><svg viewBox="0 0 24 24"><path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20 8l-1.4-1.4z"/></svg></button>
          <button class="round-btn red" data-act="decline" data-id="${u.userId}" title="${esc(t('fr_decline'))}"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
        </div>`).join('')}
    </div></div>` : '';

  const outHtml = S.frOut.length ? `
    <div class="island"><div class="island-title">${esc(t('fr_outgoing'))}</div><div class="list">
      ${S.frOut.map((u) => `
        <div class="player-row">
          ${avatarHtml(u.userId, u.name, 34)}
          <div class="li-text"><div class="li-title">${esc(u.name)}</div><div class="li-sub">${esc(t('fr_sent_ok'))}</div></div>
          <button class="btn-mini" data-act="decline" data-id="${u.userId}">${esc(t('fr_cancel'))}</button>
        </div>`).join('')}
    </div></div>` : '';

  const frHtml = S.friends.length ? `
    <div class="island"><div class="island-title">${esc(t('fr_my'))} · ${S.friends.length}</div><div class="list">
      ${S.friends.map((u) => {
        const un = unreadFor(u.userId);
        return `
        <div class="player-row tappable-row" data-fid="${u.userId}" data-fname="${esc(u.name)}">
          ${avatarHtml(u.userId, u.name, 44)}
          <div class="li-text"><div class="li-title">${esc(u.name)}</div><div class="li-sub">${u.lang === 'en' ? '🇬🇧' : '🇷🇺'} ${esc(t('friends_sub'))}</div></div>
          ${un ? `<span class="badge red">${un > 99 ? '99+' : un}</span>` : ''}
          <div class="li-chevron"></div>
        </div>`;
      }).join('')}
    </div></div>` : `<div class="empty-note">👥 ${esc(t('friends_empty'))}</div>`;

  page.innerHTML = incHtml + outHtml + frHtml;

  // заявки: принять / отклонить / отменить
  $$('[data-act]', page).forEach((b) => {
    b.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = Number(b.dataset.id);
      const act = b.dataset.act;
      try {
        if (act === 'accept') {
          await apiCall('friends', { action: 'accept', friendId: id });
          toast(t('fr_accept_ok'));
          haptic('notify', 'success');
        } else {
          await apiCall('friends', { action: 'decline', friendId: id });
          haptic('light');
        }
      } catch (e2) {
        if (e2 && e2.parameters && e2.parameters.code === 'NO_REQUEST') toast(t('fr_gone'));
        else apiErrToast(e2);
      }
      await loadFriendsData();
    });
  });

  // открыть чат с другом
  $$('.tappable-row', page).forEach((row) => {
    row.addEventListener('click', () => {
      haptic('light');
      openFriendChat({ userId: Number(row.dataset.fid), name: row.dataset.fname });
    });
  });
}

/* ── Личный чат с другом ── */
function openFriendChat(peer) {
  S.fchat = { peerId: peer.userId, peerName: peer.name || '?', msgs: [], lastId: 0 };
  delete S.unreadByPeer[peer.userId];
  saveUnread();
  updateFriendsBadge();
  nav('fchat');
}

function renderFchat() {
  const f = S.fchat;
  if (!f) { goBack(); return; }
  setScreen(`
    <div class="header">
      <button class="h-btn" data-back><svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></button>
      ${avatarHtml(f.peerId, f.peerName, 32)}
      <div class="h-title">${esc(f.peerName)}</div>
      <button class="h-btn" id="fInvite" title="${esc(t('invite_btn'))}"><svg viewBox="0 0 24 24"><path d="M21.58 16.09l-1.09-7.66A3.996 3.996 0 0 0 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 15.5h6l2.25 2.75c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91zM11 11H9v2H8v-2H6v-1h2V8h1v2h2v1zm4-1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg></button>
    </div>
    <div class="page fchat-page">
      <div class="chat-list" id="fchatList"></div>
      <div class="chat-composer">
        <input class="chat-input" id="fchatInput" maxlength="500" placeholder="${esc(t('msg_ph'))}">
        <button class="send-btn" id="fchatSend"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
      </div>
    </div>`);
  bindBack();

  $('#fInvite').addEventListener('click', async () => {
    if (S.busy || !S.fchat) return;
    S.busy = true;
    try {
      const res = await apiCall('friends', { action: 'invite', friendId: S.fchat.peerId });
      haptic('notify', 'success');
      toast(t('invite_sent') + ' · ' + res.code);
      mergeFchatMsgs([res.msg]);
      renderFchatMsgs();
    } catch (e) {
      const c = e && e.parameters && e.parameters.code;
      toast(c === 'NOT_FRIENDS' ? t('fr_only') : (e && e.message) || t('err_net'));
    } finally { S.busy = false; }
  });
  $('#fchatSend').addEventListener('click', sendFchat);
  $('#fchatInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') sendFchat(); });
  $('#fchatList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-room]');
    if (!btn) return;
    const code = btn.dataset.room;
    const mine = btn.dataset.mine === '1';
    if (mine) openRoom(code); else joinRoomFlow(code);
  });

  pollFchat();
  if (S.fchatTimer) clearInterval(S.fchatTimer);
  S.fchatTimer = setInterval(pollFchat, 2000);
}

function fchatMsgHtml(m) {
  const f = S.fchat;
  const mine = m.fromId === (S.profile && S.profile.userId);
  if (m.kind === 'invite') {
    return `<div class="msg ${mine ? 'mine' : 'theirs'} invite-msg">
      <div class="inv-card">
        <div class="inv-head">🎮 ${esc(t('invite_card'))}</div>
        <div class="inv-code">${esc(m.roomCode || '')}</div>
        <button class="btn btn-primary inv-btn" data-room="${esc(m.roomCode || '')}" data-mine="${mine ? 1 : 0}">${esc(mine ? t('invite_open') : t('invite_join'))}</button>
      </div>
      <div class="msg-time">${fmtTime(m.ts)}</div>
    </div>`;
  }
  return `<div class="msg ${mine ? 'mine' : 'theirs'}"><div class="msg-text">${esc(m.text)}</div><div class="msg-time">${fmtTime(m.ts)}</div></div>`;
}

function renderFchatMsgs() {
  const list = $('#fchatList');
  if (!list || !S.fchat) return;
  const sorted = S.fchat.msgs.slice().sort((a, b) => a.id - b.id);
  list.innerHTML = sorted.map(fchatMsgHtml).join('');
  list.scrollTop = list.scrollHeight;
}

function mergeFchatMsgs(rows) {
  const f = S.fchat;
  if (!f) return;
  let added = false;
  for (const m of rows || []) {
    if (!m || !m.id) continue;
    if (!f.msgs.some((x) => x.id === m.id)) { f.msgs.push(m); added = true; }
    if (m.id > f.lastId) f.lastId = m.id;
  }
  if (added) renderFchatMsgs();
}

async function pollFchat() {
  const f = S.fchat;
  if (!f || S.view !== 'fchat' || S.fchatBusy) return;
  if (document.visibilityState === 'hidden') return;
  S.fchatBusy = true;
  try {
    const res = await apiCall('friends', { action: 'chat', friendId: f.peerId, sinceId: f.lastId });
    mergeFchatMsgs(res.msgs);
  } catch (e) {
    const c = e && e.parameters && e.parameters.code;
    if (c === 'NOT_FRIENDS') {
      toast(t('fr_only'));
      goBack();
    }
  } finally { S.fchatBusy = false; }
}

async function sendFchat() {
  const inp = $('#fchatInput');
  const text = (inp && inp.value || '').trim();
  if (!text || !S.fchat || S.busy) return;
  S.busy = true;
  try {
    const res = await apiCall('friends', { action: 'send', friendId: S.fchat.peerId, text });
    mergeFchatMsgs([res.msg]);
    if (inp) { inp.value = ''; inp.focus(); }
    haptic('light');
  } catch (e) {
    const c = e && e.parameters && e.parameters.code;
    toast(c === 'NOT_FRIENDS' ? t('fr_only') : (e && e.message) || t('err_net'));
  } finally { S.busy = false; }
}

/* ── Глобальный поллер друзей: пилли + бейджи ── */
function saveUnread() {
  try { localStorage.setItem('wFUnread', JSON.stringify(S.unreadByPeer)); } catch (e) {}
}
function updateFriendsBadge() {
  const el = $('#friendsBadge');
  const reqCount = (S.frIn || []).length;
  const unread = Object.values(S.unreadByPeer || {}).reduce((a, b) => a + b, 0);
  const total = reqCount + unread;
  if (!el) return;
  el.style.display = total ? '' : 'none';
  el.textContent = total > 99 ? '99+' : String(total);
}

function pillForEvent(ev) {
  if (ev.kind === 'invite') {
    pillFor(ev.peerId, ev.peerName, t('pill_invite', { name: ev.peerName }), t('pill_invite_sub'), () => {
      if (ev.roomCode) joinRoomFlow(ev.roomCode);
    });
  } else if (ev.text) {
    pillFor(ev.peerId, ev.peerName, t('pill_msg', { name: ev.peerName, text: ev.text }), '', () => {
      openFriendChat({ userId: ev.peerId, name: ev.peerName });
    });
  }
}

function startFriendPoll() {
  if (S.friendPoll) return;
  S.friendPoll = setInterval(friendPollTick, 4000);
  friendPollTick();
}

async function friendPollTick() {
  if (S.friendPollBusy || !S.profile || document.visibilityState === 'hidden') return;
  S.friendPollBusy = true;
  try {
    const res = await apiCall('friends', { action: 'poll', sinceId: S.friendsCursor });
    // первая синхронизация: молча фиксируем курсор, без pill-спама историей;
    // флаг в localStorage — чтобы заявки в друзья ловились, даже когда чат друзей ещё пуст
    const firstSync = !localStorage.getItem('wFPollSeen');
    if (res.requests) {
      const fresh = (res.requests.length - (S.frIn || []).length);
      S.frIn = res.requests;
      if (!firstSync && fresh > 0 && S.view !== 'friends') {
        const u = res.requests[res.requests.length - 1];
        pillFor(u.userId, u.name, t('pill_request', { name: u.name }), '', () => nav('friends'));
      }
    }
    for (const ev of res.events || []) {
      if (!firstSync) {
        if (S.view === 'fchat' && S.fchat && S.fchat.peerId === ev.peerId) {
          mergeFchatMsgs([{ id: ev.id, fromId: ev.peerId, kind: ev.kind, text: ev.text, roomCode: ev.roomCode, ts: ev.ts }]);
        } else {
          pillForEvent(ev);
          S.unreadByPeer[ev.peerId] = (S.unreadByPeer[ev.peerId] || 0) + 1;
        }
      }
      if (ev.id > S.friendsCursor) S.friendsCursor = ev.id;
    }
    if (res.cursor != null && res.cursor > S.friendsCursor) S.friendsCursor = res.cursor;
    try { localStorage.setItem('wFCursor', String(S.friendsCursor)); localStorage.setItem('wFPollSeen', '1'); } catch (e) {}
    saveUnread();
    updateFriendsBadge();
    if (S.view === 'friends') {
      S.friends = S.friends || [];
      loadFriendsData(); // свежие списки, если открыт экран друзей
    }
  } catch (e) { /* тихо */ }
  finally { S.friendPollBusy = false; }
}

/* ── Настройки ── */
function renderSettings() {
  const p = S.profile || {};
  setScreen(`
    <div class="header">
      <button class="h-btn" data-back><svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></button>
      <div class="h-title">${esc(t('settings_title'))}</div>
    </div>
    <div class="page">
      <div class="island" style="padding:14px 16px">
        <div class="field-label" style="margin-top:0">${esc(t('nickLabel'))}</div>
        <input class="input" id="setNick" maxlength="24" value="${esc(p.nickname || '')}" autocapitalize="off">
        <div style="height:12px"></div>
        <button class="btn btn-primary" id="saveNick">${esc(t('saved'))} ✓</button>
      </div>
      <div class="island" style="padding:14px 16px">
        <div class="field-label" style="margin-top:0">${esc(t('lang'))}</div>
        <div class="seg" id="setLang">
          <button data-lang="ru" class="${S.lang === 'ru' ? 'on' : ''}">🇷🇺 Русский</button>
          <button data-lang="en" class="${S.lang === 'en' ? 'on' : ''}">🇬🇧 English</button>
        </div>
        <div class="field-label">${esc(t('theme'))}</div>
        <div class="seg" id="setTheme">
          <button data-th="auto" class="${S.themePref === 'auto' ? 'on' : ''}">${esc(t('theme_auto'))}</button>
          <button data-th="light" class="${S.themePref === 'light' ? 'on' : ''}">${esc(t('theme_light'))}</button>
          <button data-th="dark" class="${S.themePref === 'dark' ? 'on' : ''}">${esc(t('theme_dark'))}</button>
        </div>
        <div class="field-label">${esc(t('remind_lbl'))}</div>
        <div class="seg" id="setRemind">
          <button data-rm="1" class="${(S.profile && S.profile.remindOn !== false) ? 'on' : ''}">${esc(t('remind_on_l'))}</button>
          <button data-rm="0" class="${(S.profile && S.profile.remindOn === false) ? 'on' : ''}">${esc(t('remind_off_l'))}</button>
        </div>
      </div>
      <div class="empty-note">${esc(t('about'))}</div>
    </div>`);

  bindBack();
  $('#saveNick').addEventListener('click', async () => {
    if (S.busy) return;
    const nick = $('#setNick').value.replace(/\s+/g, ' ').trim();
    if (nick.length < 2 || nick.length > 24 || /^(.)\1+$/.test(nick) || /https?:|www\.|t\.me\//i.test(nick)) {
      toast(t('nickBad')); haptic('notify', 'error'); return;
    }
    S.busy = true;
    try {
      const res = await apiCall('setProfile', { nickname: nick });
      S.profile.nickname = res.nickname;
      toast(t('saved')); haptic('notify', 'success');
    } catch (e) { apiErrToast(e); }
    finally { S.busy = false; }
  });
  $('#setLang').addEventListener('click', async (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    S.lang = b.dataset.lang;
    $$('#setLang button').forEach((x) => x.classList.toggle('on', x === b));
    haptic('light');
    try {
      await apiCall('setProfile', { lang: S.lang });
      renderSettings();
    } catch (e2) { apiErrToast(e2); }
  });
  $('#setRemind').addEventListener('click', async (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    haptic('light');
    const on = b.dataset.rm === '1';
    $$('#setRemind button').forEach((x) => x.classList.toggle('on', x === b));
    try {
      await apiCall('setRemind', { on });
      if (S.profile) S.profile.remindOn = on;
    } catch (e2) { apiErrToast(e2); }
  });
  $('#setTheme').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    S.themePref = b.dataset.th;
    localStorage.setItem('wTheme', S.themePref);
    $$('#setTheme button').forEach((x) => x.classList.toggle('on', x === b));
    applyTheme();
    haptic('light');
  });
}

/* ── Клавиатура ── */
function bindKeyboard(kbId, ctl) {
  const kb = $('#' + kbId);
  if (!kb) return;
  kb.addEventListener('click', (e) => {
    const btn = e.target.closest('.key');
    if (!btn) return;
    const k = btn.dataset.k;
    haptic('light');
    if (k === '⏎') { ctl.submit(); return; }
    if (k === '⌫') {
      ctl.set(ctl.get().slice(0, -1));
      ctl.refresh();
      return;
    }
    if (ctl.get().length < 5 && /^[A-ZА-Я]$/.test(k)) {
      ctl.set(ctl.get() + k);
      ctl.refresh();
    }
  });
}

function bindBack() {
  $$('[data-back]').forEach((b) => b.addEventListener('click', () => { haptic('light'); goBack(); }));
}

/* ── Обновление состояния (после выхода из комнаты и т.п.) ── */
async function refreshState() {
  try {
    const st = await apiCall('getState', {});
    S.profile = st.profile;
    S.stats = st.stats;
    S.solo = st.solo;
    S.rooms = st.rooms;
    S.lang = st.profile.lang || S.lang;
  } catch (e) { /* тихо */ }
}

/* ── Инициализация ── */
async function init() {
  if (!tg || !tg.initDataUnsafe) {
    renderErrorScreen(t('open_in_tg'));
    return;
  }
  try { tg.ready(); tg.expand(); } catch (e) {}
  applyTheme();

  if (!tg.Serverless || typeof tg.Serverless.call !== 'function') {
    renderErrorScreen(t('update_app'));
    return;
  }

  renderLoading();

  let state = null;
  try {
    state = await apiCall('getState', {});
  } catch (e) {
    renderErrorScreen((e && e.message) || t('err_net'));
    return;
  }

  S.profile = state.profile;
  S.stats = state.stats;
  S.solo = state.solo;
  S.rooms = state.rooms;
  S.lang = state.profile.lang || 'ru';

  // deep link ?startapp=room_XXXXX
  const sp = tg.initDataUnsafe.start_param || '';
  const m = String(sp).match(/room[_-]?([A-Z0-9]{4,8})/i);
  if (m) S.pendingRoom = m[1].toUpperCase();

  if (!S.profile.nickname) {
    // язык по умолчанию до выбора
    const lc = (tg.initDataUnsafe.user && tg.initDataUnsafe.user.language_code) || '';
    if (!state.profile.nickname && !S.langForced) {
      S.lang = lc.toLowerCase().startsWith('ru') ? 'ru' : 'en';
    }
    renderView('onboarding');
  } else if (S.pendingRoom) {
    const code = S.pendingRoom; S.pendingRoom = null;
    renderView('home');
    joinRoomFlow(code);
  } else {
    renderView('home');
  }

  // глобальный поллер друзей (заявки, сообщения, приглосы в пати → pill'ы)
  startFriendPoll();
}

init();

