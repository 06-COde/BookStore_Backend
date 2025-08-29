
import { check, validationResult } from "express-validator";

const envValidations = [
  check("MONGO_URI")
    .exists({ checkFalsy: true }).withMessage("MONGO_URI is required")
    .isString().withMessage("MONGO_URI must be a string")
    .matches(/^mongodb(\+srv)?:\/\/.*/).withMessage("MONGO_URI must be a valid MongoDB connection string"),

  check("PORT")
    .exists({ checkFalsy: true }).withMessage("PORT is required")
    .isInt({ min: 1024, max: 65535 }).withMessage("PORT must be a valid integer between 1024 and 65535"),
];

export const validateEnv = async () => {

  // Run validations manually on process.env
  for (let validation of envValidations) {
    const req = { body: process.env }; 
    await validation.run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(" Invalid environment configuration:");
      errors.array().forEach(err => console.error(`   ${err.param}: ${err.msg}`));
      process.exit(1); 
    }
  }
  console.log("Environment variables validated successfully.");
};
