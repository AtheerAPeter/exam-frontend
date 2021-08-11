import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import request from "../components/utils/request";
import { userAuthApi } from "../components/Api/userAuthApi";
import { useMutation } from "react-query";
import { ICreds } from "../components/@types";

const schema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});

function Login() {
  const router = useRouter();

  const { mutate: login, isLoading } = useMutation(
    (creds: ICreds) => userAuthApi.login(creds),
    {
      onSuccess: async ({ data }) => {
        if (data.status) {
          await Cookies.set("user", JSON.stringify(data.data.user));
          await Cookies.set("token", data.data.token);
          await request.setHeaders({ token: data.data.token });
          return router.push("/");
        }
        setFieldError("email", data.error?.["email"]?.[0]);
        setFieldError("password", data.error?.["password"]?.[0]);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const {
    handleSubmit,
    values,
    isValid,
    errors,
    handleChange,
    handleBlur,
    setFieldError,
  } = useFormik({
    validationSchema: schema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (creds) => login(creds),
  });

  const hasError = !isValid;

  return (
    <Flex
      h="100vh"
      w="100vw"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Text mb={10} fontWeight="bold" fontSize="3xl">
        Login
      </Text>
      <FormControl id="email" w={300}>
        <FormLabel>Email address</FormLabel>
        <Input
          isInvalid={hasError && !!errors?.["email"]}
          onBlur={handleBlur("email")}
          value={values.email}
          onChange={handleChange("email")}
          type="email"
        />
        {hasError && errors["email"] && (
          <Text fontSize="md" color="red.400">
            {errors?.["email"]}
          </Text>
        )}

        <FormLabel mt={5}>Password</FormLabel>
        <Input
          onBlur={handleBlur("password")}
          value={values.password}
          onChange={handleChange("password")}
          type="password"
        />
        {hasError && errors["password"] && (
          <Text fontSize="md" color="red.400">
            {errors?.["password"]}
          </Text>
        )}
        <Button
          isInvalid={hasError && !!errors["password"]}
          isLoading={isLoading}
          disabled={isLoading}
          variant="solid"
          bg="teal.400"
          _hover={{ bg: "teal.300" }}
          color="white"
          w="100%"
          mt={5}
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Flex justifyContent="center" mt={5}>
          <Text fontSize="sm">Don't have an account?</Text>
          <Link href="signup">
            <Text color="teal.300" cursor="pointer" ml={1} fontSize="sm">
              Create one
            </Text>
          </Link>
        </Flex>
      </FormControl>
    </Flex>
  );
}

export default Login;
