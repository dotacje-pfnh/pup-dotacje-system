import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Download, CheckCircle, AlertCircle, Info, Mail, X, Plus, Trash2 } from 'lucide-react';

const InfoTooltip = ({ text }) => (
  <div className="group relative inline-block ml-2">
    <Info className="text-blue-500 cursor-help" size={16} />
    <div className="invisible group-hover:visible absolute z-10 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg -left-32 top-6">
      {text}
    </div>
  </div>
);

export default function PUPVerificationForm() {
  const [step, setStep] = useState(1);
  const [pkdSearch, setPkdSearch] = useState('');
  const [showPkdResults, setShowPkdResults] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pesel: '',
    birthDate: '',
    addressResidence: '',
    addressRegistration: '',
    isUnemployed: '',
    registrationDate: '',
    hasIPD: '',
    businessIdea: '',
    businessType: '',
    pkdCode: '',
    pkdDescription: '',
    additionalPKD: [],
    isMobileService: '',
    hasStorageSpace: '',
    storageLocation: '',
    hasWorkExperience: '',
    workExperiences: [{
      type: '',
      position: '',
      company: '',
      periodFrom: '',
      periodTo: '',
      duties: ''
    }],
    education: [{
      level: '',
      field: '',
      school: '',
      yearCompleted: ''
    }],
    isEducationRelated: '',
    courses: [{
      name: '',
      institution: '',
      year: '',
      hasCertificate: ''
    }],
    hasLocation: '',
    locationType: '',
    isLocationInKrakow: '',
    hasGuarantor: '',
    guarantorIncomeAmount: '',
    requestedAmount: '',
    isDKR: false,
    isOver50: false,
    isUnder30: false,
    isDisabled: false,
    isLongTermUnemployed: false,
    isSingleParent: false,
    hasNoQualifications: false
  });

  const [errors, setErrors] = useState({});
  const [verificationResult, setVerificationResult] = useState(null);

  const pkdDatabase = [
    { code: '96.02.Z', name: 'Fryzjerstwo i pozostałe zabiegi kosmetyczne', section: '96' },
    { code: '96.04.Z', name: 'Działalność usługowa związana z poprawą kondycji fizycznej', section: '96' },
    { code: '47.11.Z', name: 'Sprzedaż detaliczna w sklepach z żywnością', section: '47' },
    { code: '47.71.Z', name: 'Sprzedaż detaliczna odzieży', section: '47' },
    { code: '56.10.A', name: 'Restauracje i placówki gastronomiczne', section: '56' },
    { code: '56.21.Z', name: 'Catering', section: '56' },
    { code: '43.21.Z', name: 'Instalacje elektryczne', section: '43' },
    { code: '43.32.Z', name: 'Stolarka budowlana', section: '43' },
    { code: '43.34.Z', name: 'Malowanie i szklenie', section: '43' },
    { code: '62.01.Z', name: 'Programowanie', section: '62' },
    { code: '73.11.Z', name: 'Agencje reklamowe', section: '73' },
    { code: '74.20.Z', name: 'Fotografia', section: '74' },
    { code: '81.21.Z', name: 'Sprzątanie', section: '81' },
    { code: '85.51.Z', name: 'Edukacja sportowa', section: '85' },
    { code: '95.11.Z', name: 'Naprawa komputerów', section: '95' }
  ];

  const filterPKD = (searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) return [];
    const lower = searchTerm.toLowerCase();
    return pkdDatabase.filter(pkd => 
      pkd.code.toLowerCase().includes(lower) || 
      pkd.name.toLowerCase().includes(lower)
    );
  };

  const selectMainPKD = (pkd) => {
    setFormData(prev => ({
      ...prev,
      pkdCode: pkd.code,
      pkdDescription: pkd.name
    }));
    setPkdSearch(pkd.code + ' - ' + pkd.name);
    setShowPkdResults(false);
  };

  const addAdditionalPKD = (pkd) => {
    if (formData.additionalPKD.length >= 3) {
      alert('Maksymalnie 3 dodatkowe kody PKD');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      additionalPKD: [...prev.additionalPKD, { code: pkd.code, name: pkd.name }]
    }));
  };

  const removeAdditionalPKD = (code) => {
    setFormData(prev => ({
      ...prev,
      additionalPKD: prev.additionalPKD.filter(p => p.code !== code)
    }));
  };

  const addWorkExperience = () => {
    setFormData(prev => ({
      ...prev,
      workExperiences: [...prev.workExperiences, {
        type: '',
        position: '',
        company: '',
        periodFrom: '',
        periodTo: '',
        duties: ''
      }]
    }));
  };

  const removeWorkExperience = (index) => {
    if (formData.workExperiences.length > 1) {
      setFormData(prev => ({
        ...prev,
        workExperiences: prev.workExperiences.filter((_, i) => i !== index)
      }));
    }
  };

  const updateWorkExperience = (index, field, value) => {
    const newExperiences = [...formData.workExperiences];
    newExperiences[index][field] = value;
    setFormData(prev => ({ ...prev, workExperiences: newExperiences }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        level: '',
        field: '',
        school: '',
        yearCompleted: ''
      }]
    }));
  };

  const removeEducation = (index) => {
    if (formData.education.length > 1) {
      setFormData(prev => ({
        ...prev,
        education: prev.education.filter((_, i) => i !== index)
      }));
    }
  };

  const updateEducation = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData(prev => ({ ...prev, education: newEducation }));
  };

  const addCourse = () => {
    setFormData(prev => ({
      ...prev,
      courses: [...prev.courses, {
        name: '',
        institution: '',
        year: '',
        hasCertificate: ''
      }]
    }));
  };

  const removeCourse = (index) => {
    if (formData.courses.length > 1) {
      setFormData(prev => ({
        ...prev,
        courses: prev.courses.filter((_, i) => i !== index)
      }));
    }
  };

  const updateCourse = (index, field, value) => {
    const newCourses = [...formData.courses];
    newCourses[index][field] = value;
    setFormData(prev => ({ ...prev, courses: newCourses }));
  };

  const calculateWorkDuration = (periodFrom, periodTo) => {
    if (!periodFrom || !periodTo) return 0;
    const from = new Date(periodFrom);
    const to = new Date(periodTo);
    const months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
    return Math.max(0, months);
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.firstName) newErrors.firstName = 'Wymagane';
      if (!formData.lastName) newErrors.lastName = 'Wymagane';
      if (!formData.email) newErrors.email = 'Wymagane';
      if (!formData.phone) newErrors.phone = 'Wymagane';
    }
    
    if (currentStep === 2) {
      if (!formData.isUnemployed) newErrors.isUnemployed = 'Wymagane';
    }
    
    if (currentStep === 3) {
      if (!formData.businessIdea) newErrors.businessIdea = 'Wymagane';
      if (!formData.pkdCode) newErrors.pkdCode = 'Wymagane';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePoints = () => {
    let points = 0;
    
    if (formData.businessType === 'produkcja') points += 2;
    else points += 1;
    
    if (formData.isEducationRelated === 'zgodne') points += 4;
    else if (formData.isEducationRelated === 'podobne') points += 2;
    
    const coursesWithCert = formData.courses.filter(c => c.name && c.hasCertificate === 'tak').length;
    points += Math.min(3, coursesWithCert);
    
    const totalMonths = formData.workExperiences.reduce((sum, exp) => {
      return sum + calculateWorkDuration(exp.periodFrom, exp.periodTo);
    }, 0);
    
    if (totalMonths >= 36) points += 4;
    else if (totalMonths >= 12) points += 3;
    else if (totalMonths >= 6) points += 2;
    else if (totalMonths > 0) points += 1;
    
    if (formData.isLocationInKrakow === 'tak') points += 2;
    
    let prefPoints = [
      formData.isDKR,
      formData.isOver50,
      formData.isUnder30,
      formData.isDisabled,
      formData.isLongTermUnemployed,
      formData.isSingleParent,
      formData.hasNoQualifications
    ].filter(Boolean).length;
    
    points += Math.min(prefPoints, 2);
    
    return points;
  };

  const performVerification = () => {
    const issues = [];
    const warnings = [];
    const strengths = [];
    const points = calculatePoints();
    
    if (formData.isUnemployed !== 'tak') {
      issues.push('Kandydat musi być zarejestrowany jako osoba bezrobotna w PUP Kraków');
    } else {
      strengths.push('Status osoby bezrobotnej potwierdzony');
    }
    
    if (formData.hasIPD !== 'tak') {
      issues.push('Brak IPD z możliwością dotacji');
    } else {
      strengths.push('Posiada IPD');
    }
    
    if (points < 23) {
      warnings.push(`Za mało punktów: ${points}/23`);
    } else {
      strengths.push(`Punkty: ${points}/23 ✓`);
    }
    
    const totalMonths = formData.workExperiences.reduce((sum, exp) => {
      return sum + calculateWorkDuration(exp.periodFrom, exp.periodTo);
    }, 0);
    
    if (totalMonths === 0) {
      warnings.push('Brak doświadczenia zawodowego');
    } else if (totalMonths >= 36) {
      strengths.push(`Ponad 3-letnie doświadczenie (${Math.floor(totalMonths/12)} lat)`);
    }
    
    if (formData.hasLocation !== 'tak') {
      warnings.push('Brak lokalu');
    } else if (formData.isLocationInKrakow === 'tak') {
      strengths.push('Lokal w Krakowie (+2 pkt)');
    }
    
    const amount = parseFloat(formData.requestedAmount);
    if (amount > 45000) {
      issues.push('Maksymalna kwota w Krakowie to 45 000 zł');
    }
    
    setVerificationResult({
      canProceed: issues.length === 0 && points >= 23,
      points,
      minPoints: 23,
      issues,
      warnings,
      strengths
    });
  };

  const generateContract = () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const requestedAmount = parseFloat(formData.requestedAmount) || 0;
    const feeAmount = Math.max(requestedAmount * 0.1, 4200);
    
    return `Do: ${formData.email}
Od: dotacje@fundacjanh.org
Temat: Warunki współpracy - Dotacja PUP Kraków ${currentYear}/${nextYear}

Szanowni Państwo ${formData.firstName} ${formData.lastName},

Przesyłamy warunki z roku ${currentYear} - w ${nextYear} kwota wynagrodzenia może pójść lekko do góry zgodnie z wnioskowaną kwotą i zasadą 10%.

Z ogromną przyjemnością przystępujemy do współpracy z Państwem w procesie aplikacyjnym o dofinansowanie na otwarcie działalności gospodarczej z Powiatowego Urzędu Pracy w Krakowie.

W celu zapewnienia pełnej transparentności i zrozumienia naszych wzajemnych zobowiązań, przedstawiamy poniżej warunki naszej współpracy, oparte na przepisach Kodeksu Cywilnego oraz innych relatywnych aktach prawnych obowiązujących w Polsce.

═════════════════════════════════════════════════════════════

1. WYNAGRODZENIE I WARUNKI PŁATNOŚCI

Nasze wynagrodzenie wynosi 10% przyznanej kwoty dofinansowania netto, jednak nie mniej niż 4 200 zł netto.

Przy wnioskowanej kwocie ${requestedAmount.toLocaleString('pl-PL')} zł:
→ Przewidywane wynagrodzenie: ${feeAmount.toLocaleString('pl-PL')} zł netto

Zgodnie z zasadą "success fee", wynagrodzenie będzie naliczone jedynie w przypadku:
• pozytywnego rozpatrzenia wniosku i przyznania dofinansowania, ALBO
• celowej rezygnacji klienta po otrzymaniu naszych dokumentów (podjęcie pracy, niewstawienie się na termin w urzędzie, decyzja o pisaniu samemu, niedostarczenie dokumentów, itp.)

W sytuacji, gdy z przyczyn niezależnych od Państwa, takich jak:
• błędnie formalnie przygotowany wniosek przez naszą stronę
• niska ocena merytoryczna
• niska punktacja przyznana przez komisję urzędu

dofinansowanie nie zostanie przyznane, Fundacja NIE będzie żądała zapłaty.

Jednakże, wymagamy od Państwa zaangażowania w proces odwoławczy i kontynuacji współpracy do czasu jego zakończenia, przy zachowaniu statusu osoby bezrobotnej.

═════════════════════════════════════════════════════════════

2. OBOWIĄZKI I ODPOWIEDZIALNOŚĆ ZLECENIODAWCY

Zobowiązujecie się Państwo do:

✓ terminowego podpisywania przygotowanych dokumentów
✓ dostarczania wymaganych załączników w wyznaczonych terminach
✓ utrzymania statusu osoby bezrobotnej do czasu zakończenia procesu aplikacyjnego
✓ zapewnienia poręczyciela lub innej formy zabezpieczenia, jeśli wymagane

W przypadku niezrealizowania powyższych obowiązków, co skutkować będzie nieprzyznaniem dofinansowania, nasza Fundacja będzie zmuszona zażądać zapłaty wynagrodzenia w wysokości 10% wnioskowanej kwoty dofinansowania, jednak nie mniej niż 3 500 zł netto.

═════════════════════════════════════════════════════════════

3. OCHRONA KNOW-HOW I TAJEMNICA PRZEDSIĘBIORSTWA

Informacje oraz dokumenty przekazane Państwu w ramach naszej współpracy są objęte tajemnicą przedsiębiorstwa.

Ich ujawnienie osobom trzecim lub wykorzystanie w inny sposób niż do celów aplikacyjnych będzie stanowić naruszenie niniejszej umowy, podlegające sankcjom określonym w Kodeksie Cywilnym, w tym obowiązkiem zapłaty kary umownej w wysokości 20 000 zł netto.

═════════════════════════════════════════════════════════════

PROCEDURA AKCEPTACJI

Prosimy o potwierdzenie akceptacji powyższych warunków poprzez odpowiedź na ten email według wzoru:

${formData.firstName} ${formData.lastName} Akceptuję Warunki

Po otrzymaniu Państwa zgody, niezwłocznie przystąpimy do realizacji zadań związanych z przygotowaniem wniosku o dofinansowanie.

═════════════════════════════════════════════════════════════

USŁUGI DODATKOWE

Dodatkowo Fundacja Promocji Nowej Huty informuje, iż prowadzi również inne usługi promocyjno-marketingowe.

Jeśli będą Państwo zainteresowani sfinansowaniem w ramach dotacji np.:
• Logo firmowe
• Projekt wizytówek
• Ulotki i materiały reklamowe
• Strona internetowa

prosimy o kontakt. Prześlemy cennik dostępnych usług.

⚠️ Informujemy, iż jest to usługa dodatkowa, NIE zawiera się w cenie przygotowania wniosku.

═════════════════════════════════════════════════════════════

Uprzejmie proszę o udzielenie odpowiedzi bezpośrednio na tego maila, aby zachować ciągłość korespondencji.

Z poważaniem,
Fundacja Promocji Nowej Huty
Email: dotacje@fundacjanh.org
Tel: [numer telefonu fundacji]

───────────────────────────────────────────────────────────

PODSUMOWANIE DANYCH KANDYDATA:
Imię i nazwisko: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Telefon: ${formData.phone}
Planowana działalność: ${formData.pkdCode} - ${formData.pkdDescription}
Wnioskowana kwota: ${requestedAmount.toLocaleString('pl-PL')} zł
Punktacja: ${calculatePoints()} / 23 pkt
Data wygenerowania: ${new Date().toLocaleDateString('pl-PL')}
`;
  };

  const generateDocs = () => {
    const candidateName = `${formData.firstName} ${formData.lastName}`;
    const totalMonths = formData.workExperiences.reduce((sum, exp) => {
      return sum + calculateWorkDuration(exp.periodFrom, exp.periodTo);
    }, 0);
    
    return `═════════════════════════════════════════════════════════════
LISTA DOKUMENTÓW DO PRZYGOTOWANIA
Wniosek o dotację PUP Kraków - ${new Date().getFullYear()}
═════════════════════════════════════════════════════════════

DANE KANDYDATA:
Imię i nazwisko: ${candidateName}
Email: ${formData.email}
Telefon: ${formData.phone}
Adres: ${formData.addressResidence || '[do uzupełnienia]'}

PLANOWANA DZIAŁALNOŚĆ:
PKD główny: ${formData.pkdCode} - ${formData.pkdDescription}
${formData.additionalPKD.length > 0 ? `PKD dodatkowe: ${formData.additionalPKD.map(p => p.code).join(', ')}\n⚠️ WYMAGAJĄ ZGODY DYREKTORA PUP!\n` : ''}
Rodzaj: ${formData.businessType}
${formData.isMobileService === 'tak' ? 'Działalność mobilna: TAK\n' : 'Działalność stacjonarna\n'}
Kwota wnioskowana: ${formData.requestedAmount || '[do uzupełnienia]'} zł
Punktacja przewidywana: ${calculatePoints()} / 23 pkt

═════════════════════════════════════════════════════════════
WAŻNE PRZYPOMNIENIA - PRZECZYTAJ UWAŻNIE!
═════════════════════════════════════════════════════════════

✓ Wszystkie dokumenty muszą zawierać WŁASNORĘCZNE podpisy
✓ Dane muszą być KOMPLETNE i CZYTELNE
✓ W przypadku firm - WYMAGANY NIP i pieczątka firmowa
✓ ⚠️ Listy intencyjne i referencje NIE MOGĄ być podpisane przez tę samą osobę!
✓ Dokumenty można dostarczyć osobiście lub w formie CZYTELNYCH skanów
✓ Wzory dokumentów otrzymasz od Fundacji

═════════════════════════════════════════════════════════════
DOKUMENTY WYMAGANE - CHECKLISTA
═════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│ 1. TYTUŁ PRAWNY DO LOKALU                                   │
└─────────────────────────────────────────────────────────────┘

${formData.locationType === 'własny' ? `☐ AKT WŁASNOŚCI lub KSIĘGA WIECZYSTA
   - Kserokopia z oryginałem do wglądu
   - Adres lokalu: ${formData.locationAddress || '[uzupełnić]'}
` : ''}
${formData.locationType === 'najem' ? `☐ UMOWA NAJMU LOKALU (OBOWIĄZKOWA)
   - Okres umowy: MINIMUM 12 miesięcy od rozpoczęcia działalności
   - Adres lokalu: ${formData.locationAddress || '[uzupełnić]'}
   - Podpisy: wynajmujący + najemca
   - ⚠️ DOŁĄCZYĆ: Klauzula informacyjna (załącznik nr 3 do wniosku) podpisana przez obie strony
   
   Wzór otrzymasz od Fundacji
` : ''}
${formData.locationType === 'użyczenie' ? `☐ UMOWA UŻYCZENIA LOKALU (OBOWIĄZKOWA)
   ⚠️ TYLKO od rodziny w I lub II stopniu pokrewieństwa!
   (rodzice, rodzeństwo, dziadkowie, wnuki)
   
   - Okres umowy: MINIMUM 12 miesięcy od rozpoczęcia działalności
   - Adres lokalu: ${formData.locationAddress || '[uzupełnić]'}
   - Stopień pokrewieństwa: [I lub II]
   - Podpisy: użyczający + biorący
   - ⚠️ DOŁĄCZYĆ: Klauzula informacyjna (załącznik nr 3 do wniosku) podpisana przez obie strony
   
   Wzór otrzymasz od Fundacji
` : ''}

${formData.isMobileService === 'tak' ? `⚠️ DZIAŁALNOŚĆ MOBILNA - DODATKOWE WYMAGANIA:

- Miejsce rejestracji: może być mieszkanie własne/rodziców (za zgodą)
- Miejsce przechowania sprzętu: ${formData.hasStorageSpace === 'tak' && formData.storageLocation ? 
  `\n  ${formData.storageLocation}\n  ☐ Dokument potwierdzający tytuł prawny do miejsca przechowania` : 
  'pod adresem rejestracji'}
- W części II pkt 7 wniosku wskazać planowane miejsca świadczenia usług

` : ''}

┌─────────────────────────────────────────────────────────────┐
│ 2. LISTY INTENCYJNE - MINIMUM 14 SZTUK (7+7)               │
└─────────────────────────────────────────────────────────────┘

A) OD OSÓB PRYWATNYCH - MINIMUM 7 SZTUK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Każda lista MUSI zawierać:
✓ Imię i nazwisko osoby
✓ Pełny adres zamieszkania
✓ Własnoręczny podpis
✓ Data i miejscowość

Wzory do wykorzystania (otrzymasz od Fundacji):
• LIST INTENCYJNY_OSOBA PRYWATNA.docx
• LIST INTENCYJNY_OSOBA PRYWATNA_2.docx
• LIST INTENCYJNY_OSOBA PRYWATNA_3.docx

☐ Lista intencyjna 1 - osoba prywatna
☐ Lista intencyjna 2 - osoba prywatna
☐ Lista intencyjna 3 - osoba prywatna
☐ Lista intencyjna 4 - osoba prywatna
☐ Lista intencyjna 5 - osoba prywatna
☐ Lista intencyjna 6 - osoba prywatna
☐ Lista intencyjna 7 - osoba prywatna

B) OD FIRM/SALONÓW - MINIMUM 7 SZTUK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Każda lista MUSI zawierać:
✓ Pełna nazwa firmy
✓ Adres siedziby firmy
✓ NIP firmy (OBOWIĄZKOWO!)
✓ Pieczątka firmowa (zalecana)
✓ Podpis osoby upoważnionej
✓ Data i miejscowość

Wzory do wykorzystania (otrzymasz od Fundacji):
• LIST INTENCYJNY_FIRMA.docx
• LIST INTENCYJNY_FIRMA_2.docx
• LIST INTENCYJNY_FIRMA_3.docx

☐ Lista intencyjna 1 - firma/salon
☐ Lista intencyjna 2 - firma/salon
☐ Lista intencyjna 3 - firma/salon
☐ Lista intencyjna 4 - firma/salon
☐ Lista intencyjna 5 - firma/salon
☐ Lista intencyjna 6 - firma/salon
☐ Lista intencyjna 7 - firma/salon

${formData.businessType === 'handel' || formData.businessType === 'gastronomia' ? `
⚠️⚠️⚠️ OBOWIĄZKOWE DLA HANDLU/GASTRONOMII ⚠️⚠️⚠️

C) OD HURTOWNI/DOSTAWCÓW - MINIMUM 2-3 SZTUKI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To jest WYMAGANE przez PUP dla działalności handlowej!

