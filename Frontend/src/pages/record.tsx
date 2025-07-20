
// import React, { useState, useEffect } from 'react';
// import { BrowserProvider, Contract } from 'ethers';
// import HealthcareRecordsABI from "../assets/HealthcareRecordsABI.json";

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

//   const addRecord = async () => {
//     try {
//       if (!contract) return;
//       const tx = await contract.addRecord(
//         Number(addPatientID),
//         patientName,
//         diagnosis,
//         treatment
//       );
//       await tx.wait();
//       alert("Record added successfully!");
//       fetchRecords(); // refresh records if needed
//     } catch (error) {
//       console.error("Error adding record:", error);
     
//     }
//   };

//   const authorizeProvider = async () => {
//     try {
//       if (!contract || !isOwner) {
//         alert("Only owner can authorize providers.");
//         return;
//       }
//       const tx = await contract.authorizeProvider(providerAddress);
//       await tx.wait();
//       alert(`Provider ${providerAddress} authorized successfully`);
//     } catch (error) {
//       console.error("Error authorizing provider:", error);
      
//     }
//   };

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
//       </div>

//       {isOwner && (
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
//       )}

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
// import React, { useState, useEffect } from 'react';
// import { BrowserProvider, Contract } from 'ethers';
// import HealthcareRecordsABI from "../assets/HealthcareRecordsABI.json";

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

//   const [addPatientID, setAddPatientID] = useState('');
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
//       const patientID = 1; // Hardcoded patient ID
//       const records = await contract.getPatientRecords(patientID);
//       setPatientRecords(records);
//     } catch (error) {
//       console.error("Error fetching records:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRecords(); // Auto-fetch on mount when contract is ready
//   }, [contract]);

//   const addRecord = async () => {
//     try {
//       if (!contract) return;
//       const tx = await contract.addRecord(
//         Number(addPatientID),
//         patientName,
//         diagnosis,
//         treatment
//       );
//       await tx.wait();
//     setAddPatientID('');
//     setPatientName('');
//     setDiagnosis('');
//     setTreatment('');
//     fetchRecords();
//       alert("Record added successfully!");
//       fetchRecords(); // Refresh after adding
//     } catch (error) {
//       console.error("Error adding record:", error);
//     }
//   };

//   const authorizeProvider = async () => {
//     try {
//       if (!contract || !isOwner) {
//         alert("Only owner can authorize providers.");
//         return;
//       }
//       const tx = await contract.authorizeProvider(providerAddress);
//       await tx.wait();
//       alert(`Provider ${providerAddress} authorized successfully`);
//     } catch (error) {
//       console.error("Error authorizing provider:", error);
//     }
//   };

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
//         <h2 className="text-xl font-semibold text-blue-700">Add My measurement Records</h2>
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
//           placeholder="Record Value"
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
//       </div>

//       {isOwner && (
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
//       )}

//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold text-blue-700">My records </h2>
//         {patientRecords.length > 0 ? (
//           patientRecords.map((record, index) => (
//             <div key={index} className="p-4 border border-blue-300 rounded-md bg-blue-50 text-blue-900 shadow-sm">
//               <p><strong>Record ID:</strong> {record.recordID.toString()}</p>
//               <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
//               <p><strong>Record Value:</strong> {record.treatment}</p>
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




// import React, { useState, useEffect } from 'react';
// import { BrowserProvider, Contract } from 'ethers';
// import { ArrowLeft, Shield, User, FileText, Plus, Hospital, UserPlus, Activity } from 'lucide-react';
// import HealthcareRecordsABI from "../assets/HealthcareRecordsABI.json";

// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

// const contractAddress = "0x4f540EA0f0834E96A6dD67778377F466d3C35B94";

// export default function Healthcare() {
//   const [provider, setProvider] = useState<BrowserProvider | null>(null);
//   const [signer, setSigner] = useState<any>(null);
//   const [contract, setContract] = useState<any>(null);
//   const [account, setAccount] = useState<string | null>(null);
//   const [isOwner, setIsOwner] = useState<boolean>(false);

//   const [addPatientID, setAddPatientID] = useState('');
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
//       const patientID = 1;
//       const records = await contract.getPatientRecords(patientID);
//       setPatientRecords(records);
//     } catch (error) {
//       console.error("Error fetching records:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRecords();
//   }, [contract]);

//   const addRecord = async () => {
//     try {
//       if (!contract) return;
//       const tx = await contract.addRecord(
//         Number(addPatientID),
//         patientName,
//         diagnosis,
//         treatment
//       );
//       await tx.wait();
//       setAddPatientID('');
//       setPatientName('');
//       setDiagnosis('');
//       setTreatment('');
//       fetchRecords();
//       alert("Record added successfully!");
//     } catch (error) {
//       console.error("Error adding record:", error);
//     }
//   };

//   const authorizeProvider = async () => {
//     try {
//       if (!contract || !isOwner) {
//         alert("Only owner can authorize providers.");
//         return;
//       }
//       const tx = await contract.authorizeProvider(providerAddress);
//       await tx.wait();
//       alert(`Provider ${providerAddress} authorized successfully`);
//       setProviderAddress('');
//     } catch (error) {
//       console.error("Error authorizing provider:", error);
//     }
//   };

