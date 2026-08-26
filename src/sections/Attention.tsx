import { Button } from "../components/Button";
import { effects } from "../data/home";

export function Attention() {
  return (
    <section className="section section--hairline attn">
      <div className="shell">
        <div className="sec__head">
          <div>
            <p className="eyebrow">Практики на внимание</p>
            <h2 className="h2 sec__title">
              Внимание — это мышца.
              <br />
              <span className="italic-serif accent">Её можно тренировать</span>
            </h2>
          </div>
          <p className="lede measure-tight">
            Около 50% времени бодрствования человек проводит в непроизвольных отвлечениях. Усталость
            приходит не от тела, а от ума, который без остановки мечется, разрывая фокус.
          </p>
        </div>

        <div className="attn__grid">
          <div className="reveal">
            <h3 className="h3">Что происходит при регулярной практике</h3>
            <ul className="attn__effects">
              {effects.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <p className="lede" style={{ marginTop: "1.75rem", fontSize: "0.875rem" }}>
              Чтобы почувствовать эффект, нужно заниматься не меньше 10 минут в день в течение
              нескольких месяцев.
            </p>
            <div style={{ marginTop: "2.25rem" }}>
              <Button to="/practices">Смотреть практики</Button>
            </div>
          </div>

          <aside
            className="card attn__bot reveal"
            style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
          >
            <p className="eyebrow eyebrow--plain">Telegram-бот</p>
            <h3 className="attn__botTitle">Практика приходит к вам сама</h3>
            <p className="attn__botText">
              Бот ведёт по программе: напоминает, отдаёт аудио, задаёт вопросы о состоянии и держит
              ритм. Одна покупка открывает доступ сразу и на сайте, и в боте — прогресс общий.
            </p>
            <ul className="attn__effects" style={{ marginTop: "1.5rem" }}>
              <li>Ежедневные короткие практики по 3–5 минут</li>
              <li>Опросник состояния и подбор направления</li>
              <li>Бесплатный вводный блок без оплаты</li>
            </ul>
            <div className="attn__botCta">
              <Button href="https://t.me/" variant="ghost">
                Открыть бота
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
