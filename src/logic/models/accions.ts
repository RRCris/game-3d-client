import { z } from "zod";

export const sModeAccion = z.enum(["Keyboard", "Button", "Gamepad"]);
export type tModeAccion = z.infer<typeof sModeAccion>;
