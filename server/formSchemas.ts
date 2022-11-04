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
const username = z.string(defaultErrors);

export const user = {
  initialValues: {
    username: "",
    password: "",
    confirmPassword: "",
  },
  schema: z
    .object({
      username: username,
      password: password,
      confirmPassword: password,
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "Password don't match!",
      path: ["confirmPassword"],
    }),
};

export const getUser = {
  initialValues: {
    username: "",
  },
  schema: z.object({
    username: username,
  }),
};
