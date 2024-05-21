import { HeroScene } from './scenes/HeroScene.tsx';
import { SkillsScene } from './scenes/SkillsScene.tsx';
import { useEffect } from 'react';
import useScrollState from '../store/scroll/useScrollState.ts';

export const SceneManager = () => {
  const {
    updateScrollPercentage,
    scrollPercentage,
  } = useScrollState((state) => {
    return {
      updateScrollPercentage: state.updateScrollPercentage,
      scrollPercentage: state.scrollPercentage,
    };
  });

  const handleScroll = () => {
    updateScrollPercentage(window.scrollY / window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <HeroScene/>
      <SkillsScene/>
      {/* <CoderScene/> */}
    </>
  );
}
