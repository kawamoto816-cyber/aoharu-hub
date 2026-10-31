import { termSet } from "../meta";
import { SCIENCE_34 } from "../data/science34";
import { SCIENCE_56 } from "../data/science56";

export const SET = termSet("rika", "小学理科", "理科　小3〜小6", [
  ...SCIENCE_34,
  ...SCIENCE_56,
]);
