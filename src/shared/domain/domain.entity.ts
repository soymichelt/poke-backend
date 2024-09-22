import { DomainEvent } from '@shared/domain/events/domain.event';
import { DateValueObject } from '@shared/domain/valueObjects/date/date';

export abstract class DomainEntity {
  public createdAt!: DateValueObject;
  public updatedAt!: DateValueObject;

  private events: DomainEvent[];

  constructor() {
    if (!this.createdAt) this.createdAt = DateValueObject.now();
    if (!this.updatedAt) this.updatedAt = DateValueObject.now();

    this.events = [];
  }

  public pushEvent(event: DomainEvent): void {
    this.events.push(event);
  }

  public pullEvents(): DomainEvent[] {
    const prevEvents = [...this.events];
    this.events = [];

    return prevEvents;
  }

  public abstract toPrimitives(): any;
}
