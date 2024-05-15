import { Color } from 'three';
import { Text } from '@react-three/drei';
import { SkillsGraph } from '../skillsGraph/SkillsGraph.tsx';

interface IHeroSceneProps {
  scrollPercentage: number;
}

export const SkillsScene = ({ scrollPercentage }: IHeroSceneProps) => {
  return (
    <>
      <Text
        font="./src/assets/fonts/Kanit-Bold.ttf"
        fontSize={0.1}
        position={[0, -12 + scrollPercentage * 12, 0]}
        textAlign="center"
        color={'white'}
        outlineWidth={0.0018}
        outlineColor={'black'}
      >
        {'COMING SOON...'}
      </Text>

      {/* <mesh */}
      {/*   position={[0, -20 + scrollPercentage * 20, -5]} */}
      {/* > */}
      {/*   <sphereGeometry args={[1, 32, 32]}/> */}
      {/*   <meshBasicMaterial color={ new Color('red') }/> */}
      {/* </mesh> */}
      <group
        position={[0, -20 + scrollPercentage * 20, -2]}
      >
        <SkillsGraph/>
      </group>
    </>
  );
};
