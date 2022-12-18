# Pokemon Card NFT

Compile contract:
npx hardhat compile

Deploy contract script:
npx hardhat --network goerli run scripts/deploy.ts

contract deployed to address:
1 - 0x93948a0e51E556728aF0862Ab258C0aBCD2BdDc1
2 - 0x682A0cD9B74cEaB00417B6391fb96B6a00b46C1B

Execute mint-nft script:
npx ts-node scripts/mint-nft.ts

Spesso provando a recuperare tramite il link ipfs da pinata ritorna errore di CORS
https://ipfs.github.io/public-gateway-checker/
qui ci sono tutti i siti che possono recuperare file caricati su ipfs
