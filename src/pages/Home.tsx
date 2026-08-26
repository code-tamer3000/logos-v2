import { useReveal } from "../hooks/useReveal";
import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Quote } from "../sections/Quote";
import { Paths } from "../sections/Paths";
import { Attention } from "../sections/Attention";
import { Sreda } from "../sections/Sreda";
import { Library } from "../sections/Library";
import { Shop } from "../sections/Shop";
import { Podcasts } from "../sections/Podcasts";
import { FinalCta } from "../sections/FinalCta";

export default function Home() {
  useReveal();

  return (
    <>
      <Hero />
      <About />
      <Quote />
      <Paths />
      <Attention />
      <Sreda />
      <Library />
      <Shop />
      <Podcasts />
      <FinalCta />
    </>
  );
}
