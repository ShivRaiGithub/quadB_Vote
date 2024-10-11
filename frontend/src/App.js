import React, { useEffect, useState } from 'react';
import VotingForm from './components/VotingForm';
import CandidateList from './components/CandidateList';
import AddCandidateForm from './components/AddCandidateForm';
import ResultDisplay from './components/ResultDisplay';
import { getVotingContract } from './utils/contract';

function App() {
  // State variables for the connected account, ownership status, and the currently displayed component
  const [account, setAccount] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);

  // Connect to the user's wallet when the component mounts
  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        // Request account access from the user's wallet
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } else {
        alert('Please install MetaMask');
      }
    };
    connectWallet();
  }, []);

  // Check if the connected account is the owner of the contract
  useEffect(() => {
    const checkOwner = async () => {
      const contract = await getVotingContract(); // Get the voting contract instance
      console.log("Contract is ", contract);
      try {
        const owner = await contract.owner(); // Get the contract owner address
        // Check if the connected account is the owner
        setIsOwner(account.toLowerCase() === owner.toLowerCase());
      } catch (error) {
        console.error("Error checking owner:", error);
      }
    };
    if (account) {
      checkOwner(); // Run the checkOwner function only if an account is connected
    }
  }, [account]);

  // Function to render the appropriate component based on the currentComponent state
  const renderComponent = () => {
    switch (currentComponent) {
      case 'VotingForm':
        return <VotingForm />;
      case 'CandidateList':
        return <CandidateList />;
      case 'AddCandidateForm':
        // Only allow adding candidates if the user is the owner
        return isOwner ? <AddCandidateForm /> : <p>You are not the owner.</p>;
      case 'ResultDisplay':
        return <ResultDisplay />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
    <h1 className="app-title">Voting Dapp</h1>
    <p className="account-info">Connected Account: {account}</p>
    <div className="button-container">
      <button className="app-button" onClick={() => setCurrentComponent('VotingForm')}>Voting Form</button>
      <button className="app-button" onClick={() => setCurrentComponent('CandidateList')}>Candidate List</button>
      <button className="app-button" onClick={() => setCurrentComponent('AddCandidateForm')}>Add Candidate</button>
      <button className="app-button" onClick={() => setCurrentComponent('ResultDisplay')}>Result Display</button>
    </div>
    <div className="component-container">
      {renderComponent()}
    </div>
  </div>
  );
}

export default App;
