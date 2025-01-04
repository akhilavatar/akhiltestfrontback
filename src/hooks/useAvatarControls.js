import { useControls, folder } from "leva";
import { ANIMATION_LIST } from '../constants/animations';
import { EXPRESSIONS } from '../constants/facialExpressions';

export const useAvatarControls = ({ onAnimationChange, onExpressionChange }) => {
  const controls = useControls({
    Avatar: folder({
      Animation: {
        value: ANIMATION_LIST[0],
        options: ANIMATION_LIST,
        onChange: onAnimationChange
      },
      Expression: {
        value: EXPRESSIONS[0],
        options: EXPRESSIONS,
        onChange: onExpressionChange
      }
    })
  });

  return controls;
};