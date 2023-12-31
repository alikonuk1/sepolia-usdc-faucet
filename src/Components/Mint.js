import React, { useState, useEffect } from "react";
import {
  IconButton,
  Flex,
  Heading,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "../data/abi";
import { FaCircleNotch, FaSyncAlt } from "react-icons/fa";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

const Mint = () => {
  const [ethAmount, setEthAmount] = useState("");
  const [ethPrice, setEthPrice] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [data_, setData] = useState("");
  const [signedMessage, setSignedMessage] = useState(null);

  const signer = provider.getSigner();

  useEffect(() => {
    if (!ethAmount || isNaN(parseFloat(ethAmount))) return;
    if (ethAmount) {
      fetch("https://pool.nodary.io/0xc52EeA00154B4fF1EbbF8Ba39FDe37F1AC3B9Fd4")
        .then((response) => response.json())
        .then((data) => {
          if (data.count > 0) {
            const hashKey =
              "0x4385954e058fbe6b6a744f32a4f89d67aad099f8fb8b23e7ea8dd366ae88151d";
            const beaconData = data.data[hashKey];

            if (beaconData) {
              const decodedValue = ethers.utils.defaultAbiCoder.decode(
                ["int256"],
                beaconData.encodedValue
              );
              setEthPrice(decodedValue);
              setTimestamp(beaconData.timestamp);
              setSignedMessage(beaconData.signature);
              setData(beaconData.encodedValue);
              console.log("timestamp:::", beaconData.timestamp);
              console.log("signature:::", beaconData.signature);
              console.log("encoded value:::", beaconData.encodedValue);
            } else {
              console.log("No data found for the specified hashKey");
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [ethAmount]);

  let ethPrice_;
  if (ethPrice !== null) {
    ethPrice_ = ethers.utils.parseUnits(ethPrice.toString(), 18);
  }

  const calculateAmountValue = () => {
    if (ethPrice && ethAmount) {
      return ((ethPrice * ethAmount) / 1e18).toFixed(2);
    }
    return "0";
  };

  const refreshPrice = () => {
    fetch("https://pool.nodary.io/0xC04575A2773Da9Cd23853A69694e02111b2c4182")
      .then((response) => response.json())
      .then((data) => {
        if (data.count > 0) {
          const hashKey =
            "0x4385954e058fbe6b6a744f32a4f89d67aad099f8fb8b23e7ea8dd366ae88151d";
          const beaconData = data.data[hashKey];

          if (beaconData) {
            const decodedValue = ethers.utils.defaultAbiCoder.decode(
              ["int256"],
              beaconData.encodedValue
            );
            setEthPrice(decodedValue);
            setTimestamp(beaconData.timestamp);
            setSignedMessage(beaconData.signature);
          } else {
            console.log("No data found for the specified hashKey");
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const mintTokens = async () => {
    const contractWithSigner = contract.connect(signer);

    try {
      const tx = await contractWithSigner.mint(
        timestamp ? timestamp.toString() : "0",
        data_,
        signedMessage || "0x0",
        {
          value: ethers.utils.parseEther(ethAmount),
        }
      );

      console.log("Transaction Hash:", tx.hash);
      await tx.wait();
      console.log("Transaction Confirmed!");
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  return (
    <VStack spacing={4} w="100%">
      <Input
        placeholder="ETH Amount"
        variant="outline"
        size="md"
        w="30%"
        value={ethAmount}
        onChange={(e) => setEthAmount(e.target.value)}
      />
      <Flex gap={"12px"} alignItems="center">
        <Heading size={"md"}>{calculateAmountValue()}</Heading>
        <IconButton
          aria-label="Refresh price"
          backgroundColor={"black"}
          icon={<FaSyncAlt />}
          onClick={refreshPrice}
        />
      </Flex>
      <Button
        bgColor="black"
        borderColor="gray.500"
        borderWidth="1px"
        color="white"
        size="md"
        /*         disabled={isLoading || !address} */
        onClick={mintTokens}
      >
        Mint
      </Button>
    </VStack>
  );
};

export default Mint;
