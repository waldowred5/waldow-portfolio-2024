import { HeroScene } from './scenes/HeroScene.tsx';
import { SkillsScene } from './scenes/SkillsScene.tsx';

export const SceneManager = () => {
  return (
    <>
      <HeroScene/>
      <SkillsScene/>
      {/* <CoderScene/> */}
    </>
  );
}
