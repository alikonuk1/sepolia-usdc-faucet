import { Link, Flex } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <Flex flexDirection={"column"}>
      <Flex as="header" align="center" justify="space-between" p={6}>
        <Link href="/" _hover={{ textDecoration: 'none' }}>
          <Flex align="flex-start" cursor="pointer" gap={"12px"} >
{/*             <Heading size="md">
              API3 Sepolia Faucet
            </Heading> */}
          </Flex>
        </Link>
        <Flex align="flex-end" gap={"12px"}>
          <ConnectButton 
            chainStatus="icon"
            accountStatus="address" 
            label="Sign in"
            showBalance={{
              smallScreen: false,
              largeScreen: false,
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
