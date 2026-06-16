import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const characters = [
  {
    name: 'Мишка Тёдди',
    desc: 'Тёплый и нежный — для самых маленьких',
    img: 'https://cdn.poehali.dev/projects/93d181b7-df59-41a1-98e3-9325c33024ba/files/8dfa94fa-9824-40ce-90b4-6fcc33de3b06.jpg',
    color: '#FF5E9E',
  },
  {
    name: 'Зайка Лапочка',
    desc: 'Шустрый и весёлый — обожает танцы',
    img: 'https://cdn.poehali.dev/projects/93d181b7-df59-41a1-98e3-9325c33024ba/files/88c48bc5-70ed-4bcf-89cb-b2b6a8950c39.jpg',
    color: '#2DD4BF',
  },
  {
    name: 'Супергерой',
    desc: 'Энергия и драйв — для смелых сорванцов',
    img: 'https://cdn.poehali.dev/projects/93d181b7-df59-41a1-98e3-9325c33024ba/files/62de322c-4c6c-409b-a756-5da140525421.jpg',
    color: '#8B5CF6',
  },
];

const videos = [
  { title: 'Мишка на дне рождения', emoji: '🐻', views: '12К', color: '#FF5E9E' },
  { title: 'Зайка на выпускном', emoji: '🐰', views: '8.4К', color: '#2DD4BF' },
  { title: 'Супергерой спешит', emoji: '🦸', views: '15К', color: '#8B5CF6' },
  { title: 'Единорог на празднике', emoji: '🦄', views: '6.1К', color: '#FF8A3D' },
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

const Confetti = () => {
  const colors = ['#FF5E9E', '#8B5CF6', '#FFD43B', '#2DD4BF', '#FF8A3D'];
  const pieces = Array.from({ length: 40 });
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {pieces.map((_, i) => (
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

const Index = () => {
  const [activeChar, setActiveChar] = useState(0);

  return (
    <div className="relative min-h-screen font-sans text-[#2A1A3E] overflow-x-hidden bg-[#FFF8F0]">
      <Confetti />

      {/* NAV */}
      <header className="relative z-20 sticky top-0 backdrop-blur-md bg-white/70 border-b border-festive-pink/10">
        <nav className="container flex items-center justify-between py-4">
          <a href="#top" className="font-display text-2xl md:text-3xl text-festive-pink">
            ПраздникВкуклах
          </a>
          <div className="hidden md:flex items-center gap-7 font-semibold text-sm">
            <a href="#video" className="hover:text-festive-pink transition-colors">Видео</a>
            <a href="#gallery" className="hover:text-festive-pink transition-colors">Галерея</a>
            <a href="#included" className="hover:text-festive-pink transition-colors">Что входит</a>
            <a href="#faq" className="hover:text-festive-pink transition-colors">Вопросы</a>
          </div>
          <Button className="rounded-full bg-festive-pink hover:bg-festive-purple text-white font-bold shadow-lg shadow-festive-pink/30">
            Заказать
          </Button>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative z-10 container pt-16 pb-24 md:pt-24 md:pb-32">
        <Balloon color="#FFD43B" className="left-4 top-10 hidden md:block" />
        <Balloon color="#2DD4BF" className="right-8 top-24 hidden md:block [animation-delay:1s]" />
        <Balloon color="#8B5CF6" className="right-1/3 top-4 hidden lg:block [animation-delay:2s]" />

        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <span className="inline-block font-hand text-2xl text-festive-purple rotate-[-3deg] mb-4">
            Самый яркий момент праздника ✨
          </span>
          <h1 className="font-display text-5xl md:text-7xl leading-tight mb-6">
            <span className="text-festive-pink">Ростовые куклы</span>
            <br />
            на ваше поздравление
          </h1>
          <p className="text-lg md:text-xl text-[#5A4A6E] mb-10 max-w-xl mx-auto">
            Любимые персонажи оживают, чтобы подарить море улыбок, танцев и
            незабываемых эмоций на дне рождения, выпускном или корпоративе.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full text-base px-8 py-6 bg-festive-pink hover:bg-festive-purple text-white font-bold shadow-xl shadow-festive-pink/30 hover-scale">
              <Icon name="PartyPopper" className="mr-2" size={20} />
              Заказать праздник
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base px-8 py-6 border-2 border-festive-purple text-festive-purple hover:bg-festive-purple hover:text-white font-bold" asChild>
              <a href="#video">
                <Icon name="Play" className="mr-2" size={20} />
                Смотреть видео
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-14 text-center">
            {[
              { n: '500+', t: 'счастливых праздников' },
              { n: '30+', t: 'ярких персонажей' },
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

      {/* VIDEO */}
      <section id="video" className="relative z-10 py-20 bg-white/60">
        <div className="container">
          <div className="text-center mb-14">
            <span className="font-hand text-2xl text-festive-teal">Живые эмоции</span>
            <h2 className="font-display text-4xl md:text-5xl text-festive-purple">Видео-примеры поздравлений</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((v) => (
              <div
                key={v.title}
                className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-[3/4] shadow-lg hover-scale"
                style={{ background: `linear-gradient(160deg, ${v.color}, ${v.color}cc)` }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-7xl mb-3 animate-wiggle">{v.emoji}</span>
                  <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="Play" size={28} className="text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/50 to-transparent text-white">
                  <p className="font-bold text-sm">{v.title}</p>
                  <p className="text-xs opacity-80 flex items-center gap-1">
                    <Icon name="Eye" size={12} /> {v.views} просмотров
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative z-10 py-20">
        <div className="container">
          <div className="text-center mb-14">
            <span className="font-hand text-2xl text-festive-orange">Образы и костюмы</span>
            <h2 className="font-display text-4xl md:text-5xl text-festive-pink">Галерея персонажей</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {characters.map((c, i) => (
              <div
                key={c.name}
                onMouseEnter={() => setActiveChar(i)}
                className={`relative rounded-[2rem] overflow-hidden shadow-xl transition-all duration-300 ${activeChar === i ? 'scale-[1.02]' : ''}`}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div
                  className="absolute bottom-0 inset-x-0 p-6 text-white"
                  style={{ background: `linear-gradient(to top, ${c.color}ee, transparent)` }}
                >
                  <h3 className="font-display text-3xl mb-1">{c.name}</h3>
                  <p className="text-sm font-medium opacity-95">{c.desc}</p>
                </div>
                <span
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                  style={{ background: c.color }}
                >
                  {i + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="rounded-full px-8 bg-festive-teal hover:bg-festive-purple text-white font-bold shadow-lg">
              Посмотреть все образы
            </Button>
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section id="included" className="relative z-10 py-20 bg-white/60">
        <div className="container">
          <div className="text-center mb-14">
            <span className="font-hand text-2xl text-festive-purple">Всё включено</span>
            <h2 className="font-display text-4xl md:text-5xl text-festive-teal">Что входит в поздравление</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((item, i) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white p-7 shadow-md hover:shadow-xl transition-shadow border border-festive-pink/5"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: ['#FF5E9E', '#8B5CF6', '#2DD4BF', '#FF8A3D', '#FFD43B', '#FF5E9E'][i] + '22' }}
                >
                  <Icon
                    name={item.icon}
                    size={28}
                    style={{ color: ['#FF5E9E', '#8B5CF6', '#2DD4BF', '#FF8A3D', '#D4A800', '#FF5E9E'][i] }}
                  />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-[#5A4A6E] text-sm">{item.text}</p>
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
            <Button size="lg" className="rounded-full px-10 py-6 text-base bg-white text-festive-pink hover:bg-festive-yellow font-bold shadow-xl hover-scale">
              <Icon name="Phone" className="mr-2" size={20} />
              Заказать поздравление
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-festive-pink/10 bg-white/70 py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-2xl text-festive-pink">ПраздникВкуклах</span>
          <p className="text-sm text-[#5A4A6E]">© 2026 · Ростовые куклы на поздравление</p>
          <div className="flex gap-3">
            {['Instagram', 'Send', 'Phone'].map((ic) => (
              <a
                key={ic}
                href="#"
                className="w-10 h-10 rounded-full bg-festive-pink/10 flex items-center justify-center text-festive-pink hover:bg-festive-pink hover:text-white transition-colors"
              >
                <Icon name={ic} size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
