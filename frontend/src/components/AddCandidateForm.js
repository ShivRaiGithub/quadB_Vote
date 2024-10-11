import React, { useState } from 'react';
import { getVotingContract } from '../utils/contract';

const AddCandidateForm = () => {
  // State variables to manage the form and display messages
  const [message, setMessage] = useState(''); // Message to display feedback to the user
  const [candidateName, setCandidateName] = useState(''); // Candidate name entered by the user

  // Function to add a new candidate to the voting contract
  const addCandidate = async () => {
    const contract = await getVotingContract(); // Get the voting contract instance
    try {
      // Send a transaction to add the candidate to the contract
      const tx = await contract.addCandidate(candidateName);
      await tx.wait(); // Wait for the transaction to be mined
      // Update the message to indicate success
      setMessage(`Candidate ${candidateName} added successfully!`);
      setCandidateName(''); // Clear the input field after submission
    } catch (error) {
      // Handle specific error cases
      if (error.message.includes('Voting__NotOwner')) {
        // Inform the user if they are not the contract owner
        setMessage('Only the owner can add candidates.');
      } else {
        console.error("Error adding candidate:", error); // Log any other errors
      }
    }
  };

  return (
    <div className="add-candidate-form-container">
      <h2 className="component-title">Add Candidate Form</h2>
      {/* Input field for entering the candidate name */}
      <input
        type="text"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
        placeholder="Candidate Name"
      />
      <button className="add-button" type="submit" onClick={addCandidate}>
        Add Candidate
      </button>
      {/* Display the message if there is one */}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddCandidateForm;
