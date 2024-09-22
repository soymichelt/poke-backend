export type HealthCheckResponse = {
  status: 'ok' | 'error';
  info: Record<string, any>;
  error: Record<string, any>;
  details: Record<string, any>;
};