Każda lista MUSI zawierać:
✓ Pełna nazwa hurtowni
✓ Adres siedziby
✓ NIP
✓ Deklaracja regularnego dostarczania towarów/materiałów
✓ Pieczątka firmowa
✓ Podpis osoby upoważnionej

Wzory (otrzymasz od Fundacji):
• LIST INTENCYJNY_HURTOWNIA.docx
• LIST INTENCYJNY_HURTOWNIA_2.docx

☐ Lista intencyjna - hurtownia 1
☐ Lista intencyjna - hurtownia 2
☐ Lista intencyjna - hurtownia 3 (opcjonalnie)
` : ''}

┌─────────────────────────────────────────────────────────────┐
│ 3. REFERENCJE (mile widziane, opcjonalne)                  │
└─────────────────────────────────────────────────────────────┘

⚠️ PAMIĘTAJ: Osoba wystawiająca referencję NIE MOŻE być tą samą osobą,
która podpisała list intencyjny!

Referencje znacznie WZMACNIAJĄ wniosek!

☐ Referencje od pracodawcy/salonu
   Wzór: REFERENCJE SALON.docx
   
☐ Referencje od klienta 1
☐ Referencje od klienta 2
   Wzory: REFERENCJE_OSOBA FIZYCZNA_KLIENT_ZNAJOMI.docx

┌─────────────────────────────────────────────────────────────┐
│ 4. DOKUMENTY POTWIERDZAJĄCE DOŚWIADCZENIE ZAWODOWE          │
└─────────────────────────────────────────────────────────────┘

⚠️ PUP UZNAJE TYLKO:
• Świadectwa pracy (dla umów o pracę)
• Umowy cywilnoprawne (zlecenie, dzieło) - oryginał do wglądu
• Zaświadczenia o stażu wydane przez Urząd Pracy

NIEDOZWOLONE jako dowód:
✗ Opinie
✗ Świadectwa ukończenia kursów
✗ Listy polecające bez dokumentów zatrudnienia

Twoje doświadczenie (łącznie: ${totalMonths} miesięcy = ${Math.floor(totalMonths/12)} lat ${totalMonths % 12} mies):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.workExperiences.map((exp, i) => {
  if (!exp.position && !exp.company) return '';
  const months = calculateWorkDuration(exp.periodFrom, exp.periodTo);
  return `☐ Doświadczenie ${i + 1}:
   Stanowisko: ${exp.position || '[uzupełnić]'}
   Firma: ${exp.company || '[uzupełnić]'}
   Okres: ${months > 0 ? `${Math.floor(months/12)} lat ${months % 12} mies` : '[uzupełnić daty]'}
   Typ: ${exp.type || '[uzupełnić]'}
   Wymagany dokument: ${
     exp.type === 'umowa_o_prace' ? 'ŚWIADECTWO PRACY' :
     exp.type === 'zlecenie' ? 'UMOWA ZLECENIE/DZIEŁO (oryginał do wglądu)' :
     exp.type === 'staż' ? 'ZAŚWIADCZENIE Z PUP' :
     'DOKUMENTY POTWIERDZAJĄCE ZATRUDNIENIE'
   }
