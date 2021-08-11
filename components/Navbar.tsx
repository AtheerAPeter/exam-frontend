import { HamburgerIcon } from "@chakra-ui/icons";
import { BiUserCircle, BiCodeAlt } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import {
  Box,
  Container,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  const logout = async () => {
    await Cookies.remove("user");
    await Cookies.remove("token");
    router.push("/login");
  };
  return (
    <Box h={70}>
      <Flex>
        <Container
          maxW="6xl"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          h={70}
        >
          <BiCodeAlt size={50} color="teal" fontWeight="bold" />

          <Menu closeOnBlur>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <Link href="/profile">
                <MenuItem icon={<BiUserCircle size={20} />}>Profile</MenuItem>
              </Link>
              <MenuItem icon={<BsCardChecklist size={20} />}>My exams</MenuItem>
              <MenuItem
                onClick={logout}
                icon={<AiOutlineLogout size={20} />}
                bg="red.400"
                color="white"
                _hover={{ bg: "red.400", color: "white" }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Container>
      </Flex>
    </Box>
  );
}

export default Navbar;
