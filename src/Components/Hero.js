import React from "react";
import { VStack, Heading, Divider } from "@chakra-ui/react";
import Mint from "./Mint";

const Hero = () => {
  return (
    <VStack
      spacing={6}
      p={8}
      borderRadius="lg"
      boxShadow="lg"
      maxWidth="800px"
      w="100%"
    >
      <Heading>Sepolia USDC Faucet</Heading>
      <Mint />
      <Divider />
    </VStack>
  );
};

export default Hero;
