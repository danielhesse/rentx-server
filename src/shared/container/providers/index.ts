import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayJsDateprovider } from './DateProvider/implementations/DayJsDateprovider';

container.registerSingleton<IDateProvider>('DateProvider', DayJsDateprovider);
