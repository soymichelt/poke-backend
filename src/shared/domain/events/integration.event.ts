import {
  BaseEvent,
  BaseEventPrimitivesProps,
  BaseEventProps,
} from '@shared/domain/events/base.event';

export type IntegrationEventProps = BaseEventProps;

export type IntegrationEventPrimitivesProps = BaseEventPrimitivesProps;

export abstract class IntegrationEvent extends BaseEvent {}
