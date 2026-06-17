import { useState, useRef, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const BASE = 'https://cdn.poehali.dev/projects/93d181b7-df59-41a1-98e3-9325c33024ba/bucket/';

const PHONE = '+7 988 064 5258';
const PHONE_LINK = 'tel:+79880645258';
const TG_LINK = 'https://t.me/';
const MAX_LINK = 'https://max.ru/';

type MediaItem =
  | { type: 'photo'; url: string }
  | { type: 'video'; vkId: string };

type Character = {
  name: string;
  emoji: string;
  cover: string;
  color: string;
  media: MediaItem[];
};

const characters: Character[] = [
  {
    name: 'Белый Мишка',
    emoji: '🐻‍❄️',
    cover: `${BASE}fd1b8cd9-e31a-4c7a-bdb8-e9f36f1a62af.png`,
    color: '#60A5FA',
    media: [
      { type: 'video', vkId: '793489540_456239038' },
      { type: 'photo', url: `${BASE}c070b6ea-c8d9-42a0-b4f2-6282467caff0.png` },
      { type: 'photo', url: `${BASE}09acb856-dcea-4963-9e24-723838dc3aba.jpg` },
      { type: 'photo', url: `${BASE}bd4d2eea-043a-4388-bd84-5633d9843acf.jpg` },
      { type: 'photo', url: `${BASE}1f95110b-6054-48ee-823c-dc32965a4763.jpg` },
      { type: 'photo', url: `${BASE}3b36f5f5-9276-4579-8efd-f99bb7f1c120.jpg` },
      { type: 'photo', url: `${BASE}aeb49a53-1dce-4e4d-88ac-a4ce53a519c3.png` },
      { type: 'photo', url: `${BASE}75c28113-7a78-478f-88e1-7e98ce7da01d.png` },
      { type: 'photo', url: `${BASE}c789cf58-a231-468b-a475-46db84b8c1e8.jpg` },
      { type: 'photo', url: `${BASE}df9d84ca-3806-4038-9775-20e2842aad6e.png` },
      { type: 'photo', url: `${BASE}ffb8fb83-80e5-40b1-a0de-00b5409b3fee.jpg` },
      { type: 'photo', url: `${BASE}6b7cb506-1910-491d-8ca8-ef9ed8085bfa.jpg` },
      { type: 'photo', url: `${BASE}fd1b8cd9-e31a-4c7a-bdb8-e9f36f1a62af.png` },
    ],
  },
  {
    name: 'Чебурашка',
    emoji: '🐵',
    cover: `${BASE}b0f63f2b-6312-4be5-909d-b7d83214d47f.png`,
    color: '#FF8A3D',
    media: [{ type: 'photo', url: `${BASE}b0f63f2b-6312-4be5-909d-b7d83214d47f.png` }],
  },
  {
    name: 'Стич',
    emoji: '💙',
    cover: `${BASE}bcbe461b-a66f-4610-8b94-cd5b9ee3b00f.png`,
    color: '#2DD4BF',
    media: [{ type: 'photo', url: `${BASE}bcbe461b-a66f-4610-8b94-cd5b9ee3b00f.png` }],
  },
  {
    name: 'Котик',
    emoji: '🐱',
    cover: `${BASE}843c24e6-cb27-4532-a343-634cd99634ff.jpg`,
    color: '#FF5E9E',
    media: [{ type: 'photo', url: `${BASE}843c24e6-cb27-4532-a343-634cd99634ff.jpg` }],
  },
  {
    name: 'Лабубу розовый',
    emoji: '🩷',
    cover: `${BASE}03a236c8-72eb-4578-84f2-eaf939461dfe.jpg`,
    color: '#F472B6',
    media: [{ type: 'photo', url: `${BASE}03a236c8-72eb-4578-84f2-eaf939461dfe.jpg` }],
  },
  {
    name: 'Лабубу коричневый',
    emoji: '🤎',
    cover: `${BASE}02d767b7-344f-43b0-a529-6a627f053668.jpg`,
    color: '#B45309',
    media: [{ type: 'photo', url: `${BASE}02d767b7-344f-43b0-a529-6a627f053668.jpg` }],
  },
  {
    name: 'Зайка',
    emoji: '🐰',
    cover: `${BASE}7914b45c-8790-4cf2-9a32-ec3bd4c60918.png`,
    color: '#A78BFA',
    media: [{ type: 'photo', url: `${BASE}7914b45c-8790-4cf2-9a32-ec3bd4c60918.png` }],
  },
  {
    name: 'Серый заяц',
    emoji: '🐇',
    cover: `${BASE}eb785a18-d638-40e4-9090-0e2e0a421070.jpg`,
    color: '#9CA3AF',
    media: [{ type: 'photo', url: `${BASE}eb785a18-d638-40e4-9090-0e2e0a421070.jpg` }],
  },
  {
    name: 'Панда',
    emoji: '🐼',
    cover: `${BASE}939701b6-86fc-4d80-aecb-d989ca0fb0cf.jpg`,
    color: '#374151',
    media: [{ type: 'photo', url: `${BASE}939701b6-86fc-4d80-aecb-d989ca0fb0cf.jpg` }],
  },
  {
    name: 'Кинг-Конг',
    emoji: '🦍',
    cover: `${BASE}7084847c-6e59-4f15-a7a1-c94b70a01786.png`,
    color: '#78350F',
    media: [{ type: 'photo', url: `${BASE}7084847c-6e59-4f15-a7a1-c94b70a01786.png` }],
  },
  {
    name: 'Коржик',
    emoji: '🐈',
    cover: `${BASE}009f14ac-d41f-4903-9127-c89530d3637a.jpg`,
    color: '#FF8A3D',
    media: [{ type: 'photo', url: `${BASE}009f14ac-d41f-4903-9127-c89530d3637a.jpg` }],
  },
  {
    name: 'Бурый Медведь',
    emoji: '🐻',
    cover: `${BASE}6ec4609a-cf50-4dc8-a50a-6cd558c3ca7c.jpg`,
    color: '#92400E',
    media: [{ type: 'photo', url: `${BASE}6ec4609a-cf50-4dc8-a50a-6cd558c3ca7c.jpg` }],
  },
];

const included = [
  { icon: 'Sparkles', title: 'Яркий костюм', text: 'Профессиональный персонаж в эффектном образе' },
  { icon: 'Music', title: 'Шоу-программа', text: 'Танцы, игры и весёлые конкурсы для гостей' },
  { icon: 'Gift', title: 'Поздравление', text: 'Персональные слова и вручение подарка' },
  { icon: 'Camera', title: 'Фотосессия', text: 'Совместные фото на память со всеми гостями' },
  { icon: 'PartyPopper', title: 'Конфетти-салют', text: 'Эффектный финал с залпом конфетти' },
  { icon: 'Clock', title: 'Точно вовремя', text: 'Приедем минута в минуту к вашему празднику' },
];

const faq = [
  { q: 'Как заказать ростовую куклу?', a: 'Свяжитесь с нами по телефону или через форму на сайте — подберём персонажа и обсудим сценарий поздравления.' },
  { q: 'За сколько дней нужно бронировать?', a: 'Рекомендуем за 3–5 дней. В горячий сезон (новогодние праздники, выпускные) — за 1–2 недели.' },
  { q: 'Сколько длится поздравление?', a: 'Базовая программа — 20–30 минут. Можем продлить выступление по вашему желанию.' },
  { q: 'Вы выезжаете за город?', a: 'Да! Выезжаем по городу и области. Стоимость дороги рассчитывается отдельно.' },
  { q: 'Можно выбрать конкретного персонажа?', a: 'Конечно! У нас большой гардероб образов. Покажите пример — подберём максимально похожего героя.' },
];

const ITEM_COLORS = ['#FF5E9E', '#8B5CF6', '#2DD4BF', '#FF8A3D', '#D4A800', '#FF5E9E'];

const Confetti = () => {
  const colors = ['#FF5E9E', '#8B5CF6', '#FFD43B', '#2DD4BF', '#FF8A3D'];
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="absolute top-0 block animate-confetti-fall"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${6 + Math.random() * 8}px`,
            height: `${10 + Math.random() * 10}px`,
            background: colors[i % colors.length],
            borderRadius: i % 2 ? '50%' : '2px',
            animationDuration: `${5 + Math.random() * 6}s`,
            animationDelay: `${Math.random() * 6}s`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
};

const Balloon = ({ color, className }: { color: string; className?: string }) => (
  <div className={`absolute animate-float ${className}`} aria-hidden>
    <div className="w-16 h-20 rounded-full shadow-lg" style={{ background: color }} />
    <div className="mx-auto w-px h-16 bg-gray-300/60" />
  </div>
);

/* ── Fullscreen media viewer ── */
type ViewerProps = {
  char: Character;
  idx: number;
  onClose: () => void;
  onOrder: () => void;
  onSetIdx: (i: number) => void;
};

const FullscreenViewer = ({ char, idx, onClose, onOrder, onSetIdx }: ViewerProps) => {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const current = char.media[idx];

  const prev = useCallback(() => {
    onSetIdx((idx - 1 + char.media.length) % char.media.length);
  }, [idx, char.media.length, onSetIdx]);

  const next = useCallback(() => {
    onSetIdx((idx + 1) % char.media.length);
  }, [idx, char.media.length, onSetIdx]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) { next(); } else { prev(); }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex flex-col"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-4 pt-4 pb-2"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)' }}>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-white font-bold text-sm bg-black/40 backdrop-blur rounded-full px-4 py-2 hover:bg-black/60 transition-colors"
        >
          <Icon name="ChevronLeft" size={20} />
          Назад
        </button>
        <div
          className="text-white font-display text-lg px-4 py-1.5 rounded-full"
          style={{ background: char.color + 'cc' }}
        >
          {char.emoji} {char.name}
        </div>
        <span className="text-white/60 text-sm min-w-[48px] text-right">
          {idx + 1} / {char.media.length}
        </span>
      </div>

      {/* Main media area */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden select-none">
        {current.type === 'video' ? (
          <iframe
            key={current.vkId}
            src={`https://vk.com/video_ext.php?oid=${current.vkId.split('_')[0]}&id=${current.vkId.split('_')[1]}&hd=2&autoplay=1&no_audio_desc=1`}
            className="w-full h-full"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            style={{ minHeight: '100%' }}
          />
        ) : (
          <img
            key={current.url}
            src={current.url}
            alt={char.name}
            className="max-w-full max-h-full object-contain"
            draggable={false}
          />
        )}

        {/* Arrow buttons (hidden on video) */}
        {char.media.length > 1 && current.type !== 'video' && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <Icon name="ChevronRight" size={24} />
            </button>
          </>
        )}
      </div>

      {/* Bottom bar: thumbnails + order button */}
      <div
        className="absolute bottom-0 inset-x-0 z-10 px-4 pb-5 pt-8"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}
      >
        {/* Thumbnails */}
        {char.media.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {char.media.map((m, i) => (
              <button
                key={i}
                onClick={() => onSetIdx(i)}
                className={`shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all flex items-center justify-center ${
                  i === idx ? 'border-white' : 'border-white/20'
                }`}
              >
                {m.type === 'video' ? (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: char.color + '99' }}
                  >
                    <Icon name="Play" size={20} className="text-white" />
                  </div>
                ) : (
                  <img src={m.url} alt="" className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>
        )}
        {/* Order button */}
        <Button
          onClick={onOrder}
          className="w-full rounded-full font-bold text-white shadow-lg py-5"
          style={{ background: char.color }}
        >
          <Icon name="PartyPopper" className="mr-2" size={18} />
          Заказать {char.name}
        </Button>
      </div>
    </div>
  );
};

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [mediaIdx, setMediaIdx] = useState(0);

  const openChar = (c: Character) => {
    setSelectedChar(c);
    setMediaIdx(0);
  };

  const closeChar = () => setSelectedChar(null);

  const handleOrder = () => {
    setSelectedChar(null);
    setContactOpen(true);
  };

  return (
    <div className="relative min-h-screen font-sans text-[#2A1A3E] overflow-x-hidden bg-[#FFF8F0]">
      <Confetti />

      {/* FULLSCREEN VIEWER */}
      {selectedChar && (
        <FullscreenViewer
          char={selectedChar}
          idx={mediaIdx}
          onClose={closeChar}
          onOrder={handleOrder}
          onSetIdx={setMediaIdx}
        />
      )}

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-white/80 border-b border-festive-pink/10 shadow-sm">
        <nav className="container flex items-center justify-between py-4">
          <a href="#top" className="font-display text-xl md:text-2xl text-festive-pink leading-tight">
            Мишка Умка<span className="text-festive-purple"> и его друзья</span>
          </a>
          <div className="hidden md:flex items-center gap-7 font-semibold text-sm">
            <a href="#gallery" className="hover:text-festive-pink transition-colors">Галерея</a>
            <a href="#included" className="hover:text-festive-pink transition-colors">Что входит</a>
            <a href="#faq" className="hover:text-festive-pink transition-colors">Вопросы</a>
          </div>
          <Button
            onClick={() => setContactOpen(true)}
            className="rounded-full bg-festive-pink hover:bg-festive-purple text-white font-bold shadow-lg shadow-festive-pink/30"
          >
            Заказать
          </Button>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative z-10 container pt-32 pb-24 md:pt-40 md:pb-32">
        <Balloon color="#FFD43B" className="left-4 top-28 hidden md:block" />
        <Balloon color="#2DD4BF" className="right-8 top-40 hidden md:block [animation-delay:1s]" />
        <Balloon color="#8B5CF6" className="right-1/3 top-24 hidden lg:block [animation-delay:2s]" />

        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <span className="inline-block font-hand text-2xl text-festive-purple rotate-[-3deg] mb-4">
            Подарите эмоции ✨
          </span>
          <h1 className="font-display text-5xl md:text-7xl leading-tight mb-8">
            <span className="text-festive-pink">Ростовые куклы</span>
            <br />
            на ваше поздравление
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => setContactOpen(true)}
              size="lg"
              className="rounded-full text-base px-8 py-6 bg-festive-pink hover:bg-festive-purple text-white font-bold shadow-xl shadow-festive-pink/30 hover-scale"
            >
              <Icon name="PartyPopper" className="mr-2" size={20} />
              Заказать праздник
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base px-8 py-6 border-2 border-festive-purple text-festive-purple hover:bg-festive-purple hover:text-white font-bold" asChild>
              <a href="#gallery">
                <Icon name="Users" className="mr-2" size={20} />
                Наши персонажи
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-14 text-center">
            {[
              { n: '2000+', t: 'счастливых праздников' },
              { n: '5 лет', t: 'опыта работы' },
              { n: '5★', t: 'средняя оценка' },
            ].map((s) => (
              <div key={s.t} className="animate-scale-in">
                <div className="font-display text-4xl text-festive-purple">{s.n}</div>
                <div className="text-sm text-[#5A4A6E]">{s.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative z-10 py-20">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl text-festive-pink">Галерея персонажей</h2>
            <p className="text-base md:text-lg text-[#5A4A6E] mt-2">Фото-видео ростовых кукол</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {characters.map((c) => (
              <div
                key={c.name}
                onClick={() => openChar(c)}
                className="relative rounded-[1.5rem] overflow-hidden shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:shadow-2xl group"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={c.cover}
                    alt={c.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3 shadow-xl">
                    <Icon name="Search" size={22} className="text-festive-pink" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 flex items-end">
                  <div
                    className="w-full px-3 py-2.5 flex items-center gap-2"
                    style={{ background: c.color }}
                  >
                    <span className="text-xl leading-none">{c.emoji}</span>
                    <span className="font-bold text-white text-sm leading-tight drop-shadow">{c.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section id="included" className="relative z-10 py-20 bg-white/60">
        <div className="container">
          <div className="text-center mb-14">
            <span className="font-hand text-2xl text-festive-orange">Всё включено</span>
            <h2 className="font-display text-4xl md:text-5xl text-festive-orange">Что входит в поздравление</h2>
          </div>
          <div className="max-w-xl mx-auto flex flex-col gap-4">
            {included.map((item, i) => (
              <div
                key={item.title}
                className="flex items-center gap-5 rounded-3xl bg-white p-5 md:p-6 shadow-md hover:shadow-xl transition-shadow border border-festive-pink/5"
              >
                <div
                  className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: ITEM_COLORS[i % ITEM_COLORS.length] + '22' }}
                >
                  <Icon name={item.icon} size={28} style={{ color: ITEM_COLORS[i % ITEM_COLORS.length] }} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-[#5A4A6E] text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 py-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-14">
            <span className="font-hand text-2xl text-festive-pink">Полезно знать</span>
            <h2 className="font-display text-4xl md:text-5xl text-festive-purple">Вопросы и ответы</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faq.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-2xl bg-white border border-festive-pink/10 px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-bold hover:no-underline hover:text-festive-pink">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#5A4A6E]">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20">
        <div className="container">
          <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-16 text-center text-white bg-gradient-to-br from-festive-pink via-festive-purple to-festive-teal">
            <h2 className="font-display text-4xl md:text-5xl mb-4">Подарим праздник вашим близким!</h2>
            <p className="text-lg opacity-95 mb-8 max-w-xl mx-auto">
              Оставьте заявку — и любимый персонаж уже спешит к вам на праздник 🎉
            </p>
            <Button
              onClick={() => setContactOpen(true)}
              size="lg"
              className="rounded-full px-10 py-6 text-base bg-white text-festive-pink hover:bg-festive-yellow font-bold shadow-xl hover-scale"
            >
              <Icon name="Phone" className="mr-2" size={20} />
              Заказать поздравление
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-festive-pink/10 bg-white/70 py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-2xl text-festive-pink">Мишка Умка и его друзья</span>
          <p className="text-sm text-[#5A4A6E]">© 2026 · Ростовые куклы на поздравление</p>
          <div className="flex gap-3">
            <a href={PHONE_LINK} className="w-10 h-10 rounded-full bg-festive-pink/10 flex items-center justify-center text-festive-pink hover:bg-festive-pink hover:text-white transition-colors">
              <Icon name="Phone" size={18} />
            </a>
            <a href={TG_LINK} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-festive-pink/10 flex items-center justify-center text-festive-pink hover:bg-festive-pink hover:text-white transition-colors">
              <Icon name="Send" size={18} />
            </a>
            <a href={MAX_LINK} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-festive-pink/10 flex items-center justify-center text-festive-pink hover:bg-festive-pink hover:text-white transition-colors">
              <Icon name="MessageCircle" size={18} />
            </a>
          </div>
        </div>
      </footer>

      {/* CONTACT DIALOG */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl text-festive-pink text-center">Свяжитесь с нами!</DialogTitle>
            <DialogDescription className="text-center text-base">
              Позвоните или напишите — подберём персонажа и обсудим праздник 🎉
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-2">
            <a
              href={PHONE_LINK}
              className="flex items-center gap-4 rounded-2xl bg-festive-pink/10 p-4 hover:bg-festive-pink hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-festive-pink text-white flex items-center justify-center shrink-0">
                <Icon name="Phone" size={22} />
              </div>
              <div className="text-left">
                <div className="text-xs text-[#5A4A6E] group-hover:text-white/80">Позвонить</div>
                <div className="font-bold text-lg">{PHONE}</div>
              </div>
            </a>

            <a
              href={TG_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-festive-teal/10 p-4 hover:bg-festive-teal hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-festive-teal text-white flex items-center justify-center shrink-0">
                <Icon name="Send" size={22} />
              </div>
              <div className="text-left">
                <div className="text-xs text-[#5A4A6E] group-hover:text-white/80">Написать в</div>
                <div className="font-bold text-lg">Telegram</div>
              </div>
            </a>

            <a
              href={MAX_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-festive-purple/10 p-4 hover:bg-festive-purple hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-festive-purple text-white flex items-center justify-center shrink-0">
                <Icon name="MessageCircle" size={22} />
              </div>
              <div className="text-left">
                <div className="text-xs text-[#5A4A6E] group-hover:text-white/80">Написать в</div>
                <div className="font-bold text-lg">Max</div>
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;