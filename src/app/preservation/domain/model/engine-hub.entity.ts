import {BaseEntity} from '../../../shared/domain/model/base-entity';


/**
 * Represents an engine hub entity in the preservation domain model.
 */

export class EngineHubEntity implements BaseEntity {

  #id: number;
  #name: string;
  #engineType: string;
  #capacity: number;

  /**
   * Creates a new engine hub entity.
   * @param props - Initialization values.
   */

  constructor(props: { id: number; name: string; engineType: string; capacity: number }) {
    this.#id = props.id;
    this.#name = props.name;
    this.#engineType = props.engineType;
    this.#capacity = props.capacity;
  }

  /**
   * Gets the unique identifier for the engine hub entity.
   */


  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get name(): string {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
  }

  get engineType(): string {
    return this.#engineType;
  }

  set engineType(value: string) {
    this.#engineType = value;
  }

  get capacity(): number {
    return this.#capacity;
  }

  set capacity(value: number) {
    this.#capacity = value;
  }
}
