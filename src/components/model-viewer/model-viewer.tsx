/* eslint-disable react/no-unknown-property */
import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber';

import classes from './model-viewer.module.scss';

interface Props {
  src: string;
}

const ModelViewer = React.memo(({ src }: Props) => {
  useLoader.clear(GLTFLoader, src);

  return (
    <Canvas className={classes.modelContainer} style={{ position: 'absolute', zIndex: 0 }}>
      <ambientLight intensity={0.5} color="white" />
      <directionalLight intensity={0.6} color="white" position={[5, 5, 5]} />
      <pointLight intensity={0.8} color="white" position={[-5, -5, -5]} />
      <Model src={src} />
      <OrbitControls
        enablePan={false}
        reverseOrbit
        minDistance={9.5}
        maxDistance={10.5}
        zoomSpeed={-1}
        zoom0={10}
        // args={[camera, document.documentElement]}
        enableRotate={false}
      />
    </Canvas>
  );
});

export default ModelViewer;

function Model({ src }: Props) {
  const gltf = useLoader(GLTFLoader, src ?? '/models/character.glb');
  const { camera } = useThree();
  const { animations, scene } = gltf;
  const mixer = new THREE.AnimationMixer(scene);

  const clip = animations[0];
  const action = mixer.clipAction(clip);
  useFrame((state, delta) => {
    mixer.update(delta);
  });
  action.play();
  action.loop = THREE.LoopRepeat;
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);
  return <primitive object={scene} position={[0, -1, 8.2]} />;
}
