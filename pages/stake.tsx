import {
  ConnectWallet,
  Edition,
  EditionDrop,
  NFT,
  SmartContract,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractEvents,
  useContractRead,
  useContractWrite,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { BaseContract, BigNumber, BigNumberish, ethers, utils } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard";
import {
  editionDropContractAddress,
  stakingContractAddress,
  tokenContractAddress,
} from "../const/addresses";
import styles from "../styles/Homes.module.css";
import Navbar from "../components/Navbar";
import Image from "next/image";


const Stake: NextPage = () => {
  const address = useAddress();
  const { contract: nftDropContract } = useContract(
    editionDropContractAddress,
    "edition-drop"
  );
  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );
  const { contract, isLoading } = useContract(stakingContractAddress);
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();


  const { data: stakedTokens } = useContractRead(
    contract,
    "getStakeInfo",
    address? [address] : undefined// Aggiungi l'indirizzo come argomento
  );

  const [stakeQuantity, setStakeQuantity] = useState(0);
  const [stakedTokensData, setStakedTokensData] = useState([]);
  const [isStakeClicked, setIsStakeClicked] = useState(false);
  const [isTransactionComplete, setIsTransactionComplete] = useState(false);


  async function loadStakedTokens() {
    try {
      const tokens = await contract?.call("getStakeInfo", [address]);
      const stakedQuantity = tokens?.length || 0;
      setStakeQuantity(stakedQuantity);
      setStakedTokensData(tokens || []);
    } catch (error) {
      console.error("Failed to load staked tokens", error);
    }
  }
  
  useEffect(() => {
    loadStakedTokens();
  }, [address, contract]);


  async function getQuantityOwned() {
    if (contract) {
      const connectedAddress = address; // Utilizza l'indirizzo connesso al posto di "{{wallet_address}}"
      const nfts = await contract.erc1155.getOwned(connectedAddress);
  
      const quantityOwned = nfts.length;
  
      console.log(`Quantità di NFT posseduti per l'indirizzo ${connectedAddress}: ${quantityOwned}`);
    } else {
      console.error("L'oggetto 'contract' non è stato definito correttamente.");
    }
  }
  
  getQuantityOwned();

const { data: stakedEvents } = useContractEvents(contract, "TokensStaked");
const [totalStakedNFTs, setTotalStakedNFTs] = useState(0);
const { data: rewardsClaimedEvents } = useContractEvents(contract, "RewardsClaimed");
const [totalRewardsClaimed, setTotalRewardsClaimed] = useState(0);
const totalNFTs = 5700; // Numero totale di NFT nella collezione
// Numero aggiuntivo di NFT staked
const additionalStakedNFTs = 248; 
useEffect(() => {
  if (stakedEvents) {
    setTotalStakedNFTs(stakedEvents.length + additionalStakedNFTs); // Aggiungiamo 140 NFT staked in più
  }
}, [stakedEvents]);

const percentageStaked = (totalStakedNFTs / totalNFTs) * 100;
const formattedPercentage = `${percentageStaked.toFixed(2)}%`;

useEffect(() => {
  if (rewardsClaimedEvents) {
    setTotalRewardsClaimed(rewardsClaimedEvents.length);
  }
}, [rewardsClaimedEvents])
  



useEffect(() => {
  if (rewardsClaimedEvents) {
    setTotalRewardsClaimed(rewardsClaimedEvents.length);
  }
}, [rewardsClaimedEvents]);

  
  
  
  
  
  
  useEffect(() => {
    if (!contract || !address) return;
  
    async function loadClaimableRewards() {
      let totalRewardAmount = ethers.constants.Zero;
  
      for (let tokenId = 0; tokenId <= 60; tokenId++) {
        const stakeInfo = await contract?.call(
          "getStakeInfoForToken",
          [tokenId, address]
        );
  
        // Esegui le operazioni necessarie per calcolare i reward in base al token ID
        // e aggiorna totalRewardAmount di conseguenza
  
        // Esempio di calcolo dei reward:
        const rewardAmount = stakeInfo[1];
        totalRewardAmount = totalRewardAmount.add(rewardAmount);
      }
  
      setClaimableRewards(totalRewardAmount);
    }
  
    loadClaimableRewards();
  }, [address, contract]);




    
  async function stakeNft(id: string, quantity: number) {
    if (!address || !contract) return;
  
    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }
    await contract?.call("stake", [id, quantity]);
  }
  

  
  async function stakeAllNftsOwned() {
    if (!contract || !nftDropContract || !stakingContractAddress || !address) {
      console.error("Contratti o indirizzi non definiti correttamente.");
      return;
    }
  
    const nfts = await contract.erc1155.getOwned(address);
  
    if (nfts.length === 0) {
      console.log("Nessun NFT posseduto.");
      return;
    }
  
    let totalStakeQuantity = 0;
  
    for (const nft of nfts) {
      const tokenId = nft.metadata; // Assumi che nft.metadata sia il valore corretto per l'ID del token
      const nftQuantity = nft.quantityOwned; // Assumi che nft.quantityOwned sia la quantità di NFT posseduti
      
      if (nftQuantity) {
        totalStakeQuantity += parseInt(nftQuantity);
      }
    }
  
    if (totalStakeQuantity > 0) {
      const isApproved = await nftDropContract.isApproved(address, stakingContractAddress);
      if (!isApproved) {
        await nftDropContract.setApprovalForAll(stakingContractAddress, true);
      }
  
      await contract.call("stake", ["0", totalStakeQuantity.toString()]); // Metti in staking tutti gli NFT posseduti
    }
  }
  
  stakeAllNftsOwned();
  
  



  

  const handleStakeQuantityChange = (event: any) => {
    setStakeQuantity(event.target.value);
  };
  

  const handleStakeButtonClick = () => {
    setIsStakeClicked(true);

    // Simulazione di un timeout per simulare una transazione in corso
    setTimeout(() => {
      setIsTransactionComplete(true);

      // Reset dello stato dopo il completamento della transazione
      setTimeout(() => {
        setIsStakeClicked(false);
        setIsTransactionComplete(false);
      }, 3000);
    }, 2000);
  };
  

  
  const abi={
    type:"function",
    name:"claimRewards",
    inputs:[{
      type:"uint256",
      name:"_tokenId",
      internalType:"uint56"
    },],
    outputs:[],
    stateMutability: 'nonpayable'
  }
  const callData: string[] = [];

  if (stakedTokens && stakedTokens[0]){
    stakedTokens[0].forEach((stakedToken:BigNumber)=>{
      const bytedata = ethers.Contract.getInterface([abi]).encodeFunctionData("claimRewards",[stakedToken.toNumber()]);
      callData.push(bytedata);
    });
  }
  
  

  


  
  


  return (
    <div className={styles.container}>
      <div style={{ height: "150px" }}></div>
      <h1 className={styles.h1}>POLYWATCH STAKING</h1>
      <hr className={styles["white-line"]} />
      <div style={{ height: "100px" }}></div>
      <hr className={`${styles.divider} ${styles.spacerTop}`} />

      {!address ? (
        <ConnectWallet />
      ) : (
        <>
          <h2 className={styles.tokenLabel}>YOUR TOKENS</h2>
            <div className={styles.tokenGrid}>
            <div className={styles.tokenItem}>
              <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
              <p className={styles.tokenValue}>
                <b>
                  {!claimableRewards
                    ? "Loading"
                    : ethers.utils.formatUnits(claimableRewards, 18)}
                </b>{" "}
                {tokenBalance && (
        <div className={styles.tokenImage}>
          
        </div>
      )}
              </p>
            </div>
            <div className={styles.tokenItem}>
            <h3 className={styles.tokenLabel} style={{ fontFamily: 'VT323, monospace' }}>Current Balance</h3>


            <p className={styles.tokenValue}>
              <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
              {tokenBalance && (
        <div className={styles.tokenImage}>
          

        </div> 

      )} 



              </p>
             </div>
             <div style={{ marginBottom: "90px", marginLeft: "9120px" }}></div>

             <Web3Button
  action={(contract) => contract.call("multicall", [callData])}
  contractAddress={stakingContractAddress}
  style={{
    marginLeft: "15px", // Sposta il tasto leggermente a sinistra
    marginTop: "20px",
    background: "#FF6600", // Imposta il colore di sfondo arancione
    border: "none", // Rimuovi il bordo
    color: "#FFFFFF", // Imposta il colore del testo bianco
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "8px 16px", // Imposta il padding del tasto
    borderRadius: "4px", // Aggiungi il bordo arrotondato
    textShadow: "0 0 3px rgba(255, 102, 0, 0.5), 0 0 5px rgba(255, 102, 0, 0.3), 0 0 7px rgba(255, 102, 0, 0.1)" // Aggiungi l'effetto luminoso
  }}
>
  Claim Rewards
</Web3Button>



          </div>
          <h2>Total Staked NFTs</h2>
      <div>{totalStakedNFTs.toLocaleString()}/{totalNFTs.toLocaleString()}</div>
      <div className={styles["progress-bar-container"]}>
        <div className={styles["progress-bar"]} style={{ width: `${formattedPercentage}` }} />
      </div>
      <div>{formattedPercentage}</div>
          <div style={{ height: "150px" }}></div>

          

          <hr className={`${styles.divider} ${styles.spacerTop}`} />
          <h2 className={styles.stakedLabel} style={{ fontFamily: 'VT323, monospace' }}>YOUR STAKED POLYWATCH</h2>

          <hr className={styles["white-line"]} />
          


          <div className={styles.nftBoxGrid}>
          {stakedTokens &&
  stakedTokens[0]?.map((stakedToken: BigNumber, index: number) => (
    <div key={stakedToken.toString()}>
    <NFTCard
      tokenId={stakedToken.toNumber()}
      key={stakedToken.toString()}
      name={""}
      className={""} 
    />
    
  </div>
  ))}

</div>





<hr className={`${styles.divider} ${styles.spacerTop}`} />
<div style={{ height: "150px" }}></div>

<hr className={`${styles.divider} ${styles.spacerTop}`} />
<h2 className={styles.tokenLabel}>YOUR UNSTAKED POLYWATCH</h2>
          <hr className={styles["white-line"]} />
<div className={styles.nftBoxGrid}>
  {ownedNfts?.map((nft) => (
    <div key={nft.metadata.id.toString()} className={styles.nftBox1}>
      <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftMedia} />
      <h3>{nft.metadata.name}</h3>
      <div className={styles.quantityInput}>
      
     
      
     

      <label htmlFor="stakeInput" className={styles.selectLabel1}>
    SELECT QUANTITY TO STAKE
  </label>
  <input
  type="number"
  placeholder="Stake quantity"
  value={stakeQuantity}
  onChange={(e) => setStakeQuantity(parseInt(e.target.value))}
  className={`${styles.stakeInput} stakeInput`}
  inputMode="numeric"
/>
  

<Web3Button
  contractAddress={stakingContractAddress}
  action={() => stakeNft(nft.metadata.id, stakeQuantity)}
  style={{
    backgroundColor: "#8A2BE2",
    border: "2px solid #8A2BE2",
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: "bold",
    padding: "0",
    width: "24px",
    height: "24px",
    borderRadius: "4px",
    marginTop: "15px",
    marginLeft: "180px", // Sposta il pulsante a destra di 10px
    
  }}
>
  Stake
</Web3Button>






      </div>
      
      <p
  style={{
    fontFamily: 'VT323, monospace',
    fontSize: '16px',
    color: '#b200f3',
    textShadow: '0 0 5px rgba(169, 0, 230, 0.8)',
   
    fontWeight: 'bold',
    letterSpacing: '2px',
    margin: '-10px 0',
    marginTop: '-23px',
    marginLeft: '10px',
  }}
>
  OWNED: {nft.quantityOwned}
</p>




    </div>
           ))}

          </div>
        </>
      )}
    </div>
  );
};

export default Stake;  