`;
}).join('\n')}

${formData.workExperiences.some(exp => exp.type === 'staż' || exp.type === 'praktyki') ? `
☐ ZAŚWIADCZENIE O PRAKTYKACH/STAŻU
   Wzór: ZAŚWIADCZENIE O PRAKTYKACH.docx
   
   Musi zawierać:
   - Okres praktyk (od-do)
   - Zakres wykonywanych obowiązków
   - Ocenę praktyk
   - Pieczątka i podpis właściciela/kierownika
` : ''}

┌─────────────────────────────────────────────────────────────┐
│ 5. WYKSZTAŁCENIE I KWALIFIKACJE                             │
└─────────────────────────────────────────────────────────────┘

${formData.education.map((edu, i) => {
  if (!edu.level && !edu.field) return '';
  return `☐ Szkoła ${i + 1}:
   Poziom: ${edu.level || '[uzupełnić]'}
   Kierunek: ${edu.field || '[uzupełnić]'}
   Nazwa: ${edu.school || '[uzupełnić]'}
   Rok: ${edu.yearCompleted || '[uzupełnić]'}
   Dokument: DYPLOM/ŚWIADECTWO
`;
}).join('\n')}

${formData.courses.filter(c => c.name).length > 0 ? `
☐ CERTYFIKATY UKOŃCZONYCH KURSÓW:
${formData.courses.filter(c => c.name).map((c, i) => `   ${i+1}. ${c.name}${c.hasCertificate === 'tak' ? ' (z certyfikatem - +1 pkt)' : ''}`).join('\n')}
` : ''}

${formData.isMarried === 'tak' && formData.hasSeparation !== 'tak' ? `
┌─────────────────────────────────────────────────────────────┐
│ 6. ZGODA MAŁŻONKA (OBOWIĄZKOWA!)                            │
└─────────────────────────────────────────────────────────────┘

