import { Page } from "./Page";
import { Placeholder } from "../components/Placeholder";

const FIELDS = [
  {
    title: "Психология сознания",
    note: "Как устроены внимание и восприятие; что происходит с психикой в изменённых состояниях.",
  },
  {
    title: "Трансперсональный подход",
    note: "Изучение субъективного опыта с научной серьёзностью — без эзотерики без оснований.",
  },
  {
    title: "Метанавыки внимания",
    note: "Способность направлять, удерживать и переключать фокус как основа саморегуляции.",
  },
  {
    title: "Трансовые аудио",
    note: "Авторские ведомые медитации: выстроенный процесс через голос, ритм и образ.",
  },
];

export default function About() {
  return (
    <Page
      eyebrow="Обо мне"
      title={
        <>
          Исследователь сознания,
          <br />
          <span className="italic-serif accent">практик изменённых состояний</span>
        </>
      }
      lede="Проект посвящён развитию сознания и приобретению ментальных навыков. Это не про целительство и не про поиск гуру — это про то, чтобы вырасти, расширить себя, обрести опору и открыть в себе заложенные силы."
      todo={[
        "Краткая биография по годам — из духовной биографии",
        "Знаковые кейсы проектов (можно без названий, с цифрами)",
        "Сертификаты и обучение: MBSR, йога-нидра, коучинг",
        "Видео-обращение автора и фото с занятий",
      ]}
    >
      <section className="section section--hairline">
        <div className="shell about__grid">
          <div className="about__portrait reveal">
            <Placeholder
              label="Портрет автора"
              note="Крупный план, тёплый контровой свет"
              ratio="4 / 5"
            />
          </div>

          <div className="reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p className="eyebrow">Позиция</p>
            <h2 className="h2 sec__title">Изучаю сознание — передаю карту</h2>
            <p className="lede measure" style={{ marginTop: "2rem" }}>
              Не образ всепринимающего гуру, который всегда спокоен. Скорее духовный учёный: тот,
              кто докапывается до сути, проверяет разные подходы, адаптирует древние знания к
              современному миру и обучает этому людей.
            </p>
            <p className="lede measure" style={{ marginTop: "1.5rem" }}>
              Подход для тех, кто устал от поверхностной эзотерики и хочет чего-то большего. Цена
              здесь не всегда финансовая — она в готовности заплатить усердием, временем и
              решимостью пойти в глубину.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--hairline">
        <div className="shell">
          <div className="sec__head">
            <div>
              <p className="eyebrow">Сферы исследований</p>
              <h2 className="h2 sec__title">Чем я занимаюсь</h2>
            </div>
          </div>
          <div className="shop">
            {FIELDS.map((f, i) => (
              <article
                key={f.title}
                className="card reveal"
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <h3 className="shopCard__title" style={{ marginTop: 0, fontSize: "1.5rem" }}>
                  {f.title}
                </h3>
                <p className="shopCard__lede">{f.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
