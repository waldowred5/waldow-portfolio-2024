import { HeroScene } from './scenes/HeroScene.tsx';
import { SkillsScene } from './scenes/SkillsScene.tsx';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '../store/useScroll.ts';
import { useClamp } from '../hooks/useClamp.ts';

export const SceneManager = () => {
  const { camera } = useThree();

  const {
    scrollPercentage,
  } = useScroll((state) => {
    return {
      scrollPercentage: state.scrollPercentage,
    };
  });

  useFrame(() => {
    camera.position.z = useClamp(4 - (scrollPercentage * scrollPercentage), 3, 4);
  });

  return (
    <>
      <HeroScene/>
      {/* <CoderScene/> */}
      <SkillsScene/>
    </>
  );
}
