import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Flex, Select, VStack, Heading, Input, Button } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { erc20ABI } from '@wagmi/core';
import { ABI, CONTRACT_ADDRESS } from '../data/abi';
import { FaCircleNotch, FaSyncAlt } from 'react-icons/fa';

const Mint = () => {
  const { address } = useAccount();
  const [commitChain, setCommitChain] = useState('');
  const [commitProject, setCommitProject] = useState('');
  const [commitSecret, setCommitSecret] = useState('');
  const [commitAmount, setCommitAmount] = useState('');
  const [commitData, setCommitData] = useState('');
  const [api3Price, setApi3Price] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [signedMessage, setSignedMessage] = useState(null);
  const [hashC, setHashC] = useState('');

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    if (commitChain && commitProject && commitSecret && commitAmount) {
      fetch('https://pool.nodary.io/0xc52EeA00154B4fF1EbbF8Ba39FDe37F1AC3B9Fd4')
        .then((response) => response.json())
        .then((data) => {
          if (data.count > 0) {
            const hashKey = '0x53fde3c9837fda1a4a9b990da67de30f4024d47a40c821e0e8f8079b67ea605d';
            const beaconData = data.data[hashKey];

            if (beaconData) {
              const decodedValue = ethers.utils.defaultAbiCoder.decode(['int256'], beaconData.encodedValue);
              setApi3Price(decodedValue);
              setTimestamp(beaconData.timestamp);
              setSignedMessage(beaconData.signature);
              setCommitData(beaconData.encodedValue);
              console.log('timestamp:::', beaconData.timestamp);
              console.log('signature:::', beaconData.signature);
              console.log('encoded value:::', beaconData.encodedValue);
            } else {
              console.log('No data found for the specified hashKey');
            }
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [commitChain, commitProject, commitSecret, commitAmount]);

  let api3Price_;
  if (api3Price !== null) {
    api3Price_ = ethers.utils.parseUnits(api3Price.toString(), 18);
  }

  const calculateCommitAmountValue = () => {
    if (api3Price && commitAmount) {
      return ((api3Price * commitAmount) / 1e18).toFixed(2);
    }
    return '0';
  };

  const refreshPrice = () => {
    fetch('https://pool.nodary.io/0xC04575A2773Da9Cd23853A69694e02111b2c4182')
      .then((response) => response.json())
      .then((data) => {
        if (data.count > 0) {
          const hashKey = '0x5dd8d9e1429f69ba4bd76df5709155110429857d19670cc157632f66a48ee1f7';
          const beaconData = data.data[hashKey];

          if (beaconData) {
            const decodedValue = ethers.utils.defaultAbiCoder.decode(['int256'], beaconData.encodedValue);
            setApi3Price(decodedValue);
            setTimestamp(beaconData.timestamp);
            setSignedMessage(beaconData.signature);
            setCommitData(beaconData.encodedValue);
          } else {
            console.log('No data found for the specified hashKey');
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const DELIMITER = String.fromCharCode(31);

  useEffect(() => {
    if (address && commitChain && commitProject && commitSecret) {
      const commit_ = [commitChain, commitProject, commitSecret].join(DELIMITER);
      console.log(commit_);
      setHashC(ethers.utils.keccak256(ethers.utils.solidityPack(['address', 'string'], [address, commit_])));
    }
  }, [address, commitChain, commitProject, commitSecret]);

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'commit',
    args: [
      timestamp || '0',
      commitAmount !== '' ? ethers.utils.parseEther(commitAmount) : ethers.utils.parseEther('0'),
      hashC,
      commitData,
      signedMessage || '0x0',
    ],
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const { config: configA } = usePrepareContractWrite({
    address: '0xD5c6e7676aa6753930F5576D69F809094BfA294f',
    abi: erc20ABI,
    functionName: 'approve',
    args: [CONTRACT_ADDRESS, commitAmount !== '' ? ethers.utils.parseEther(commitAmount) : '0'],
  });

  const { data: dataA, write: writeA } = useContractWrite(configA);

  const { isLoading: isLoadingA, isSuccess: isSuccessA } = useWaitForTransaction({
    hash: dataA?.hash,
  });

  useEffect(() => {
    console.log('isLoading:', isLoading);
    console.log('isSuccess:', isSuccess);
    console.log('isLoadingA:', isLoadingA);
    console.log('isSuccessA:', isSuccessA);
  }, [isLoading, isSuccess, isLoadingA, isSuccessA]);

  return (
    <VStack spacing={4} w="100%">
      <Select
        placeholder="Chain"
        onChange={async (e) => {
          switch (e.target.value) {
            case 'Ethereum':
              setCommitChain('(1) Ethereum');
              break;
            case 'Optimism':
              setCommitChain('(10) Optimism');
              break;
            case 'Polygon':
              setCommitChain('(137) Polygon');
              break;
            case 'Gnosis':
              setCommitChain('(100) Gnosis');
              break;
            default:
              break;
          }
        }}
      >
        <option value="Ethereum">Ethereum</option>
        <option value="Optimism">Optimism</option>
        <option value="Polygon">Polygon</option>
        <option value="Gnosis">Gnosis</option>
      </Select>
      <Input
        placeholder="Project Url"
        variant="outline"
        size="md"
        value={commitProject}
        onChange={(e) => setCommitProject(e.target.value)}
      />
      <Input
        placeholder="Secret"
        variant="outline"
        size="md"
        value={commitSecret}
        onChange={(e) => setCommitSecret(e.target.value)}
      />
      <Flex gap={'12px'} alignItems="center">
        <Input
          placeholder="API3 Amount"
          variant="outline"
          size="md"
          value={commitAmount}
          onChange={(e) => setCommitAmount(e.target.value)}
        />
        <Heading size={'md'}>${calculateCommitAmountValue()}</Heading>
        <IconButton aria-label="Refresh price" backgroundColor={'black'} icon={<FaSyncAlt />} onClick={refreshPrice} />
      </Flex>
      <Button
        bgColor="black"
        borderColor="gray.500"
        borderWidth="1px"
        color="white"
        size="md"
        disabled={isSuccessA ? isLoading : isLoadingA}
        onClick={() => {
          if (isSuccessA) {
            console.log('Attempting to call commit');
            write?.();
          } else {
            console.log('Attempting to call approve');
            writeA?.();
          }
        }}
      >
        {isSuccessA ? (isLoading ? 'Committing...' : 'Commit') : isLoadingA ? 'Approving...' : 'Approve'}
      </Button>
    </VStack>
  );
};

export default Mint;
