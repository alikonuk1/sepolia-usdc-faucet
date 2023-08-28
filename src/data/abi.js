export const CONTRACT_ADDRESS = '0xf0bec5E41E5CcE6E750f4FcC4a720F0d5721053d';
export const ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'iAPI3Token_', type: 'address' },
      { internalType: 'address', name: 'airnode_', type: 'address' },
      { internalType: 'bytes32', name: 'templateId_', type: 'bytes32' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [], name: 'DataLengthNotCorrect', type: 'error' },
  { inputs: [], name: 'NoSuchCommit', type: 'error' },
  { inputs: [], name: 'OutOfDatePrice', type: 'error' },
  { inputs: [], name: 'SignatureMismatch', type: 'error' },
  { inputs: [], name: 'TransferReverted', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'commitedHash', type: 'bytes32' },
      { indexed: true, internalType: 'uint256', name: 'stakedAmount', type: 'uint256' },
      { indexed: true, internalType: 'int256', name: 'price', type: 'int256' },
    ],
    name: 'Commited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'commitedHash', type: 'bytes32' },
      { indexed: true, internalType: 'string', name: 'commit', type: 'string' },
    ],
    name: 'Revealed',
    type: 'event',
  },
  {
    inputs: [],
    name: 'airnode',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bytes32', name: 'commitHash', type: 'bytes32' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'commit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'commits',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'iAPI3Token',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'commit_', type: 'string' }],
    name: 'reveal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'templateId',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const CONTRACT_ADDRESS_TDF = '0x6d073A6F0b1B41A83aAF5D439EE0F18040879156';
export const ABI_TDF = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'AmountZero', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'tokenDistributor', type: 'address' },
      { indexed: false, internalType: 'address', name: 'token', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: true, internalType: 'bytes32', name: 'root', type: 'bytes32' },
      { indexed: false, internalType: 'address', name: 'expirationRecipient', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'expirationTimestamp', type: 'uint256' },
    ],
    name: 'DeployedTokenDistributor',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bytes32', name: 'root', type: 'bytes32' },
      { internalType: 'address', name: 'expirationRecipient', type: 'address' },
      { internalType: 'uint256', name: 'expirationTimestamp', type: 'uint256' },
    ],
    name: 'deployTokenDistributor',
    outputs: [{ internalType: 'address', name: 'tokenDistributor', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokenDistributorImplementation',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
];
