// import React, { useState, useEffect } from 'react';
// import { BrowserProvider, Contract } from 'ethers';
// import HealthcareRecordsABI from "./HealthcareRecordsABI.json";
// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

// const contractAddress = "0x4f540EA0f0834E96A6dD67778377F466d3C35B94"; // Replace with your deployed address

// export default function Healthcare() {
//   const [provider, setProvider] = useState<BrowserProvider | null>(null);
//   const [signer, setSigner] = useState<any>(null);
//   const [contract, setContract] = useState<any>(null);
//   const [account, setAccount] = useState<string | null>(null);
//   const [isOwner, setIsOwner] = useState<boolean>(false);

//   // Separate patient IDs for add and fetch
//   const [fetchPatientID, setFetchPatientID] = useState('');
//   const [addPatientID, setAddPatientID] = useState('1');

//   const [patientName, setPatientName] = useState('');
//   const [diagnosis, setDiagnosis] = useState('');
//   const [treatment, setTreatment] = useState('');
//   const [patientRecords, setPatientRecords] = useState<any[]>([]);

//   const [providerAddress, setProviderAddress] = useState('');

//   useEffect(() => {
//     const connectWallet = async () => {
//       try {
//         const newProvider = new BrowserProvider(window.ethereum);
//         await window.ethereum.request({ method: "eth_requestAccounts" });
//         const newSigner = await newProvider.getSigner();
//         const userAddress = await newSigner.getAddress();

//         const healthcareContract = new Contract(contractAddress, HealthcareRecordsABI, newSigner);
//         const ownerAddress = await healthcareContract.getOwner();

//         setProvider(newProvider);
//         setSigner(newSigner);
//         setContract(healthcareContract);
//         setAccount(userAddress);
//         setIsOwner(userAddress.toLowerCase() === ownerAddress.toLowerCase());
//       } catch (error) {
//         console.error("Error connecting wallet:", error);
//       }
//     };
//     connectWallet();
//   }, []);

//   const fetchRecords = async () => {
//     try {
//       if (!contract) return;
//       const records = await contract.getPatientRecords(Number(fetchPatientID));
//       setPatientRecords(records);
//     } catch (error) {
//       console.error("Error fetching records:", error);
      
//     }
//   };

// //   const addRecord = async () => {
// //     try {
// //       if (!contract) return;
// //       const tx = await contract.addRecord(
// //         Number(addPatientID),
// //         patientName,
// //         diagnosis,
// //         treatment
// //       );
// //       await tx.wait();
// //       alert("Record added successfully!");
// //       fetchRecords(); // refresh records if needed
// //     } catch (error) {
// //       console.error("Error adding record:", error);
     
// //     }
// //   };

// //   const authorizeProvider = async () => {
// //     try {
// //       if (!contract || !isOwner) {
// //         alert("Only owner can authorize providers.");
// //         return;
// //       }
// //       const tx = await contract.authorizeProvider(providerAddress);
// //       await tx.wait();
// //       alert(`Provider ${providerAddress} authorized successfully`);
// //     } catch (error) {
// //       console.error("Error authorizing provider:", error);
      
// //     }
// //   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg space-y-8">
//       <h1 className="text-3xl font-bold text-center text-blue-700">Healthcare Records System</h1>

//       {account && (
//         <p className="text-center text-blue-600">
//           Connected: {account.slice(0, 6)}...{account.slice(-4)}
//         </p>
//       )}
//       {isOwner && (
//         <p className="text-center text-green-600 font-semibold">You are the contract owner</p>
//       )}

//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold text-blue-700">Fetch Patient Records</h2>
//         <input
//           type="text"
//           placeholder="Enter Patient ID"
//           value={fetchPatientID}
//           onChange={(e) => setFetchPatientID(e.target.value)}
//           className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           onClick={fetchRecords}
//           className="w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Fetch Records
//         </button>
//       </div>
// {/* 
//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold text-blue-700">Add Patient Record</h2>
//         <input
//           type="text"
//           placeholder="Patient ID"
//           value={addPatientID}
//           onChange={(e) => setAddPatientID(e.target.value)}
//           className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <input
//           type="text"
//           placeholder="Patient Name"
//           value={patientName}
//           onChange={(e) => setPatientName(e.target.value)}
//           className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <input
//           type="text"
//           placeholder="Diagnosis"
//           value={diagnosis}
//           onChange={(e) => setDiagnosis(e.target.value)}
//           className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <input
//           type="text"
//           placeholder="record value"
//           value={treatment}
//           onChange={(e) => setTreatment(e.target.value)}
//           className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           onClick={addRecord}
//           className="w-full bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition"
//         >
//           Add Record
//         </button>
//       </div> */}

//       {/* {isOwner && (
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold text-blue-700">Authorize Provider</h2>
//           <input
//             type="text"
//             placeholder="Provider Address"
//             value={providerAddress}
//             onChange={(e) => setProviderAddress(e.target.value)}
//             className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={authorizeProvider}
//             className="w-full bg-purple-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-purple-700 transition"
//           >
//             Authorize Provider
//           </button>
//         </div>
//       )} */}

//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold text-blue-700">Patient Records</h2>
//         {patientRecords.length > 0 ? (
//           patientRecords.map((record, index) => (
//             <div key={index} className="p-4 border border-blue-300 rounded-md bg-blue-50 text-blue-900 shadow-sm">
//               <p><strong>Record ID:</strong> {record.recordID.toString()}</p>
//               <p><strong>Name:</strong> {record.patientName}</p>
//               <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
//               <p><strong>record value:</strong> {record.treatment}</p>
//               <p><strong>Timestamp:</strong> {new Date(Number(record.timestamp) * 1000).toLocaleString()}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-blue-600">No records found.</p>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Mock ABI for demonstration - replace with your actual ABI
const HealthcareRecordsABI = [
  "function getOwner() view returns (address)",
  "function getPatientRecords(uint256) view returns (tuple(uint256 recordID, string patientName, string diagnosis, string treatment, uint256 timestamp)[])"
];

const contractAddress = "0x4f540EA0f0834E96A6dD67778377F466d3C35B94";

export default function Healthcare() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  // Separate patient IDs for add and fetch
  const [fetchPatientID, setFetchPatientID] = useState('');
  const [addPatientID, setAddPatientID] = useState('1');

  const [patientName, setPatientName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [patientRecords, setPatientRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [providerAddress, setProviderAddress] = useState('');

  useEffect(() => {
    const connectWallet = async () => {
      setIsConnecting(true);
      try {
        if (typeof window.ethereum !== 'undefined') {
          const newProvider = new BrowserProvider(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const newSigner = await newProvider.getSigner();
          const userAddress = await newSigner.getAddress();

          // Mock contract for demo
          const healthcareContract = {
            getOwner: () => Promise.resolve(userAddress),
            getPatientRecords: (id: number) => Promise.resolve([
              {
                recordID: BigInt(1),
                patientName: "John Doe",
                diagnosis: "Hypertension",
                treatment: "Medication prescribed",
                timestamp: BigInt(Math.floor(Date.now() / 1000))
              }
            ])
          };

          const ownerAddress = await healthcareContract.getOwner();

          setProvider(newProvider);
          setSigner(newSigner);
          setContract(healthcareContract);
          setAccount(userAddress);
          setIsOwner(userAddress.toLowerCase() === ownerAddress.toLowerCase());
        } else {
          console.error("MetaMask not detected");
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      } finally {
        setIsConnecting(false);
      }
    };
    
    connectWallet();
  }, []);

  // Clear records when input is cleared
  useEffect(() => {
    if (fetchPatientID === '') {
      setPatientRecords([]);
    }
  }, [fetchPatientID]);

  const fetchRecords = async () => {
    if (!fetchPatientID.trim()) return;
    
    setIsLoading(true);
    try {
      if (!contract) return;
      const records = await contract.getPatientRecords(Number(fetchPatientID));
      setPatientRecords(records);
    } catch (error) {
      console.error("Error fetching records:", error);
      setPatientRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.location.reload();
      } else {
        alert("Please install MetaMask to use this application");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Healthcare Records</h1>
          <p className="text-slate-300 mb-8">Connect your wallet to access the healthcare records system</p>
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
          >
            {isConnecting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Connecting...</span>
              </div>
            ) : (
              "Connect Wallet"
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="max-w-4xl mx-auto py-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-3 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-full px-6 py-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white">Healthcare Records System</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-full px-4 py-2">
              <span className="text-slate-300 text-sm">Connected: </span>
              <span className="text-cyan-400 font-mono font-semibold">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
            </div>
            {isOwner && (
              <div className="bg-emerald-500/20 border border-emerald-500 rounded-full px-4 py-2">
                <span className="text-emerald-400 font-semibold text-sm">Contract Owner</span>
              </div>
            )}
          </div>
        </div>

        {/* Fetch Patient Records Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Fetch Patient Records</h2>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Patient ID"
                value={fetchPatientID}
                onChange={(e) => setFetchPatientID(e.target.value)}
                className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              {fetchPatientID && (
                <button
                  onClick={() => setFetchPatientID('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            <button
              onClick={fetchRecords}
              disabled={!fetchPatientID.trim() || isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-lg disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Fetching Records...</span>
                </div>
              ) : (
                "Fetch Records"
              )}
            </button>
          </div>
        </div>

        {/* Patient Records Display */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Patient Records</h2>
            {patientRecords.length > 0 && (
              <div className="bg-emerald-500/20 border border-emerald-500 rounded-full px-3 py-1">
                <span className="text-emerald-400 font-semibold text-sm">
                  {patientRecords.length} record{patientRecords.length !== 1 ? 's' : ''} found
                </span>
              </div>
            )}
          </div>
          
          {patientRecords.length > 0 ? (
            <div className="space-y-4">
              {patientRecords.map((record, index) => (
                <div key={index} className="bg-slate-700/30 border border-slate-600 rounded-xl p-6 space-y-3 hover:bg-slate-700/50 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-500/20 border border-blue-500 rounded-lg px-3 py-1">
                          <span className="text-blue-400 font-semibold text-sm">
                            ID: {record.recordID.toString()}
                          </span>
                        </div>
                        <div className="text-slate-400 text-sm">
                          {new Date(Number(record.timestamp) * 1000).toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-slate-400 text-sm font-medium">Patient Name</label>
                          <p className="text-white font-semibold">{record.patientName}</p>
                        </div>
                        <div>
                          <label className="text-slate-400 text-sm font-medium">Diagnosis</label>
                          <p className="text-white font-semibold">{record.diagnosis}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-slate-400 text-sm font-medium">Treatment</label>
                        <p className="text-white font-semibold">{record.treatment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : fetchPatientID ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-700/50 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-400 text-lg">No records found for Patient ID: {fetchPatientID}</p>
              <p className="text-slate-500 text-sm mt-2">Try searching with a different patient ID</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-700/50 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-slate-400 text-lg">Enter a Patient ID to fetch records</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}