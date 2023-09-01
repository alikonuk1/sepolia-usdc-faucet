import React from "react";
import { VStack, Heading, Divider, Text } from "@chakra-ui/react";
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
      <Text>
        Please note: All transactions are final. Ensure you convert only the amount you need, as used ETH is non-returnable.
      </Text>
    </VStack>
  );
};

export default Hero;
