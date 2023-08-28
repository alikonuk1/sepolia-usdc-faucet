import React, { useState } from 'react';
import { VStack, HStack, Input, Button, Text } from '@chakra-ui/react';
import { useContractRead } from 'wagmi';
import { ABI, CONTRACT_ADDRESS } from '../data/abi';

const Search = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const [view, setView] = useState('commits');

  const {
    data: betData,
    isError: betError,
    isLoading: betLoading,
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getBet',
    args: [searchAddress],
    onSuccess(data) {
      console.log('Success getBet', data);
    },
  });

  const {
    data: revealData,
    isError: revealError,
    isLoading: revealLoading,
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getReveal',
    args: [searchAddress],
    onSuccess(data) {
      console.log('Success getReveal', data);
    },
  });

  const handleCommitsClick = () => {
    setView('commits');
  };

  const handleRevealsClick = () => {
    setView('reveals');
  };

  return (
    <VStack spacing={4} w="100%">
      <Input
        placeholder="Search address"
        variant="outline"
        size="md"
        value={searchAddress}
        onChange={(e) => setSearchAddress(e.target.value)}
      />
      <HStack spacing={3}>
        <Button
          bgColor="black"
          borderColor="gray.500"
          borderWidth="1px"
          color="white"
          size="md"
          onClick={handleCommitsClick}
        >
          Commits
        </Button>
        <Button
          bgColor="black"
          borderColor="gray.500"
          borderWidth="1px"
          color="white"
          size="md"
          onClick={handleRevealsClick}
        >
          Reveals
        </Button>
      </HStack>
      {view === 'commits' &&
        (betError ? (
          ' '
        ) : betLoading ? (
          'Loading...'
        ) : (
          <Text>
            Hash : {betData[0]}, Timestamp of commit : {betData[1] && betData[1].toString()}, Is revealed :{' '}
            {betData[2] ? 'true' : 'false'}
          </Text>
        ))}
      {view === 'reveals' &&
        (revealError ? (
          ' '
        ) : revealLoading ? (
          'Loading...'
        ) : (
          <Text>
            Bet : {revealData[1]}, Timestamp of reveal : {revealData[2] && revealData[2].toString()}
          </Text>
        ))}
    </VStack>
  );
};

export default Search;
