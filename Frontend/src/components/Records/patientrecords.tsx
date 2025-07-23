import React, { useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import { ArrowLeft, Shield, User, FileText, Plus, Hospital, UserPlus, Activity } from 'lucide-react';
import HealthcareRecordsABI from "./HealthcareRecordsABI.json";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const contractAddress = "0x4f540EA0f0834E96A6dD67778377F466d3C35B94";

export default function Healthcare() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const [addPatientID, setAddPatientID] = useState('');
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
      const patientID = 1;
      const records = await contract.getPatientRecords(patientID);
      setPatientRecords(records);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [contract]);

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
      setAddPatientID('');
      setPatientName('');
      setDiagnosis('');
      setTreatment('');
      fetchRecords();
      alert("Record added successfully!");
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
      setProviderAddress('');
    } catch (error) {
      console.error("Error authorizing provider:", error);
    }
  };

  const handleBackToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-100">
      <div className="relative z-10">
        <div className="container mx-auto px-3 py-4">
          {/* Removed Back to Dashboard button */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg border-2 border-gray-600 p-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Hospital className="text-blue-400" size={24} />
                <div className="text-center">
                  <h1 className="text-xl font-bold text-gray-100">Hospital Management</h1>
                  <p className="text-gray-300 text-sm">Records & Authorization</p>
                </div>
              </div>
              
              {account && (
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <User className="text-blue-400" size={16} />
                    <p className="text-gray-100 text-sm font-medium">
                      Connected: {account.slice(0, 6)}...{account.slice(-4)}
                    </p>
                  </div>
                  {isOwner && (
                    <div className="flex items-center justify-center gap-2">
                      <Shield className="text-green-600" size={16} />
                      <p className="text-green-700 text-sm font-semibold bg-green-100 px-2 py-1 rounded-lg">
                        Admin
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg border-2 border-gray-600 p-4">
              <div className="flex items-center gap-2 mb-4">
                <Plus className="text-blue-400" size={20} />
                <h2 className="text-lg font-bold text-gray-100">Add Patient Record</h2>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-gray-100 font-medium text-sm">
                      <Activity size={14} />
                      Patient ID
                    </label>
                    <input
                      type="text"
                      placeholder="Patient ID"
                      value={addPatientID}
                      onChange={(e) => setAddPatientID(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 text-sm text-gray-100 placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-gray-100 font-medium text-sm">
                      <User size={14} />
                      Patient Name
                    </label>
                    <input
                      type="text"
                      placeholder="Patient Name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 text-sm text-gray-100 placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-gray-100 font-medium text-sm">
                      <FileText size={14} />
                      Diagnosis
                    </label>
                    <input
                      type="text"
                      placeholder="Diagnosis"
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 text-sm text-gray-100 placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-gray-100 font-medium text-sm">
                      <Activity size={14} />
                      Treatment
                    </label>
                    <input
                      type="text"
                      placeholder="Treatment"
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 text-sm text-gray-100 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
              
              <button
                onClick={addRecord}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow hover:shadow-md text-sm"
              >
                <Plus className="inline mr-1" size={16} />
                Add Record
              </button>
            </div>

            {isOwner && (
              <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg border-2 border-gray-600 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <UserPlus className="text-blue-400" size={20} />
                  <h2 className="text-lg font-bold text-gray-100">Authorize Provider</h2>
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-gray-100 font-medium text-sm">
                      <Shield size={14} />
                      Provider Address
                    </label>
                    <input
                      type="text"
                      placeholder="Provider Wallet Address"
                      value={providerAddress}
                      onChange={(e) => setProviderAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 text-sm text-gray-100 placeholder-gray-400"
                    />
                  </div>
                  
                  <button
                    onClick={authorizeProvider}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow hover:shadow-md text-sm"
                  >
                    <Shield className="inline mr-1" size={16} />
                    Grant Access
                  </button>
                </div>
              </div>
            )}

            <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg border-2 border-gray-600 p-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="text-blue-400" size={20} />
                <h2 className="text-lg font-bold text-gray-100">Patient Records</h2>
              </div>
              
              {patientRecords.length > 0 ? (
                <div className="grid gap-4">
                  {patientRecords.map((record, index) => (
                    <div key={index} className="p-4 border-2 border-gray-500 rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 shadow hover:shadow-md transition-all duration-200">
                      <div className="grid lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-100 text-sm">Record ID:</span>
                            <span className="text-gray-100 bg-gray-700/50 px-2 py-1 rounded-full text-xs font-medium">
                              #{record.recordID.toString()}
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-100 text-sm flex items-center gap-1">
                              <User size={12} />
                              Name:
                            </span>
                            <p className="text-gray-100 text-sm ml-4">{record.patientName}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-100 text-sm flex items-center gap-1">
                              <FileText size={12} />
                              Diagnosis:
                            </span>
                            <p className="text-gray-100 text-sm ml-4">{record.diagnosis}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="font-semibold text-gray-100 text-sm flex items-center gap-1">
                              <Activity size={12} />
                              Treatment:
                            </span>
                            <p className="text-gray-100 text-sm ml-4">{record.treatment}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-100 text-sm flex items-center gap-1">
                              <Shield size={12} />
                              Date:
                            </span>
                            <p className="text-gray-100 text-xs ml-4 bg-gray-700/50 px-2 py-1 rounded-lg">
                              {new Date(Number(record.timestamp) * 1000).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Hospital className="mx-auto text-blue-400 mb-3" size={32} />
                  <h3 className="text-gray-100 text-lg font-semibold">No Records Found</h3>
                  <p className="text-gray-300 text-sm">Add a patient record above.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}