☐ ZGODA MAŁŻONKA NA PROWADZENIE DZIAŁALNOŚCI

⚠️⚠️⚠️ BARDZO WAŻNE ⚠️⚠️⚠️
Zgoda MUSI być złożona OSOBIŚCIE w obecności:
• pracownika Grodzkiego Urzędu Pracy w Krakowie, LUB
• notariusza

Wzór: OŚWIADCZENIE_MAŁŻONKA.docx (otrzymasz od Fundacji)

NIE można podpisać w domu i przynieść!
` : ''}

${formData.hasGuarantor === 'tak' ? `
┌─────────────────────────────────────────────────────────────┐
│ 7. DOKUMENTY PORĘCZYCIELA                                   │
└─────────────────────────────────────────────────────────────┘

☐ Oświadczenie poręczyciela o dochodach
   Zawiera:
   - Źródło dochodu
   - Wysokość: MINIMUM 5 600 zł brutto (Twój poręczyciel: ${formData.guarantorIncomeAmount || '[uzupełnić]'} zł)
   - Zobowiązania finansowe
   - Dane: imię, nazwisko, adres, PESEL, dokument tożsamości

${formData.guarantorIncome === 'umowa_o_prace' ? `
☐ Zaświadczenie z pracy o zatrudnieniu
   - Okres zatrudnienia (preferowane: czas nieokreślony lub min. 18 mies)
   - Wysokość wynagrodzenia
` : ''}

