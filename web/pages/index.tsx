import type { NextPage } from "next";
import Head from "next/head";
import { Box, Button } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Multi Token Minter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box m={4}>
        <Button colorScheme="blue">Mint</Button>
      </Box>
    </div>
  );
};

export default Home;
