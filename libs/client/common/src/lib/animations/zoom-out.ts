import { animate, animation, keyframes, style } from '@angular/animations';

export const zoomOut = animation(
  [
    animate(
      '{{ timing }}s {{ delay }}s',
      keyframes([
        style({
          opacity: 1,
          offset: 0,
        }),
        style({
          opacity: 0,
          transform: 'scale3d(.3, .3, .3)',
          offset: 0.5,
        }),
        style({
          opacity: 0,
          offset: 1,
        }),
      ]),
    ),
  ],
  {
    params: { timing: 1, delay: 0 },
  },
);
