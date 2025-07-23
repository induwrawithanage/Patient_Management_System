import { useState } from "react";

type Patient = {
  id: string;
  name: string;
  age: number;
  contact: string;
};

const dummyPatients: Patient[] = [
  { id: "1", name: "John Doe", age: 45, contact: "0712345678" },
  { id: "2", name: "Jane Smith", age: 32, contact: "0723456789" },
  { id: "3", name: "Malith Kariyawasam", age: 28, contact: "0759876543" },
];

function AddPatient() {
  const [search, setSearch] = useState("");
  const [availablePatients, setAvailablePatients] = useState<Patient[]>(dummyPatients);
  const [selectedPatients, setSelectedPatients] = useState<Patient[]>([]);

  const filteredPatients = availablePatients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (patient: Patient) => {
    setSelectedPatients([...selectedPatients, patient]);
    setAvailablePatients(availablePatients.filter((p) => p.id !== patient.id));
  };

  const handleRemove = (patient: Patient) => {
    setAvailablePatients([...availablePatients, patient]);
    setSelectedPatients(selectedPatients.filter((p) => p.id !== patient.id));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Add Patient</h1>

      <input
        type="text"
        placeholder="Search patients..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Available Patients */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Available Patients</h2>
          <div className="space-y-3">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
                >
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-gray-600">
                      Age: {patient.age}, Contact: {patient.contact}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAdd(patient)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No matching patients found.</p>
            )}
          </div>
        </div>

        {/* Selected Patients */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Selected Patients</h2>
          <div className="space-y-3">
            {selectedPatients.length > 0 ? (
              selectedPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex justify-between items-center bg-green-100 p-3 rounded-lg shadow-sm"
                >
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-gray-700">
                      Age: {patient.age}, Contact: {patient.contact}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(patient)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No patients selected.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPatient;
