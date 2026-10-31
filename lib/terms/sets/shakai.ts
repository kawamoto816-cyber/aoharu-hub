import { termSet } from "../meta";
import { SOCIAL_345 } from "../data/social345";
import { SOCIAL_6 } from "../data/social6";

export const SET = termSet("shakai", "小学社会", "社会　小3〜小6", [
  ...SOCIAL_345,
  ...SOCIAL_6,
]);
