import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const address = useAddress();
    const disconnect = useDisconnect();

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    function disconnectWallet() {
        disconnect();
        setIsProfileDropdownOpen(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <Link href="/">
                    <p>Home</p>
                </Link>
                <div className={styles.navLinks}>
                    <Link href="/shop">
                        <p>Shop</p>
                    </Link>
                    <Link href="/marketplace">
                        <p>Marketplace</p>
                    </Link>
                    <Link href="/stake">
                        <p>Stake</p>
                    </Link>
                    <Link href="https://polywatchmobile.vercel.app">
                    <p>MOBILE</p>
                    </Link>
                </div>
                <div>
                    {!address ? (
                        <ConnectWallet 
                            btnTitle="Login"
                            theme="light"
                            className={styles.connectWalletBtn}
                        />
                    ) : (
                        <div
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                        >
                            <img src={`https://15065ae3c21e0bff07eaf80b713a6ef0.ipfscdn.io/ipfs/bafybeifq4qe2zzdfoqkpur3lqzeainuw7yg3dkqgn7l5dydn7cgcc6cnmm/46u4u.png`} alt="avatar" className={styles.avatar}/>
                        </div>
                    )}
                </div>
                {isProfileDropdownOpen && (
                    <div className={styles.profileDropdown}>
                        <Link href="/myPacks">
                            <p>My Packs</p>
                        </Link>
                        <Link href="/myCards">
                            <p>My Polywatch</p>
                        </Link>
                        
                        <button
                            onClick={disconnectWallet}
                        >Logout</button>
                    </div>
                )}
            </div>
        </div>
    )
}
