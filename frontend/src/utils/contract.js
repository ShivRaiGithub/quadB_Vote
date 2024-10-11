import { ethers } from 'ethers';
import VotingABI from './VotingABI.json';

// Contract address deployed on the Goerli test network
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Function to get the voting contract instance
export const getVotingContract = async () => {
  // Create a browser provider using window.ethereum (MetaMask)
  const provider = new ethers.BrowserProvider(window.ethereum);
  // Get the signer from the provider, which allows for signing transactions
  const signer = await provider.getSigner();
  // Create a new ethers.js contract instance using the ABI and contract address
  return new ethers.Contract(contractAddress, VotingABI, signer);
};

// Export the contract instance, which can be used in other parts of the application
export const contractInstance = await getVotingContract(); 
