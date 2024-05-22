import { FiberCanvas } from './components/FiberCanvas.tsx';
import { HeroText } from './components/ui/HeroText.tsx';
import { ActionBar } from './components/ui/ActionBar.tsx';
import { LevaPanel } from './components/helpers/LevaPanel.tsx';
import { Section } from './components/ui/Section.tsx';
import { ScrollManager } from './components/helpers/ScrollManager.tsx';

// FEATURES TODO:
// - Update text to scale on viewport size
// - Add coding scene (Animated character coding at a desk with matrix style binary flickering in background behind)

// CHORES TODO:
// - Update README

const App = () => {
  return (
    <div className="">
      <LevaPanel/>

      <div className="flex-col w-full">
        <ScrollManager/>

        <FiberCanvas/>

        <ActionBar/>

        <div className="z-100">
          <Section>
            <HeroText/>
          </Section>
        </div>

        <Section/>
      </div>
    </div>
  );
};

export default App;
