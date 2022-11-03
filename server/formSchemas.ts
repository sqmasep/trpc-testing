import { z, ZodType } from "zod";

const MESSAGE = {
  REQUIRED: "Ce champs est requis",
  WRONG_TYPE: "Mauvais type de donnée",
};

const defaultErrors = {
  required_error: MESSAGE.REQUIRED,
  invalid_type_error: MESSAGE.WRONG_TYPE,
};

const password = z.string(defaultErrors).min(8);

export const user = {
  initialValues: {
    username: "",
    password: "",
    confirmPassword: "",
  },
  schema: z
    .object({
      username: z.string(defaultErrors),
      password: password,
      confirmPassword: password,
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "Password don't match!",
      path: ["confirmPassword"],
    }),
};