${formData.guarantorHasSpouse === 'tak' && formData.guarantorHasSeparation !== 'tak' ? `
⚠️ UWAGA: Poręczyciel w związku małżeńskim
☐ Zgoda współmałżonka poręczyciela
   - Do złożenia OSOBIŚCIE w PUP lub u notariusza
` : ''}
` : ''}

${formData.hasGuarantor === 'nie' ? `
┌─────────────────────────────────────────────────────────────┐
│ 7. BLOKADA RACHUNKU BANKOWEGO                               │
└─────────────────────────────────────────────────────────────┘

☐ Dokument blokady rachunku bankowego

Kwota do zablokowania: ${formData.requestedAmount ? 
  `${Math.ceil(parseFloat(formData.requestedAmount) * 1.0925).toLocaleString('pl-PL')} zł` : 
  '[kwota wnioskowana + 9.25%]'}

Kalkulacja: ${formData.requestedAmount || '[kwota]'} zł + 9.25% = kwota blokady

Wymagania:
- Blokada na CZAS NIEOKREŚLONY
- NIE MOŻE być na lokacie
- Dokument potwierdzony pieczęcią i podpisem banku
- Zwolnienie po rozliczeniu umowy
` : ''}

┌─────────────────────────────────────────────────────────────┐
│ 8. DOKUMENTY TOŻSAMOŚCI                                     │
└─────────────────────────────────────────────────────────────┘

☐ Dowód osobisty - oryginał do wglądu, kserokopia do akt

═════════════════════════════════════════════════════════════
HARMONOGRAM DZIAŁAŃ - PLAN KROK PO KROKU
═════════════════════════════════════════════════════════════

TYDZIEŃ 1-2: Dokumenty lokalowe
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ Załatwienie umowy najmu/użyczenia
☐ Upewnienie się, że umowa jest na min. 12 miesięcy
☐ Podpisanie klauzuli informacyjnej

TYDZIEŃ 2-4: Listy intencyjne
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ Zebranie 7 listów od osób prywatnych
☐ Zebranie 7 listów od firm/salonów
${formData.businessType === 'handel' || formData.businessType === 'gastronomia' ? 
  '☐ Zebranie 2-3 listów od hurtowni (OBOWIĄZKOWO!)\n' : ''}
☐ Sprawdzenie, że każda lista ma wszystkie wymagane dane
☐ ⚠️ Upewnienie się, że referencje nie są od tych samych osób!

TYDZIEŃ 3-4: Dokumenty doświadczenia
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ Uzyskanie świadectw pracy od pracodawców
☐ Przygotowanie kserokopii umów cywilnoprawnych (oryginały do wglądu)
☐ Uzyskanie referencji (opcjonalnie ale zalecane)

TYDZIEŃ 4-5: Zabezpieczenie
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ Znalezienie poręczyciela (dochód min 5600 zł) ALBO
☐ Przygotowanie blokady rachunku

TYDZIEŃ 5-6: Finalizacja
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ Weryfikacja kompletności WSZYSTKICH dokumentów
☐ Przekazanie dokumentów do Fundacji
☐ Przygotowanie wniosku przez Fundację
☐ Złożenie wniosku w PUP w wyznaczonym terminie

═════════════════════════════════════════════════════════════
FORMA DOSTARCZENIA DOKUMENTÓW
═════════════════════════════════════════════════════════════

Dokumenty można dostarczyć:
• Osobiście do biura Fundacji Promocji Nowej Huty
• Email: dotacje@fundacjanh.org (czytelne skany/zdjęcia)
• Oryginały wymagane do wglądu przed złożeniem wniosku

═════════════════════════════════════════════════════════════
WAŻNE UWAGI KOŃCOWE
═════════════════════════════════════════════════════════════

⚠️ Dokumenty w języku obcym wymagają tłumaczenia przysięgłego (koszt ponosi wnioskodawca)
⚠️ Zakupy NIE MOGĄ być od osób najbliższych (współmałżonek, rodzice, dzieci)
⚠️ Dokumenty elektroniczne nie będą rozpatrywane - wymagane oryginały lub potwierdzone kserokopie
⚠️ Lokal musi być przystosowany do rodzaju działalności
⚠️ Brak któregokolwiek wymaganego dokumentu może skutkować ODRZUCENIEM wniosku

═════════════════════════════════════════════════════════════
KONTAKT
═════════════════════════════════════════════════════════════

Fundacja Promocji Nowej Huty
Email: dotacje@fundacjanh.org
Tel: [numer telefonu]

W razie pytań lub wątpliwości - kontakt mailowy lub telefoniczny!

═════════════════════════════════════════════════════════════

Data wygenerowania: ${new Date().toLocaleDateString('pl-PL', { 
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
})}

Kandydat: ${candidateName}
Działalność: ${formData.businessType} - ${formData.pkdCode}
Punktacja: ${calculatePoints()} / 23 pkt
Kwota: ${formData.requestedAmount || '[do uzupełnienia]'} zł

POWODZENIA! 🍀
`;
  };

  const downloadDoc = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step === 7) performVerification();
      setStep(prev => Math.min(prev + 1, 8));
    }
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <h1 className="text-3xl font-bold">Formularz weryfikacyjny</h1>
            <p className="text-blue-100 mt-2">Dotacje PUP Kraków 2025 - maks. 45 000 zł</p>
            <div className="flex items-center mt-3 text-sm">
              <Mail size={16} className="mr-2" />
              <span>dotacje@fundacjanh.org</span>
            </div>
          </div>
          
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Dane osobowe</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    Imię *
                    <InfoTooltip text="Imię zgodnie z dowodem osobistym" />
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    Nazwisko *
                    <InfoTooltip text="Nazwisko zgodnie z dowodem osobistym" />
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    Email *
                    <InfoTooltip text="Adres email do kontaktu" />
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    Telefon *
                    <InfoTooltip text="Numer telefonu kontaktowego" />
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      PESEL
                      <InfoTooltip text="Opcjonalnie. Jeśli nie podasz PESEL, podaj datę urodzenia" />
                    </label>
                    <input
                      type="text"
                      value={formData.pesel}
                      onChange={(e) => updateFormData('pesel', e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      maxLength="11"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      Data urodzenia
                      <InfoTooltip text="Wymagane jeśli nie podano PESEL" />
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => updateFormData('birthDate', e.target.value)}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    Adres zamieszkania
                    <InfoTooltip text="Faktyczny adres zamieszkania" />
                  </label>
                  <input
                    type="text"
                    value={formData.addressResidence}
                    onChange={(e) => updateFormData('addressResidence', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Ulica, numer, kod, miasto"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    Adres zameldowania
                    <InfoTooltip text="Adres zgodny z dowodem osobistym" />
                  </label>
                  <input
                    type="text"
                    value={formData.addressRegistration}
                    onChange={(e) => updateFormData('addressRegistration', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Ulica, numer, kod, miasto"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Status bezrobotnego</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    Czy zarejestrowany w PUP Kraków? *
                    <InfoTooltip text="Rejestracja jako osoba bezrobotna jest obowiązkowa" />
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="tak"
                        checked={formData.isUnemployed === 'tak'}
                        onChange={(e) => updateFormData('isUnemployed', e.target.value)}
                        className="mr-2"
                      />
                      Tak
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="nie"
                        checked={formData.isUnemployed === 'nie'}
                        onChange={(e) => updateFormData('isUnemployed', e.target.value)}
                        className="mr-2"
                      />
                      Nie
                    </label>
                  </div>
                </div>
                
                {formData.isUnemployed === 'tak' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center">
                        Data rejestracji
                        <InfoTooltip text="Data pierwszej rejestracji w PUP" />
                      </label>
                      <input
                        type="date"
                        value={formData.registrationDate}
                        onChange={(e) => updateFormData('registrationDate', e.target.value)}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center">
                        Czy posiada IPD z możliwością dotacji?
                        <InfoTooltip text="Indywidualny Plan Działania musi zawierać zapis o możliwości ubiegania się o dotację" />
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="tak"
                            checked={formData.hasIPD === 'tak'}
                            onChange={(e) => updateFormData('hasIPD', e.target.value)}
                            className="mr-2"
                          />
                          Tak
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="nie"
                            checked={formData.hasIPD === 'nie'}
                            onChange={(e) => updateFormData('hasIPD', e.target.value)}
                            className="mr-2"
                          />
                          Nie
                        </label>
                      </div>
                    </div>
                  </>
                )}
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    Grupy preferencyjne (dodatkowe punkty)
                    <InfoTooltip text="Każda grupa daje dodatkowe punkty w ocenie, maksymalnie 2 punkty" />
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isDKR}
                        onChange={(e) => updateFormData('isDKR', e.target.checked)}
                        className="mr-2"
                      />
                      Karta Dużej Rodziny
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isOver50}
                        onChange={(e) => updateFormData('isOver50', e.target.checked)}
                        className="mr-2"
                      />
                      Powyżej 50 lat
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isUnder30}
                        onChange={(e) => updateFormData('isUnder30', e.target.checked)}
                        className="mr-2"
                      />
                      Do 30 lat
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isDisabled}
                        onChange={(e) => updateFormData('isDisabled', e.target.checked)}
                        className="mr-2"
                      />
                      Niepełnosprawność
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isLongTermUnemployed}
                        onChange={(e) => updateFormData('isLongTermUnemployed', e.target.checked)}
                        className="mr-2"
                      />
                      Długotrwale bezrobotny
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isSingleParent}
                        onChange={(e) => updateFormData('isSingleParent', e.target.checked)}
                        className="mr-2"
                      />
                      Samotny rodzic
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.hasNoQualifications}
                        onChange={(e) => updateFormData('hasNoQualifications', e.target.checked)}
                        className="mr-2"
                      />
                      Bez kwalifikacji zawodowych
                    </label>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Pomysł na działalność</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    Opisz pomysł *
                    <InfoTooltip text="Szczegółowy opis planowanej działalności" />
                  </label>
                  <textarea
                    value={formData.businessIdea}
                    onChange={(e) => updateFormData('businessIdea', e.target.value)}
                    className="w-full p-3 border rounded-lg h-32"
                  />
                  {errors.businessIdea && <p className="text-red-500 text-sm mt-1">{errors.businessIdea}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    Rodzaj działalności
                    <InfoTooltip text="Produkcja: 2 pkt, pozostałe: 1 pkt" />
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => updateFormData('businessType', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Wybierz</option>
                    <option value="produkcja">Produkcja (2 pkt)</option>
                    <option value="usługi">Usługi (1 pkt)</option>
                    <option value="handel">Handel (1 pkt)</option>
                    <option value="budowlane">Budownictwo (1 pkt)</option>
                    <option value="gastronomia">Gastronomia (1 pkt)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    Główny kod PKD *
                    <InfoTooltip text="Wpisz kod lub nazwę działalności. Można też wpisać własny kod ręcznie." />
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={pkdSearch}
                      onChange={(e) => {
                        setPkdSearch(e.target.value);
                        setShowPkdResults(true);
                      }}
                      className="w-full p-3 border rounded-lg"
                      placeholder="Szukaj PKD... (np. 96.02.Z lub fryzjerstwo)"
                    />
                    {showPkdResults && pkdSearch.length >= 2 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {filterPKD(pkdSearch).map((pkd, i) => (
                          <div
                            key={i}
                            onClick={() => selectMainPKD(pkd)}
                            className="p-3 hover:bg-blue-50 cursor-pointer border-b"
                          >
                            <div className="font-semibold text-blue-600">{pkd.code}</div>
                            <div className="text-sm">{pkd.name}</div>
                          </div>
                        ))}
                        {filterPKD(pkdSearch).length === 0 && (
                          <div className="p-3 text-sm text-gray-500">
                            Brak wyników. Wpisz kod ręcznie (np. 96.02.Z)
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {formData.pkdCode && (
                    <div className="mt-2 p-2 bg-green-50 rounded text-sm">
                      <strong>{formData.pkdCode}</strong> - {formData.pkdDescription}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    Kwota wnioskowana
                    <InfoTooltip text="Maksymalna kwota w Krakowie: 45 000 zł" />
                  </label>
                  <input
                    type="number"
                    value={formData.requestedAmount}
                    onChange={(e) => updateFormData('requestedAmount', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    max="45000"
                    placeholder="Maksymalnie 45 000 zł"
                  />
                  {parseFloat(formData.requestedAmount) > 45000 && (
                    <p className="text-red-500 text-sm mt-1">Maksymalna kwota w Krakowie to 45 000 zł</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    Działalność mobilna?
                    <InfoTooltip text="Świadczenie usług w różnych miejscach (u klienta)" />
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="tak"
                        checked={formData.isMobileService === 'tak'}
                        onChange={(e) => updateFormData('isMobileService', e.target.value)}
                        className="mr-2"
                      />
                      Tak - usługi w różnych miejscach
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="nie"
                        checked={formData.isMobileService === 'nie'}
                        onChange={(e) => updateFormData('isMobileService', e.target.value)}
                        className="mr-2"
                      />
                      Nie - stałe miejsce
                    </label>
                  </div>
                </div>
                
                {formData.isMobileService === 'tak' && (
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      Miejsce przechowania sprzętu?
                      <InfoTooltip text="Garaż, piwnica, magazyn - z tytułem prawnym" />
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="tak"
                          checked={formData.hasStorageSpace === 'tak'}
                          onChange={(e) => updateFormData('hasStorageSpace', e.target.value)}
                          className="mr-2"
                        />
                        Tak (garaż/piwnica/magazyn)
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="nie"
                          checked={formData.hasStorageSpace === 'nie'}
                          onChange={(e) => updateFormData('hasStorageSpace', e.target.value)}
                          className="mr-2"
                        />
                        Nie - pod adresem rejestracji
                      </label>
                    </div>
                    
                    {formData.hasStorageSpace === 'tak' && (
                      <input
                        type="text"
                        value={formData.storageLocation}
                        onChange={(e) => updateFormData('storageLocation', e.target.value)}
                        className="w-full p-3 border rounded-lg mt-2"
                        placeholder="Adres miejsca przechowania"
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  Doświadczenie zawodowe
                  <InfoTooltip text="Suma wszystkich okresów pracy: >36m=4pkt, 12-36m=3pkt, 6-12m=2pkt, <6m=1pkt" />
                </h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Czy ma doświadczenie?</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="tak"
                        checked={formData.hasWorkExperience === 'tak'}
                        onChange={(e) => updateFormData('hasWorkExperience', e.target.value)}
                        className="mr-2"
                      />
                      Tak
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="nie"
                        checked={formData.hasWorkExperience === 'nie'}
                        onChange={(e) => updateFormData('hasWorkExperience', e.target.value)}
                        className="mr-2"
                      />
                      Nie
                    </label>
                  </div>
                </div>
                
                {formData.hasWorkExperience === 'tak' && (
                  <div className="space-y-4">
                    {formData.workExperiences.map((exp, index) => {
                      const months = calculateWorkDuration(exp.periodFrom, exp.periodTo);
                      return (
                        <div key={index} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold">Praca #{index + 1}</h3>
                            <div className="flex items-center gap-2">
                              {months > 0 && (
                                <span className="text-sm text-green-600 font-medium">
                                  {Math.floor(months/12)}lat {months % 12}mies
                                </span>
                              )}
                              {formData.workExperiences.length > 1 && (
                                <button
                                  onClick={() => removeWorkExperience(index)}
                                  className="text-red-600"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <select
                              value={exp.type}
                              onChange={(e) => updateWorkExperience(index, 'type', e.target.value)}
                              className="w-full p-2 border rounded"
                            >
                              <option value="">Typ zatrudnienia</option>
                              <option value="umowa_o_prace">Umowa o pracę</option>
                              <option value="zlecenie">Zlecenie/Dzieło</option>
                              <option value="dzialalnosc">Działalność</option>
                              <option value="zagranica">Za granicą</option>
                              <option value="staż">Staż</option>
                            </select>
                            
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) => updateWorkExperience(index, 'position', e.target.value)}
                              className="w-full p-2 border rounded"
                              placeholder="Stanowisko"
                            />
                            
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                              className="w-full p-2 border rounded"
                              placeholder="Firma"
                            />
                            
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="month"
                                value={exp.periodFrom}
                                onChange={(e) => updateWorkExperience(index, 'periodFrom', e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Od"
                              />
                              <input
                                type="month"
                                value={exp.periodTo}
                                onChange={(e) => updateWorkExperience(index, 'periodTo', e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Do"
                              />
                            </div>
                            
                            <textarea
                              value={exp.duties}
                              onChange={(e) => updateWorkExperience(index, 'duties', e.target.value)}
                              className="w-full p-2 border rounded h-20"
                              placeholder="Zakres obowiązków..."
                            />
                          </div>
                        </div>
                      );
                    })}
                    
                    <button
                      onClick={addWorkExperience}
                      className="w-full p-3 border-2 border-dashed rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 flex items-center justify-center"
                    >
                      <Plus size={20} className="mr-2" />
                      Dodaj kolejne miejsce pracy
                    </button>
                    
                    <div className="bg-blue-50 p-3 rounded-lg text-sm">
                      <strong>Łączny czas:</strong> {formData.workExperiences.reduce((sum, exp) => 
                        sum + calculateWorkDuration(exp.periodFrom, exp.periodTo), 0
                      )} miesięcy = {calculatePoints() >= 23 ? '✓' : 'liczy się do punktacji'}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  Wykształcenie i kursy
                  <InfoTooltip text="Zgodne=4pkt, podobne=2pkt, każdy kurs z certyfikatem=+1pkt (max 3)" />
                </h2>
                
                <div>
                  <h3 className="font-semibold mb-3">Wykształcenie</h3>
                  {formData.education.map((edu, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50 mb-3">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Szkoła #{index + 1}</h4>
                        {formData.education.length > 1 && (
                          <button
                            onClick={() => removeEducation(index)}
                            className="text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <select
                          value={edu.level}
                          onChange={(e) => updateEducation(index, 'level', e.target.value)}
                          className="w-full p-2 border rounded"
                        >
                          <option value="">Poziom</option>
                          <option value="podstawowe">Podstawowe</option>
                          <option value="zawodowe">Zawodowe</option>
                          <option value="średnie">Średnie</option>
                          <option value="wyższe">Wyższe</option>
                        </select>
                        
                        <input
                          type="text"
                          value={edu.field}
                          onChange={(e) => updateEducation(index, 'field', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Kierunek/specjalizacja"
                        />
                        
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => updateEducation(index, 'school', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Nazwa szkoły"
                        />
                        
                        <input
                          type="number"
                          value={edu.yearCompleted}
                          onChange={(e) => updateEducation(index, 'yearCompleted', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Rok ukończenia"
                          min="1950"
                          max="2025"
                        />
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={addEducation}
                    className="w-full p-2 border-2 border-dashed rounded-lg text-gray-600 hover:border-blue-400 flex items-center justify-center"
                  >
                    <Plus size={16} className="mr-2" />
                    Dodaj szkołę
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Związek wykształcenia z działalnością</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="zgodne"
                        checked={formData.isEducationRelated === 'zgodne'}
                        onChange={(e) => updateFormData('isEducationRelated', e.target.value)}
                        className="mr-2"
                      />
                      Zgodne (4 pkt)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="podobne"
                        checked={formData.isEducationRelated === 'podobne'}
                        onChange={(e) => updateFormData('isEducationRelated', e.target.value)}
                        className="mr-2"
                      />
                      Podobne (2 pkt)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="niezwiązane"
                        checked={formData.isEducationRelated === 'niezwiązane'}
                        onChange={(e) => updateFormData('isEducationRelated', e.target.value)}
                        className="mr-2"
                      />
                      Niezwiązane (0 pkt)
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    Kursy i szkolenia
                    <InfoTooltip text="Każdy kurs z certyfikatem = +1 pkt (maksymalnie 3 punkty)" />
                  </h3>
                  {formData.courses.map((course, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50 mb-3">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Kurs #{index + 1}</h4>
                        {formData.courses.length > 1 && (
                          <button
                            onClick={() => removeCourse(index)}
                            className="text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={course.name}
                          onChange={(e) => updateCourse(index, 'name', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Nazwa kursu"
                        />
                        
                        <input
                          type="text"
                          value={course.institution}
                          onChange={(e) => updateCourse(index, 'institution', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Organizator"
                        />
                        
                        <input
                          type="number"
                          value={course.year}
                          onChange={(e) => updateCourse(index, 'year', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Rok"
                          min="2000"
                          max="2025"
                        />
                        
                        <div>
                          <label className="text-sm font-medium">Posiada certyfikat?</label>
                          <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="tak"
                                checked={course.hasCertificate === 'tak'}
                                onChange={(e) => updateCourse(index, 'hasCertificate', e.target.value)}
                                className="mr-2"
                              />
                              Tak (+1 pkt)
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="nie"
                                checked={course.hasCertificate === 'nie'}
                                onChange={(e) => updateCourse(index, 'hasCertificate', e.target.value)}
                                className="mr-2"
                              />
                              Nie
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={addCourse}
                    className="w-full p-2 border-2 border-dashed rounded-lg text-gray-600 hover:border-blue-400 flex items-center justify-center"
                  >
                    <Plus size={16} className="mr-2" />
                    Dodaj kurs
                  </button>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  Lokal i zabezpieczenie
                  <InfoTooltip text="Lokal w Krakowie = +2 punkty" />
                </h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Czy ma lokal?</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="tak"
                        checked={formData.hasLocation === 'tak'}
                        onChange={(e) => updateFormData('hasLocation', e.target.value)}
                        className="mr-2"
                      />
                      Tak
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="nie"
                        checked={formData.hasLocation === 'nie'}
                        onChange={(e) => updateFormData('hasLocation', e.target.value)}
                        className="mr-2"
                      />
                      Nie
                    </label>
                  </div>
                </div>
                
                {formData.hasLocation === 'tak' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center">
                        Rodzaj lokalu
                        <InfoTooltip text="Własny, najem lub użyczenie (I-II stopień pokrewieństwa)" />
                      </label>
                      <select
                        value={formData.locationType}
                        onChange={(e) => updateFormData('locationType', e.target.value)}
                        className="w-full p-3 border rounded-lg"
                      >
                        <option value="">Wybierz</option>
                        <option value="własny">Własny</option>
                        <option value="najem">Najem</option>
                        <option value="użyczenie">Użyczenie (rodzina)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Lokal w Krakowie?</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="tak"
                            checked={formData.isLocationInKrakow === 'tak'}
                            onChange={(e) => updateFormData('isLocationInKrakow', e.target.value)}
                            className="mr-2"
                          />
                          Tak (+2 pkt)
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="nie"
                            checked={formData.isLocationInKrakow === 'nie'}
                            onChange={(e) => updateFormData('isLocationInKrakow', e.target.value)}
                            className="mr-2"
                          />
                          Nie (0 pkt)
                        </label>
                      </div>
                    </div>
                  </>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center">
                    Zabezpieczenie
                    <InfoTooltip text="Poręczyciel (dochód min 5600zł) lub blokada rachunku" />
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="tak"
                        checked={formData.hasGuarantor === 'tak'}
                        onChange={(e) => updateFormData('hasGuarantor', e.target.value)}
                        className="mr-2"
                      />
                      Poręczyciel
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="nie"
                        checked={formData.hasGuarantor === 'nie'}
                        onChange={(e) => updateFormData('hasGuarantor', e.target.value)}
                        className="mr-2"
                      />
                      Blokada rachunku
                    </label>
                  </div>
                </div>
                
                {formData.hasGuarantor === 'tak' && (
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center">
                      Dochód poręczyciela (brutto)
                      <InfoTooltip text="Minimum 5600 zł brutto miesięcznie" />
                    </label>
                    <input
                      type="number"
                      value={formData.guarantorIncomeAmount}
                      onChange={(e) => updateFormData('guarantorIncomeAmount', e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      min="5600"
                      placeholder="Min 5600 zł"
                    />
                  </div>
                )}
              </div>
            )}

            {step === 7 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Podsumowanie</h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p><strong>Kandydat:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Telefon:</strong> {formData.phone}</p>
                  <p><strong>PKD:</strong> {formData.pkdCode} - {formData.pkdDescription}</p>
                  <p><strong>Kwota:</strong> {formData.requestedAmount || 'nie podano'} zł (max 45 000)</p>
                  <p><strong>Przewidywane punkty:</strong> {calculatePoints()} / 23</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Kliknij "Weryfikuj" aby zobaczyć pełną ocenę i wygenerować dokumenty.
                  </p>
                </div>
              </div>
            )}

            {step === 8 && verificationResult && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Wynik weryfikacji</h2>
                
                <div className={`p-4 rounded-lg border-2 ${
                  verificationResult.canProceed ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
                }`}>
                  <div className="flex items-center mb-2">
                    {verificationResult.canProceed ? (
                      <CheckCircle className="text-green-600 mr-2" size={24} />
                    ) : (
                      <AlertCircle className="text-red-600 mr-2" size={24} />
                    )}
                    <h3 className="text-lg font-bold">
                      {verificationResult.canProceed ? 'Weryfikacja pozytywna ✓' : 'Wymaga poprawek'}
                    </h3>
                  </div>
                  <p className="text-sm">Punkty: {verificationResult.points} / {verificationResult.minPoints}</p>
                </div>
                
                {verificationResult.issues.length > 0 && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">Problemy:</h4>
                    <ul className="list-disc list-inside text-sm text-red-700">
                      {verificationResult.issues.map((issue, i) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {verificationResult.warnings.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h4 className="font-bold text-yellow-800 mb-2">Ostrzeżenia:</h4>
                    <ul className="list-disc list-inside text-sm text-yellow-700">
                      {verificationResult.warnings.map((warn, i) => (
                        <li key={i}>{warn}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {verificationResult.strengths.length > 0 && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Mocne strony:</h4>
                    <ul className="list-disc list-inside text-sm text-green-700">
                      {verificationResult.strengths.map((str, i) => (
                        <li key={i}>{str}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {verificationResult.canProceed && (
                  <div className="space-y-3">
                    <button
                      onClick={() => downloadDoc(generateContract(), `Umowa_${formData.lastName}.txt`)}
                      className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Download className="mr-2" size={20} />
                      Pobierz umowę
                    </button>
                    <button
                      onClick={() => downloadDoc(generateDocs(), `Dokumenty_${formData.lastName}.txt`)}
                      className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Download className="mr-2" size={20} />
                      Pobierz listę dokumentów
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-6 flex justify-between border-t">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              <ChevronLeft className="mr-2" size={20} />
              Wstecz
            </button>
            
            {step < 8 ? (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {step === 7 ? 'Weryfikuj' : 'Dalej'}
                <ChevronRight className="ml-2" size={20} />
              </button>
            ) : (
              <button
                onClick={() => {
                  setStep(1);
                  setFormData({
                    firstName: '', lastName: '', email: '', phone: '', pesel: '', birthDate: '',
                    addressResidence: '', addressRegistration: '',
                    isUnemployed: '', registrationDate: '', hasIPD: '',
                    businessIdea: '', businessType: '', pkdCode: '', pkdDescription: '',
                    additionalPKD: [], isMobileService: '', hasStorageSpace: '',
                    storageLocation: '', hasWorkExperience: '',
                    workExperiences: [{ type: '', position: '', company: '', periodFrom: '', periodTo: '', duties: '' }],
                    education: [{ level: '', field: '', school: '', yearCompleted: '' }],
                    isEducationRelated: '',
                    courses: [{ name: '', institution: '', year: '', hasCertificate: '' }],
                    hasLocation: '', locationType: '', isLocationInKrakow: '', hasGuarantor: '',
                    guarantorIncomeAmount: '', requestedAmount: '',
                    isDKR: false, isOver50: false, isUnder30: false, isDisabled: false,
                    isLongTermUnemployed: false, isSingleParent: false, hasNoQualifications: false
                  });
                  setVerificationResult(null);
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Nowy kandydat
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
