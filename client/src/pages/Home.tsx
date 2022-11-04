import React from "react";
import { trpc } from "../trpc";
import { Box, Container, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form, Field, FormikHelpers, useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { user } from "../../../server/formSchemas";

type Schema = z.infer<typeof user.schema>;

const Home: React.FC = () => {
  const utils = trpc.useContext();

  const createUser = (values: Schema, utils: FormikHelpers<Schema>) => {
    console.log("values: ", values);
    mutation.mutate(values);
  };

  const {
    setErrors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    values,
    errors,
    initialValues,
  } = useFormik({
    validationSchema: toFormikValidationSchema(user.schema),
    initialValues: user.initialValues,
    onSubmit: createUser,
  });

  const mutation = trpc.user.create.useMutation({
    onSuccess: () => console.log("%cSuccess", "color: green"),
  });

  return (
    <Container>
      <Formik initialValues={initialValues}>
        {() => {
          return (
            <Form onSubmit={handleSubmit}>
              <Stack direction='column'>
                {["username", "password", "confirmPassword"].map(el => (
                  <Box>
                    <Field
                      name={el}
                      as={TextField}
                      label={el}
                      error={!!(touched[el] && errors[el])}
                      helperText={touched[el] && errors[el]}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values[el]}
                    />
                  </Box>
                ))}
              </Stack>
              <LoadingButton
                sx={{ mt: 4 }}
                variant='contained'
                loading={mutation.isLoading}
                type='submit'
              >
                add
              </LoadingButton>
              {mutation.isSuccess
                ? mutation.data
                : mutation.error && mutation.error?.message}
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Home;
