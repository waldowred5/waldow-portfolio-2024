import { FiberCanvas } from './components/FiberCanvas.tsx';
import { HeroText } from './components/HeroText.tsx';
import { ActionBar } from './components/ActionBar.tsx';
import { LevaPanel } from './components/LevaPanel.tsx';
import { Section } from './components/Section.tsx';

// FEATURES TODO:
// - Add & configure PrimeReact
// - Add gradient effect at bottom of hero scene
// - Add three.js skills scene (HackerHero Orb)
// - Update text to scale on viewport size
// - Add coding scene (Animated character coding at a desk with matrix style binary flickering in background behind)

// CHORES TODO:
// - Update README

const App = () => {
  return (
    <div className="flex">
      <LevaPanel/>

      <div className="flex-col w-full">
        <FiberCanvas/>

        <ActionBar/>

        <Section>
          <HeroText/>
        </Section>

        <Section>
          <HeroText/>
        </Section>

        <Section>
          <HeroText/>
        </Section>
      </div>
    </div>
  );
};

export default App;
