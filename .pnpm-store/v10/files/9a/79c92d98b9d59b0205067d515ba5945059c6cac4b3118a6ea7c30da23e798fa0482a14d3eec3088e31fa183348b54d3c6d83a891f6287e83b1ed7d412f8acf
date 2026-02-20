//#region src/mitt.d.ts
/**
 * Mitt - Tiny (~200b) functional event emitter / pubsub.
 *
 * Vendored from: https://github.com/developit/mitt
 * License: MIT
 * Copyright (c) 2021 Jason Miller
 */
type EventType = string | symbol;
type Handler<T = unknown> = (event: T) => void;
type WildcardHandler<T = Record<string, unknown>> = (type: keyof T, event: T[keyof T]) => void;
type EventHandlerList<T = unknown> = Array<Handler<T>>;
type WildCardEventHandlerList<T = Record<string, unknown>> = Array<WildcardHandler<T>>;
type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<keyof Events | '*', EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>>;
interface Emitter<Events extends Record<EventType, unknown>> {
  all: EventHandlerMap<Events>;
  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
  on(type: '*', handler: WildcardHandler<Events>): void;
  off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void;
  off(type: '*', handler: WildcardHandler<Events>): void;
  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
  emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void;
}
/**
 * Mitt: Tiny (~200b) functional event emitter / pubsub.
 * @name mitt
 * @returns {Mitt}
 */
declare function mitt<Events extends Record<EventType, unknown>>(all?: EventHandlerMap<Events>): Emitter<Events>;
//#endregion
export { Emitter, EventHandlerMap, Handler, WildcardHandler, mitt };
//# sourceMappingURL=mitt.d.mts.map