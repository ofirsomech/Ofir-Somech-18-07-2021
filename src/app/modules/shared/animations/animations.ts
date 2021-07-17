import { trigger, transition, animate, style } from '@angular/animations';

export const fade = trigger('fade', [
  transition('void => *', [
    style({ opacity: 100 }),
    animate(1000)
  ])
])