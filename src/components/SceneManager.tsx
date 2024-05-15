import { HeroScene } from './scenes/HeroScene.tsx';
import { SkillsScene } from './scenes/SkillsScene.tsx';
import { useEffect, useState } from 'react';

export const SceneManager = () => {
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  const handleScroll = () => {
    setScrollPercentage(window.scrollY / window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <HeroScene scrollPercentage={scrollPercentage}/>
      <SkillsScene scrollPercentage={scrollPercentage}/>
      {/* <CoderScene/> */}
    </>
  );
}
