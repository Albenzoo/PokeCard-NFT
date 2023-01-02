
<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Albenzoo/PokeCard-NFT">
    <img src="src/assets/image/poke-favicon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Poke Card NFT</h3>

  <p align="center">
    Create, sell and view the Poke cards NFT!
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
- View all the card created
- View the last 4 cards minted
- View the owned cards

### Built With

* [![Angular][Angular.io]][Angular-url]
* [![Web3js][web3js-logo]][web3js-url]
* [![Solidity][solidity-logo]][solidity-url]
* [![Hardhat][hardhat-logo]][hardhat-url]
* [![Alchemy][alchemy-logo]][alchemy-url]
* [![Pinata][pinata-logo]][pinata-url]

Compile contract:
npx hardhat compile

Deploy contract script:
npx hardhat --network goerli run scripts/deploy.ts

Execute mint-nft script:
npx ts-node scripts/mint-nft.ts

build:
npm run build

deploy:
firebase deploy





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
