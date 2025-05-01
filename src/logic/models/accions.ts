import { z } from "zod";

export const sModeAccion = z.enum(["keyboard", "button", "gamepad"]);
export type tModeAccion = z.infer<typeof sModeAccion>;
