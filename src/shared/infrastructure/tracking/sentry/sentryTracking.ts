import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

if (!Sentry.isInitialized()) {
  Sentry.init({
    dsn: 'https://b64cb52b040308e4db072b5b615d7f6b@o298634.ingest.us.sentry.io/4507993051365376',
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });
}

export { Sentry };
