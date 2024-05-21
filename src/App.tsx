import { FiberCanvas } from './components/FiberCanvas.tsx';
import { HeroText } from './components/ui/HeroText.tsx';
import { ActionBar } from './components/ui/ActionBar.tsx';
import { LevaPanel } from './components/helpers/LevaPanel.tsx';
import { Section } from './components/ui/Section.tsx';
// import { SkillText } from './components/ui/SkillText.tsx';

// FEATURES TODO:
// - Add three.js skills scene (HackerHero Orb)
// - Update text to scale on viewport size
// - Add coding scene (Animated character coding at a desk with matrix style binary flickering in background behind)

// CHORES TODO:
// - Update README

const App = () => {
  return (
    <div className="">
      <LevaPanel/>

      <div className="flex-col w-full">
        <FiberCanvas/>

        <ActionBar/>

        <div className="z-100">
          <Section>
            <HeroText/>
          </Section>
        </div>

        <Section>
          {/*   <SkillText/> */}
        </Section>
      </div>
    </div>
  );
};

export default App;
