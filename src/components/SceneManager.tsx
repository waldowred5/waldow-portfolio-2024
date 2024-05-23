import { HeroScene } from './scenes/HeroScene.tsx';
import { SkillsScene } from './scenes/SkillsScene.tsx';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '../store/useScroll.ts';
import { useClamp } from '../hooks/useClamp.ts';
import { useControls } from 'leva';
import { useSettings } from '../store/useSettings.ts';
import { useWindowSize } from '../store/useWindowSize.ts';

export const SceneManager = () => {
  const { camera } = useThree();

  const {
    scrollPercentage,
  } = useScroll((state) => {
    return {
      scrollPercentage: state.scrollPercentage,
    };
  });

  const {
    innerWidth,
  } = useWindowSize((state) => {
    return {
      innerWidth: state.innerWidth,
    };
  });

  useFrame(() => {
    if (innerWidth < 768) {
      camera.position.z = useClamp(5 - (scrollPercentage * scrollPercentage), 4, 5);
    } else {
      camera.position.z = useClamp(4 - (scrollPercentage * scrollPercentage), 3, 4);
    }
  });

  const {
    bloomEnabled,
    statsDebugPanelEnabled,
    updateBloomEnabled,
    updateStatsDebugPanelEnabled,
  } = useSettings((state) => {
    return {
      bloomEnabled: state.bloomEnabled,
      statsDebugPanelEnabled: state.statsDebugPanelEnabled,
      updateBloomEnabled: state.updateBloomEnabled,
      updateStatsDebugPanelEnabled: state.updateStatsDebugPanelEnabled,
    };
  });

  useControls('Settings', {
    bloomEnabled: {
      value: bloomEnabled,
      onChange: (value: boolean) => {
        updateBloomEnabled(value);
      }
    },
    statsEnabled: {
      value: statsDebugPanelEnabled,
      onChange: (value: boolean) => {
        updateStatsDebugPanelEnabled(value);
      }
    },
  });

  return (
    <>
      <HeroScene/>
      {/* <CoderScene/> */}
      <SkillsScene/>
    </>
  );
}
