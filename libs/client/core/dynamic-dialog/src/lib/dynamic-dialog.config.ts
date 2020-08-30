import { OverlayConfig } from '@angular/cdk/overlay';

export class DynamicDialogConfig<TData = any> {
  data?: TData;
  header = '';
  closable = true;
  containerAnimationTiming = 0.3;
  contentAnimationTiming = 0.2;
  animationChildDelay?: string | number = 0;
  overlayConfig?: OverlayConfig;
}
