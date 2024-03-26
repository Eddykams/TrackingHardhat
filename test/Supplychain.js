const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Supplychain Test", function(){
    
    it("Test for saving product", async function(){
        const [owner] = await ethers.getSigners();
        const tracking = await ethers.deployContract("Tracking");

        await tracking.connect(owner).addProduct("Nike", "Tech");

        const product = await tracking.products(1);
        expect(product.name).to.equal("Nike");

    })

    it("Should allow anyone to verify a product", async function () {
        const [owner] = await ethers.getSigners();
        const tracking = await ethers.deployContract("Tracking");
        const productId = 1; // Assuming product ID starts from 0

        await tracking.connect(owner).addProduct("Nike", "Tech");

        // Verify the product
        const productInfo = await tracking.verifyProduct(productId);
       
        console.log("Info sur Le Produit:", productInfo);
        expect(productInfo.name).to.equal("Nike");
        expect(productInfo.description).to.equal("Tech");
        expect(productInfo.currentOwner).to.equal(owner.address);
        expect(productInfo.currentRole).to.equal(0);
        expect(productInfo.locations.length).to.equal(0);
    });

    it("transfer ownership",async function(){
        const [owner] = await ethers.getSigners();
        const[ , ,newOwner] = await ethers.getSigners();
        const tracking = await ethers.deployContract("Tracking");

        await tracking.connect(owner).addProduct("Nike", "Tech");

        //transfer ownership
        await tracking.connect(owner).transferProduct(1, newOwner.address, "transfert to distributor");

        // Vérifier que la propriété a été transférée
        const product = await tracking.products(1);
        expect(product.currentOwner).to.equal(newOwner.address);

        console.log("Current Owner:", product.currentOwner);
        expect(product.currentOwner).to.equal(newOwner.address);
    })

    
})