// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Calendar, FileText, Pill, Activity, TrendingUp, Search } from "lucide-react";

// interface MedicalRecord {
//   id: string;
//   date: string;
//   type: 'visit' | 'prescription' | 'test' | 'vaccination';
//   title: string;
//   description: string;
//   provider: string;
//   status?: 'completed' | 'pending' | 'upcoming';
// }

// const MedicalHistory = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [records] = useState<MedicalRecord[]>([
//     {
//       id: "1",
//       date: "2024-01-15",
//       type: "visit",
//       title: "Regular Check-up",
//       description: "Annual physical examination. Blood pressure: 120/80, Heart rate: 72 bpm. Overall health status: Good.",
//       provider: "Dr. Sarah Johnson",
//       status: "completed"
//     },
//     {
//       id: "2",
//       date: "2024-01-10",
//       type: "test",
//       title: "Blood Test Results",
//       description: "Complete Blood Count (CBC) and Lipid Panel. All values within normal range.",
//       provider: "City Lab Services",
//       status: "completed"
//     },
//     {
//       id: "3",
//       date: "2024-01-08",
//       type: "prescription",
//       title: "Vitamin D Supplement",
//       description: "Prescribed Vitamin D3 1000 IU daily for 3 months due to mild deficiency.",
//       provider: "Dr. Sarah Johnson",
//       status: "completed"
//     },
//     {
//       id: "4",
//       date: "2023-12-20",
//       type: "vaccination",
//       title: "Flu Vaccination",
//       description: "Annual influenza vaccine administered. No adverse reactions reported.",
//       provider: "City Medical Center",
//       status: "completed"
//     },
//     {
//       id: "5",
//       date: "2024-02-15",
//       type: "visit",
//       title: "Follow-up Appointment",
//       description: "Follow-up for vitamin D levels and general health assessment.",
//       provider: "Dr. Sarah Johnson",
//       status: "upcoming"
//     }
//   ]);

//   const getTypeIcon = (type: string) => {
//     switch (type) {
//       case 'visit':
//         return <Activity className="h-4 w-4" />;
//       case 'prescription':
//         return <Pill className="h-4 w-4" />;
//       case 'test':
//         return <TrendingUp className="h-4 w-4" />;
//       case 'vaccination':
//         return <FileText className="h-4 w-4" />;
//       default:
//         return <FileText className="h-4 w-4" />;
//     }
//   };

//   const getTypeColor = (type: string) => {
//     switch (type) {
//       case 'visit':
//         return 'bg-blue-100 text-blue-800';
//       case 'prescription':
//         return 'bg-green-100 text-green-800';
//       case 'test':
//         return 'bg-purple-100 text-purple-800';
//       case 'vaccination':
//         return 'bg-orange-100 text-orange-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'completed':
//         return 'bg-green-100 text-green-800';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'upcoming':
//         return 'bg-blue-100 text-blue-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const filteredRecords = records.filter(record =>
//     record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     record.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     record.type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const sortedRecords = [...filteredRecords].sort((a, b) => 
//     new Date(b.date).getTime() - new Date(a.date).getTime()
//   );

//   const handleViewDetails = (recordId: string) => {
//     navigate(`/medical-record/${recordId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 sm:p-8 flex items-start justify-center">
//       <div className="w-full max-w-5xl space-y-6">
//         <Card className="rounded-2xl shadow-xl border border-gray-100 bg-white/90 backdrop-blur-sm">
//           <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-2xl">
//             <CardTitle className="text-2xl font-bold flex items-center gap-3">
//               <FileText className="h-7 w-7" />
//               Medical History
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-6 sm:p-8">
//             {/* Search Panel */}
//             <div className="mb-6">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <Input
//                   placeholder="Search medical records by title, description, provider, or type..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
//                 />
//               </div>
//             </div>
            
