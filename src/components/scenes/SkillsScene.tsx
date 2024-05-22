import { SkillsGraph } from '../skillsGraph/SkillsGraph.tsx';
import { useScroll } from '../../store/useScroll.ts';

export const SkillsScene = () => {
  const {
    scrollPercentage,
  } = useScroll((state) => {
    return {
      scrollPercentage: state.scrollPercentage,
    };
  });

  return (
    <>
      {/* <Text */}
      {/*   font="./src/assets/fonts/Kanit-Bold.ttf" */}
      {/*   fontSize={0.1} */}
      {/*   position={[0, -12 + scrollPercentage * 12, 0]} */}
      {/*   textAlign="center" */}
      {/*   color={'white'} */}
      {/*   outlineWidth={0.0018} */}
      {/*   outlineColor={'black'} */}
      {/* > */}
      {/*   {'COMING SOON...'} */}
      {/* </Text> */}

      <group
        // position={[0, -20 + scrollPercentage * 20, -2]}
        position={[0, 0, scrollPercentage - 3]}
      >
        <SkillsGraph/>
      </group>
    </>
  );
};
