import { Button, ButtonGroupProps } from "@chakra-ui/react";
import React from "react";

function MyButton(props: ButtonGroupProps) {
  return (
    <Button
      variant="solid"
      bg="teal.400"
      _hover={{ bg: "teal.300" }}
      color="white"
      {...props}
    >
      {props.children}
    </Button>
  );
}

export default MyButton;
