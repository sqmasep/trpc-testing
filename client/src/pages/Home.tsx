import React from "react";
import { trpc } from "../trpc";
import { Container, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  Formik,
  Form,
  ErrorMessage,
  Field,
  FormikHelpers,
  useFormik,
} from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const schema = z.object({
  username: z.string(),
});

type Schema = z.infer<typeof schema>;

const Home: React.FC = () => {
  const utils = trpc.useContext();
  const createUser = ({ username }: Schema, utils: FormikHelpers<Schema>) => {
    mutation.mutate({ username });
  };
  const {
    setErrors,
    handleChange,
    handleBlur,
    touched,
    values,
    errors,
    initialValues,
  } = useFormik({
    validationSchema: toFormikValidationSchema(schema),
    initialValues: { username: 0 },
    onSubmit: createUser,
  });

  const errorMessage = errors;

  const mutation = trpc.user.create.useMutation({
    onSuccess: () => true,
    onError: e => {
      console.log(JSON.parse(e.message)[0].path[0]);
      const message = JSON.parse(e.message)[0];
      setErrors({
        [message.path[0]]: message.message,
      });
    },
  });

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(schema)}
        onSubmit={createUser}
      >
        {() => {
          return (
            <Form>
              <Stack direction='column'>
                <Field
                  name='username'
                  as={TextField}
                  label='username'
                  type='number'
                  error={!!errors.username}
                  helperText={errors.username}
                  onBlur={handleBlur}
                  value={values.username}
                  onChange={handleChange}
                />
                {touched.username && <ErrorMessage name='username' />}
              </Stack>
              <LoadingButton
                variant='contained'
                loading={mutation.isLoading}
                type='submit'
              >
                add
              </LoadingButton>
              errors:
              <pre>{JSON.stringify(errorMessage, null, 2)}</pre>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Home;
