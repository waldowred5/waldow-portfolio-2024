import { HeroScene } from './components/HeroScene.tsx';
import { FiberCanvas } from './components/FiberCanvas.tsx';
import { HeroText } from './components/HeroText.tsx';
import { ActionBar } from './components/ActionBar.tsx';
import { Leva } from 'leva';

// FEATURES TODO:
// - Add & configure PrimeReact
// - Add gradient effect at bottom of hero scene
// - Add three.js skills scene (HackerHero Orb)
// - Update text to scale on viewport size
// - Add coding scene (Animated character coding at a desk with matrix style binary flickering in background behind)

// CHORES TODO:
// - Update README

const App = () => {
  const isDev = import.meta.env.MODE === 'development';
  console.log(import.meta);

  return (
    <div className="flex">
      <div
        className="absolute top-5 left-5"
        style={{ display: isDev ? 'block' : 'none' }}
      >
        <Leva fill />
      </div>

      <div className="flex-col w-full">
        <FiberCanvas />

        <ActionBar/>
        <HeroText/>
      </div>
    </div>
  );
};

export default App;
