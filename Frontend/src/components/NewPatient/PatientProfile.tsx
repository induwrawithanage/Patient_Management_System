
// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import { Badge } from "../../components/ui/badge";
// import { Edit, Save, X, User, Heart, MapPin, Phone, Mail } from "lucide-react";
// import { useToast } from "../../hooks/use-toast";

// interface PatientData {
//   name: string;
//   nic: string;
//   bloodGroup: string;
//   sex: string;
//   weight: string;
//   height: string;
//   address: string;
//   contactNo: string;
//   email: string;
// }

// const PatientProfile = () => {
//   const { toast } = useToast();
//   const [isEditing, setIsEditing] = useState(false);
//   const [patientData, setPatientData] = useState<PatientData>({
//     name: "John Doe",
//     nic: "123456789V",
//     bloodGroup: "O+",
//     sex: "Male",
//     weight: "70",
//     height: "175",
//     address: "123 Main Street, Colombo 01",
//     contactNo: "+94 71 234 5678",
//     email: "john.doe@email.com"
//   });

//   const [editData, setEditData] = useState<PatientData>(patientData);

//   const handleEdit = () => {
//     setEditData(patientData);
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     setPatientData(editData);
//     setIsEditing(false);
//     toast({
//       title: "Profile Updated",
//       description: "Your profile has been successfully updated.",
//     });
//   };

//   const handleCancel = () => {
//     setEditData(patientData);
//     setIsEditing(false);
//   };

//   const handleInputChange = (field: keyof PatientData, value: string) => {
//     setEditData(prev => ({ ...prev, [field]: value }));
//   };

//   // Removed nonEditableFields array as it's not directly used for rendering logic
//   // and the fields are explicitly handled in JSX.

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
//       <Card className="w-full max-w-4xl mx-auto shadow-xl rounded-lg overflow-hidden">
//         <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <User className="h-8 w-8 text-blue-200" />
//               <CardTitle className="text-3xl font-bold tracking-tight">Patient Profile</CardTitle>
//             </div>
//             {!isEditing ? (
//               <Button
//                 onClick={handleEdit}
//                 className="bg-white text-blue-700 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
//               >
//                 <Edit className="h-4 w-4 mr-2" />
//                 Edit Profile
//               </Button>
//             ) : (
//               <div className="flex gap-3">
//                 <Button
//                   onClick={handleSave}
//                   className="bg-green-500 hover:bg-green-600 text-white focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-200 ease-in-out px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
//                 >
//                   <Save className="h-4 w-4 mr-2" />
//                   Save
//                 </Button>
//                 <Button
//                   onClick={handleCancel}
//                   className="bg-red-500 hover:bg-red-600 text-white focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-200 ease-in-out px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
//                 >
//                   <X className="h-4 w-4 mr-2" />
//                   Cancel
//                 </Button>
//               </div>
//             )}
//           </div>
//         </CardHeader>
//         <CardContent className="p-6 md:p-8 bg-white">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Non-editable fields */}
//             <div className="space-y-6 border-r lg:border-r-2 border-gray-200 pr-4">
//               <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Personal Information</h3>
              
//               <div>
//                 <Label className="text-sm font-medium text-gray-500">Full Name</Label>
//                 <div className="flex items-center gap-3 mt-1 text-gray-800">
//                   <User className="h-5 w-5 text-blue-500" />
//                   <span className="font-semibold text-lg">{patientData.name}</span>
//                   <Badge variant="outline" className="text-xs text-gray-500 border-gray-300 bg-gray-100 px-2 py-1 rounded-full">Read-only</Badge>
//                 </div>
//               </div>
              
//               <div>
//                 <Label className="text-sm font-medium text-gray-500">NIC Number</Label>
//                 <div className="flex items-center gap-3 mt-1 text-gray-800">
//                   <span className="font-semibold text-lg">{patientData.nic}</span>
//                   <Badge variant="outline" className="text-xs text-gray-500 border-gray-300 bg-gray-100 px-2 py-1 rounded-full">Read-only</Badge>
//                 </div>
//               </div>
              
