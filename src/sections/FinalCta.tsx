import { useState } from "react";
import { Button } from "../components/Button";

export function FinalCta() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="section final">
      <div className="final__glow" aria-hidden="true" />
      <div className="shell final__inner">
        <p className="eyebrow eyebrow--plain reveal">Начать</p>

        <h2 className="h2 final__title reveal" style={{ marginTop: "1.5rem" }}>
          Первый шаг —<br />
          <span className="italic-serif accent">бесплатный</span>
        </h2>

        <p className="lede final__lede reveal">
          Заберите три вводные практики на внимание и решите сами, ваше это или нет. Или напишите
          мне — начнём с разговора.
        </p>

        <div className="final__cta reveal">
          <Button to="/practices/free">Три бесплатные практики</Button>
          <Button to="/contact" variant="ghost">
            Написать мне
          </Button>
        </div>

        <form
          className="final__form reveal"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: подключить рассылку (форма пока не отправляет данные)
            setSent(true);
          }}
        >
          <input
            className="final__input"
            type="email"
            required
            placeholder="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email для рассылки"
          />
          <Button>{sent ? "Готово" : "Подписаться"}</Button>
        </form>

        <p className="final__hint reveal">
          {sent
            ? "Спасибо. Проверьте почту — там ссылка на практики."
            : "Письма редко и по делу. Отписаться можно в один клик."}
        </p>
      </div>
    </section>
  );
}
