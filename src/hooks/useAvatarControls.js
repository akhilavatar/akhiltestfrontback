import { useControls, folder } from "leva";
import { ANIMATION_LIST } from '../constants/animations';
import { EXPRESSIONS } from '../constants/facialExpressions';

export const useAvatarControls = ({ nodes, onAnimationChange, onExpressionChange }) => {
  const { setupMode } = useControls({
    Animations: folder({
      Animation: {
        value: ANIMATION_LIST[0],
        options: ANIMATION_LIST,
        onChange: onAnimationChange
      },
    }),
    Expressions: folder({
      Expression: {
        value: EXPRESSIONS[0],
        options: EXPRESSIONS,
        onChange: onExpressionChange
      },
      setupMode: false
    })
  });

  // Setup mode controls
  useControls(
    'Expression Setup',
    setupMode && nodes?.Wolf3D_Head?.morphTargetDictionary
      ? Object.fromEntries(
          Object.keys(nodes.Wolf3D_Head.morphTargetDictionary).map(key => [
            key,
            {
              value: 0,
              min: 0,
              max: 1,
              step: 0.01,
            },
          ])
        )
      : {},
    [setupMode, nodes]
  );

  return { setupMode };
};