import { body } from "express-validator";

export const checkFirstName = body("first_name").trim().escape();
export const checkLastName = body("last_name").trim().escape();
export const checkEmail = body("email").isEmail().normalizeEmail().trim().escape();
export const checkPass = body(
  "password",
  "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long",
).isStrongPassword({
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  returnScore: false,
  pointsPerUnique: 1,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10,
});
