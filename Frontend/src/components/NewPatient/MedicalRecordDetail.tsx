import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ArrowLeft, Calendar, User, Pill, TrendingUp, Heart, Activity, FileText } from "lucide-react"; // Added FileText for notes icon

interface MedicalRecord {
  id: string;
  date: string;
  type: 'visit' | 'prescription' | 'test' | 'vaccination'; // Added 'vaccination' type for completeness
  title: string;
  description: string;
  provider: string;
  status?: 'completed' | 'pending' | 'upcoming';
}

interface VitalSigns {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  weight: string;
  height: string;
}

interface LabResults {
  bloodSugar: string;
  cholesterol: string;
  hemoglobin: string;
  whiteBloodCells: string;
}

interface Medication { // Renamed from Medications to Medication for singular type
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
}

const MedicalRecordDetail = () => {
  const navigate = useNavigate();

  // Mock data - in real app, this would come from props or API
  const record: MedicalRecord = { // Explicitly typed
    id: "1",
    date: "2024-01-15",
    type: "visit", // Example type
    title: "Annual Physical Examination", // Changed title for more context
    description: "Comprehensive annual check-up. Blood pressure: 120/80, Heart rate: 72 bpm. Overall health status: Good. Discussed preventive care, lifestyle adjustments, and upcoming vaccinations.", // Extended description
    provider: "Dr. Sarah Johnson",
    status: "completed"
  };

  const vitalSigns: VitalSigns = {
    bloodPressure: "120/80 mmHg",
    heartRate: "72 bpm",
    temperature: "98.6°F (37.0°C)", // Added Celsius
    weight: "150 lbs (68 kg)", // Added lbs
    height: "5'8\" (173 cm)" // Added feet/inches
  };

  const labResults: LabResults = {
    bloodSugar: "95 mg/dL",
    cholesterol: "180 mg/dL",
    hemoglobin: "14.5 g/dL",
    whiteBloodCells: "7.2 x 10^3/uL" // More scientific notation
  };

  const medications: Medication[] = [
    {
      name: "Vitamin D3",
      dosage: "1000 IU",
      frequency: "Once daily",
      startDate: "2024-01-08",
      endDate: "2024-04-08"
    },
    {
        name: "Lisinopril",
        dosage: "10 mg",
        frequency: "Once daily",
        startDate: "2023-05-01",
    },
    {
        name: "Metformin",
        dosage: "500 mg",
        frequency: "Twice daily",
        startDate: "2022-11-15",
    },
  ];

  // Helper functions for dynamic styling based on record type/status
  const getTypeColor = (type: MedicalRecord['type']) => {
    switch (type) {
      case 'visit':
        return 'bg-blue-50 text-blue-700 ring-blue-200';
      case 'prescription':
        return 'bg-green-50 text-green-700 ring-green-200';
      case 'test':
        return 'bg-purple-50 text-purple-700 ring-purple-200';
      case 'vaccination':
        return 'bg-orange-50 text-orange-700 ring-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-200';
    }
  };

  const getStatusColor = (status: MedicalRecord['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 ring-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-200';
      case 'upcoming':
        return 'bg-blue-50 text-blue-700 ring-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-200';
    }
  };

  const getTypeIcon = (type: MedicalRecord['type']) => {
    switch (type) {
      case 'visit':
        return <Activity className="h-7 w-7" />; // Larger icon for title
      case 'prescription':
        return <Pill className="h-7 w-7" />;
      case 'test':
        return <TrendingUp className="h-7 w-7" />;
      case 'vaccination':
        return <Activity className="h-7 w-7" />; // Using Activity for now, could use Syringe if available
      default:
        return <FileText className="h-7 w-7" />;
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 hover:bg-gray-50 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Medical History
            </Button>
            <div className="h-6 border-l border-gray-200"></div>
            <h1 className="text-xl font-bold text-gray-900">Medical Record Details</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Record Overview */}
          <Card className="rounded-2xl shadow-xl border border-gray-100 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-2xl">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                {getTypeIcon(record.type)}
                {record.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold">Date:</span>
                  <span>{formatDate(record.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold">Provider:</span>
                  <span>{record.provider}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Badge className={`${getTypeColor(record.type)} text-xs px-2 py-0.5 rounded-full ring-1`}>
                  {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                </Badge>
                {record.status && (
                  <Badge className={`${getStatusColor(record.status)} text-xs px-2 py-0.5 rounded-full ring-1`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </Badge>
                )}
              </div>
              <p className="text-gray-700 leading-relaxed">{record.description}</p>
            </CardContent>
          </Card>

          {/* Detailed Medical Data Tabs */}
          <Card className="rounded-2xl shadow-xl border border-gray-100 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <Tabs defaultValue="vitals" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1 bg-gray-100 rounded-lg">
                  <TabsTrigger
                    value="vitals"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-purple-700 data-[state=active]:font-semibold py-2 px-4 rounded-md transition-all duration-200 text-gray-600 hover:text-purple-600"
                  >
                    Vital Signs
                  </TabsTrigger>
                  <TabsTrigger
                    value="labs"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-purple-700 data-[state=active]:font-semibold py-2 px-4 rounded-md transition-all duration-200 text-gray-600 hover:text-purple-600"
                  >
                    Lab Results
                  </TabsTrigger>
                  <TabsTrigger
                    value="medications"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-purple-700 data-[state=active]:font-semibold py-2 px-4 rounded-md transition-all duration-200 text-gray-600 hover:text-purple-600"
                  >
                    Medications
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-purple-700 data-[state=active]:font-semibold py-2 px-4 rounded-md transition-all duration-200 text-gray-600 hover:text-purple-600"
                  >
                    Notes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="vitals" className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-3 text-gray-800">
                    <Heart className="h-6 w-6 text-red-500" />
                    Vital Signs
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="rounded-lg shadow-sm border border-gray-100">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-medium text-sm text-gray-600">Blood Pressure</h4>
                        <p className="text-3xl font-extrabold text-blue-600 mt-1">{vitalSigns.bloodPressure}</p>
                      </CardContent>
                    </Card>
                    <Card className="rounded-lg shadow-sm border border-gray-100">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-medium text-sm text-gray-600">Heart Rate</h4>
                        <p className="text-3xl font-extrabold text-red-600 mt-1">{vitalSigns.heartRate}</p>
                      </CardContent>
                    </Card>
                    <Card className="rounded-lg shadow-sm border border-gray-100">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-medium text-sm text-gray-600">Temperature</h4>
                        <p className="text-3xl font-extrabold text-green-600 mt-1">{vitalSigns.temperature}</p>
                      </CardContent>
                    </Card>
                    <Card className="rounded-lg shadow-sm border border-gray-100">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-medium text-sm text-gray-600">Weight</h4>
                        <p className="text-3xl font-extrabold text-indigo-600 mt-1">{vitalSigns.weight}</p>
                      </CardContent>
                    </Card>
                    <Card className="rounded-lg shadow-sm border border-gray-100">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-medium text-sm text-gray-600">Height</h4>
                        <p className="text-3xl font-extrabold text-teal-600 mt-1">{vitalSigns.height}</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="labs" className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-3 text-gray-800">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                    Laboratory Results
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="rounded-lg shadow-sm border border-gray-100">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-medium text-sm text-gray-600">Blood Sugar</h4>
                        <p className="text-3xl font-extrabold text-blue-600 mt-1">{labResults.bloodSugar}</p>
                        <Badge className="bg-green-50 text-green-700 ring-green-200 mt-2 text-xs px-2 py-0.5 rounded-full ring-1">Normal</Badge>
                      </CardContent>
                    </Card>
                    <Card className="rounded-lg shadow-sm border border-gray-100">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-medium text-sm text-gray-600">Cholesterol</h4>
                        <p className="text-3xl font-extrabold text-purple-600 mt-1">{labResults.cholesterol}</p>
                        <Badge className="bg-green-50 text-green-700 ring-green-200 mt-2 text-xs px-2 py-0.5 rounded-full ring-1">Normal</Badge>
                      </CardContent>
                    </Card>
                    <Card className="rounded-lg shadow-sm border border-gray-100">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-medium text-sm text-gray-600">Hemoglobin</h4>
                        <p className="text-3xl font-extrabold text-red-600 mt-1">{labResults.hemoglobin}</p>
                        <Badge className="bg-green-50 text-green-700 ring-green-200 mt-2 text-xs px-2 py-0.5 rounded-full ring-1">Normal</Badge>
                      </CardContent>
                    </Card>
                    <Card className="rounded-lg shadow-sm border border-gray-100">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-medium text-sm text-gray-600">White Blood Cells</h4>
                        <p className="text-3xl font-extrabold text-orange-600 mt-1">{labResults.whiteBloodCells}</p>
                        <Badge className="bg-green-50 text-green-700 ring-green-200 mt-2 text-xs px-2 py-0.5 rounded-full ring-1">Normal</Badge>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="medications" className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-3 text-gray-800">
                    <Pill className="h-6 w-6 text-green-600" />
                    Medications Prescribed
                  </h3>
                  <div className="space-y-3">
                    {medications.map((med, index) => (
                      <Card key={index} className="rounded-lg shadow-sm border border-gray-100">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-lg text-gray-800">{med.name}</h4>
                              <p className="text-gray-600">{med.dosage} - {med.frequency}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                Started: {formatDate(med.startDate)}
                                {med.endDate && ` • Ends: ${formatDate(med.endDate)}`}
                              </p>
                            </div>
                            <Badge className="bg-blue-50 text-blue-700 ring-blue-200 text-xs px-2 py-0.5 rounded-full ring-1">Active</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-3 text-gray-800">
                    <FileText className="h-6 w-6 text-indigo-600" />
                    Clinical Notes
                  </h3>
                  <Card className="rounded-lg shadow-sm border border-gray-100">
                    <CardContent className="p-4">
                      <p className="text-gray-700 leading-relaxed">
                        Patient presents for routine annual physical examination. No acute concerns reported.
                        Vital signs within normal limits. Physical examination unremarkable. Continue current
                        vitamin D supplementation. Recommend follow-up in 6 months for vitamin D level recheck.
                        Patient advised on diet and exercise. Next appointment scheduled for February 15, 2024.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MedicalRecordDetail;