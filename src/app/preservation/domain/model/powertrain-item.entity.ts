import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a powertrain item entity in the preservation domain model.
 */
export class PowertrainItemEntity implements BaseEntity {

  #id: number;
  #hubId: number;
  #engineType: string;
  #componentId: number;
  #componentName: string;
  #quantity: number;
  #registeredAt: Date;

  /**
   * Creates a new PowertrainItemEntity instance.
   * @param props The properties for the new entity.
   */
  constructor(props:  { id: number, hubId: number, engineType: string, componentId: number, componentName: string, quantity: number, registeredAt: Date }) {
    this.#id = props.id;
    this.#hubId = props.hubId;
    this.#engineType = props.engineType;
    this.#componentId = props.componentId;
    this.#componentName = props.componentName;
    this.#quantity = props.quantity;
    this.#registeredAt = props.registeredAt;
  }

  /**
   * Gets the unique identifier for the powertrain item entity.
   */

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get hubId(): number {
    return this.#hubId;
  }

  set hubId(value: number) {
    this.#hubId = value;
  }

  get engineType(): string {
    return this.#engineType;
  }

  set engineType(value: string) {
    this.#engineType = value;
  }

  get componentId(): number {
    return this.#componentId;
  }

  set componentId(value: number) {
    this.#componentId = value;
  }

  get componentName(): string {
    return this.#componentName;
  }

  set componentName(value: string) {
    this.#componentName = value;
  }

  get quantity(): number {
    return this.#quantity;
  }

  set quantity(value: number) {
    this.#quantity = value;
  }

  get registeredAt(): Date {
    return this.#registeredAt;
  }

  set registeredAt(value: Date) {
    this.#registeredAt = value;
  }
}