//             {sortedRecords.length === 0 ? (
//               <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-gray-100">
//                 <FileText className="h-16 w-16 mx-auto mb-4 opacity-40 text-gray-400" />
//                 <p className="text-lg font-semibold mb-2">{searchTerm ? 'No records found matching your search.' : 'No medical history available.'}</p>
//                 <p className="text-sm text-gray-500">{searchTerm ? 'Try adjusting your search terms.' : 'Your medical records will appear here as they are added or updated.'}</p>
//               </div>
//             ) : (
//               <div className="grid gap-4">
//                 {sortedRecords.map((record) => (
//                   <Card 
//                     key={record.id} 
//                     className={`border-l-4 ${
//                       record.type === 'visit' ? 'border-blue-500' :
//                       record.type === 'prescription' ? 'border-green-500' :
//                       record.type === 'test' ? 'border-purple-500' :
//                       'border-orange-500'
//                     } rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out bg-white`}
//                   >
//                     <CardContent className="p-5">
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2 sm:gap-0">
//                         <div className="flex items-center gap-2">
//                           {getTypeIcon(record.type)}
//                           <h3 className="font-bold text-xl text-gray-800">{record.title}</h3>
//                           <Badge className={`${getTypeColor(record.type)} text-xs px-2 py-0.5 rounded-full ring-1`}>
//                             {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
//                           </Badge>
//                           {record.status && (
//                             <Badge className={`${getStatusColor(record.status)} text-xs px-2 py-0.5 rounded-full ring-1`}>
//                               {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
//                             </Badge>
//                           )}
//                         </div>
//                         <div className="flex items-center gap-1 text-sm text-gray-500 mt-1 sm:mt-0">
//                           <Calendar className="h-4 w-4" />
//                           <span>{formatDate(record.date)}</span>
//                         </div>
//                       </div>
                      
//                       <p className="text-gray-600 mb-3 leading-relaxed line-clamp-2">{record.description}</p>
                      
//                       <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                         <p className="text-sm text-gray-700 font-medium">
//                           Provider: <span className="text-gray-800">{record.provider}</span>
//                         </p>
                        
//                         <Button 
//                           variant="outline" 
//                           size="sm"
//                           onClick={() => handleViewDetails(record.id)}
//                           className="text-purple-600 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-colors duration-200 px-3 py-1.5 flex items-center gap-1"
//                         >
//                           View Details
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
        
//         {/* Health Summary Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicalHistory;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import {
//   Calendar,
//   FileText,
//   Pill,
//   Activity,
//   TrendingUp,
//   Search
// } from "lucide-react";

// interface MedicalRecord {
//   id: string;
//   date: string;
//   type: 'visit' | 'prescription' | 'test' | 'vaccination';
//   title: string;
//   description: string;
//   provider: string;
//   status?: 'completed' | 'pending' | 'upcoming';
// }

// const MedicalHistory = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [records, setRecords] = useState<MedicalRecord[]>([]);

//   // Fetch medical records from API
//   useEffect(() => {
//     const fetchMedicalRecords = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//           console.error("Access token not found.");
//           return;
//         }

//         const response = await axios.get("http://localhost:3000/patient/getinformation", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         // Assuming response.data is an array of medical records
//         setRecords(response.data);
//       } catch (error) {
//         console.error("Failed to fetch medical records:", error);
//       }
//     };

//     fetchMedicalRecords();
//   }, []);

//   const getTypeIcon = (type: string) => {
//     switch (type) {
//       case 'visit':
//         return <Activity className="h-4 w-4" />;
//       case 'prescription':
//         return <Pill className="h-4 w-4" />;
//       case 'test':
//         return <TrendingUp className="h-4 w-4" />;
//       case 'vaccination':
//         return <FileText className="h-4 w-4" />;
//       default:
//         return <FileText className="h-4 w-4" />;
//     }
//   };

//   const getTypeColor = (type: string) => {
//     switch (type) {
//       case 'visit':
//         return 'bg-blue-100 text-blue-800';
//       case 'prescription':
//         return 'bg-green-100 text-green-800';
//       case 'test':
//         return 'bg-purple-100 text-purple-800';
//       case 'vaccination':
//         return 'bg-orange-100 text-orange-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'completed':
//         return 'bg-green-100 text-green-800';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'upcoming':
//         return 'bg-blue-100 text-blue-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // const filteredRecords = records.filter(record =>
//   //   console.log(record),
//   // );