//   const handleBackToDashboard = () => {
//     window.location.href = '/dashboard';
//   };

//   return (
//     <div 
//       className="min-h-screen bg-cover bg-center bg-fixed relative"
//       style={{
//         backgroundImage: `
//           linear-gradient(135deg, rgba(30, 58, 138, 0.85) 0%, rgba(59, 130, 246, 0.75) 35%, rgba(147, 197, 253, 0.65) 100%),
//           url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><pattern id="hospital-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="%23ffffff" stroke-width="0.8" opacity="0.08"/></pattern><pattern id="medical-crosses" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse"><g fill="%23ffffff" opacity="0.06"><rect x="50" y="30" width="20" height="60"/><rect x="30" y="50" width="60" height="20"/></g></pattern></defs><rect width="1200" height="800" fill="%23f0f9ff"/><rect width="1200" height="800" fill="url(%23hospital-grid)"/><rect width="1200" height="800" fill="url(%23medical-crosses)"/><g opacity="0.04"><circle cx="200" cy="200" r="150" fill="none" stroke="%23ffffff" stroke-width="3"/><circle cx="200" cy="200" r="120" fill="none" stroke="%23ffffff" stroke-width="2"/><circle cx="200" cy="200" r="90" fill="none" stroke="%23ffffff" stroke-width="1.5"/><circle cx="1000" cy="300" r="180" fill="none" stroke="%23ffffff" stroke-width="2.5"/><circle cx="1000" cy="300" r="140" fill="none" stroke="%23ffffff" stroke-width="1.5"/><circle cx="300" cy="600" r="100" fill="none" stroke="%23ffffff" stroke-width="2"/><circle cx="300" cy="600" r="70" fill="none" stroke="%23ffffff" stroke-width="1"/><circle cx="900" cy="650" r="90" fill="none" stroke="%23ffffff" stroke-width="1.5"/></g><g fill="%23ffffff" opacity="0.05"><polygon points="150,400 180,400 180,370 210,370 210,400 240,400 240,430 210,430 210,460 180,460 180,430 150,430"/><polygon points="950,150 980,150 980,120 1010,120 1010,150 1040,150 1040,180 1010,180 1010,210 980,210 980,180 950,180"/><polygon points="450,600 480,600 480,570 510,570 510,600 540,600 540,630 510,630 510,660 480,660 480,630 450,630"/></g><g opacity="0.03"><rect x="100" y="100" width="200" height="120" rx="10" fill="none" stroke="%23ffffff" stroke-width="2"/><rect x="105" y="105" width="190" height="110" rx="8" fill="none" stroke="%23ffffff" stroke-width="1"/><rect x="800" y="400" width="180" height="100" rx="8" fill="none" stroke="%23ffffff" stroke-width="1.5"/><rect x="805" y="405" width="170" height="90" rx="6" fill="none" stroke="%23ffffff" stroke-width="1"/></g></svg>'),
//           url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')
//         `,
//         backgroundBlendMode: 'overlay, overlay, normal',
//         backgroundSize: 'auto, auto, cover'
//       }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-blue-600/15"></div>
      
//       <div className="relative z-10">
//         <div className="container mx-auto px-3 py-4">
//           <button
//             onClick={handleBackToDashboard}
//             className="mb-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm text-blue-800 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 shadow border border-blue-200"
//           >
//             <ArrowLeft size={16} className="text-blue-600" />
//             <span className="text-sm">Back to Dashboard</span>
//           </button>

//           <div className="max-w-4xl mx-auto space-y-4">
//             <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-blue-300 p-4">
//               <div className="flex items-center justify-center gap-2 mb-3">
//                 <Hospital className="text-blue-700" size={24} />
//                 <div className="text-center">
//                   <h1 className="text-xl font-bold text-blue-800">Hospital Management</h1>
//                   <p className="text-blue-600 text-sm">Records & Authorization</p>
//                 </div>
//               </div>
              
//               {account && (
//                 <div className="text-center space-y-2">
//                   <div className="flex items-center justify-center gap-2">
//                     <User className="text-blue-600" size={16} />
//                     <p className="text-blue-800 text-sm font-medium">
//                       Connected: {account.slice(0, 6)}...{account.slice(-4)}
//                     </p>
//                   </div>
//                   {isOwner && (
//                     <div className="flex items-center justify-center gap-2">
//                       <Shield className="text-green-600" size={16} />
//                       <p className="text-green-700 text-sm font-semibold bg-green-100 px-2 py-1 rounded-lg">
//                         Admin
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-blue-300 p-4">
//               <div className="flex items-center gap-2 mb-4">
//                 <Plus className="text-blue-700" size={20} />
//                 <h2 className="text-lg font-bold text-blue-800">Add Patient Record</h2>
//               </div>
              
