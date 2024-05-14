import { useFrame } from '@react-three/fiber';
import { ShaderMaterial, Vector2, Color } from 'three';
import waterVertexShader from '../assets/shaders/water/vertex.glsl?raw';
import waterFragmentShader from '../assets/shaders/water/fragment.glsl?raw';
// import { OrbitControls } from '@react-three/drei' // Used for debugging

export const HeroScene = () => {
  useFrame(({ clock }) => {
    waterMaterial.uniforms.uTime.value = clock.getElapsedTime();
  });

  const waterMaterial = new ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms: {
      // Time
      uTime: { value: 0 },

      // Big Wave Elevation
      uBigWavesElevation: { value: 0.2 },
      uBigWavesFrequency: { value: new Vector2(1.0, 1.15) },
      uBigWavesSpeed: { value: 0.6 },

      // Small Wave Elevation
      uSmallWavesElevation: { value: 0.125 },
      uSmallWavesFrequency: { value: 2.0 },
      uSmallWavesSpeed: { value: 0.2 },
      uSmallWavesIterations: { value: 4.0 },

      // Color
      uColorOffset: { value: 0.08 },
      uColorMultiplier: { value: 4.8 },
      uDepthColor: { value: new Color('#6D00C7') },
      uSurfaceColor: { value: new Color('#00FFFB') },
    },
  });

  return (
    <>
      {/* <OrbitControls/> */}
      <mesh
        rotation={[-Math.PI * 0.5, 0, 0]}
      >
        <planeGeometry
          args={[4, 8, 512, 512]}
        />
        <primitive object={waterMaterial}/>
      </mesh>
    </>
  );
};
