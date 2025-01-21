import { useControls } from 'leva';

export const useAnimationControls = (actions, currentAnimation, setAnimation) => {
  useControls('Animation Controls', {
    animation: {
      label: 'Animation',
      value: currentAnimation,
      options: Object.keys(actions || {}),
      onChange: (value) => {
        setAnimation(value);
      },
    },
  });
};