//               <div className="grid lg:grid-cols-2 gap-4">
//                 <div className="space-y-3">
//                   <div className="space-y-1">
//                     <label className="flex items-center gap-1 text-blue-800 font-medium text-sm">
//                       <Activity size={14} />
//                       Patient ID
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Patient ID"
//                       value={addPatientID}
//                       onChange={(e) => setAddPatientID(e.target.value)}
//                       className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-sm bg-blue-50/50"
//                     />
//                   </div>
//                   <div className="space-y-1">
//                     <label className="flex items-center gap-1 text-blue-800 font-medium text-sm">
//                       <User size={14} />
//                       Patient Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Patient Name"
//                       value={patientName}
//                       onChange={(e) => setPatientName(e.target.value)}
//                       className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-sm bg-blue-50/50"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="space-y-1">
//                     <label className="flex items-center gap-1 text-blue-800 font-medium text-sm">
//                       <FileText size={14} />
//                       Diagnosis
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Diagnosis"
//                       value={diagnosis}
//                       onChange={(e) => setDiagnosis(e.target.value)}
//                       className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-sm bg-blue-50/50"
//                     />
//                   </div>
//                   <div className="space-y-1">
//                     <label className="flex items-center gap-1 text-blue-800 font-medium text-sm">
//                       <Activity size={14} />
//                       Treatment
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Treatment"
//                       value={treatment}
//                       onChange={(e) => setTreatment(e.target.value)}
//                       className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-sm bg-blue-50/50"
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               <button
//                 onClick={addRecord}
//                 className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow hover:shadow-md text-sm"
//               >
//                 <Plus className="inline mr-1" size={16} />
//                 Add Record
//               </button>
//             </div>

//             {isOwner && (
//               <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-purple-300 p-4">
//                 <div className="flex items-center gap-2 mb-4">
//                   <UserPlus className="text-purple-700" size={20} />
//                   <h2 className="text-lg font-bold text-purple-800">Authorize Provider</h2>
//                 </div>
                
//                 <div className="space-y-3">
//                   <div className="space-y-1">
//                     <label className="flex items-center gap-1 text-purple-800 font-medium text-sm">
//                       <Shield size={14} />
//                       Provider Address
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Provider Wallet Address"
//                       value={providerAddress}
//                       onChange={(e) => setProviderAddress(e.target.value)}
//                       className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 text-sm bg-purple-50/50"
//                     />
//                   </div>
                  
//                   <button
//                     onClick={authorizeProvider}
//                     className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow hover:shadow-md text-sm"
//                   >
//                     <Shield className="inline mr-1" size={16} />
//                     Grant Access
//                   </button>
//                 </div>
//               </div>
//             )}

//             <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-blue-300 p-4">
//               <div className="flex items-center gap-2 mb-4">
//                 <FileText className="text-blue-700" size={20} />
//                 <h2 className="text-lg font-bold text-blue-800">Patient Records</h2>
//               </div>
              
//               {patientRecords.length > 0 ? (
//                 <div className="grid gap-4">
//                   {patientRecords.map((record, index) => (
//                     <div key={index} className="p-4 border-2 border-blue-200 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 shadow hover:shadow-md transition-all duration-200">
//                       <div className="grid lg:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <div className="flex items-center gap-2">
//                             <span className="font-semibold text-blue-800 text-sm">Record ID:</span>
//                             <span className="text-blue-700 bg-blue-200 px-2 py-1 rounded-full text-xs font-medium">
//                               #{record.recordID.toString()}
//                             </span>
//                           </div>
//                           <div>
//                             <span className="font-semibold text-blue-800 text-sm flex items-center gap-1">
//                               <User size={12} />
//                               Name:
//                             </span>
//                             <p className="text-blue-900 text-sm ml-4">{record.patientName}</p>
//                           </div>
//                           <div>
//                             <span className="font-semibold text-blue-800 text-sm flex items-center gap-1">
//                               <FileText size={12} />
//                               Diagnosis:
//                             </span>
//                             <p className="text-blue-900 text-sm ml-4">{record.diagnosis}</p>
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <div>
//                             <span className="font-semibold text-blue-800 text-sm flex items-center gap-1">
//                               <Activity size={12} />
//                               Treatment:
//                             </span>
//                             <p className="text-blue-900 text-sm ml-4">{record.treatment}</p>
//                           </div>
//                           <div>
//                             <span className="font-semibold text-blue-800 text-sm flex items-center gap-1">
//                               <Shield size={12} />
//                               Date:
//                             </span>
//                             <p className="text-blue-700 text-xs ml-4 bg-blue-200 px-2 py-1 rounded-lg">
//                               {new Date(Number(record.timestamp) * 1000).toLocaleString()}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <Hospital className="mx-auto text-blue-400 mb-3" size={32} />
//                   <h3 className="text-blue-700 text-lg font-semibold">No Records Found</h3>
//                   <p className="text-blue-600 text-sm">Add a patient record above.</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React from 'react';
import DoctorHealthcare from '../components/Records/doctorrecords';
import NormalHealthcare from '../components/Records/patientrecords';

export default function HealthcareWrapper() {
  const isDoctor = localStorage.getItem('isDoctor') === 'true';

  return (
    <>
      {isDoctor ? <DoctorHealthcare /> : <NormalHealthcare />}
    </>
  );
}