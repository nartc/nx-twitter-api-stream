import { animate, animation, keyframes, style } from '@angular/animations';

export const zoomIn = animation(
  [
    animate(
      '{{ timing }}s {{ delay }}s',
      keyframes([
        style({
          opacity: 0,
          transform: 'scale3d(.3, .3, .3)',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)',
          offset: 0.5,
        }),
      ]),
    ),
  ],
  {
    params: { timing: 1, delay: 0 },
  },
);
