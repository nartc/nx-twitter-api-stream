import { animate, animation, keyframes, style } from '@angular/animations';

export const fadeOut = animation(
  animate(
    '{{ timing }}s {{ delay }}s',
    keyframes([
      style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        offset: 0,
      }),
      style({
        opacity: 0,
        transform: 'translate3d(0, 0, 0)',
        offset: 1,
      }),
    ]),
  ),
  { params: { timing: 1, delay: 0 } },
);
