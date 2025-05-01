import { z } from "zod";
import EventEmmiter from "./EventEmmiter";
import { tCurrent } from "./Controls";
import { tModeAccion } from "../models/accions";

export const sEventAccion = z.enum(["PRESS", "UP", "PRESSING"]);
export type tEventAccion = z.infer<typeof sEventAccion>;

export class Action {
  #event: EventEmmiter = new EventEmmiter();
  type: string = "Accion";
  name: string;
  keys: string[];
  state: boolean = false;

  constructor(name: string, keys: string[]) {
    this.name = name;
    this.keys = keys;
  }

  on(event: tEventAccion, callback: (data: unknown) => void) {
    const { success } = sEventAccion.safeParse(event);
    if (success) {
      return this.#event.on(event, callback);
    } else {
      console.warn(`Event (${event}) no accept for ${this.type}`);
    }
  }

  fire(event: tEventAccion, data: unknown) {
    return this.#event.fire(event, data);
  }

  process(current: tCurrent) {
    // encuntra las keys que tiene asignadas y valida si por lo menos una esta presionada
    const keys_selected = Object.entries(current)
      .filter(([key]) => this.keys.includes(key))
      .find(([, value]) => value);

    //comunica a los observers y devuelve si la accion esta siendo accionada
    return this.manageEvents(!!keys_selected);
  }

  manageEvents(newState: boolean) {
    //si lo esta presionando constantemente se lanza el evento constantemente
    if (newState) this.fire("PRESSING", undefined);

    //notifica cuando se presiona y cunado se levanta la tecla
    if (newState !== this.state) {
      this.state = newState;
      this.fire(this.state ? "PRESS" : "UP", undefined);
    }

    //accion activa
    return newState;
  }
  getKeysByMode(mode: tModeAccion) {
    this.keys.filter((ky) => ky.includes(mode));
  }
}
