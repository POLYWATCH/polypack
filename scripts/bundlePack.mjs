import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import dotenv from "dotenv";
dotenv.config();



(async () => {
    const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "polygon");

    const packAddress = "0x05a458C0a94847a3219d38E7C208Bd6049A3fA68";
    const cardAddress = "0x873e032F810DbA36D19B3B80bcaa346a7112C423";

    const pack = sdk.getContract(packAddress, "pack");

    const card = sdk.getContract(cardAddress, "edition");
    await (await card).setApprovalForAll(packAddress, true);
    console.log("Approved card contract to transfer cards to pack contract");

    const packImage = "ipfs://QmTW5jCKpfm7ix3PudsBxKvzreyKY2hhF49iRDdQFWiJtE/K%C3%B22%C3%A8ER%C3%A82.png";

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
                tokenId: 61,
                quantityPerReward: 1,
                totalRewards: 5,
            },
            {
                contractAddress: cardAddress,
                tokenId: 60,
                quantityPerReward: 1,
                totalRewards: 5,
            },
            {
                contractAddress: cardAddress,
                tokenId: 66,
                quantityPerReward: 1,
                totalRewards: 5,
            },
            
        ],
        rewardsPerPack: 3,
    });

    console.log("Packs created");
})();