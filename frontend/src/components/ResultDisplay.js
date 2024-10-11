import React, { useState, useEffect } from 'react';
import { getVotingContract } from '../utils/contract';

const ResultDisplay = () => {
  // State to store the list of candidates with vote counts
  const [candidates, setCandidates] = useState([]);

  // Fetch the voting results when the component mounts
  useEffect(() => {
    const fetchResults = async () => {
      const contract = await getVotingContract(); // Get the voting contract instance
      try {
        // Fetch the candidate list with vote counts from the contract
        const candidateList = await contract.getCandidates();
        setCandidates(candidateList); // Update the candidates state with the fetched results
      } catch (error) {
        console.error("Error fetching results:", error); // Log any errors during fetching
      }
    };
    fetchResults(); // Call the fetchResults function to initiate the process
  }, []);

  return (
    <div className="component-container">
    <h2>Voting Results</h2>
    <ul>
        {/* Render a list of candidates with their vote counts */}
      {candidates.map((candidate, index) => (
        <li key={index}>
          <span>{candidate.name}</span> <span>{candidate.voteCount.toString()} votes</span>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default ResultDisplay;
