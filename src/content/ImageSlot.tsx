import type { ReactNode } from "react";

type Props = {
  /** URL картинки из блока контента (например content.portraitImage), либо undefined/пусто. */
  src: string | undefined | null;
  alt: string;
  className?: string;
  /** Что показать, пока клиент не загрузил свою картинку — обычно <Placeholder />. */
  fallback: ReactNode;
};

/** Показывает реальную картинку, если она загружена через админку, иначе — заглушку. */
export function ImageSlot({ src, alt, className, fallback }: Props) {
  if (!src) return <>{fallback}</>;
  return <img src={src} alt={alt} className={className} />;
}
