import React, { useState } from 'react';
import { ethers } from 'ethers';
import { VStack, Input, Button, Select } from '@chakra-ui/react';
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction, useContractRead } from 'wagmi';
import { ABI, CONTRACT_ADDRESS } from '../data/abi';

const Reveal = () => {
  const [revealChain, setRevealChain] = useState('');
  const [revealProject, setRevealProject] = useState('');
  const [revealSecret, setRevealSecret] = useState('');
  const { address } = useAccount();

  const DELIMITER = String.fromCharCode(31);

  let commitHash, commit_;
  if (address && revealChain && revealProject && revealSecret) {
    commit_ = [revealChain, revealProject, revealSecret].join(DELIMITER);
    commitHash = ethers.utils.keccak256(ethers.utils.solidityPack(['address', 'string'], [address, commit_]));
  }

  const { data: commitExists } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'commits',
    args: [commitHash],
  });

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'reveal',
    args: [commit_],
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <VStack spacing={4} w="100%">
      <Select
        placeholder="Chain"
        onChange={async (e) => {
          switch (e.target.value) {
            case 'Ethereum':
              setRevealChain('(1) Ethereum');
              break;
            case 'Optimism':
              setRevealChain('(10) Optimism');
              break;
            case 'Polygon':
              setRevealChain('(137) Polygon');
              break;
            case 'Gnosis':
              setRevealChain('(100) Gnosis');
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
        value={revealProject}
        onChange={(e) => setRevealProject(e.target.value)}
      />
      <Input
        placeholder="Secret"
        variant="outline"
        size="md"
        value={revealSecret}
        onChange={(e) => setRevealSecret(e.target.value)}
      />
      <Button
        bgColor="black"
        borderColor="gray.500"
        borderWidth="1px"
        color="white"
        size="md"
        disabled={!write || isLoading || !commitExists}
        onClick={() => {
          write?.();
        }}
      >
        {isLoading ? 'Revealing...' : 'Reveal'}
      </Button>
    </VStack>
  );
};

export default Reveal;