//               <div>
//                 <Label className="text-sm font-medium text-gray-500">Blood Group</Label>
//                 <div className="flex items-center gap-3 mt-1 text-gray-800">
//                   <Heart className="h-5 w-5 text-red-500" />
//                   <span className="font-semibold text-lg">{patientData.bloodGroup}</span>
//                   <Badge variant="outline" className="text-xs text-gray-500 border-gray-300 bg-gray-100 px-2 py-1 rounded-full">Read-only</Badge>
//                 </div>
//               </div>
              
//               <div>
//                 <Label className="text-sm font-medium text-gray-500">Sex</Label>
//                 <div className="flex items-center gap-3 mt-1 text-gray-800">
//                   <span className="font-semibold text-lg">{patientData.sex}</span>
//                   <Badge variant="outline" className="text-xs text-gray-500 border-gray-300 bg-gray-100 px-2 py-1 rounded-full">Read-only</Badge>
//                 </div>
//               </div>
//             </div>

//             {/* Editable fields */}
//             <div className="space-y-6 lg:pl-4">
//               <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Contact & Health Details</h3>

//               <div>
//                 <Label htmlFor="weight" className="text-sm font-medium text-gray-500">
//                   Weight (kg)
//                 </Label>
//                 {isEditing ? (
//                   <Input
//                     id="weight"
//                     type="number"
//                     value={editData.weight}
//                     onChange={(e) => handleInputChange('weight', e.target.value)}
//                     className="mt-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-lg text-gray-800 mt-2">{patientData.weight} kg</p>
//                 )}
//               </div>
              
//               <div>
//                 <Label htmlFor="height" className="text-sm font-medium text-gray-500">
//                   Height (cm)
//                 </Label>
//                 {isEditing ? (
//                   <Input
//                     id="height"
//                     type="number"
//                     value={editData.height}
//                     onChange={(e) => handleInputChange('height', e.target.value)}
//                     className="mt-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-lg text-gray-800 mt-2">{patientData.height} cm</p>
//                 )}
//               </div>
              
//               <div>
//                 <Label htmlFor="address" className="text-sm font-medium text-gray-500">
//                   Address
//                 </Label>
//                 {isEditing ? (
//                   <Input
//                     id="address"
//                     value={editData.address}
//                     onChange={(e) => handleInputChange('address', e.target.value)}
//                     className="mt-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//                   />
//                 ) : (
//                   <div className="flex items-center gap-3 mt-2 text-gray-800">
//                     <MapPin className="h-5 w-5 text-blue-500" />
//                     <span className="font-medium text-lg">{patientData.address}</span>
//                   </div>
//                 )}
//               </div>
              
//               <div>
//                 <Label htmlFor="contactNo" className="text-sm font-medium text-gray-500">
//                   Contact Number
//                 </Label>
//                 {isEditing ? (
//                   <Input
//                     id="contactNo"
//                     value={editData.contactNo}
//                     onChange={(e) => handleInputChange('contactNo', e.target.value)}
//                     className="mt-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//                   />
//                 ) : (
//                   <div className="flex items-center gap-3 mt-2 text-gray-800">
//                     <Phone className="h-5 w-5 text-blue-500" />
//                     <span className="font-medium text-lg">{patientData.contactNo}</span>
//                   </div>
//                 )}
//               </div>
              
//               <div>
//                 <Label htmlFor="email" className="text-sm font-medium text-gray-500">
//                   Email Address
//                 </Label>
//                 {isEditing ? (
//                   <Input
//                     id="email"
//                     type="email"
//                     value={editData.email}
//                     onChange={(e) => handleInputChange('email', e.target.value)}
//                     className="mt-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//                   />
//                 ) : (
//                   <div className="flex items-center gap-3 mt-2 text-gray-800">
//                     <Mail className="h-5 w-5 text-blue-500" />
//                     <span className="font-medium text-lg">{patientData.email}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default PatientProfile;




// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import { Badge } from "../../components/ui/badge";
// import { Edit, Save, X, User, Heart, MapPin, Phone, Mail } from "lucide-react";
// import { useToast } from "../../hooks/use-toast";


// interface PatientData {
//   name: string;
//   nic: string;
//   bloodGroup: string;
//   sex: string;
//   weight: string;
//   height: string;
//   address: string;
//   contactNo: string;
//   email: string;
// }

