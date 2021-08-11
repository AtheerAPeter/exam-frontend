import { Box, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { ExamApi } from "../components/Api/examsApi";
import ProtectRout from "../components/HOC/protectRout";
import Navbar from "../components/Navbar";

function Home() {
  const { data: exams, isLoading } = useQuery(
    ExamApi.get.key(),
    () => ExamApi.get.exec(),
    {
      keepPreviousData: true,
      select: (e) => e.data.data,
    }
  );

  return (
    <ProtectRout>
      <Box>
        <Navbar />
        {isLoading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        {exams?.map((e) => (
          <Text mb={10} key={e.id}>
            {JSON.stringify(e, null, 20)}
          </Text>
        ))}
      </Box>
    </ProtectRout>
  );
}

export default Home;
