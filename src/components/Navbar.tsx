import React from "react";
import { useState, useEffect } from "react";
import Web3 from "web3";

declare global {
    interface Window {
        etherum?: any;
        web3?: {
            currentProvider: any;
        };
    }
}

const Navbar: React.FC = function () {

    const [isConnected, setIsConnected] = useState(false);
    const [ethBalance, setEthBalance] = useState<string>("");


    const detectCurrentProvider = function(): any | undefined
        {
            let provider: any | undefined;
            if (window.etherum) {
                provider = window.etherum;
            } else if (window.web3) {
                provider = window.web3.currentProvider;
            } else{
                console.log("Non-etherum browser detected. You should install Metamask")
            }
            return provider;
        }

    const onConnect = async function () {
        try {
            const currentProvider = detectCurrentProvider();
            if (currentProvider){
                await currentProvider.request({method: 'eth_requestAccounts'});
                const web3 = new Web3(currentProvider);
                const userAccount = await web3.eth.getAccounts();
                const account = userAccount[0];
                let ethBalance = await web3.eth.getBalance(account);
                const ethBalanceInEther = web3.utils.fromWei(ethBalance, 'ether');
                const truncatedBalance = Math.floor(parseFloat(ethBalanceInEther) * 10000) / 10000;
                setEthBalance(truncatedBalance.toString());
                setIsConnected(true);
            }
        }  catch (err) {
            console.log(err);
        }     
    }

    const onDisconnect = function(): any | undefined{
        setIsConnected(false);
    }


    return(
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost text-xl">Web3</a>

            </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn">
                        {
                            !isConnected ? (
                                <div> 
                                    <button className="btn btn-primary" onClick={onConnect}>
                                    Login
                                    </button>
                                </div>
                            ) : (
                                <div> 
                                    <div>
                                        <h2>Welcome: </h2> {}
                                        <div> 
                                            <span>Balance: </span>
                                            {ethBalance}
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn btn-secondary" onClick={onDisconnect}>
                                            Disconnect
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                </div>
            </div>
        </div>
    )
};

export default Navbar;
