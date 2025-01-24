import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MauModule } from './app/mau.module';

platformBrowserDynamic().bootstrapModule(MauModule)
  .catch(err => console.log(err));
