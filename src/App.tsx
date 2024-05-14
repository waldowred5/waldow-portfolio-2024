import { HeroScene } from './components/HeroScene.tsx';
import { FiberCanvas } from './components/FiberCanvas.tsx';
import { HeroText } from './components/HeroText.tsx';
import { ActionBar } from './components/ActionBar.tsx';

// FEATURES TODO:
// - Add & configure PrimeReact
// - Add gradient effect at bottom of hero scene
// - Add three.js skills scene (HackerHero Orb)

// CHORES TODO:
// - Update README

const App = () => {
  return (
    <div className="flex">
      <div className="flex-col w-full">
        <FiberCanvas>
          <HeroScene/>
        </FiberCanvas>

        <ActionBar/>
        <HeroText/>
      </div>
    </div>
  );
};

export default App;
