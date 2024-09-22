export type CheckProps = {
  serviceName: string;
  serviceUrl: string;
};

export interface PingIndicatorService {
  check(props: CheckProps): Promise<Record<string, any>>;
}
