import React, { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const WalletAnalyzer: React.FC = function(){
    const [walletAddress, setWalletAddress] = useState('')
    const [transactions, setTransactions] = useState<any[]>([]);
    const [analysis, setAnalysis] = useState<any>(null);

    const fetchTransactions = async function(address: string){
        try {
            const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=bbrfq1yfd3tueh2gyh2yopbo-2mber8ylzcda_wvdj8qhxfq`);
            const res = response.data.result;
            if (Array.isArray(res)){
                setTransactions(res);
            } else {
                setTransactions([]);
            }
        } catch (error) {
            setTransactions([]);
        } 
    }
    
    
    

    const analyzeTransactions = useCallback(function(){
        const analysisResult = { totalTransactions: transactions.length };
        setAnalysis(analysisResult);
    }, [transactions]);

    useEffect(() => {
        if (transactions.length > 0) {
            analyzeTransactions();
        }
    }, [transactions, analyzeTransactions]);

    const handleAnalyze = async function() {
        await fetchTransactions(walletAddress);
    } 
    

    return(
        <div className='p-4'>
            <h1>Wallet Analyzer</h1>
            <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="input input-bordered w-full max-w-xs"
                placeholder="Enter wallet address"
            />
            <button className='btn btn-outline btn-primary' onClick={handleAnalyze}>Analyze</button>
            {analysis && (
                <div>
                <h2>Analysis Result:</h2>
                <pre>{JSON.stringify(analysis, null, 2)}</pre>
                </div>
            )}
            {transactions.length > 0 && (
                <div>
                <h2>Transactions:</h2>
                <Line
                    data={{
                    labels: transactions.map((tx) => new Date(tx.timeStamp * 1000).toLocaleString()),
                    datasets: [
                        {
                        label: 'Transaction Value',
                        data: transactions.map((tx) => parseFloat(tx.value) / 1e18),
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        },
                    ],
                    }}
                />
                </div>
            )}
        </div>
    )
}

export default WalletAnalyzer;