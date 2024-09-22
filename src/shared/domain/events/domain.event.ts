import {
  BaseEvent,
  BaseEventPrimitivesProps,
  BaseEventProps,
} from '@shared/domain/events/base.event';

export type DomainEventProps = BaseEventProps;

export type DomainEventPrimitivesProps = BaseEventPrimitivesProps;

export abstract class DomainEvent extends BaseEvent {}
