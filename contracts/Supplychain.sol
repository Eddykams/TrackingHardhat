// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

contract Tracking {
    enum Role { Producer, Distributor, Retailer, Consumer }


struct Product{
        uint uniqueID;
        string name;
        string description;
        address currentOwner;
        Role currentRole;
        string[] locations;
    }

    mapping(address => Role) public roles;
    mapping(uint=> Product) public products;
    uint id=1;

    modifier onlyRole(Role _role){
        require(roles[msg.sender]==_role, "UNTHORIZED ROLE");
        _;
    }

    function addProduct(string memory _name, string memory _description) public onlyRole(Role.Producer){
            products[id] = Product(id, _name, _description, msg.sender, Role.Producer, new string[](0));
            id++;
    }

    function updateStatus(uint _id, string memory _locations) private {
        Product storage product = products[_id];
        require(product.uniqueID != 0, " ");
        require(product.currentOwner == msg.sender, "Only the current owner can update");

        product.currentRole = Role(uint(product.currentRole)+1);
        product.locations.push(_locations);
    }

    function transferProduct(uint _id,address _newOwner, string memory _locations) public {
        updateStatus(_id, _locations);

        Product storage product = products[_id];
        require(product.currentOwner== msg.sender, " only owner can execute") ;
        product.currentOwner = _newOwner;
    }

    function  verifyProduct(uint _id) public view returns(string memory name, string memory description, address currentOwner, Role currentRole, string[] memory locations) {
        Product storage product = products[_id];
        return(product.name, product.description, product.currentOwner, product.currentRole, product.locations);
    }
}

