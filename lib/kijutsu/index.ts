import { EIGO } from "./eigo";
import { GENDAIBUN } from "./gendaibun";
import { KOBUN } from "./kobun";
import { TRACKS, type KijutsuLesson } from "./types";

export { TRACKS };
export type { KijutsuLesson };

export const KIJUTSU: KijutsuLesson[] = [...GENDAIBUN, ...KOBUN, ...EIGO];
export const getKijutsu = (id: string) => KIJUTSU.find((l) => l.id === id);
export const kijutsuHref = (id: string) => `/learn/kijutsu/${id}`;
export const trackName = (t: KijutsuLesson["track"]) =>
  TRACKS.find((x) => x.id === t)?.name ?? "";
/** 同じ道の次の段 */
export const nextKijutsu = (l: KijutsuLesson) =>
  KIJUTSU.find((x) => x.track === l.track && x.no === l.no + 1);
export const prevKijutsu = (l: KijutsuLesson) =>
  KIJUTSU.find((x) => x.track === l.track && x.no === l.no - 1);
