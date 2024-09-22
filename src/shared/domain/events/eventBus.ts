import { DomainEvent } from '@shared/domain/events/domain.event';
import { IntegrationEvent } from '@shared/domain/events/integration.event';

export interface EventBus {
  publish(
    events: DomainEvent | IntegrationEvent | DomainEvent[] | IntegrationEvent[],
  ): Promise<void>;
}
