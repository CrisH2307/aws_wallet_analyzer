import React, { useState } from 'react';
import { resolveDomain } from '../services/unstoppableDomains';

const DomainResolver: React.FC = function() {
    const [domain, setDomain] = useState('');
    const [result, setResult] = useState<any>(null);

    const handleResolve = async function () {
        try {
            const data = await resolveDomain(domain);
            setResult(data)
        } catch(error) {
            console.error('Error resolving domain: ', error)
        }   
    };

    return(
        <div className='p-4'>
            <h1 className=''>Domain Resolver</h1>
            <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="input input-bordered w-full max-w-xs"
                placeholder="Enter domain"
            />
            <button className='btn btn-outline btn-primary' onClick={handleResolve}>Resolve</button>
            {result && (
                <div>
                <h2>Result:</h2>
                <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}


export default DomainResolver;