//   const sortedRecords = [...filteredRecords].sort((a, b) =>
//     new Date(b.date).getTime() - new Date(a.date).getTime()
//   );

//   const handleViewDetails = (recordId: string) => {
//     navigate(`/medical-record/${recordId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 sm:p-8 flex items-start justify-center">
//       <div className="w-full max-w-5xl space-y-6">
//         <Card className="rounded-2xl shadow-xl border border-gray-100 bg-white/90 backdrop-blur-sm">
//           <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-2xl">
//             <CardTitle className="text-2xl font-bold flex items-center gap-3">
//               <FileText className="h-7 w-7" />
//               Medical History
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-6 sm:p-8">
//             <div className="mb-6">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <Input
//                   placeholder="Search medical records by title, description, provider, or type..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
//                 />
//               </div>
//             </div>

//             {sortedRecords.length === 0 ? (
//               <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-gray-100">
//                 <FileText className="h-16 w-16 mx-auto mb-4 opacity-40 text-gray-400" />
//                 <p className="text-lg font-semibold mb-2">{searchTerm ? 'No records found matching your search.' : 'No medical history available.'}</p>
//                 <p className="text-sm text-gray-500">{searchTerm ? 'Try adjusting your search terms.' : 'Your medical records will appear here as they are added or updated.'}</p>
//               </div>
//             ) : (
//               <div className="grid gap-4">
//                 {sortedRecords.map((record) => (
//                   <Card
//                     key={record.id}
//                     className={`border-l-4 ${
//                       record.type === 'visit' ? 'border-blue-500' :
//                       record.type === 'prescription' ? 'border-green-500' :
//                       record.type === 'test' ? 'border-purple-500' :
//                       'border-orange-500'
//                     } rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out bg-white`}
//                   >
//                     <CardContent className="p-5">
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2 sm:gap-0">
//                         <div className="flex items-center gap-2">
//                           {getTypeIcon(record.type)}
//                           <h3 className="font-bold text-xl text-gray-800">{record.title}</h3>
//                           <Badge className={`${getTypeColor(record.type)} text-xs px-2 py-0.5 rounded-full ring-1`}>
//                             {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
//                           </Badge>
//                           {record.status && (
//                             <Badge className={`${getStatusColor(record.status)} text-xs px-2 py-0.5 rounded-full ring-1`}>
//                               {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
//                             </Badge>
//                           )}
//                         </div>
//                         <div className="flex items-center gap-1 text-sm text-gray-500 mt-1 sm:mt-0">
//                           <Calendar className="h-4 w-4" />
//                           <span>{formatDate(record.date)}</span>
//                         </div>
//                       </div>

//                       <p className="text-gray-600 mb-3 leading-relaxed line-clamp-2">{record.description}</p>

//                       <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                         <p className="text-sm text-gray-700 font-medium">
//                           Provider: <span className="text-gray-800">{record.provider}</span>
//                         </p>

//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleViewDetails(record.id)}
//                           className="text-purple-600 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-colors duration-200 px-3 py-1.5 flex items-center gap-1"
//                         >
//                           View Details
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default MedicalHistory;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Calendar,
  FileText,
  Pill,
  Activity,
  TrendingUp,
  Search,
} from "lucide-react";

interface MedicalRecord {
  id: string;
  date: string;
  type: 'visit' | 'prescription' | 'test' | 'vaccination';
  title: string;
  description: string;
  provider: string;
  status?: 'completed' | 'pending' | 'upcoming';
}

const MedicalHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [records, setRecords] = useState<MedicalRecord[]>([]);

  // Fetch medical records from API
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("Access token not found.");
          return;
        }
  
        const response = await axios.get("http://localhost:3000/patient/getinformation", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        const mappedRecords: MedicalRecord[] = Array.isArray(response.data.records)
          ? response.data.records.map((record: any) => ({
              id: record._id,
              date: record.date,
              type: record.type || 'visit',
              title: record.title || record.prescriptions || 'Medical Record',
              description: record.notes || record.identifications || 'No description available',
              provider: record.provider || response.data.Healthcare.fullname,
              status: record.status || 'completed',
            }))
          : [];
  
        setRecords(mappedRecords);
      } catch (error) {
        console.error("Failed to fetch medical records:", error);
        setRecords([]);
      }
    };
  
    fetchMedicalRecords();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'visit':
        return <Activity className="h-4 w-4 text-blue-400" />;
      case 'prescription':
        return <Pill className="h-4 w-4 text-green-400" />;
      case 'test':
        return <TrendingUp className="h-4 w-4 text-purple-400" />;
      case 'vaccination':
        return <FileText className="h-4 w-4 text-orange-400" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'visit':
        return 'bg-blue-900/50 text-blue-300 ring-blue-700/50';
      case 'prescription':
        return 'bg-green-900/50 text-green-300 ring-green-700/50';
      case 'test':
        return 'bg-purple-900/50 text-purple-300 ring-purple-700/50';
      case 'vaccination':
        return 'bg-orange-900/50 text-orange-300 ring-orange-700/50';
      default:
        return 'bg-gray-900/50 text-gray-300 ring-gray-700/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/50 text-green-300 ring-green-700/50';
      case 'pending':
        return 'bg-yellow-900/50 text-yellow-300 ring-yellow-700/50';
      case 'upcoming':
        return 'bg-blue-900/50 text-blue-300 ring-blue-700/50';
      default:
        return 'bg-gray-900/50 text-gray-300 ring-gray-700/50';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredRecords = Array.isArray(records)
    ? records.filter((record) =>
        [record.title, record.description, record.provider, record.type]
          .some((field) =>
            field.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    : [];

  const sortedRecords = [...filteredRecords].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen p-6 sm:p-8 flex items-start justify-center transition-colors duration-300 bg-gray-900 text-gray-100">
      <div className="w-full max-w-5xl space-y-6">
        <Card className="rounded-2xl shadow-xl border bg-gray-800/90 border-gray-700">
          <CardHeader className="p-6 rounded-t-2xl flex flex-row items-center justify-between bg-gradient-to-r from-gray-800 to-gray-700">
            <CardTitle className="text-2xl font-bold flex items-center gap-3 text-white">
              <FileText className="h-7 w-7" />
              Medical History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search medical records by title, description, provider, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg shadow-sm transition-all duration-200 bg-gray-700 border-gray-600 text-gray-100 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {sortedRecords.length === 0 ? (
              <div className="text-center py-12 rounded-lg border bg-gray-800/50 border-gray-700 text-gray-300">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-40 text-gray-400" />
                <p className="text-lg font-semibold mb-2">
                  {searchTerm
                    ? "No records found matching your search."
                    : "No medical history available."}
                </p>
                <p className="text-sm">
                  {searchTerm
                    ? "Try adjusting your search terms."
                    : "Your medical records will appear here as they are added or updated."}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {sortedRecords.map((record) => (
                  <Card
                    key={record.id}
                    className={`border-l-4 ${
                      record.type === "visit"
                        ? "border-blue-500"
                        : record.type === "prescription"
                        ? "border-green-500"
                        : record.type === "test"
                        ? "border-purple-500"
                        : "border-orange-500"
                    } rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out bg-gray-800/90`}
                  >
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2 sm:gap-0">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(record.type)}
                          <h3 className="font-bold text-xl text-gray-100">
                            {record.title}
                          </h3>
                          <Badge
                            className={`${getTypeColor(record.type)} text-xs px-2 py-0.5 rounded-full ring-1`}
                          >
                            {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                          </Badge>
                          {record.status && (
                            <Badge
                              className={`${getStatusColor(record.status)} text-xs px-2 py-0.5 rounded-full ring-1`}
                            >
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-300 mt-1 sm:mt-0">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(record.date)}</span>
                        </div>
                      </div>

                      <p className="mb-3 leading-relaxed line-clamp-2 text-gray-300">
                        {record.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                        <p className="text-sm font-medium text-gray-200">
                          Provider: <span className="text-gray-100">
                            {record.provider}
                          </span>
                        </p>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(record.id)}
                          className="transition-colors duration-200 px-3 py-1.5 flex items-center gap-1 text-purple-400 border-purple-600/50 hover:bg-purple-900/50"
                        >
                          View Details
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
    </div>
  );
};

export default MedicalHistory;