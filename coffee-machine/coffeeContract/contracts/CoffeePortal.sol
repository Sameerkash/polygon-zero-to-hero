// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CoffeePortal {
    /*Declate totalCoffees */

    /*Declate owner */

    constructor() payable {
        // owner = payable(msg.sender);
    }

    /*Create an event named NewCoffee with Params */

    /*Declare Struct with sender, message, name, timestamp */

    /*array to maintian coffee state */

    function getAllCoffee() public view {
        /*add a return type and return the entire array*/
    }

    function getTotalCoffee() public view returns (uint256) {
        /*Return total count*/
    }

    function buyCoffee(
        string memory _message,
        string memory _name
    ) public payable {
        require(msg.value == 0.01 ether, "You need to pay 0.01 ETH");

        /*Increment count + Push to array  */

        // (bool success, ) = owner.call{value: msg.value}("");
        // require(success, "Failed to send Ether to owner");

        // emit NewCoffee(msg.sender, block.timestamp, _message, _name);
    }
}
