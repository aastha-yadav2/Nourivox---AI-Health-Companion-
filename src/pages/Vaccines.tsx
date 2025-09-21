import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, AlertCircle, CheckCircle2, Phone, MapPin, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";

const Vaccines = () => {
  const { t } = useTranslation();
  const [reminderSet, setReminderSet] = useState<string[]>([]);

  const vaccinationCenters = [
    {
      name: "Rewati Nursing Home",
      nameHindi: "रेवती नर्सिंग होम",
      address: "94, Dharampur -1, Adarsh Nagar, Adarsh Nagar-248001 (Adarsh Nagar)",
      addressHindi: "94, धरमपुर -1, आदर्श नगर, आदर्श नगर-248001 (आदर्श नगर)",
      contact: "08485920627",
      mapUrl: "https://jsdl.in/DT-99UIQ2QUA62"
    },
    {
      name: "Pink Clinic",
      nameHindi: "पिंक क्लिनिक",
      address: "Bhagwati Tower, Opp-Sky Garden, Ring Road, Jogiwala, KTY-248001 (Opp-Sky Garden)",
      addressHindi: "भगवती टावर, स्काई गार्डन के सामने, रिंग रोड, जोगीवाला, KTY-248001 (स्काई गार्डन के सामने)",
      contact: "07041824029",
      mapUrl: "https://jsdl.in/DT-99Q143AWGQP"
    },
    {
      name: "Dr Rahul Vashistha (Raksheeta Child Care Clinic)",
      nameHindi: "डॉ राहुल वशिष्ठ (रक्षीता चाइल्ड केयर क्लिनिक)",
      address: "138, Old Nehru Colony, Dharampur, Dehradun - 248001 (Near Indian Overseas Bank, Shiv Mandir)",
      addressHindi: "138, पुराना नेहरू कॉलोनी, धरमपुर, देहरादून - 248001 (इंडियन ओवरसीज बैंक, शिव मंदिर के पास)",
      contact: "Not provided",
      mapUrl: "https://jsdl.in/DT-99UUQFXAIB2"
    },
    {
      name: "Vardan Child Health Clinic",
      nameHindi: "वर्धन चाइल्ड हेल्थ क्लिनिक",
      address: "Officer Colony Get Number 2, Opposite Rathi Sweet, Doon Officer Colony, Dehradun City-248001",
      addressHindi: "ऑफिसर कॉलोनी गेट नंबर 2, राठी स्वीट्स के सामने, दून ऑफिसर कॉलोनी, देहरादून सिटी-248001",
      contact: "Not provided",
      mapUrl: "https://jsdl.in/DT-99R5WR2EJGT"
    },
    {
      name: "Himalayan Hospital",
      nameHindi: "हिमालयन अस्पताल",
      address: "Himalayan Hospital, Jolly Grant, Swami Ram Nagar, Joly Grant, Dehradun, Uttarakhand 248016",
      addressHindi: "हिमालयन अस्पताल, जॉली ग्रांट, स्वामी राम नगर, जॉली ग्रांट, देहरादून, उत्तराखंड 248016",
      contact: "Not provided",
      mapUrl: "#"
    }
  ];

  const vaccineSchedule = [
    {
      age: "Birth",
      ageHindi: "जन्म के समय",
      vaccines: [
        { name: "BCG (Bacillus Calmette-Guérin)", nameHindi: "बीसीजी", description: "Protects against tuberculosis" },
        { name: "Hepatitis B", nameHindi: "हेपेटाइटिस बी", description: "First dose to prevent Hepatitis B" }
      ]
    },
    {
      age: "6 Weeks",
      ageHindi: "6 सप्ताह",
      vaccines: [
        { name: "DTwP/DTaP", nameHindi: "डीटीडब्ल्यूपी/डीटीएपी", description: "Diphtheria, Tetanus, Pertussis" },
        { name: "Hepatitis B", nameHindi: "हेपेटाइटिस बी", description: "Second dose" },
        { name: "Hib", nameHindi: "हिब", description: "Haemophilus Influenzae Type B" },
        { name: "Rotavirus", nameHindi: "रोटावायरस", description: "Prevents rotavirus infection" },
        { name: "PCV", nameHindi: "पीसीवी", description: "Pneumococcal Conjugate Vaccine" },
        { name: "IPV", nameHindi: "आईपीवी", description: "Inactivated Polio Vaccine" }
      ]
    },
    {
      age: "10 Weeks",
      ageHindi: "10 सप्ताह",
      vaccines: [
        { name: "DTwP/DTaP", nameHindi: "डीटीडब्ल्यूपी/डीटीएपी", description: "2nd dose" },
        { name: "Hib", nameHindi: "हिब", description: "2nd dose" },
        { name: "Rotavirus", nameHindi: "रोटावायरस", description: "2nd dose" },
        { name: "PCV", nameHindi: "पीसीवी", description: "2nd dose" },
        { name: "IPV", nameHindi: "आईपीवी", description: "2nd dose" }
      ]
    },
    {
      age: "14 Weeks",
      ageHindi: "14 सप्ताह",
      vaccines: [
        { name: "DTwP/DTaP", nameHindi: "डीटीडब्ल्यूपी/डीटीएपी", description: "3rd dose" },
        { name: "Hib", nameHindi: "हिब", description: "3rd dose" },
        { name: "Rotavirus", nameHindi: "रोटावायरस", description: "3rd dose" },
        { name: "PCV", nameHindi: "पीसीवी", description: "3rd dose" },
        { name: "IPV", nameHindi: "आईपीवी", description: "3rd dose" }
      ]
    },
    {
      age: "9 Months",
      ageHindi: "9 महीने",
      vaccines: [
        { name: "MMR", nameHindi: "एमएमआर", description: "Measles, Mumps, Rubella" },
        { name: "Hepatitis A", nameHindi: "हेपेटाइटिस ए", description: "Prevents Hepatitis A" },
        { name: "Typhoid conjugate vaccine", nameHindi: "टाइफाइड संयुग्मित वैक्सीन", description: "Protects against typhoid fever" }
      ]
    },
    {
      age: "10 Years",
      ageHindi: "10 साल",
      vaccines: [
        { name: "Tdap", nameHindi: "टीडैप", description: "Tetanus, Diphtheria, Pertussis Booster" },
        { name: "HPV (for girls)", nameHindi: "एचपीवी (लड़कियों के लिए)", description: "Human Papillomavirus Vaccine" }
      ]
    }
  ];

  const toggleReminder = (vaccineId: string) => {
    setReminderSet(prev => 
      prev.includes(vaccineId) 
        ? prev.filter(id => id !== vaccineId)
        : [...prev, vaccineId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t("vaccines.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("vaccines.subtitle")}
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-950/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-800 dark:text-orange-200">
                {t("vaccines.importantNotice")}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-orange-700 dark:text-orange-300">
              {t("vaccines.noticeText")}
            </p>
            <Button 
              variant="outline" 
              className="mt-3 border-orange-300 text-orange-700 hover:bg-orange-100"
              onClick={() => window.open("tel:104")}
            >
              <Phone className="h-4 w-4 mr-2" />
              {t("vaccines.callHelpline")}
            </Button>
          </CardContent>
        </Card>

        {/* Tabs for different views */}
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="schedule">{t("vaccines.ageWiseSchedule")}</TabsTrigger>
            <TabsTrigger value="centers">{t("vaccines.vaccinationCenters")}</TabsTrigger>
            <TabsTrigger value="tracker">{t("vaccines.vaccinationTracker")}</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-6">
            {vaccineSchedule.map((ageGroup, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-primary">
                        {t("language") === "hi" ? ageGroup.ageHindi : ageGroup.age}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {ageGroup.vaccines.length} {t("vaccines required")}
                      </CardDescription>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {ageGroup.vaccines.map((vaccine, vIndex) => {
                      const vaccineId = `${index}-${vIndex}`;
                      const hasReminder = reminderSet.includes(vaccineId);
                      
                      return (
                        <div 
                          key={vIndex}
                          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-foreground">
                              {t("language") === "hi" ? vaccine.nameHindi : vaccine.name}
                            </h4>
                            <Badge variant="outline" className="ml-2">
                              {t("Required")}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {vaccine.description}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={hasReminder ? "default" : "outline"}
                              onClick={() => toggleReminder(vaccineId)}
                              className="flex-1"
                            >
                              {hasReminder ? (
                                <>
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  {t("Reminder Set")}
                                </>
                              ) : (
                                <>
                                  <Clock className="h-3 w-3 mr-1" />
                                  {t("Set Reminder")}
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="centers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t("Vaccination Centers in Dehradun")}
                </CardTitle>
                <CardDescription>
                  {t("Find nearby vaccination centers with contact details and locations")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {vaccinationCenters.map((center, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold text-lg text-foreground">
                              {t("language") === "hi" ? center.nameHindi : center.name}
                            </h4>
                            <Badge variant="outline">{t("Verified")}</Badge>
                          </div>
                          
                          <div className="flex items-start gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                            <p className="text-sm">
                              {t("language") === "hi" ? center.addressHindi : center.address}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {center.contact !== "Not provided" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(`tel:${center.contact}`)}
                                className="flex items-center gap-1"
                              >
                                <Phone className="h-3 w-3" />
                                {center.contact}
                              </Button>
                            )}
                            
                            {center.mapUrl !== "#" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(center.mapUrl, '_blank')}
                                className="flex items-center gap-1"
                              >
                                <ExternalLink className="h-3 w-3" />
                                {t("View on Map")}
                              </Button>
                            )}
                            
                            <Button
                              size="sm"
                              variant="default"
                              className="flex items-center gap-1"
                            >
                              <Calendar className="h-3 w-3" />
                              {t("Book Appointment")}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Help Section */}
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                      {t("Need Help Finding Centers?")}
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                      {t("Call the National Immunization Helpline for assistance")}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                      onClick={() => window.open("tel:104")}
                    >
                      {t("Call 104 - Free Helpline")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracker" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("Vaccination Tracker")}</CardTitle>
                <CardDescription>
                  {t("Track your child's vaccination progress")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vaccineSchedule.map((ageGroup, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">
                          {t("language") === "hi" ? ageGroup.ageHindi : ageGroup.age}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {ageGroup.vaccines.length} {t("vaccines")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {t("Pending")}
                        </Badge>
                        <Button size="sm" variant="outline">
                          {t("Mark Complete")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t("Additional Resources")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="font-medium">{t("Find Vaccination Centers")}</div>
                  <div className="text-sm text-muted-foreground">{t("Locate nearby government health centers")}</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="font-medium">{t("Download Vaccination Card")}</div>
                  <div className="text-sm text-muted-foreground">{t("Digital vaccination record")}</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Vaccines;