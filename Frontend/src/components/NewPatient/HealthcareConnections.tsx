import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { UserPlus, Trash2, Phone, Mail, Stethoscope, Heart, Search, Eye, Users } from "lucide-react"; // Removed Nurse as it is not exported
import { useToast } from "../../hooks/use-toast";

interface HealthcareProvider {
  id: string;
  name: string;
  type: 'doctor' | 'nurse' | 'specialist' | 'therapist';
  specialty?: string;
  hospital: string;
  phone: string;
  email: string;
}

const HealthcareConnections = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [connections, setConnections] = useState<HealthcareProvider[]>([
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      type: "doctor",
      specialty: "Cardiology",
      hospital: "National Hospital, Colombo",
      phone: "+94 11 123 4567",
      email: "dr.johnson@hospital.com"
    },
    {
      id: "2",
      name: "Nurse Emily Davis",
      type: "nurse",
      hospital: "City Medical Center, Kandy",
      phone: "+94 11 234 5678",
      email: "e.davis@medical.com"
    },
    {
      id: "3",
      name: "Dr. Rohan Perera",
      type: "specialist",
      specialty: "Pediatrics",
      hospital: "Lanka Hospitals, Colombo",
      phone: "+94 77 987 6543",
      email: "dr.perera@lankahospitals.lk"
    },
    {
      id: "4",
      name: "Mr. Aloka Fernando",
      type: "therapist",
      specialty: "Physical Therapy",
      hospital: "Healthy Steps Clinic, Galle",
      phone: "+94 71 345 6789",
      email: "aloka.therapy@clinic.com"
    }
  ]);

  const [newConnection, setNewConnection] = useState({
    name: "",
    type: "doctor" as const,
    specialty: "",
    hospital: "",
    phone: "",
    email: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getTypeIcon = (type: HealthcareProvider['type']) => {
    switch (type) {
      case 'doctor':
        return <Stethoscope className="h-4 w-4 text-blue-600" />;
      case 'nurse':
        return <Users className="h-4 w-4 text-green-600" />; // Replaced Nurse with Users icon
      case 'specialist':
        return <Heart className="h-4 w-4 text-red-600" />;
      case 'therapist':
        return <Users className="h-4 w-4 text-purple-600" />;
      default:
        return <Stethoscope className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeBadgeColor = (type: HealthcareProvider['type']) => {
    switch (type) {
      case 'doctor':
        return 'bg-blue-50 text-blue-700 ring-blue-200';
      case 'nurse':
        return 'bg-green-50 text-green-700 ring-green-200';
      case 'specialist':
        return 'bg-purple-50 text-purple-700 ring-purple-200';
      case 'therapist':
        return 'bg-orange-50 text-orange-700 ring-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-200';
    }
  };

  const handleAddConnection = () => {
    if (!newConnection.name || !newConnection.hospital || !newConnection.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Hospital/Clinic, Phone Number).",
        variant: "destructive"
      });
      return;
    }

    const connection: HealthcareProvider = {
      ...newConnection,
      id: Date.now().toString()
    };

    setConnections(prev => [...prev, connection]);
    setNewConnection({
      name: "",
      type: "doctor",
      specialty: "",
      hospital: "",
      phone: "",
      email: ""
    });
    setIsDialogOpen(false);

    toast({
      title: "Connection Added",
      description: `${connection.name} has been added to your healthcare connections.`,
    });
  };

  const handleRemoveConnection = (id: string) => {
    const connection = connections.find(c => c.id === id);
    setConnections(prev => prev.filter(c => c.id !== id));
    
    toast({
      title: "Connection Removed",
      description: `${connection?.name} has been removed from your connections.`,
    });
  };

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (connection.specialty && connection.specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
    connection.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8 flex items-center justify-center">
      <Card className="w-full max-w-4xl rounded-2xl shadow-xl border border-gray-100 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-t-2xl flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <UserPlus className="h-7 w-7" />
            Healthcare Connections
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-lg shadow-sm transition-all duration-200"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Connection
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-xl font-bold text-gray-800">Add Healthcare Provider</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    value={newConnection.name}
                    onChange={(e) => setNewConnection(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Provider's full name"
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <Label htmlFor="type" className="text-sm font-medium text-gray-700">Type</Label>
                  <select
                    id="type"
                    value={newConnection.type}
                    onChange={(e) => setNewConnection(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="specialist">Specialist</option>
                    <option value="therapist">Therapist</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="specialty" className="text-sm font-medium text-gray-700">Specialty</Label>
                  <Input
                    id="specialty"
                    value={newConnection.specialty}
                    onChange={(e) => setNewConnection(prev => ({ ...prev, specialty: e.target.value }))}
                    placeholder="e.g., Cardiology, General Medicine"
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <Label htmlFor="hospital" className="text-sm font-medium text-gray-700">Hospital/Clinic <span className="text-red-500">*</span></Label>
                  <Input
                    id="hospital"
                    value={newConnection.hospital}
                    onChange={(e) => setNewConnection(prev => ({ ...prev, hospital: e.target.value }))}
                    placeholder="Hospital or clinic name"
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></Label>
                  <Input
                    id="phone"
                    value={newConnection.phone}
                    onChange={(e) => setNewConnection(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+94 XX XXX XXXX"
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newConnection.email}
                    onChange={(e) => setNewConnection(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="provider@hospital.com"
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleAddConnection} 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-200"
                  >
                    Add Connection
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold py-2 rounded-md transition-all duration-200"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          {/* Search Panel */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by name, type, specialty, or hospital..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>
          
          {filteredConnections.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-gray-100">
              <Stethoscope className="h-16 w-16 mx-auto mb-4 opacity-40 text-gray-400" />
              <p className="text-lg font-semibold mb-2">{searchTerm ? 'No connections found matching your search.' : 'No healthcare connections yet.'}</p>
              <p className="text-sm text-gray-500">{searchTerm ? 'Try adjusting your search terms or add a new connection.' : 'Add your doctors, nurses, and other healthcare providers to get started.'}</p>
              <Button 
                onClick={() => setIsDialogOpen(true)} 
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add First Connection
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredConnections.map((connection) => (
                <Card 
                  key={connection.id} 
                  className="border-l-4 border-blue-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out bg-white"
                >
                  <CardContent className="p-5 flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        {getTypeIcon(connection.type)}
                        <h3 className="font-bold text-xl text-gray-800">{connection.name}</h3>
                        <Badge className={`${getTypeBadgeColor(connection.type)} text-xs px-2 py-0.5 rounded-full ring-1`}>
                          {connection.type.charAt(0).toUpperCase() + connection.type.slice(1)}
                        </Badge>
                      </div>
                      
                      {connection.specialty && (
                        <p className="text-sm text-gray-600 mb-1">
                          <strong className="font-medium">Specialty:</strong> {connection.specialty}
                        </p>
                      )}
                      
                      <p className="text-sm text-gray-600 mb-2">
                        <strong className="font-medium">Hospital:</strong> {connection.hospital}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-700 mt-3">
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4 text-blue-500" />
                          <span>{connection.phone}</span>
                        </div>
                        {connection.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4 text-blue-500" />
                            <span className="truncate max-w-[150px] sm:max-w-none">{connection.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 px-3 py-1.5 flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveConnection(connection.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors duration-200 px-3 py-1.5 flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Remove</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthcareConnections;


// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Badge } from "../../components/ui/badge";
// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
// import { UserPlus, Trash2, Phone, Mail, Stethoscope, Heart, Users } from "lucide-react";
// import { useToast } from "../../hooks/use-toast";
// import axios from "axios";

// interface HealthcareProvider {
//   id: string;
//   name: string;
//   type: 'doctor' | 'nurse' | 'specialist' | 'therapist';
//   specialty?: string;
//   hospital: string;
//   phone: string;
//   email: string;
// }

// const HealthcareConnections = () => {
//   const { toast } = useToast();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [connections, setConnections] = useState<HealthcareProvider[]>([]);
//   const [newConnection, setNewConnection] = useState({
//     name: "",
//     type: "doctor" as const,
//     specialty: "",
//     hospital: "",
//     phone: "",
//     email: ""
//   });
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch healthcare provider from API
//   useEffect(() => {
//     const fetchHealthcareProvider = async () => {
//       setIsLoading(true);
//       try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//           console.error("Access token not found.");
//           toast({
//             title: "Authentication Error",
//             description: "Please log in to access healthcare provider information.",
//             variant: "destructive"
//           });
//           return;
//         }

//         const response = await axios.get("http://localhost:3000/patient/getinformation", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         const healthcareData = response.data.Healthcare;
//         if (healthcareData) {
//           const mappedProvider: HealthcareProvider = {
//             id: Date.now().toString(),
//             name: healthcareData.fullname,
//             type: healthcareData.role as 'doctor' | 'nurse' | 'specialist' | 'therapist',
//             specialty: healthcareData.specialty || "General Medicine",
//             hospital: healthcareData.hospital || "Unknown Hospital",
//             phone: healthcareData.phone,
//             email: healthcareData.email
//           };

//           setConnections(prev => {
//             const exists = prev.some(c => c.email === mappedProvider.email);
//             if (!exists) {
//               return [...prev, mappedProvider];
//             }
//             return prev;
//           });
//         }
//       } catch (error) {
//         console.error("Failed to fetch healthcare provider:", error);
//         toast({
//           title: "Error",
//           description: "Failed to fetch healthcare provider information.",
//           variant: "destructive"
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchHealthcareProvider();
//   }, []);

//   const getTypeIcon = (type: HealthcareProvider['type']) => {
//     switch (type) {
//       case 'doctor':
//         return <Stethoscope className="h-4 w-4 text-blue-400" />;
//       case 'nurse':
//         return <Users className="h-4 w-4 text-green-400" />;
//       case 'specialist':
//         return <Heart className="h-4 w-4 text-red-400" />;
//       case 'therapist':
//         return <Users className="h-4 w-4 text-purple-400" />;
//       default:
//         return <Stethoscope className="h-4 w-4 text-gray-400" />;
//     }
//   };

//   const getTypeBadgeColor = (type: HealthcareProvider['type']) => {
//     switch (type) {
//       case 'doctor':
//         return 'bg-blue-900/50 text-blue-300 ring-blue-700/50';
//       case 'nurse':
//         return 'bg-green-900/50 text-green-300 ring-green-700/50';
//       case 'specialist':
//         return 'bg-purple-900/50 text-purple-300 ring-purple-700/50';
//       case 'therapist':
//         return 'bg-orange-900/50 text-orange-300 ring-orange-700/50';
//       default:
//         return 'bg-gray-900/50 text-gray-300 ring-gray-700/50';
//     }
//   };

//   const handleAddConnection = () => {
//     if (!newConnection.name || !newConnection.hospital || !newConnection.phone) {
//       toast({
//         title: "Missing Information",
//         description: "Please fill in all required fields (Name, Hospital/Clinic, Phone Number).",
//         variant: "destructive"
//       });
//       return;
//     }

//     const connection: HealthcareProvider = {
//       ...newConnection,
//       id: Date.now().toString()
//     };

//     setConnections(prev => [...prev, connection]);
//     setNewConnection({
//       name: "",
//       type: "doctor",
//       specialty: "",
//       hospital: "",
//       phone: "",
//       email: ""
//     });
//     setIsDialogOpen(false);

//     toast({
//       title: "Connection Added",
//       description: `${connection.name} has been added to your healthcare connections.`,
//     });
//   };

//   const handleRemoveConnection = (id: string) => {
//     const connection = connections.find(c => c.id === id);
//     setConnections(prev => prev.filter(c => c.id !== id));
    
//     toast({
//       title: "Connection Removed",
//       description: `${connection?.name} has been removed from your connections.`,
//     });
//   };

//   const filteredConnections = connections.filter(connection =>
//     connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     connection.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (connection.specialty && connection.specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     connection.hospital.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 p-6 sm:p-8 flex items-center justify-center transition-colors duration-300">
//       <Card className="w-full max-w-4xl rounded-2xl shadow-xl border bg-gray-800/90 border-gray-700">
//         <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-6 rounded-t-2xl flex flex-row items-center justify-between">
//           <CardTitle className="text-2xl font-bold flex items-center gap-3">
//             <UserPlus className="h-7 w-7" />
//             Healthcare Connections
//           </CardTitle>
//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button 
//                 variant="secondary" 
//                 size="sm"
//                 className="bg-gray-700/50 text-gray-200 border-gray-600 hover:bg-gray-600/50 rounded-lg shadow-sm transition-all duration-200"
//               >
//                 <UserPlus className="h-4 w-4 mr-2" />
//                 Add Connection
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-md p-6 bg-gray-800/90 border-gray-700 text-gray-100 rounded-xl shadow-lg border">
//               <DialogHeader className="mb-4">
//                 <DialogTitle className="text-xl font-bold">Add Healthcare Provider</DialogTitle>
//               </DialogHeader>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="name" className="text-sm font-medium text-gray-300">Name <span className="text-red-400">*</span></Label>
//                   <Input
//                     id="name"
//                     value={newConnection.name}
//                     onChange={(e) => setNewConnection(prev => ({ ...prev, name: e.target.value }))}
//                     placeholder="Provider's full name"
//                     className="mt-1 p-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   />
//                 </div>
                
//                 <div>
//                   <Label htmlFor="type" className="text-sm font-medium text-gray-300">Type</Label>
//                   <select
//                     id="type"
//                     value={newConnection.type}
//                     onChange={(e) => setNewConnection(prev => ({ ...prev, type: e.target.value as any }))}
//                     className="w-full mt-1 p-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   >
//                     <option value="doctor">Doctor</option>
//                     <option value="nurse">Nurse</option>
//                     <option value="specialist">Specialist</option>
//                     <option value="therapist">Therapist</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <Label htmlFor="specialty" className="text-sm font-medium text-gray-300">Specialty</Label>
//                   <Input
//                     id="specialty"
//                     value={newConnection.specialty}
//                     onChange={(e) => setNewConnection(prev => ({ ...prev, specialty: e.target.value }))}
//                     placeholder="e.g., Cardiology, General Medicine"
//                     className="mt-1 p-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   />
//                 </div>
                
//                 <div>
//                   <Label htmlFor="hospital" className="text-sm font-medium text-gray-300">Hospital/Clinic <span className="text-red-400">*</span></Label>
//                   <Input
//                     id="hospital"
//                     value={newConnection.hospital}
//                     onChange={(e) => setNewConnection(prev => ({ ...prev, hospital: e.target.value }))}
//                     placeholder="Hospital or clinic name"
//                     className="mt-1 p-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   />
//                 </div>
                
//                 <div>
//                   <Label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone Number <span className="text-red-400">*</span></Label>
//                   <Input
//                     id="phone"
//                     value={newConnection.phone}
//                     onChange={(e) => setNewConnection(prev => ({ ...prev, phone: e.target.value }))}
//                     placeholder="+94 XX XXX XXXX"
//                     className="mt-1 p-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   />
//                 </div>
                
//                 <div>
//                   <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={newConnection.email}
//                     onChange={(e) => setNewConnection(prev => ({ ...prev, email: e.target.value }))}
//                     placeholder="provider@hospital.com"
//                     className="mt-1 p-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   />
//                 </div>
                
//                 <div className="flex gap-3 pt-4">
//                   <Button 
//                     onClick={handleAddConnection} 
//                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-200"
//                   >
//                     Add Connection
//                   </Button>
//                   <Button 
//                     variant="outline" 
//                     onClick={() => setIsDialogOpen(false)}
//                     className="flex-1 border-gray-600 text-gray-200 hover:bg-gray-700/50 font-semibold py-2 rounded-md transition-all duration-200"
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             </DialogContent>
//           </Dialog>
//         </CardHeader>
//         <CardContent className="p-6 sm:p-8">
//           {isLoading ? (
//             <div className="text-center py-12">
//               <p className="text-lg text-gray-300">Loading healthcare connections...</p>
//             </div>
//           ) : filteredConnections.length === 0 ? (
//             <div className="text-center py-12 text-gray-300 bg-gray-800/50 rounded-lg border border-gray-700">
//               <Stethoscope className="h-16 w-16 mx-auto mb-4 opacity-40 text-gray-400" />
//               <p className="text-lg font-semibold mb-2">{searchTerm ? 'No connections found matching your search.' : 'No healthcare connections yet.'}</p>
//               <p className="text-sm text-gray-400">{searchTerm ? 'Try adjusting your search terms or add a new connection.' : 'Add your doctors, nurses, and other healthcare providers to get started.'}</p>
//               <Button 
//                 onClick={() => setIsDialogOpen(true)} 
//                 className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200"
//               >
//                 <UserPlus className="h-4 w-4 mr-2" />
//                 Add First Connection
//               </Button>
//             </div>
//           ) : (
//             <div className="grid gap-4">
//               {filteredConnections.map((connection) => (
//                 <Card 
//                   key={connection.id} 
//                   className="border-l-4 border-blue-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out bg-gray-800/90"
//                 >
//                   <CardContent className="p-5 flex items-start justify-between">
//                     <div className="flex-1 pr-4">
//                       <div className="flex items-center gap-2 mb-2">
//                         {getTypeIcon(connection.type)}
//                         <h3 className="font-bold text-xl text-gray-100">{connection.name}</h3>
//                         <Badge className={`${getTypeBadgeColor(connection.type)} text-xs px-2 py-0.5 rounded-full ring-1`}>
//                           {connection.type.charAt(0).toUpperCase() + connection.type.slice(1)}
//                         </Badge>
//                       </div>
                      
//                       {connection.specialty && (
//                         <p className="text-sm text-gray-300 mb-1">
//                           <strong className="font-medium">Specialty:</strong> {connection.specialty}
//                         </p>
//                       )}
                      
//                       <p className="text-sm text-gray-300 mb-2">
//                         <strong className="font-medium">Hospital:</strong> {connection.hospital}
//                       </p>
                      
//                       <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-200 mt-3">
//                         <div className="flex items-center gap-1">
//                           <Phone className="h-4 w-4 text-blue-400" />
//                           <span>{connection.phone}</span>
//                         </div>
//                         {connection.email && (
//                           <div className="flex items-center gap-1">
//                             <Mail className="h-4 w-4 text-blue-400" />
//                             <span className="truncate max-w-[150px] sm:max-w-none">{connection.email}</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="flex flex-col sm:flex-row gap-2 items-center">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="text-blue-400 border-blue-600/50 hover:bg-blue-900/50 transition-colors duration-200 px-3 py-1.5 flex items-center gap-1"
//                       >
//                         <Eye className="h-4 w-4" />
//                         <span className="hidden sm:inline">View</span>
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleRemoveConnection(connection.id)}
//                         className="text-red-400 border-red-600/50 hover:bg-red-900/50 transition-colors duration-200 px-3 py-1.5 flex items-center gap-1"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                         <span className="hidden sm:inline">Remove</span>
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default HealthcareConnections;