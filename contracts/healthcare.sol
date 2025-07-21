// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthcareRecords {
    address owner;

    struct TestEntry {
        string testName;
        string testValue;
    }

    struct Record {
        uint256 recordID;
        string patientName;
        string diagnosis;
        string treatment;
        uint256 timestamp;
        TestEntry[] tests;  // dynamic array of test results
    }

    mapping(uint256 => Record[]) private patientRecords;

    mapping(address => bool) private authorizedProviders;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this function");
        _;
    }

  modifier onlyAuthorizedProvider() {
    require(
        msg.sender == owner || authorizedProviders[msg.sender],
        "Not an authorized provider"
    );
    _;
}


    constructor() {
        owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function authorizeProvider(address provider) public onlyOwner {
        authorizedProviders[provider] = true;
    }

    // Add a new record for a patient (with basic info but no tests initially)
    function addRecord(
        uint256 patientID,
        string memory patientName,
        string memory diagnosis,
        string memory treatment
    ) public onlyAuthorizedProvider {
        uint256 recordID = patientRecords[patientID].length + 1;
        Record storage newRecord = patientRecords[patientID].push();
        newRecord.recordID = recordID;
        newRecord.patientName = patientName;
        newRecord.diagnosis = diagnosis;
        newRecord.treatment = treatment;
        newRecord.timestamp = block.timestamp;
    }

    // Add test entry to an existing patient record
    function addTestEntry(
        uint256 patientID,
        uint256 recordID,
        string memory testName,
        string memory testValue
    ) public onlyAuthorizedProvider {
        require(recordID > 0 && recordID <= patientRecords[patientID].length, "Invalid record ID");

        Record storage record = patientRecords[patientID][recordID - 1];
        record.tests.push(TestEntry(testName, testValue));
    }

    // Get all records of a patient
    function getPatientRecords(uint256 patientID) public view onlyAuthorizedProvider returns (Record[] memory) {
        return patientRecords[patientID];
    }

    // Get test entries of a particular record
    function getTestEntries(uint256 patientID, uint256 recordID) public view onlyAuthorizedProvider returns (TestEntry[] memory) {
        require(recordID > 0 && recordID <= patientRecords[patientID].length, "Invalid record ID");
        return patientRecords[patientID][recordID - 1].tests;
    }
}
