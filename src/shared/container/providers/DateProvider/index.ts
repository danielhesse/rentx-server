import { container } from 'tsyringe';

import { IDateProvider } from './IDateProvider';
import { DayJsDateprovider } from './implementations/DayJsDateprovider';

container.registerSingleton<IDateProvider>('DateProvider', DayJsDateprovider);
