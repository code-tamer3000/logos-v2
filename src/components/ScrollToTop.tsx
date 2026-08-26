import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** При смене маршрута — наверх, без плавной прокрутки через всю страницу. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
