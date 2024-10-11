import React, { useState, useEffect } from 'react';
import { getVotingContract } from '../utils/contract';

const VotingForm = () => {
  // State variables to manage the UI and voting process
  const [message, setMessage] = useState(''); // Message to display feedback to the user
  const [candidateIndex, setCandidateIndex] = useState(0); // Index of the selected candidate
  const [candidates, setCandidates] = useState([]); // Array of candidate names
  const [vcontract, setVContract] = useState(null); // Voting contract instance

  // Fetch candidate list when the component mounts
  useEffect(() => {
    const fetchCandidates = async () => {
      const contract = await getVotingContract(); // Get the contract instance
      setVContract(contract); // Store the contract instance in state
      try {
        const candidateList = await contract.getCandidates(); // Fetch the candidate list from the contract
        setCandidates(candidateList); // Update the candidates state with the fetched list
      } catch (error) {
        console.error("Error fetching candidates:", error); // Log any errors during fetching
      }
    };
    fetchCandidates(); // Call the fetchCandidates function to initiate the process
  }, []);

  // Function to submit a vote
  const submitVote = async () => {
    try {
      // Send a vote transaction to the contract
      const tx = await vcontract.vote(candidateIndex);
      await tx.wait(); // Wait for the transaction to be mined
      setMessage('Vote submitted successfully!'); // Update the message to indicate success
    } catch (error) {
      // Handle specific error cases
      if (error.message.includes('Voting__AlreadyVoted')) {
        setMessage('You have already voted.'); // Inform the user if they've already voted
      } else {
        console.error("Error submitting vote:", error); // Log any other errors
      }
    }
  };

  return (
    <div className="voting-form-container">
      <h2 className="component-title">Voting Form</h2>
      <select onChange={(e) => setCandidateIndex(e.target.value)}>
        {/* Render a dropdown menu to select a candidate */}
        {candidates.map((candidate, index) => (
          <option key={index} value={index}>
            {candidate.name}
          </option>
        ))}
      </select>
      <button className="vote-button" type="submit" onClick={submitVote}>
        Vote
      </button>
      {/* Display the message if there is one */}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default VotingForm;
