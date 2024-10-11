import React, { useState, useEffect } from 'react';
import { getVotingContract } from '../utils/contract';

const CandidateList = () => {
  // State to store the list of candidates
  const [candidates, setCandidates] = useState([]);

  // Fetch the candidate list when the component mounts
  useEffect(() => {
    const fetchCandidates = async () => {
      const contract = await getVotingContract(); // Get the voting contract instance
      try {
        // Fetch the candidate list from the contract
        const candidateList = await contract.getCandidates();
        setCandidates(candidateList); // Update the candidates state with the fetched list
      } catch (error) {
        console.error("Error fetching candidates:", error); // Log any errors during fetching
      }
    };
    fetchCandidates(); // Call the fetchCandidates function to initiate the process
  }, []);

  return (
    <div className="component-container">
    <h2>Candidates</h2>
    <ul>
        {/* Render a list of candidates */}
      {candidates.map((candidate, index) => (
        <li key={index}>
            <span>{candidate.name}</span> 
        </li>
      ))}
    </ul>
  </div>
  );
};

export default CandidateList;
