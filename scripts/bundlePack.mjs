import { ThirdwebSDK } from "@thirdweb-dev/sdk"

import dotenv from "dotenv"
dotenv.config();



(async () => {
    const sdk = ThirdwebSDK.fromPrivateKey(`${process.env.LOG_KEY}`, "polygon", {
        secretKey: `${process.env.PRIVATE_KEY}`
    });


    

    const packAddress = "0x05a458C0a94847a3219d38E7C208Bd6049A3fA68";
    const cardAddress = "0x873e032F810DbA36D19B3B80bcaa346a7112C423";

    const pack = sdk.getContract(packAddress, "pack");

    const card = sdk.getContract(cardAddress, "edition");
    await (await card).setApprovalForAll(packAddress, true);
    console.log("Approved card contract to transfer cards to pack contract");

    const packImage = "ipfs://QmRqafexmoeg9hzk7MZr7yCxLmPjzR4VkK4QMPtMYy41E7/BOXX.png";

    console.log("Creating pack");
    const createPacks = (await pack).create({
        packMetadata: {
            name: "POLYWATCH GEN2 PACK ",
            description: "POLYWATCH GEN2 PACK",
            image: packImage,
        },
        erc1155Rewards: [
           
            {
                contractAddress: cardAddress,
                tokenId: 69,
                quantityPerReward: 1,
                totalRewards: 140,
            },
            {
                contractAddress: cardAddress,
                tokenId: 70,
                quantityPerReward: 1,
                totalRewards: 140,
            },
            {
                contractAddress: cardAddress,
                tokenId: 71,
                quantityPerReward: 1,
                totalRewards: 140,
            },
             {
                contractAddress: cardAddress,
                tokenId: 72,
                quantityPerReward: 1,
                totalRewards: 140,
            },
            {
                contractAddress: cardAddress,
                tokenId: 73,
                quantityPerReward: 1,
                totalRewards: 140,
            },
             {
                contractAddress: cardAddress,
                tokenId: 74,
                quantityPerReward: 1,
                totalRewards: 140,
            },
            {
                contractAddress: cardAddress,
                tokenId: 75,
                quantityPerReward: 1,
                totalRewards: 140,
            },
             {
                contractAddress: cardAddress,
                tokenId: 76,
                quantityPerReward: 1,
                totalRewards: 140,
            },
            {
                contractAddress: cardAddress,
                tokenId: 77,
                quantityPerReward: 1,
                totalRewards: 140,
            },
             {
                contractAddress: cardAddress,
                tokenId: 78,
                quantityPerReward: 1,
                totalRewards: 140,
            },
            {
                contractAddress: cardAddress,
                tokenId: 79,
                quantityPerReward: 1,
                totalRewards: 150,
            },
             {
                contractAddress: cardAddress,
                tokenId: 80,
                quantityPerReward: 1,
                totalRewards: 150,
            },
            {
                contractAddress: cardAddress,
                tokenId: 81,
                quantityPerReward: 1,
                totalRewards: 150,
            },
             {
                contractAddress: cardAddress,
                tokenId: 82,
                quantityPerReward: 1,
                totalRewards: 150,
            },
             {
                contractAddress: cardAddress,
                tokenId: 83,
                quantityPerReward: 1,
                totalRewards: 150,
            },
             {
                contractAddress: cardAddress,
                tokenId: 84,
                quantityPerReward: 1,
                totalRewards: 150,
            },
             {
                contractAddress: cardAddress,
                tokenId: 85,
                quantityPerReward: 1,
                totalRewards: 150,
            },
             {
                contractAddress: cardAddress,
                tokenId: 86,
                quantityPerReward: 1,
                totalRewards: 30,
            },
             {
                contractAddress: cardAddress,
                tokenId: 87,
                quantityPerReward: 1,
                totalRewards: 30,
            },
            {
                contractAddress: cardAddress,
                tokenId: 88,
                quantityPerReward: 1,
                totalRewards: 20,
            },
            {
                contractAddress: cardAddress,
                tokenId: 89,
                quantityPerReward: 1,
                totalRewards: 20,
            },
            {
                contractAddress: cardAddress,
                tokenId: 90,
                quantityPerReward: 1,
                totalRewards: 140,
            },
             {
                contractAddress: cardAddress,
                tokenId: 91,
                quantityPerReward: 1,
                totalRewards: 140,
            },
             {
                contractAddress: cardAddress,
                tokenId: 92,
                quantityPerReward: 1,
                totalRewards: 140,
            },
             {
                contractAddress: cardAddress,
                tokenId: 93,
                quantityPerReward: 1,
                totalRewards: 140,
            },
             {
                contractAddress: cardAddress,
                tokenId: 94,
                quantityPerReward: 1,
                totalRewards: 140,
            },
             {
                contractAddress: cardAddress,
                tokenId: 95,
                quantityPerReward: 1,
                totalRewards: 100,
            },
             {
                contractAddress: cardAddress,
                tokenId: 96,
                quantityPerReward: 1,
                totalRewards: 100,
            },
             {
                contractAddress: cardAddress,
                tokenId: 97,
                quantityPerReward: 1,
                totalRewards: 100,
            },
        ],
        rewardsPerPack: 3,
    });

    console.log("Packs created");
})();