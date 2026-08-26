import { Button } from "../components/Button";
import { Placeholder } from "../components/Placeholder";

const CREDS = [
  { title: "Трансперсональный психолог", note: "Московский институт психоанализа" },
  { title: "Автор системы целостного развития человека", note: "Практика с 2015 года" },
  { title: "Преподаватель практик осознанности", note: "Медитативные техники, работа с вниманием" },
];

export function About() {
  return (
    <section className="section section--hairline" id="about">
      <div className="shell about__grid">
        <div className="about__portrait reveal">
          <Placeholder
            label="Портрет автора"
            note="Вертикальное фото, тёплый свет, тёмный фон"
            ratio="4 / 5"
          />
        </div>

        <div className="reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <p className="eyebrow">Обо мне</p>
          <h2 className="h2 sec__title">
            Не учу верить —
            <br />
            даю инструменты, которые
            <br />
            <span className="italic-serif accent">работают независимо</span> от мировоззрения
          </h2>

          <p className="lede measure" style={{ marginTop: "2rem" }}>
            Я стою на стыке психологии сознания, трансперсонального подхода и эзотерической
            традиции — там, где наука заканчивается и начинается настоящее исследование. Изучаю, как
            устроены внимание и восприятие: что происходит в психике во время медитации, транса и
            глубокого расслабления.
          </p>

          <ul className="about__creds">
            {CREDS.map((c) => (
              <li key={c.title}>
                <strong>{c.title}</strong>
                {c.note}
              </li>
            ))}
          </ul>

          <Button to="/about" variant="ghost">
            Подробнее об авторе
          </Button>
        </div>
      </div>
    </section>
  );
}
