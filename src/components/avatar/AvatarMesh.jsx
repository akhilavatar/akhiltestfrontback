import React, { useRef, useEffect } from 'react';
import { useMorphTargets } from '../../hooks/useMorphTargets';
import { VISEME_MAP } from '../../constants/visemes';

export const AvatarMesh = ({ nodes, materials, currentExpression, currentViseme }) => {
  const meshRefs = useRef({});
  const mappedMorphs = useMorphTargets(nodes, currentExpression);

  // Apply morph targets
  useEffect(() => {
    if (!nodes) return;

    ['Wolf3D_Head', 'Wolf3D_Teeth', 'EyeLeft', 'EyeRight'].forEach(meshName => {
      const mesh = meshRefs.current[meshName];
      if (!mesh?.morphTargetDictionary || !mesh?.morphTargetInfluences) return;

      // Reset morphs
      mesh.morphTargetInfluences.fill(0);

      // Apply expression
      Object.entries(mappedMorphs).forEach(([key, value]) => {
        const idx = mesh.morphTargetDictionary[key];
        if (typeof idx !== 'undefined') {
          mesh.morphTargetInfluences[idx] = value;
        }
      });

      // Apply viseme
      if (currentViseme) {
        const visemeKey = VISEME_MAP[currentViseme];
        if (visemeKey) {
          const idx = mesh.morphTargetDictionary[visemeKey];
          if (typeof idx !== 'undefined') {
            mesh.morphTargetInfluences[idx] = 1;
          }
        }
      }
    });
  }, [nodes, mappedMorphs, currentViseme]);

  if (!nodes || !materials) return null;

  return (
    <group name="Scene">
      <group name="Armature">
        <primitive object={nodes.Hips} />
        <skinnedMesh
          name="Wolf3D_Body"
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          name="Wolf3D_Outfit_Bottom"
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          name="Wolf3D_Outfit_Footwear"
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          name="Wolf3D_Outfit_Top"
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
        <skinnedMesh
          name="Wolf3D_Hair"
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
          ref={ref => meshRefs.current.Wolf3D_Head = ref}
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          ref={ref => meshRefs.current.Wolf3D_Teeth = ref}
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
        <skinnedMesh
          ref={ref => meshRefs.current.EyeLeft = ref}
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          ref={ref => meshRefs.current.EyeRight = ref}
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
      </group>
    </group>
  );
};