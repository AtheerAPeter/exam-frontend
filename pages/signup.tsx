import {
  FormControl,
  FormLabel,
  FormHelperText,
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
import { useMutation } from "react-query";
import { userAuthApi } from "../components/Api/userAuthApi";
import { ICreds } from "../components/@types";

const schema = Yup.object({
  name: Yup.string().required("Username is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});

function Signup() {
  const router = useRouter();

  const { mutate: register, isLoading } = useMutation(
    (creds: ICreds) => userAuthApi.register(creds),
    {
      onSuccess: async ({ data }) => {
        if (data.status) {
          await Cookies.set("user", JSON.stringify(data.data.user));
          await Cookies.set("token", data.data.token);
          return router.push("/");
        }
        setFieldError("name", data.error?.["name"]?.[0]);
        setFieldError("email", data.error?.["email"]?.[0]);
        setFieldError("password", data.error?.["password"]?.[0]);
      },
    }
  );

  const {
    handleSubmit,
    values,
    isValid,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    setFieldError,
  } = useFormik({
    validationSchema: schema,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (creds) => {
      register(creds);
    },
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
        Create An Account
      </Text>
      <FormControl id="email" w={300}>
        <FormLabel>Username</FormLabel>
        <Input
          isInvalid={hasError && !!errors?.["name"]}
          onBlur={handleBlur("name")}
          value={values.name}
          onChange={handleChange("name")}
        />
        {hasError && errors["name"] && (
          <Text fontSize="md" color="red.400">
            {errors?.["name"]}
          </Text>
        )}
        <FormLabel mt={5}>Email address</FormLabel>
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
        <FormHelperText>Please provide a real email</FormHelperText>
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
          disabled={isSubmitting}
          variant="solid"
          bg="teal.400"
          _hover={{ bg: "teal.300" }}
          color="white"
          w="100%"
          mt={5}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Flex justifyContent="center" mt={5}>
          <Text fontSize="sm">Already have an account?</Text>
          <Link href="login">
            <Text color="teal.300" cursor="pointer" ml={1} fontSize="sm">
              Login
            </Text>
          </Link>
        </Flex>
      </FormControl>
    </Flex>
  );
}

export default Signup;
