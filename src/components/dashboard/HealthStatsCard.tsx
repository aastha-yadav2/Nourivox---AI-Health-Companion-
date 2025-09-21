import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Heart, Droplet, Weight } from 'lucide-react';

const HealthStatsCard = () => {
  const bloodPressureData = [
    { date: 'Nov 20', systolic: 120, diastolic: 80 },
    { date: 'Nov 22', systolic: 118, diastolic: 78 },
    { date: 'Nov 24', systolic: 122, diastolic: 82 },
    { date: 'Nov 26', systolic: 119, diastolic: 79 },
    { date: 'Nov 28', systolic: 121, diastolic: 81 },
  ];

  const bloodSugarData = [
    { date: 'Nov 20', fasting: 95, postMeal: 140 },
    { date: 'Nov 22', fasting: 92, postMeal: 138 },
    { date: 'Nov 24', fasting: 98, postMeal: 145 },
    { date: 'Nov 26', fasting: 94, postMeal: 142 },
    { date: 'Nov 28', fasting: 96, postMeal: 139 },
  ];

  const weightData = [
    { date: 'Nov 20', weight: 75.2 },
    { date: 'Nov 22', weight: 75.0 },
    { date: 'Nov 24', weight: 74.8 },
    { date: 'Nov 26', weight: 74.9 },
    { date: 'Nov 28', weight: 74.7 },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Activity className="w-5 h-5 text-medical-blue" />
          Health Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="blood-pressure" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="blood-pressure" className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Blood Pressure</span>
              <span className="sm:hidden">BP</span>
            </TabsTrigger>
            <TabsTrigger value="blood-sugar" className="flex items-center gap-1">
              <Droplet className="w-4 h-4" />
              <span className="hidden sm:inline">Blood Sugar</span>
              <span className="sm:hidden">Sugar</span>
            </TabsTrigger>
            <TabsTrigger value="weight" className="flex items-center gap-1">
              <Weight className="w-4 h-4" />
              Weight
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blood-pressure" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bloodPressureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    fontSize={12}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    fontSize={12}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="systolic" 
                    stroke="hsl(var(--medical-blue))" 
                    strokeWidth={2}
                    name="Systolic"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="diastolic" 
                    stroke="hsl(var(--health-green))" 
                    strokeWidth={2}
                    name="Diastolic"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="blood-sugar" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bloodSugarData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    fontSize={12}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    fontSize={12}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="fasting" fill="hsl(var(--medical-blue))" name="Fasting" />
                  <Bar dataKey="postMeal" fill="hsl(var(--health-green))" name="Post Meal" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="weight" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    fontSize={12}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    fontSize={12}
                    stroke="hsl(var(--muted-foreground))"
                    domain={['dataMin - 1', 'dataMax + 1']}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="hsl(var(--medical-blue))" 
                    strokeWidth={2}
                    name="Weight (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HealthStatsCard;