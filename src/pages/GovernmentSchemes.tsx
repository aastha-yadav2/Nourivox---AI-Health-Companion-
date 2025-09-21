import React, { useState } from 'react';
import { ExternalLink, Bookmark, Calendar, Phone, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Navigation from '@/components/Navigation';
import { useTranslation } from 'react-i18next';


const schemesData = {
  "pregnant_women_schemes": [
    {
      "name": "Ayushman Bharat - PM-JAY",
      "launch": "23 Sep 2018",
      "eligibility": "Bottom 40% households by SECC 2011",
      "benefits": "Cashless hospitalisation up to ₹5,00,000 per family per year; pre/post hospitalisation costs; pre-existing conditions covered",
      "documents_required": ["Aadhaar / Ration card / PM-JAY beneficiary ID"],
      "how_to_apply": "Check eligibility on PM-JAY portal (mera.pmjay.gov.in) or verify at PHC/CHC / empanelled hospital",
      "notes": "Portable across India; administered through State Health Agencies",
      "sources": ["https://nha.gov.in/PM-JAY","https://mera.pmjay.gov.in"]
    },
    {
      "name": "Atal Ayushman Uttarakhand Yojana (AAUY)",
      "launch": "Dec 2018",
      "eligibility": "Uttarakhand residents, SECC-listed & state-added families (state rollouts)",
      "benefits": "Same ₹5 lakh cashless cover as PM-JAY for eligible families in Uttarakhand",
      "documents_required": ["Aadhaar, residence proof, income/ration card as per SHA rules"],
      "how_to_apply": "Via Uttarakhand State Health Authority portal, Common Service Centres (CSCs), Ayushman camps, or empanelled hospitals",
      "notes": "State-specific expansion; check SHA Uttarakhand for latest enrolment drives",
      "sources": ["https://health.uk.gov.in/scheme/ayushman-card/","https://www.govtschemes.in/atal-ayushman-uttarakhand-yojana"]
    },
    {
      "name": "Janani Suraksha Yojana (JSY)",
      "launch": "12 Apr 2005",
      "eligibility": "Pregnant women meeting state criteria (focus on low-income/BPL/low-performing states)",
      "benefits": "Cash incentives to promote institutional delivery; linkages with ASHA and PHC for registration",
      "documents_required": ["Pregnancy registration, local ID/Aadhaar, bank details"],
      "how_to_apply": "Register at PHC/Anganwadi/ASHA; claim via NHM/ASHA channels",
      "notes": "State variations exist in eligibility and cash amount",
      "sources": ["https://www.nhm.gov.in/index1.php?lang=1&level=3&lid=309&sublinkid=841"]
    },
    {
      "name": "Janani Shishu Suraksha Karyakram (JSSK)",
      "launch": "2011 (national rollout)",
      "eligibility": "All pregnant women delivering in public facilities; sick neonates as per state rules",
      "benefits": "Free delivery (including C-section), free drugs, diagnostics, diet, referral transport, drop-back transport",
      "documents_required": ["Hospital registration, basic ID"],
      "how_to_apply": "Avail in any government institution and demand JSSK entitlements at admission",
      "notes": "Implemented via NHM at state level; check local NHM pages for details",
      "sources": ["https://nhm.gov.in/index1.php?lang=1&level=2&lid=218&sublinkid=822","https://nhm.uk.gov.in/division/maternal-health/"]
    },
    {
      "name": "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
      "launch": "2010 (restructure 2017)",
      "eligibility": "Pregnant & lactating women (age & birth-order rules vary; often first live birth prioritized)",
      "benefits": "Conditional cash transfers in installments for antenatal care and institutional delivery (amount varies by implementation year)",
      "documents_required": ["Pregnancy registration, Aadhaar, bank details"],
      "how_to_apply": "Register at Anganwadi centre / PMMVY portal (UMANG/PMMVY site)",
      "notes": "Check PMMVY portal for current instalment amounts & forms",
      "sources": ["https://pmmvy.wcd.gov.in/","https://pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=155085"]
    },
    {
      "name": "PMSMA (Fixed day ANC)",
      "launch": "2016 (launched)",
      "eligibility": "All pregnant women (2nd/3rd trimester focus)",
      "benefits": "Free assured comprehensive antenatal care on 9th of every month",
      "documents_required": ["Pregnancy card / registration"],
      "how_to_apply": "Visit designated public health facility on the 9th of the month",
      "notes": "Facilities provide specialist checkups & referrals on the fixed day",
      "sources": ["https://pmsma.mohfw.gov.in/","https://www.nhm.gov.in/"]
    },
    {
      "name": "Mission Saksham Anganwadi / Poshan 2.0",
      "launch": "Recent (Poshan 2.0 rollout)",
      "eligibility": "Pregnant women, lactating mothers, children, adolescent girls",
      "benefits": "Take-Home Rations (THR), nutrition counselling, monitoring via Poshan Tracker",
      "documents_required": ["Registration at Anganwadi / Aadhaar as per field norms"],
      "how_to_apply": "Register at the local Anganwadi / ICDS worker",
      "notes": "Digital tracking & facial recognition trials being implemented in phases",
      "sources": ["https://ddnews.gov.in/en/over-72-22-lakh-pregnant-women-registered-under-mission-poshan-2-0/","https://pib.gov.in/Pressreleaseshare.aspx?PRID=1910097"]
    }
  ],
  "newborn_baby_schemes": [
    {
      "name": "Universal Immunization Programme (UIP)",
      "launch": "1985 (ongoing expansion)",
      "eligibility": "All newborns and children; pregnant women for TT/Td as per schedule",
      "benefits": "Free routine immunizations (BCG, OPV, DPT, HepB, HiB, Rotavirus, PCV, MR etc.) at scheduled ages",
      "documents_required": ["Immunization card / hospital registration"],
      "how_to_apply": "Bring baby to immunization session at PHC/Anganwadi/CHC/Govt hospital",
      "notes": "Timely vaccinations critical; use local immunization calendar",
      "sources": ["https://www.mohfw.gov.in/?q=en%2FMajor-Programmes%2Funiversal-immunization-programme-uip","https://nhm.gov.in/index1.php?lang=1&level=2&lid=220&sublinkid=824"]
    },
    {
      "name": "JSSK (newborn entitlements)",
      "launch": "2011 (national)",
      "eligibility": "Newborns born in public facilities; sick neonates as defined by state rules",
      "benefits": "Free treatment, diagnostics, transport and drugs for sick neonates (state-specific age cut-off)",
      "documents_required": ["Hospital / birth record"],
      "how_to_apply": "Ask for JSSK benefits at government hospital where baby is admitted",
      "notes": "State NHM pages give exact age coverage (30 days / 1 year etc.)",
      "sources": ["https://nhm.gov.in/index1.php?lang=1&level=2&lid=218&sublinkid=822","https://nhm.uk.gov.in/division/maternal-health/"]
    },
    {
      "name": "Ayushman Bharat (family coverage for newborns)",
      "launch": "2018",
      "eligibility": "Newborn included if family is PM-JAY / AAUY beneficiary",
      "benefits": "Hospitalisation cover under the family's PM-JAY / AAUY entitlement (subject to package rules)",
      "documents_required": ["Ayushman family card / beneficiary verification"],
      "how_to_apply": "Take newborn to empanelled hospital and produce PM-JAY / AAUY card for verification",
      "notes": "Packages depend on procedure & hospital; check empanelled facility",
      "sources": ["https://nha.gov.in/PM-JAY"]
    },
    {
      "name": "State newborn kits (e.g., Mahalakshmi Kit, Saubhagyavati - Uttarakhand)",
      "launch": "State-specific (e.g., Mahalakshmi Kit 2021 in Uttarakhand)",
      "eligibility": "State-specific (income/residence criteria often apply)",
      "benefits": "Kits containing clothes, diapers, hygiene items, some nutritive items for mother & newborn",
      "documents_required": ["Birth certificate/ hospital record, Aadhaar, local residence proof"],
      "how_to_apply": "Anganwadi / ASHA / district health office distribution after registration or institutional delivery",
      "notes": "Check state health dept / Anganwadi to confirm eligibility & schedule",
      "sources": ["https://www.govtschemes.in/atal-ayushman-uttarakhand-yojana","https://nhm.uk.gov.in/division/maternal-health/"]
    }
  ]
};

const GovernmentSchemes = () => {
  const [showAllPregnant, setShowAllPregnant] = useState(false);
  const [showAllNewborn, setShowAllNewborn] = useState(false);
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState<Set<string>>(new Set());
  const [reminderDates, setReminderDates] = useState<Record<string, Date>>({});
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { t } = useTranslation();

  const toggleBookmark = (schemeName: string) => {
    const newBookmarks = new Set(bookmarkedSchemes);
    if (newBookmarks.has(schemeName)) {
      newBookmarks.delete(schemeName);
    } else {
      newBookmarks.add(schemeName);
    }
    setBookmarkedSchemes(newBookmarks);
  };

  const setReminder = (schemeName: string, date: Date) => {
    setReminderDates(prev => ({ ...prev, [schemeName]: date }));
  };

  const formatBenefits = (benefits: string) => {
    return benefits.replace(/₹[\d,]+/g, (match) => `**${match}**`);
  };

  const callHelpline = () => {
    window.open('tel:112', '_self');
  };

  const openSourceLink = (url: string) => {
    window.open(url, '_blank');
  };

  const SchemeCard = ({ scheme, isBookmarked }: { scheme: any; isBookmarked: boolean }) => (
    <Card className="mb-4 shadow-sm border border-border hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-foreground leading-tight">
            {scheme.name}
          </CardTitle>
          <div className="flex gap-2 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleBookmark(scheme.name)}
              className={cn(
                "p-2 h-8 w-8",
                isBookmarked ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2 h-8 w-8 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={reminderDates[scheme.name]}
                  onSelect={(date) => date && setReminder(scheme.name, date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-foreground">{t('governmentSchemes.launch')}:</span> {scheme.launch}
          </div>
          <div>
            <span className="font-medium text-foreground">{t('governmentSchemes.eligibility')}:</span> {scheme.eligibility}
          </div>
          <div>
            <span className="font-medium text-foreground">{t('governmentSchemes.benefits')}:</span>{' '}
            <span dangerouslySetInnerHTML={{
              __html: formatBenefits(scheme.benefits).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }} />
          </div>
          <div>
            <span className="font-medium text-foreground">{t('governmentSchemes.documents')}:</span>{' '}
            {scheme.documents_required.join(', ')}
          </div>
          <div>
            <span className="font-medium text-foreground">{t('governmentSchemes.howToApply')}:</span>{' '}
            <button
              onClick={() => openSourceLink(scheme.sources[0])}
              className="text-primary underline hover:text-primary/80"
            >
              {scheme.how_to_apply}
            </button>
          </div>
        </div>

        {scheme.notes && (
          <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
            <span className="font-medium">{t('governmentSchemes.notes')}:</span> {scheme.notes}
          </div>
        )}

        {reminderDates[scheme.name] && (
          <Badge variant="secondary" className="text-xs">
            Reminder: {format(reminderDates[scheme.name], 'PPP')}
          </Badge>
        )}

        <div className="flex gap-2 pt-2">
          {scheme.sources.map((source: string, index: number) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => openSourceLink(source)}
              className="text-xs"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              {t('governmentSchemes.moreInfo')} {index + 1}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const pregnantWomenSchemes = showAllPregnant 
    ? schemesData.pregnant_women_schemes 
    : schemesData.pregnant_women_schemes.slice(0, 3);

  const newbornSchemes = showAllNewborn 
    ? schemesData.newborn_baby_schemes 
    : schemesData.newborn_baby_schemes.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Alert Banner */}
        <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-foreground">{t('governmentSchemes.alertBanner')}</p>
        </div>

        {/* Header with Language Toggle and Helpline */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-foreground">{t('governmentSchemes.title')}</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={callHelpline}
              className="text-xs"
            >
              <Phone className="h-3 w-3 mr-1" />
              {t('governmentSchemes.callHelpline')}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pregnant" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="pregnant" className="text-sm">{t('governmentSchemes.pregnantWomen')}</TabsTrigger>
            <TabsTrigger value="newborn" className="text-sm">{t('governmentSchemes.newbornBabies')}</TabsTrigger>
          </TabsList>

          <TabsContent value="pregnant" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">{t('governmentSchemes.pregnantWomen')}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllPregnant(!showAllPregnant)}
                className="text-sm"
              >
                {showAllPregnant ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    {t('governmentSchemes.showLess')}
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    {t('governmentSchemes.showAll')}
                  </>
                )}
              </Button>
            </div>
            
            {pregnantWomenSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.name}
                scheme={scheme}
                isBookmarked={bookmarkedSchemes.has(scheme.name)}
              />
            ))}
          </TabsContent>

          <TabsContent value="newborn" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">{t('governmentSchemes.newbornBabies')}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllNewborn(!showAllNewborn)}
                className="text-sm"
              >
                {showAllNewborn ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    {t('governmentSchemes.showLess')}
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    {t('governmentSchemes.showAll')}
                  </>
                )}
              </Button>
            </div>
            
            {newbornSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.name}
                scheme={scheme}
                isBookmarked={bookmarkedSchemes.has(scheme.name)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default GovernmentSchemes;