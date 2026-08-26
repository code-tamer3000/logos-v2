import { Button } from "../components/Button";
import { Placeholder } from "../components/Placeholder";

export function Sreda() {
  return (
    <section className="section section--hairline">
      <div className="shell">
        <div className="sreda reveal">
          <div className="sreda__body">
            <p className="eyebrow">Сообщество</p>
            <h2 className="h2 sec__title">Среда</h2>
            <p className="lede measure" style={{ marginTop: "1.5rem" }}>
              Пространство, где практика продолжается между занятиями: обсуждения, онлайн-встречи и
              живые вопросы тех, кто идёт тем же путём. Отдельная площадка со своим ритмом.
            </p>
            <div style={{ marginTop: "2.25rem" }}>
              <Button href="https://example.com" variant="ghost">
                Перейти в сообщество
              </Button>
            </div>
          </div>

          <Placeholder
            label="Обложка сообщества «Среда»"
            note="Групповая практика / атмосферный кадр"
            ratio="5 / 4"
          />
        </div>
      </div>
    </section>
  );
}
