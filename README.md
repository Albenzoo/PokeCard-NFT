<!-- Top anchor -->
<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<div align="center">

[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Albenzoo/PokeCard-NFT">
    <img src="src/assets/image/poke-favicon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Poke Card NFT</h3>

  <p align="center">
    A Dapp for create, sell and view Poke cards NFT!
    <br />
    <br />
    <a href="https://github.com/Albenzoo/PokeCard-NFT/issues">Report Bug</a>
    ·
    <a href="https://pokecard-nft.web.app/">View Dapp</a>
    ·
    <a href="https://github.com/Albenzoo/PokeCard-NFT/issues">Request Feature</a>
  </p>
</div>

## Features

- Create and sell your custom NFT Cards
- Buy other cards
- Display all the cards created
- Display last 4 cards minted
- Display owned cards

<!-- ABOUT THE PROJECT -->
## About The Project
This is an NFT marketplace based on the creation and exchange of collectible NFT cards. This app is connected with the Ethereum blockchain (Goerli testnet) through web3.js and interact with a smart contract.
In this project you can find everything you need to make a decentralized app:

- Smart contract used and how to deploy it
- Frontend part (NFT creation, visualization and minting)
- Script for populate smart contract with custom NFT (optional)

For the ethereum node provider was used Alchemy, and for NFT storing was used Pinata.


<p align="right">(<a href="#readme-top">back to top 🔝</a>)</p>

## Built With

* [![Angular][Angular.io]][Angular-url]
* [![Web3js][web3js-logo]][web3js-url]
* [![Solidity][solidity-logo]][solidity-url]
* [![Hardhat][hardhat-logo]][hardhat-url]
* [![Alchemy][alchemy-logo]][alchemy-url]
* [![Pinata][pinata-logo]][pinata-url]

<p align="right">(<a href="#readme-top">back to top 🔝</a>)</p>

<!-- PROJECT STRUCTURE -->
## Project Structure
### Smart Contract
Powering all the data for this app is an Ethereum smart contract, written in Solidity and based on OpenZeppelin ERC-721 standard. The contract is on the file `contracts/MyNFT.sol`

### Angular App
All the frontend is built with Angular, you can find all the files under folder `src`
### Utility Scripts
There are also some utility script under `scripts` folder:
- `deploy.ts`: used to deploy the smart contract
- `mint-nft.ts`: used to dinamically popolate the contract with NFT added on pinataMintCid.json
- `setenv.ts`: used to populate environment variable
  
<p align="right">(<a href="#readme-top">back to top 🔝</a>)</p>
  
<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

List of things you need to use in order to use the software and how to install them:
* npm
  ```sh
  npm install npm@latest -g
  ```
* Get a free Alchemy node API Key at [https://dashboard.alchemy.com/](https://dashboard.alchemy.com/) (used to be able to load the NFTs info also for user without Metamask installed)

* Get a free Pinata JWT at [https://app.pinata.cloud/](https://app.pinata.cloud/) (used to store our NFTs information)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Albenzoo/PokeCard-NFT.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your personal information in `.env` (if you have not a contract, follow the instructions <a href="#deploy-contract">below</a> to deploy a new one)
   ```
   PUBLIC_KEY=YOUR-WALLET-PUBLIC-KEY
   CONTRACT_ADDRESS=YOUR-CONTRACT-ADDRESS
   PINATA_JWT=YOUR-PINATA-JWT
   ALCHEMY_PROVIDER=YOUR-ALCHEMY-PROVIDER-API-KEY
   ```


<p align="right">(<a href="#readme-top">back to top 🔝</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Run the project
   ```
   npm start 
   ```

<!-- deploy-contract anchor -->
<a name="deploy-contract"></a>
### Deploying the contract yourself
The smart contract is the file `MyNFT.sol`

First you need to compile the contract with the command 
   ```sh
   npm run compile-contract
   ```
Then you can deploy a new contract instance by running the command
   ```sh
   npm run deploy-contract
   ```
note that, by default, this command deploy the contract on Goerli Testnet by running the `deploy.ts` script (you can see the command detail on `package.json` file)

<p align="right">(<a href="#readme-top">back to top 🔝</a>)</p>


### Automatic NFTs minting
If you wanna populate quickly your smart contract with some NFTs CID 
created early, you can compile the `pinataMintCid.json` file with the CID code you want to mint in your contract.

In order to start the minting process run 
   ```sh
   npm run mint
   ```

## Build
   ```sh
   npm run build
   ```

## Deploy (Firebase)
   ```sh
   firebase deploy
   ```
<p align="right">(<a href="#readme-top">back to top 🔝</a>)</p>

<!-- CONTACT -->
## Contact

Alberto Presenti - alberto.presenti@yahoo.it

Project Link: [https://github.com/Albenzoo/PokeCard-NFT](https://github.com/Albenzoo/PokeCard-NFT)
<p align="right">(<a href="#readme-top">back to top 🔝</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Alchemy - 7. How to build an NFT Marketplace from Scratch - Solidity and IPFS | Road to Web3](https://www.youtube.com/watch?v=y6JfVdcJh1k)
* [Ethereum.org - How to write and deploy an NFT](https://ethereum.org/en/developers/tutorials/how-to-write-and-deploy-an-nft/)
* [OpenZeppelin contract wizard](https://wizard.openzeppelin.com/#erc721)
* [Readme Template](https://github.com/othneildrew/Best-README-Template#readme-top)
<p align="right">(<a href="#readme-top">back to top 🔝</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/albertopresenti/
[product-screenshot]: images/screenshot.png
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[web3js-logo]: https://img.shields.io/badge/Web3.js-E3632E?style=for-the-badge&logo=web3dotjs&logoColor=grey
[web3js-url]: https://web3js.readthedocs.io/en/v1.8.1/
[solidity-logo]: https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=grey
[solidity-url]: https://docs.soliditylang.org/en/v0.8.17/
[hardhat-logo]: https://img.shields.io/badge/Hardhat-FFF100?style=for-the-badge&logo=hardhat&logoColor=yellow
[hardhat-url]: https://hardhat.org/
[alchemy-logo]: https://img.shields.io/badge/Alchemy-5086F9?style=for-the-badge&logo=alchemy&logoColor=blue
[alchemy-url]: https://www.alchemy.com/
[pinata-logo]: https://img.shields.io/badge/Pinata-3FBBD7?style=for-the-badge&logo=pinata&logoColor=yellow
[pinata-url]: https://www.pinata.cloud/
