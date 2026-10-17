import { Page } from "./Page";
import { useContent } from "../content/ContentProvider";
import { RichText } from "../content/RichText";

type SimplePageContent = { eyebrow: string; title: string; lede: string; todo?: string[] };
type LegalBlock = { eyebrow: string; title: string };
type LegalContent = {
  sharedLede: string;
  sharedTodo: string[];
  offer: LegalBlock;
  privacy: LegalBlock;
  consent: LegalBlock;
};

/** Разделы, где структура заложена, а контент собирается через админку. */

export function LibraryPage() {
  const { eyebrow, title, lede, todo } = useContent<SimplePageContent>("page.simple.library");
  return <Page eyebrow={eyebrow} title={<RichText text={title} />} lede={lede} todo={todo} />;
}

export function BlogPage() {
  const { eyebrow, title, lede, todo } = useContent<SimplePageContent>("page.simple.blog");
  return <Page eyebrow={eyebrow} title={<RichText text={title} />} lede={lede} todo={todo} />;
}

export function ProductsPage() {
  const { eyebrow, title, lede, todo } = useContent<SimplePageContent>("page.simple.products");
  return <Page eyebrow={eyebrow} title={<RichText text={title} />} lede={lede} todo={todo} />;
}

export function FreePracticesPage() {
  const { eyebrow, title, lede, todo } = useContent<SimplePageContent>("page.simple.freePractices");
  return <Page eyebrow={eyebrow} title={<RichText text={title} />} lede={lede} todo={todo} />;
}

export function AccountPage() {
  const { eyebrow, title, lede, todo } = useContent<SimplePageContent>("page.simple.account");
  return <Page eyebrow={eyebrow} title={<RichText text={title} />} lede={lede} todo={todo} />;
}

/** Общий текст (lede/todo) один на все три документа, заголовок и надпись — свои. */
export function LegalPage({ variant }: { variant: "offer" | "privacy" | "consent" }) {
  const { sharedLede, sharedTodo, ...blocks } = useContent<LegalContent>("page.simple.legal");
  const { eyebrow, title } = blocks[variant];
  return <Page eyebrow={eyebrow} title={title} lede={sharedLede} todo={sharedTodo} />;
}

export function NotFoundPage() {
  const { eyebrow, title, lede } = useContent<SimplePageContent>("page.simple.notFound");
  return <Page eyebrow={eyebrow} title={<RichText text={title} />} lede={lede} />;
}
