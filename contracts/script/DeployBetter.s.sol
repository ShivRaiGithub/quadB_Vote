// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import  {BetterVoting} from "../src/BetterVoting.sol";

contract Deploy is Script {
    // BetterVoting contract
    BetterVoting public betterVoting;

    // run function to deploy the contract
    function run() external returns (BetterVoting) {
        vm.startBroadcast(msg.sender);
        betterVoting = new BetterVoting();
        betterVoting.addCandidate("Adam");
        betterVoting.addCandidate("Eve");
        vm.stopBroadcast();
        return betterVoting;
    }
}
