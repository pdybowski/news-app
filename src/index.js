import 'regenerator-runtime/runtime';
import { Jobs as JobsModule } from './modules/Jobs/jobs.module';

document.addEventListener('DOMContentLoaded', () => {
    new JobsModule();
});
