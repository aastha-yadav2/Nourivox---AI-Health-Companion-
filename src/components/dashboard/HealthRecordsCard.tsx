import React, { useState } from 'react';
import { Upload, FileText, Image, Download, Eye, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface HealthRecord {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'document';
  date: string;
  size: string;
}

const HealthRecordsCard = () => {
  const [records, setRecords] = useState<HealthRecord[]>([
    {
      id: '1',
      name: 'Blood Test Results - November 2024',
      type: 'pdf',
      date: 'Nov 28, 2024',
      size: '245 KB'
    },
    {
      id: '2',
      name: 'Chest X-Ray',
      type: 'image',
      date: 'Nov 25, 2024',
      size: '1.2 MB'
    },
    {
      id: '3',
      name: 'Prescription - Dr. Johnson',
      type: 'document',
      date: 'Nov 20, 2024',
      size: '180 KB'
    }
  ]);

  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newRecord: HealthRecord = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type.includes('image') ? 'image' : file.type.includes('pdf') ? 'pdf' : 'document',
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        size: `${Math.round(file.size / 1024)} KB`
      };
      
      setRecords(prev => [newRecord, ...prev]);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been added to your health records.`,
      });
    }
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
    toast({
      title: "Record deleted",
      description: "The health record has been removed.",
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-destructive" />;
      case 'image':
        return <Image className="w-5 h-5 text-medical-blue" />;
      default:
        return <FileText className="w-5 h-5 text-health-green" />;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'image':
        return 'bg-medical-blue/10 text-medical-blue border-medical-blue/20';
      default:
        return 'bg-health-green/10 text-health-green border-health-green/20';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-health-green" />
            Health Records
          </div>
          <label htmlFor="file-upload">
            <Button variant="outline" size="sm" className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {records.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No health records uploaded yet</p>
            <p className="text-sm">Upload your first document to get started</p>
          </div>
        ) : (
          records.map((record) => (
            <div key={record.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border group hover:shadow-sm transition-shadow">
              {getFileIcon(record.type)}
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{record.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={`text-xs ${getFileTypeColor(record.type)}`}>
                    {record.type.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{record.date}</span>
                  <span className="text-xs text-muted-foreground">• {record.size}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDeleteRecord(record.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default HealthRecordsCard;