// const PatientProfile = () => {
//   const { toast } = useToast();
//   const [isEditing, setIsEditing] = useState(false);
//   // Hardcoded patient data for demo/testing
//   const [patientData, setPatientData] = useState<PatientData>({
//     name: "John Doe",
//     nic: "123456789V",
//     bloodGroup: "O+",
//     sex: "Male",
//     weight: "70",
//     height: "175",
//     address: "123 Main Street, Colombo 01",
//     contactNo: "+94 71 234 5678",
//     email: "john.doe@email.com"
//   });
//   const [editData, setEditData] = useState<PatientData>(patientData);
  

//   const handleEdit = () => {
//     setEditData(patientData);
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     setPatientData(editData);
//     setIsEditing(false);
//     toast({
//       title: "Profile Updated",
//       description: "Your profile has been successfully updated.",
//     });
//   };

//   const handleCancel = () => {
//     setEditData(patientData);
//     setIsEditing(false);
//   };

//   const handleInputChange = (field: keyof PatientData, value: string) => {
//     setEditData(prev => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
//       <Card className="w-full max-w-4xl mx-auto shadow-2xl rounded-2xl overflow-hidden bg-black/40 backdrop-blur-lg border border-white/20">
//         <CardHeader className="bg-black/60 backdrop-blur-md text-white p-6 border-b border-white/10">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <User className="h-8 w-8 text-blue-200" />
//               <CardTitle className="text-3xl font-bold tracking-tight">Patient Profile</CardTitle>
//             </div>
//             {!isEditing ? (
//               <Button
//                 onClick={handleEdit}
//                 className="bg-white/90 text-blue-700 hover:bg-white/70 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
//               >
//                 <Edit className="h-4 w-4 mr-2" />
//                 Edit Profile
//               </Button>
//             ) : (
//               <div className="flex gap-3">
//                 <Button
//                   onClick={handleSave}
//                   className="bg-green-500 hover:bg-green-600 text-white focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-200 ease-in-out px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
//                 >
//                   <Save className="h-4 w-4 mr-2" />
//                   Save
//                 </Button>
//                 <Button
//                   onClick={handleCancel}
//                   className="bg-red-500 hover:bg-red-600 text-white focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-200 ease-in-out px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
//                 >
//                   <X className="h-4 w-4 mr-2" />
//                   Cancel
//                 </Button>
//               </div>
//             )}
//           </div>
//         </CardHeader>
//         <CardContent className="p-6 md:p-8 bg-black/30 text-white">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Non-editable fields */}
//             <div className="space-y-6 border-r lg:border-r-2 border-white/10 pr-4">
//               <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">Personal Information</h3>

//               <div>
//                 <Label className="text-sm font-medium text-gray-300">Full Name</Label>
//                 <div className="flex items-center gap-3 mt-1 text-white">
//                   <User className="h-5 w-5 text-blue-400" />
//                   <span className="font-semibold text-lg">{patientData.name}</span>
//                   <Badge variant="outline" className="text-xs text-gray-300 border-white/20 bg-black/20 px-2 py-1 rounded-full">Read-only</Badge>
//                 </div>
//               </div>

//               <div>
//                 <Label className="text-sm font-medium text-gray-300">NIC Number</Label>
//                 <div className="flex items-center gap-3 mt-1 text-white">
//                   <span className="font-semibold text-lg">{patientData.nic}</span>
//                   <Badge variant="outline" className="text-xs text-gray-300 border-white/20 bg-black/20 px-2 py-1 rounded-full">Read-only</Badge>
//                 </div>
//               </div>

//               <div>
//                 <Label className="text-sm font-medium text-gray-300">Blood Group</Label>
//                 <div className="flex items-center gap-3 mt-1 text-white">
//                   <Heart className="h-5 w-5 text-red-400" />
//                   <span className="font-semibold text-lg">{patientData.bloodGroup}</span>
//                   <Badge variant="outline" className="text-xs text-gray-300 border-white/20 bg-black/20 px-2 py-1 rounded-full">Read-only</Badge>
//                 </div>
//               </div>

//               <div>
//                 <Label className="text-sm font-medium text-gray-300">Sex</Label>
//                 <div className="flex items-center gap-3 mt-1 text-white">
//                   <span className="font-semibold text-lg">{patientData.sex}</span>
//                   <Badge variant="outline" className="text-xs text-gray-300 border-white/20 bg-black/20 px-2 py-1 rounded-full">Read-only</Badge>
//                 </div>
//               </div>
//             </div>

//             {/* Editable fields */}
//             <div className="space-y-6 lg:pl-4">
//               <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">Contact & Health Details</h3>

//               <div>
//                 <Label htmlFor="weight" className="text-sm font-medium text-gray-300">Weight (kg)</Label>
//                 {isEditing ? (
//                   <Input
//                     id="weight"
//                     type="number"
//                     value={editData.weight}
//                     onChange={(e) => handleInputChange('weight', e.target.value)}
//                     className="mt-2 p-2 border border-white/20 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-black/20 text-white"
//                   />
//                 ) : (
//                   <p className="font-medium text-lg text-white mt-2">{patientData.weight} kg</p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="height" className="text-sm font-medium text-gray-300">Height (cm)</Label>
//                 {isEditing ? (
//                   <Input
//                     id="height"
//                     type="number"
//                     value={editData.height}
//                     onChange={(e) => handleInputChange('height', e.target.value)}
//                     className="mt-2 p-2 border border-white/20 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-black/20 text-white"
//                   />
//                 ) : (
//                   <p className="font-medium text-lg text-white mt-2">{patientData.height} cm</p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="address" className="text-sm font-medium text-gray-300">Address</Label>
//                 {isEditing ? (
//                   <Input
//                     id="address"
//                     value={editData.address}
//                     onChange={(e) => handleInputChange('address', e.target.value)}
//                     className="mt-2 p-2 border border-white/20 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-black/20 text-white"
//                   />
//                 ) : (
//                   <div className="flex items-center gap-3 mt-2 text-white">
//                     <MapPin className="h-5 w-5 text-blue-400" />
//                     <span className="font-medium text-lg">{patientData.address}</span>
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="contactNo" className="text-sm font-medium text-gray-300">Contact Number</Label>
//                 {isEditing ? (
//                   <Input
//                     id="contactNo"
//                     value={editData.contactNo}
//                     onChange={(e) => handleInputChange('contactNo', e.target.value)}
//                     className="mt-2 p-2 border border-white/20 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-black/20 text-white"
//                   />
//                 ) : (
//                   <div className="flex items-center gap-3 mt-2 text-white">
//                     <Phone className="h-5 w-5 text-blue-400" />
//                     <span className="font-medium text-lg">{patientData.contactNo}</span>
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</Label>
//                 {isEditing ? (
//                   <Input
//                     id="email"
//                     type="email"
//                     value={editData.email}
//                     onChange={(e) => handleInputChange('email', e.target.value)}
//                     className="mt-2 p-2 border border-white/20 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-black/20 text-white"
//                   />
//                 ) : (
//                   <div className="flex items-center gap-3 mt-2 text-white">
//                     <Mail className="h-5 w-5 text-blue-400" />
//                     <span className="font-medium text-lg">{patientData.email}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default PatientProfile;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Edit, Save, X, User, Heart, MapPin, Phone, Mail, LogOut } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

interface PatientData {
  name: string;
  nic: string;
  bloodGroup: string;
  sex: string;
  weight: string;
  height: string;
  address: string;
  contactNo: string;
  email: string;
}

const PatientProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  // Hardcoded patient data for demo/testing
  const [patientData, setPatientData] = useState<PatientData>({
    name: "John Doe",
    nic: "123456789V",
    bloodGroup: "O+",
    sex: "Male",
    weight: "70",
    height: "175",
    address: "123 Main Street, Colombo 01",
    contactNo: "+94 71 234 5678",
    email: "john.doe@email.com"
  });
  const [editData, setEditData] = useState<PatientData>(patientData);

  const handleEdit = () => {
    setEditData(patientData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setPatientData(editData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditData(patientData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleInputChange = (field: keyof PatientData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <Card className="w-full max-w-4xl mx-auto shadow-2xl rounded-2xl overflow-hidden bg-black/40 backdrop-blur-lg border border-white/20">
        <CardHeader className="bg-black/60 backdrop-blur-md text-white p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <User className="h-8 w-8 text-blue-200" />
              <CardTitle className="text-3xl font-bold tracking-tight">Patient Profile</CardTitle>
            </div>
            <div className="flex gap-3">
              {!isEditing ? (
                <Button
                  onClick={handleEdit}
                  className="bg-white/90 text-blue-700 hover:bg-white/70 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-200 ease-in-out px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="bg-red-500 hover:bg-red-600 text-white focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-200 ease-in-out px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              )}
              <Button
                onClick={handleLogout}
                className="bg-gray-500 hover:bg-gray-600 text-white focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 ease-in-out px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8 bg-black/30 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Non-editable fields */}
            <div className="space-y-6 border-r lg:border-r-2 border-white/10 pr-4">
              <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">Personal Information</h3>

              <div>
                <Label className="text-sm font-medium text-gray-300">Full Name</Label>
                <div className="flex items-center gap-3 mt-1 text-white">
                  <User className="h-5 w-5 text-blue-400" />
                  <span className="font-semibold text-lg">{patientData.name}</span>
                  <Badge variant="outline" className="text-xs text-gray-300 border-white/20 bg-black/20 px-2 py-1 rounded-full">Read-only</Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-300">NIC Number</Label>
                <div className="flex items-center gap-3 mt-1 text-white">
                  <span className="font-semibold text-lg">{patientData.nic}</span>
                  <Badge variant="outline" className="text-xs text-gray-300 border-white/20 bg-black/20 px-2 py-1 rounded-full">Read-only</Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-300">Blood Group</Label>
                <div className="flex items-center gap-3 mt-1 text-white">
                  <Heart className="h-5 w-5 text-red-400" />
                  <span className="font-semibold text-lg">{patientData.bloodGroup}</span>
                  <Badge variant="outline" className="text-xs text-gray-300 border-white/20 bg-black/20 px-2 py-1 rounded-full">Read-only</Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-300">Sex</Label>
                <div className="flex items-center gap-3 mt-1 text-white">
                  <span className="font-semibold text-lg">{patientData.sex}</span>
                  <Badge variant="outline" className="text-xs text-gray-300 border-white/20 bg-black/20 px-2 py-1 rounded-full">Read-only</Badge>
                </div>
              </div>
            </div>

            {/* Editable fields */}
            <div className="space-y-6 lg:pl-4">
              <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">Contact & Health Details</h3>

              <div>
                <Label htmlFor="weight" className="text-sm font-medium text-gray-300">Weight (kg)</Label>
                {isEditing ? (
                  <Input
                    id="weight"
                    type="number"
                    value={editData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="mt-2 p-2 border border-white/20 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-black/20 text-white"
                  />
                ) : (
                  <p className="font-medium text-lg text-white mt-2">{patientData.weight} kg</p>
                )}
              </div>

              <div>
                <Label htmlFor="height" className="text-sm font-medium text-gray-300">Height (cm)</Label>
                {isEditing ? (
                  <Input
                    id="height"
                    type="number"
                    value={editData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    className="mt-2 p-2 border border-white/20 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-black/20 text-white"
                  />
                ) : (
                  <p className="font-medium text-lg text-white mt-2">{patientData.height} cm</p>
                )}
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-medium text-gray-300">Address</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    value={editData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-2 p-2 border border-white/20 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-black/20 text-white"
                  />
                ) : (
                  <div className="flex items-center gap-3 mt-2 text-white">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    <span className="font-medium text-lg">{patientData.address}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="contactNo" className="text-sm font-medium text-gray-300">Contact Number</Label>
                {isEditing ? (
                  <Input
                    id="contactNo"
                    value={editData.contactNo}
                    onChange={(e) => handleInputChange('contactNo', e.target.value)}
                    className="mt-2 p-2 border border-white/20 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-black/20 text-white"
                  />
                ) : (
                  <div className="flex items-center gap-3 mt-2 text-white">
                    <Phone className="h-5 w-5 text-blue-400" />
                    <span className="font-medium text-lg">{patientData.contactNo}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-2 p-2 border border-white/20 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-black/20 text-white"
                  />
                ) : (
                  <div className="flex items-center gap-3 mt-2 text-white">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <span className="font-medium text-lg">{patientData.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientProfile;