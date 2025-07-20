// import React, { useState } from "react";
// import { BrowserProvider, Contract } from "ethers";
// import HealthcareRecordsABI from "../assets/HealthcareRecordsABI.json"
// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

// const contractAddress = "YOUR_CONTRACT_ADDRESS";

// export default function AddTestEntry() {
//   const [patientID, setPatientID] = useState("");
//   const [recordID, setRecordID] = useState("");
//   const [testName, setTestName] = useState("");
//   const [testValue, setTestValue] = useState("");
//   const [txHash, setTxHash] = useState("");

//   const handleAddTestEntry = async () => {
//     try {
//       if (!window.ethereum) {
//         alert("MetaMask not detected");
//         return;
//       }

//       await window.ethereum.request({ method: "eth_requestAccounts" });
//       const provider = new BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const contract = new Contract(
//         contractAddress,
//         HealthcareRecordsABI,
//         signer
//       );

//       const tx = await contract.addTestEntry(
//         patientID,
//         recordID,
//         testName,
//         testValue
//       );

//       console.log("Transaction sent:", tx.hash);
//       setTxHash(tx.hash);

//       await tx.wait();
//       console.log("Transaction confirmed");
//       alert("Test entry added successfully!");

//     } catch (error: any) {
//       console.error("Error adding test entry:", error);
//       alert("Error: " + error.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
//       <h2 className="text-2xl font-bold text-center">Add Test Entry</h2>

//       <input
//         type="text"
//         placeholder="Patient ID"
//         value={patientID}
//         onChange={(e) => setPatientID(e.target.value)}
//         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//       />

//       <input
//         type="text"
//         placeholder="Record ID"
//         value={recordID}
//         onChange={(e) => setRecordID(e.target.value)}
//         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//       />

//       <input
//         type="text"
//         placeholder="Test Name"
//         value={testName}
//         onChange={(e) => setTestName(e.target.value)}
//         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//       />

//       <input
//         type="text"
//         placeholder="Test Value"
//         value={testValue}
//         onChange={(e) => setTestValue(e.target.value)}
//         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//       />

//       <button
//         onClick={handleAddTestEntry}
//         className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//       >
//         Add Test Entry (MetaMask)
//       </button>

//       {txHash && (
//         <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md break-words">
//           Transaction Hash:<br /> {txHash}
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import HealthcareRecordsABI from "../assets/HealthcareRecordsABI.json";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const contractAddress = "0x4f540EA0f0834E96A6dD67778377F466d3C35B94"; // Replace with your deployed address

export default function Healthcare() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  // Separate patient IDs for add and fetch
  const [fetchPatientID, setFetchPatientID] = useState('');
  const [addPatientID, setAddPatientID] = useState('1');

  const [patientName, setPatientName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [patientRecords, setPatientRecords] = useState<any[]>([]);

  const [providerAddress, setProviderAddress] = useState('');

  useEffect(() => {
    const connectWallet = async () => {
      try {
        const newProvider = new BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const newSigner = await newProvider.getSigner();
        const userAddress = await newSigner.getAddress();

        const healthcareContract = new Contract(contractAddress, HealthcareRecordsABI, newSigner);
        const ownerAddress = await healthcareContract.getOwner();

        setProvider(newProvider);
        setSigner(newSigner);
        setContract(healthcareContract);
        setAccount(userAddress);
        setIsOwner(userAddress.toLowerCase() === ownerAddress.toLowerCase());
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };
    connectWallet();
  }, []);

  const fetchRecords = async () => {
    try {
      if (!contract) return;
      const records = await contract.getPatientRecords(Number(fetchPatientID));
      setPatientRecords(records);
    } catch (error) {
      console.error("Error fetching records:", error);
      
    }
  };

  const addRecord = async () => {
    try {
      if (!contract) return;
      const tx = await contract.addRecord(
        Number(addPatientID),
        patientName,
        diagnosis,
        treatment
      );
      await tx.wait();
      alert("Record added successfully!");
      fetchRecords(); // refresh records if needed
    } catch (error) {
      console.error("Error adding record:", error);
     
    }
  };

  const authorizeProvider = async () => {
    try {
      if (!contract || !isOwner) {
        alert("Only owner can authorize providers.");
        return;
      }
      const tx = await contract.authorizeProvider(providerAddress);
      await tx.wait();
      alert(`Provider ${providerAddress} authorized successfully`);
    } catch (error) {
      console.error("Error authorizing provider:", error);
      
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg space-y-8">
      <h1 className="text-3xl font-bold text-center text-blue-700">Healthcare Records System</h1>

      {account && (
        <p className="text-center text-blue-600">
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      )}
      {isOwner && (
        <p className="text-center text-green-600 font-semibold">You are the contract owner</p>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-700">Fetch Patient Records</h2>
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={fetchPatientID}
          onChange={(e) => setFetchPatientID(e.target.value)}
          className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchRecords}
          className="w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Fetch Records
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-700">Add Patient Record</h2>
        <input
          type="text"
          placeholder="Patient ID"
          value={addPatientID}
          onChange={(e) => setAddPatientID(e.target.value)}
          className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="record value"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addRecord}
          className="w-full bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Add Record
        </button>
      </div>

      {isOwner && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-700">Authorize Provider</h2>
          <input
            type="text"
            placeholder="Provider Address"
            value={providerAddress}
            onChange={(e) => setProviderAddress(e.target.value)}
            className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={authorizeProvider}
            className="w-full bg-purple-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Authorize Provider
          </button>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-700">Patient Records</h2>
        {patientRecords.length > 0 ? (
          patientRecords.map((record, index) => (
            <div key={index} className="p-4 border border-blue-300 rounded-md bg-blue-50 text-blue-900 shadow-sm">
              <p><strong>Record ID:</strong> {record.recordID.toString()}</p>
              <p><strong>Name:</strong> {record.patientName}</p>
              <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
              <p><strong>record value:</strong> {record.treatment}</p>
              <p><strong>Timestamp:</strong> {new Date(Number(record.timestamp) * 1000).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-blue-600">No records found.</p>
        )}
      </div>
    </div>
  );
}
