// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import  {Voting} from "../src/Voting.sol";

contract Deploy is Script {
    // Voting contract
    Voting public voting;

    // run function to deploy the contract
    function run() external returns (Voting) {
        vm.startBroadcast(msg.sender);
        voting = new Voting();
        voting.addCandidate("Adam");
        voting.addCandidate("Eve");
        vm.stopBroadcast();
        return voting;
    }
}
