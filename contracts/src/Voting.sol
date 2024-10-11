// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Voting {
    // Struct to store data of candidate
    struct Candidate {
        string name;
        uint voteCount;
    }

    // owner of contract
    address public owner;
    // mapping to see which user has voted
    mapping(address => bool) private hasVoted;
    // array to store candidates
    Candidate[] private candidates;

    // custom errors
    error Voting__AlreadyVoted();
    error Voting__NotOwner();

    constructor() {
        owner = msg.sender;
    }

    // modifier to check if msg sender is the owner
    modifier onlyOwner(){
        require(msg.sender==owner, Voting__NotOwner());
        _;
    }

    // only the owner is able to add candidates
    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate(_name,0));
    }

    // users can vote for candidates based on their index
    function vote(uint candidateIndex) public {
        require(!hasVoted[msg.sender], Voting__AlreadyVoted());
        candidates[candidateIndex].voteCount++;
        hasVoted[msg.sender] = true;
    }

    // get list of all candidates including their name and votes
    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

}
