import { tModeAccion } from "../models/accions";

type tKeys = {
  [key in tModeAccion]: string[];
};

export class Accion {
  name: string = "";
  keys: tKeys = {
    Button: ["ButtonUp"],
    Gamepad: ["Gamepad0"],
    Keyboard: ["KeyW", "ArrowUp"],
  };
}
