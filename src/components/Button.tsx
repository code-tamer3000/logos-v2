import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import "./Button.css";

type Variant = "solid" | "ghost" | "quiet";

type Props = {
  to?: string;
  href?: string;
  variant?: Variant;
  children: ReactNode;
  onClick?: () => void;
};

const ARROW = (
  <svg viewBox="0 0 16 16" aria-hidden="true" className="btn__arrow">
    <path
      d="M2 8h11M9 4l4 4-4 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Button({ to, href, variant = "solid", children, onClick }: Props) {
  const cls = `btn btn--${variant}`;
  const inner = (
    <>
      <span>{children}</span>
      {ARROW}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}
