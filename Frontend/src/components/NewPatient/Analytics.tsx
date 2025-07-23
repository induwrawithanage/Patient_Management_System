import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Heart, Droplets, Weight, Ruler } from "lucide-react";

const Analytics = () => {
  // Mock data for charts
  const bloodPressureData = [
    { date: '2023-10', systolic: 118, diastolic: 78 },
    { date: '2023-11', systolic: 122, diastolic: 80 },
    { date: '2023-12', systolic: 120, diastolic: 79 },
    { date: '2024-01', systolic: 120, diastolic: 80 },
  ];

  const cholesterolData = [
    { date: '2023-08', total: 195, ldl: 120, hdl: 45 },
    { date: '2023-11', total: 188, ldl: 115, hdl: 48 },
    { date: '2024-01', total: 180, ldl: 110, hdl: 50 },
  ];

  const bloodSugarData = [
    { date: '2023-10', fasting: 92, postMeal: 140 },
    { date: '2023-11', fasting: 88, postMeal: 135 },
    { date: '2023-12', fasting: 95, postMeal: 142 },
    { date: '2024-01', fasting: 90, postMeal: 138 },
  ];

  const weightHeightData = [
    { date: '2023-08', weight: 72, height: 175 },
    { date: '2023-10', weight: 71, height: 175 },
    { date: '2023-12', weight: 70, height: 175 },
    { date: '2024-01', weight: 70, height: 175 },
  ];

  const bmiData = weightHeightData.map(item => ({
    ...item,
    bmi: Math.round((item.weight / Math.pow(item.height / 100, 2)) * 10) / 10
  }));

  return (
    <div className="min-h-screen bg-gray-900 p-6 sm:p-8 flex items-center justify-center">
      <Card className="w-full max-w-5xl rounded-2xl shadow-2xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg">
        <CardHeader className="bg-gradient-to-r from-teal-700 to-emerald-800 text-white p-6 rounded-t-2xl flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <TrendingUp className="h-7 w-7" />
            Health Analytics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <Tabs defaultValue="pressure" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-gray-800/50 rounded-xl p-1 gap-1 shadow-inner backdrop-blur-sm">
              <TabsTrigger value="pressure" className="py-2.5 px-4 text-sm font-semibold text-gray-300 rounded-lg transition-all duration-200 ease-in-out data-[state=active]:bg-gray-700/70 data-[state=active]:text-teal-300 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-gray-600 hover:bg-gray-700/50">Blood Pressure</TabsTrigger>
              <TabsTrigger value="cholesterol" className="py-2.5 px-4 text-sm font-semibold text-gray-300 rounded-lg transition-all duration-200 ease-in-out data-[state=active]:bg-gray-700/70 data-[state=active]:text-teal-300 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-gray-600 hover:bg-gray-700/50">Cholesterol</TabsTrigger>
              <TabsTrigger value="sugar" className="py-2.5 px-4 text-sm font-semibold text-gray-300 rounded-lg transition-all duration-200 ease-in-out data-[state=active]:bg-gray-700/70 data-[state=active]:text-teal-300 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-gray-600 hover:bg-gray-700/50">Blood Sugar</TabsTrigger>
              <TabsTrigger value="physical" className="py-2.5 px-4 text-sm font-semibold text-gray-300 rounded-lg transition-all duration-200 ease-in-out data-[state=active]:bg-gray-700/70 data-[state=active]:text-teal-300 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-gray-600 hover:bg-gray-700/50">Weight & Height</TabsTrigger>
            </TabsList>

            <TabsContent value="pressure" className="space-y-6">
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-red-400" />
                <h3 className="text-xl font-bold text-gray-100">Blood Pressure Trends</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-5 text-center">
                    <h4 className="font-medium text-base text-gray-400 mb-1">Current Systolic</h4>
                    <p className="text-4xl font-extrabold text-teal-400">120</p>
                    <p className="text-sm text-gray-500">mmHg</p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-5 text-center">
                    <h4 className="font-medium text-base text-gray-400 mb-1">Current Diastolic</h4>
                    <p className="text-4xl font-extrabold text-teal-400">80</p>
                    <p className="text-sm text-gray-500">mmHg</p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-5 text-center">
                    <h4 className="font-medium text-base text-gray-400 mb-1">Status</h4>
                    <p className="text-4xl font-extrabold text-green-400">Normal</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg p-4 sm:p-6">
                <CardContent className="p-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={bloodPressureData}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#4b5563" />
                      <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-sm text-gray-400" />
                      <YAxis tickLine={false} axisLine={false} className="text-sm text-gray-400" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', borderRadius: '8px', border: '1px solid #4b5563', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
                        labelStyle={{ fontWeight: 'bold', color: '#e5e7eb' }}
                        itemStyle={{ color: '#d1d5db' }}
                      />
                      <Line type="monotone" dataKey="systolic" stroke="#34d399" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} name="Systolic" />
                      <Line type="monotone" dataKey="diastolic" stroke="#60a5fa" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} name="Diastolic" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cholesterol" className="space-y-6">
              <div className="flex items-center gap-3">
                <Droplets className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold text-gray-100">Cholesterol Levels</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-5 text-center">
                    <h4 className="font-medium text-base text-gray-400 mb-1">Total Cholesterol</h4>
                    <p className="text-4xl font-extrabold text-teal-400">180</p>
                    <p className="text-sm text-gray-500">mg/dL</p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-5 text-center">
                    <h4 className="font-medium text-base text-gray-400 mb-1">LDL (Bad)</h4>
                    <p className="text-4xl font-extrabold text-orange-400">110</p>
                    <p className="text-sm text-gray-500">mg/dL</p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-5 text-center">
                    <h4 className="font-medium text-base text-gray-400 mb-1">HDL (Good)</h4>
                    <p className="text-4xl font-extrabold text-green-400">50</p>
                    <p className="text-sm text-gray-500">mg/dL</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg p-4 sm:p-6">
                <CardContent className="p-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={cholesterolData}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#4b5563" />
                      <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-sm text-gray-400" />
                      <YAxis tickLine={false} axisLine={false} className="text-sm text-gray-400" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', borderRadius: '8px', border: '1px solid #4b5563', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
                        labelStyle={{ fontWeight: 'bold', color: '#e5e7eb' }}
                        itemStyle={{ color: '#d1d5db' }}
                      />
                      <Bar dataKey="total" fill="#3b82f6" name="Total" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="ldl" fill="#f97316" name="LDL" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="hdl" fill="#10b981" name="HDL" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sugar" className="space-y-6">
              <div className="flex items-center gap-3">
                <Droplets className="h-6 w-6 text-purple-400" />
                <h3 className="text-xl font-bold text-gray-100">Blood Sugar Levels</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-5 text-center">
                    <h4 className="font-medium text-base text-gray-400 mb-1">Fasting Glucose</h4>
                    <p className="text-4xl font-extrabold text-teal-400">90</p>
                    <p className="text-sm text-gray-500">mg/dL</p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-5 text-center">
                    <h4 className="font-medium text-base text-gray-400 mb-1">Post-Meal</h4>
                    <p className="text-4xl font-extrabold text-teal-400">138</p>
                    <p className="text-sm text-gray-500">mg/dL</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg p-4 sm:p-6">
                <CardContent className="p-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={bloodSugarData}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#4b5563" />
                      <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-sm text-gray-400" />
                      <YAxis tickLine={false} axisLine={false} className="text-sm text-gray-400" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', borderRadius: '8px', border: '1px solid #4b5563', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
                        labelStyle={{ fontWeight: 'bold', color: '#e5e7eb' }}
                        itemStyle={{ color: '#d1d5db' }}
                      />
                      <Line type="monotone" dataKey="fasting" stroke="#9333ea" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} name="Fasting" />
                      <Line type="monotone" dataKey="postMeal" stroke="#ec4899" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} name="Post-Meal" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="physical" className="space-y-6">
              <div className="flex items-center gap-3">
                <Weight className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-bold text-gray-100">Physical Measurements</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-5 text-center">
                    <Weight className="h-7 w-7 text-green-400 mx-auto mb-2" />
                    <h4 className="font-medium text-base text-gray-400 mb-1">Current Weight</h4>
                    <p className="text-4xl font-extrabold text-teal-400">70</p>
                    <p className="text-sm text-gray-500">kg</p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-5 text-center">
                    <Ruler className="h-7 w-7 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-medium text-base text-gray-400 mb-1">Height</h4>
                    <p className="text-4xl font-extrabold text-teal-400">175</p>
                    <p className="text-sm text-gray-500">cm</p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-5 text-center">
                    <TrendingUp className="h-7 w-7 text-purple-400 mx-auto mb-2" />
                    <h4 className="font-medium text-base text-gray-400 mb-1">BMI</h4>
                    <p className="text-4xl font-extrabold text-teal-400">22.9</p>
                    <p className="text-sm text-green-400 font-semibold">Normal</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg p-4 sm:p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-gray-100">Weight Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={weightHeightData}>
                        <CartesianGrid strokeDasharray="4 4" stroke="#4b5563" />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-sm text-gray-400" />
                        <YAxis tickLine={false} axisLine={false} className="text-sm text-gray-400" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', borderRadius: '8px', border: '1px solid #4b5563', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
                          labelStyle={{ fontWeight: 'bold', color: '#e5e7eb' }}
                          itemStyle={{ color: '#d1d5db' }}
                        />
                        <Line type="monotone" dataKey="weight" stroke="#34d399" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} name="Weight (kg)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="rounded-xl shadow-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-lg p-4 sm:p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-gray-100">BMI Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={bmiData}>
                        <CartesianGrid strokeDasharray="4 4" stroke="#4b5563" />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-sm text-gray-400" />
                        <YAxis tickLine={false} axisLine={false} className="text-sm text-gray-400" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', borderRadius: '8px', border: '1px solid #4b5563', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
                          labelStyle={{ fontWeight: 'bold', color: '#e5e7eb' }}
                          itemStyle={{ color: '#d1d5db' }}
                        />
                        <Line type="monotone" dataKey="bmi" stroke="#60a5fa" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} name="BMI" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;