export function Quote() {
  return (
    <section className="section quote">
      <div className="quote__glow" aria-hidden="true" />
      <div className="shell">
        <blockquote className="reveal">
          <p className="quote__text italic-serif">
            Куда внимание идёт — <span className="accent">туда энергия течёт</span>
          </p>
          <footer className="quote__attr">Древняя формула · и обычная нейрофизиология</footer>
        </blockquote>
      </div>
    </section>
  );
}
