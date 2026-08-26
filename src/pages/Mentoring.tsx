import { Page } from "./Page";
import { Button } from "../components/Button";

const BRANCHES = [
  {
    status: "Разовая сессия",
    title: "Одна встреча",
    lede: "Подходит, когда есть конкретный запрос или развилка, и нужно посмотреть на неё под другим углом. Работаем 90 минут, результат — ясность и следующий шаг.",
    price: "По договорённости",
  },
  {
    status: "Сопровождение",
    title: "Длительная работа",
    lede: "Регулярные встречи на протяжении нескольких месяцев: своя практика, свой темп, разбор того, что происходит между сессиями. Для тех, кто идёт глубоко.",
    price: "По договорённости",
  },
];

export default function Mentoring() {
  return (
    <Page
      eyebrow="Наставничество"
      title={
        <>
          Сначала разговор,
          <br />
          <span className="italic-serif accent">потом решение</span>
        </>
      }
      lede="Здесь нет кнопки «Купить». Индивидуальная работа начинается с диалога: я должен понять ваш запрос, а вы — понять, подходит ли вам мой подход."
      todo={[
        "Общее описание подхода: как именно строится работа",
        "Детали разовой сессии: длительность, формат, для какого запроса",
        "Детали сопровождения: срок, ритм встреч, что входит",
        "Цены и порядок оплаты после согласования",
      ]}
    >
      <section className="section section--hairline">
        <div className="shell">
          <div className="shop">
            {BRANCHES.map((b, i) => (
              <article
                key={b.title}
                className="card reveal"
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              >
                <span className="shopCard__status">{b.status}</span>
                <h3 className="shopCard__title">{b.title}</h3>
                <p className="shopCard__lede">{b.lede}</p>
                <div className="shopCard__foot">
                  <span className="shopCard__price" style={{ fontSize: "1.05rem" }}>
                    {b.price}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--hairline">
        <div className="shell">
          <div className="reveal" style={{ maxWidth: "70ch" }}>
            <p className="eyebrow">О порядке работы</p>
            <h2 className="h2 sec__title">Я берусь не за каждый запрос</h2>
            <p className="lede" style={{ marginTop: "2rem" }}>
              Исходя из этических соображений и личных принципов, я берусь работать далеко не с
              каждым человеком. Я не работаю с теми, кто ждёт «волшебной таблетки» и не готов брать
              на себя ответственность.
            </p>
            <p className="lede italic-serif" style={{ marginTop: "1.5rem", fontSize: "1.35rem" }}>
              Каждый человек имеет ту действительность, которая соответствует его уровню сознания.
            </p>
            <div style={{ marginTop: "2.5rem" }}>
              <Button to="/contact">Оставить заявку</Button>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
