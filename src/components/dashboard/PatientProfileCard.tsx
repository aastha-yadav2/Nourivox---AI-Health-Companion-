import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Calendar, 
  Heart, 
  Droplets, 
  Activity, 
  Weight, 
  Ruler,
  Phone,
  Mail,
  MapPin,
  Edit,
  Save,
  X
} from 'lucide-react';

const PatientProfileCard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    height: "",
    weight: "",
    phone: "",
    address: "",
    allergies: "",
    medicalConditions: ""
  });

  // Load profile data from Supabase
  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        return;
      }
      
      if (data) {
        setProfileData({
          name: data.name || "",
          age: data.age?.toString() || "",
          gender: data.gender || "",
          bloodGroup: data.blood_group || "",
          height: data.height || "",
          weight: data.weight || "",
          phone: data.phone || "",
          address: data.address || "",
          allergies: data.allergies || "",
          medicalConditions: data.medical_conditions || ""
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert(
          {
            user_id: user.id,
            name: profileData.name,
            age: profileData.age ? parseInt(profileData.age) : null,
            gender: profileData.gender,
            blood_group: profileData.bloodGroup,
            height: profileData.height,
            weight: profileData.weight,
            phone: profileData.phone,
            address: profileData.address,
            allergies: profileData.allergies,
            medical_conditions: profileData.medicalConditions
          },
          { onConflict: 'user_id' }
        );

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    loadProfile(); // Reset to original data
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-elegant hover:shadow-glow transition-all duration-500 animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Patient Profile
          </CardTitle>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="ghost" size="sm" onClick={handleCancel} disabled={loading}>
                  <X className="w-4 h-4" />
                </Button>
                <Button variant="default" size="sm" onClick={handleSave} disabled={loading}>
                  <Save className="w-4 h-4" />
                  {loading ? "Saving..." : "Save"}
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="hover-scale">
                <Edit className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 animate-scale-in">
          <Avatar className="w-16 h-16 ring-2 ring-primary/20">
            <AvatarImage src="/placeholder-avatar.jpg" alt={profileData.name || "User"} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
              {profileData.name ? profileData.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div>
              {isEditing ? (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-foreground">{profileData.name || "Update your profile"}</h3>
                  <p className="text-sm text-muted-foreground">ID: {user?.id?.slice(0, 8) || "N/A"}</p>
                </>
              )}
            </div>
            
            {!isEditing && (
              <div className="flex flex-wrap gap-2">
                {profileData.age && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {profileData.age} years
                  </Badge>
                )}
                {profileData.gender && (
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground">
                    {profileData.gender}
                  </Badge>
                )}
                {profileData.bloodGroup && (
                  <Badge variant="secondary" className="bg-accent/10 text-accent-foreground">
                    Blood: {profileData.bloodGroup}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Editable Fields */}
        {isEditing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profileData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Age"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={profileData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Select value={profileData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                value={profileData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="e.g., 70 kg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                value={profileData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                placeholder="e.g., 5'8&quot;"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Phone number"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={profileData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Your address"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                value={profileData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                placeholder="List your allergies (comma separated)"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              <Textarea
                id="medicalConditions"
                value={profileData.medicalConditions}
                onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                placeholder="List any medical conditions (comma separated)"
                rows={2}
              />
            </div>
          </div>
        )}

        {/* Health Metrics - Only show if not editing */}
        {!isEditing && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-health-green/10 to-health-green/5 border border-health-green/20 hover-scale">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-health-green" />
                <span className="text-xs font-medium text-muted-foreground">Heart Rate</span>
              </div>
              <p className="text-lg font-semibold text-foreground">72 bpm</p>
            </div>
            
            <div className="p-3 rounded-lg bg-gradient-to-br from-medical-blue/10 to-medical-blue/5 border border-medical-blue/20 hover-scale">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-medical-blue" />
                <span className="text-xs font-medium text-muted-foreground">BP</span>
              </div>
              <p className="text-lg font-semibold text-foreground">120/80</p>
            </div>
            
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover-scale">
              <div className="flex items-center gap-2 mb-1">
                <Weight className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Weight</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{profileData.weight || "Not set"}</p>
            </div>
            
            <div className="p-3 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover-scale">
              <div className="flex items-center gap-2 mb-1">
                <Ruler className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium text-muted-foreground">Height</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{profileData.height || "Not set"}</p>
            </div>
          </div>
        )}

        {/* Contact Information - Only show if not editing */}
        {!isEditing && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Contact Information
            </h4>
            
            <div className="grid gap-3">
              {profileData.phone && (
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{profileData.phone}</span>
                </div>
              )}
              
              {user?.email && (
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{user.email}</span>
                </div>
              )}
              
              {profileData.address && (
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{profileData.address}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Medical Information - Only show if not editing */}
        {!isEditing && (profileData.allergies || profileData.medicalConditions) && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Droplets className="w-4 h-4 text-primary" />
              Medical Information
            </h4>
            
            <div className="space-y-2">
              {profileData.allergies && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground">Allergies:</span>
                  {profileData.allergies.split(',').map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {allergy.trim()}
                    </Badge>
                  ))}
                </div>
              )}
              
              {profileData.medicalConditions && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground">Conditions:</span>
                  {profileData.medicalConditions.split(',').map((condition, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-warning/10 text-warning border-warning/20">
                      {condition.trim()}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-2 pt-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Last visit: <span className="text-foreground font-medium">Dec 15, 2024</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientProfileCard;