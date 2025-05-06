import { Action } from "./Accion";

export type tCurrent = {
  [key: string]: boolean | undefined;
};
export class Controls {
  actions: Action[] = [];
  keys_current: tCurrent = {};
  accion_current: tCurrent = {};

  constructor() {
    document.addEventListener(
      "keydown",
      (e) => (this.keys_current[`keyboard-${e.code}`] = true)
    );
    document.addEventListener(
      "keyup",
      (e) => (this.keys_current[`keyboard-${e.code}`] = false)
    );

    //start loop
    this.loop();
  }

  loop() {
    const accions = this.actions
      .map((acc) => ({
        [acc.name]: acc.process(this.keys_current),
      }))
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});

    this.accion_current = accions;
    requestAnimationFrame(() => this.loop());
  }

  getAction(action: string) {
    return this.actions.find((act) => act.name === action);
  }

  getCurrent() {
    return this.accion_current;
  }

  addAction(newAction: Action) {
    this.actions.push(newAction);
  }
}
