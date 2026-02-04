import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Download, Mail, Phone, Calendar, TrendingUp, Users, FileText, CheckCircle, Clock, XCircle, Sparkles, Send, Copy } from 'lucide-react';

export default function OperatorPanel() {
  const [view, setView] = useState('list');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      firstName: 'Anna',
      lastName: 'Kowalska',
      email: 'anna.k@example.com',
      phone: '123456789',
      pkdCode: '96.02.Z',
      pkdDescription: 'Fryzjerstwo i pozostałe zabiegi kosmetyczne',
      requestedAmount: 35000,
      points: 26,
      status: 'weryfikacja',
      dateAdded: '2025-02-01',
      hasIPD: true,
      isUnemployed: true,
      hasLocation: true,
      locationInKrakow: true,
      hasGuarantor: true,
      notes: 'Kandydatka z dobrym doświadczeniem. Czeka na dokumenty od hurtowni.'
    },
    {
      id: 2,
      firstName: 'Jan',
      lastName: 'Nowak',
      email: 'jan.n@example.com',
      phone: '987654321',
      pkdCode: '43.34.Z',
      pkdDescription: 'Malowanie i szklenie',
      requestedAmount: 40000,
      points: 24,
      status: 'dokumenty',
      dateAdded: '2025-02-03',
      hasIPD: true,
      isUnemployed: true,
      hasLocation: true,
      locationInKrakow: false,
      hasGuarantor: false,
      notes: 'Zabezpieczenie blokadą rachunku. Brakuje 3 listów intencyjnych.'
    },
    {
      id: 3,
      firstName: 'Maria',
      lastName: 'Wiśniewska',
      email: 'maria.w@example.com',
      phone: '555666777',
      pkdCode: '56.10.A',
      pkdDescription: 'Restauracje i placówki gastronomiczne',
      requestedAmount: 42000,
      points: 28,
      status: 'gotowy',
      dateAdded: '2025-01-28',
      hasIPD: true,
      isUnemployed: true,
      hasLocation: true,
      locationInKrakow: true,
      hasGuarantor: true,
      notes: 'Wszystkie dokumenty kompletne. Gotowy do złożenia.'
    },
    {
      id: 4,
      firstName: 'Piotr',
      lastName: 'Lewandowski',
      email: 'p.lewandowski@example.com',
      phone: '111222333',
      pkdCode: '62.01.Z',
      pkdDescription: 'Działalność związana z oprogramowaniem',
      requestedAmount: 38000,
      points: 22,
      status: 'problem',
      dateAdded: '2025-02-02',
      hasIPD: false,
      isUnemployed: true,
      hasLocation: true,
      locationInKrakow: true,
      hasGuarantor: true,
      notes: 'PROBLEM: Brak IPD z możliwością dotacji. Kandydat musi zaktualizować w PUP.'
    }
  ]);

  const getStatusColor = (status) => {
    const colors = {
      'weryfikacja': 'bg-blue-100 text-blue-800',
      'dokumenty': 'bg-yellow-100 text-yellow-800',
      'gotowy': 'bg-green-100 text-green-800',
      'problem': 'bg-red-100 text-red-800',
      'złożony': 'bg-purple-100 text-purple-800',
      'zaakceptowany': 'bg-emerald-100 text-emerald-800',
      'odrzucony': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'weryfikacja': <Clock size={16} />,
      'dokumenty': <FileText size={16} />,
      'gotowy': <CheckCircle size={16} />,
      'problem': <XCircle size={16} />,
      'złożony': <TrendingUp size={16} />,
      'zaakceptowany': <CheckCircle size={16} />,
      'odrzucony': <XCircle size={16} />
    };
    return icons[status] || <Clock size={16} />;
  };

  const getStatusLabel = (status) => {
    const labels = {
      'weryfikacja': 'Weryfikacja',
      'dokumenty': 'Zbieranie dokumentów',
      'gotowy': 'Gotowy do złożenia',
      'problem': 'Problem',
      'złożony': 'Wniosek złożony',
      'zaakceptowany': 'Zaakceptowany',
      'odrzucony': 'Odrzucony'
    };
    return labels[status] || status;
  };

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = 
      c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.pkdCode.includes(searchTerm);
    
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: candidates.length,
    weryfikacja: candidates.filter(c => c.status === 'weryfikacja').length,
    dokumenty: candidates.filter(c => c.status === 'dokumenty').length,
    gotowy: candidates.filter(c => c.status === 'gotowy').length,
    problem: candidates.filter(c => c.status === 'problem').length,
    avgPoints: Math.round(candidates.reduce((sum, c) => sum + c.points, 0) / candidates.length)
  };

  const exportToCSV = () => {
    const headers = ['Imię', 'Nazwisko', 'Email', 'Telefon', 'PKD', 'Kwota', 'Punkty', 'Status', 'Data'];
    const rows = candidates.map(c => [
      c.firstName,
      c.lastName,
      c.email,
      c.phone,
      c.pkdCode,
      c.requestedAmount,
      c.points,
      c.status,
      c.dateAdded
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kandydaci_' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateAIResponse = async () => {
    if (!aiPrompt.trim()) return;
    
    setAiLoading(true);
    setAiResponse('');
    
    try {
      const candidateContext = selectedCandidate ? `
Kontekst kandydata:
- Imię i nazwisko: ${selectedCandidate.firstName} ${selectedCandidate.lastName}
- PKD: ${selectedCandidate.pkdCode} - ${selectedCandidate.pkdDescription}
- Kwota wnioskowana: ${selectedCandidate.requestedAmount} zł
- Punkty: ${selectedCandidate.points}/23
- Status: ${selectedCandidate.status}
- IPD: ${selectedCandidate.hasIPD ? 'Tak' : 'Nie'}
- Lokal w Krakowie: ${selectedCandidate.locationInKrakow ? 'Tak' : 'Nie'}
- Poręczyciel: ${selectedCandidate.hasGuarantor ? 'Tak' : 'Nie (blokada rachunku)'}
- Notatki: ${selectedCandidate.notes}
` : '';

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Jesteś asystentem operatora fundacji, która pomaga w przygotowywaniu wniosków o dotacje z PUP Kraków na działalność gospodarczą.

${candidateContext}

Zadanie: ${aiPrompt}

Wygeneruj profesjonalną, pomocną odpowiedź dla operatora. Odpowiadaj po polsku, zwięźle i konkretnie.`
            }
          ],
        })
      });

      const data = await response.json();
      
      if (data.content && data.content.length > 0) {
        const textContent = data.content
          .filter(item => item.type === 'text')
          .map(item => item.text)
          .join('\n');
        setAiResponse(textContent);
      } else {
        setAiResponse('Przepraszam, nie udało się wygenerować odpowiedzi. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('AI Error:', error);
      setAiResponse('Wystąpił błąd podczas generowania odpowiedzi. Sprawdź połączenie i spróbuj ponownie.');
    } finally {
      setAiLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Skopiowano do schowka!');
  };

  const quickPrompts = [
    'Napisz email przypominający o brakujących dokumentach',
    'Napisz email z prośbą o uzupełnienie list intencyjnych',
    'Przygotuj checklist dokumentów do zebrania',
    'Zasugeruj jak poprawić punktację kandydata',
    'Napisz email z gratulacjami po pozytywnej decyzji PUP',
    'Przygotuj notatkę do biznesplanu na podstawie danych',
    'Napisz email z prośbą o aktualizację IPD',
    'Zasugeruj powiązanie doświadczenia z pomysłem na biznes'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel Operatora</h1>
              <p className="text-sm text-gray-600">Zarządzanie kandydatami do dotacji PUP</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAI(true)}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Sparkles size={16} className="mr-2" />
                Asystent AI
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <Download size={16} className="mr-2" />
                Eksport CSV
              </button>
              <button
                onClick={() => setView('stats')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <TrendingUp size={16} className="mr-2" />
                Statystyki
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Wszystkich</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="text-gray-400" size={24} />
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Weryfikacja</p>
                <p className="text-2xl font-bold text-blue-900">{stats.weryfikacja}</p>
              </div>
              <Clock className="text-blue-400" size={24} />
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Dokumenty</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.dokumenty}</p>
              </div>
              <FileText className="text-yellow-400" size={24} />
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Gotowe</p>
                <p className="text-2xl font-bold text-green-900">{stats.gotowy}</p>
              </div>
              <CheckCircle className="text-green-400" size={24} />
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Problemy</p>
                <p className="text-2xl font-bold text-red-900">{stats.problem}</p>
              </div>
              <XCircle className="text-red-400" size={24} />
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Śr. punkty</p>
                <p className="text-2xl font-bold text-purple-900">{stats.avgPoints}</p>
              </div>
              <TrendingUp className="text-purple-400" size={24} />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Szukaj po imieniu, nazwisku, email, PKD..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="all">Wszystkie statusy</option>
                <option value="weryfikacja">Weryfikacja</option>
                <option value="dokumenty">Dokumenty</option>
                <option value="gotowy">Gotowy</option>
                <option value="problem">Problem</option>
                <option value="złożony">Złożony</option>
                <option value="zaakceptowany">Zaakceptowany</option>
                <option value="odrzucony">Odrzucony</option>
              </select>
            </div>
          </div>
        </div>

        {/* Candidates List */}
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kandydat</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kontakt</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PKD</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kwota</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Punkty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Akcje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {candidate.firstName} {candidate.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm space-y-1">
                        <div className="flex items-center text-gray-600">
                          <Mail size={14} className="mr-1" />
                          {candidate.email}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone size={14} className="mr-1" />
                          {candidate.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{candidate.pkdCode}</div>
                        <div className="text-gray-500 text-xs">{candidate.pkdDescription.substring(0, 30)}...</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {candidate.requestedAmount.toLocaleString('pl-PL')} zł
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        candidate.points >= 25 ? 'bg-green-100 text-green-800' :
                        candidate.points >= 23 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {candidate.points} / 23
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                        {getStatusIcon(candidate.status)}
                        <span className="ml-1">{getStatusLabel(candidate.status)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={14} className="mr-1" />
                        {candidate.dateAdded}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedCandidate(candidate);
                          setView('detail');
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail View Modal */}
        {view === 'detail' && selectedCandidate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedCandidate.firstName} {selectedCandidate.lastName}
                    </h2>
                    <p className="text-blue-100 mt-1">ID: {selectedCandidate.id}</p>
                  </div>
                  <button
                    onClick={() => {
                      setView('list');
                      setSelectedCandidate(null);
                    }}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Status Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Status i ocena</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Status</p>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedCandidate.status)}`}>
                        {getStatusIcon(selectedCandidate.status)}
                        <span className="ml-2">{getStatusLabel(selectedCandidate.status)}</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Punktacja</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCandidate.points} / 23</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Dane kontaktowe</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2 text-gray-500" />
                      <span className="text-sm">{selectedCandidate.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-gray-500" />
                      <span className="text-sm">{selectedCandidate.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Business Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Działalność</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">PKD</p>
                      <p className="font-medium">{selectedCandidate.pkdCode} - {selectedCandidate.pkdDescription}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Wnioskowana kwota</p>
                      <p className="font-medium">{selectedCandidate.requestedAmount.toLocaleString('pl-PL')} zł</p>
                    </div>
                  </div>
                </div>

                {/* Requirements Check */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Wymagania formalne</h3>
                  <div className="space-y-2">
                    <div className={`flex items-center p-3 rounded-lg ${selectedCandidate.hasIPD ? 'bg-green-50' : 'bg-red-50'}`}>
                      {selectedCandidate.hasIPD ? (
                        <CheckCircle size={20} className="text-green-600 mr-2" />
                      ) : (
                        <XCircle size={20} className="text-red-600 mr-2" />
                      )}
                      <span className={selectedCandidate.hasIPD ? 'text-green-800' : 'text-red-800'}>
                        IPD z możliwością dotacji
                      </span>
                    </div>
                    
                    <div className={`flex items-center p-3 rounded-lg ${selectedCandidate.isUnemployed ? 'bg-green-50' : 'bg-red-50'}`}>
                      {selectedCandidate.isUnemployed ? (
                        <CheckCircle size={20} className="text-green-600 mr-2" />
                      ) : (
                        <XCircle size={20} className="text-red-600 mr-2" />
                      )}
                      <span className={selectedCandidate.isUnemployed ? 'text-green-800' : 'text-red-800'}>
                        Zarejestrowany w PUP
                      </span>
                    </div>
                    
                    <div className={`flex items-center p-3 rounded-lg ${selectedCandidate.hasLocation ? 'bg-green-50' : 'bg-yellow-50'}`}>
                      {selectedCandidate.hasLocation ? (
                        <CheckCircle size={20} className="text-green-600 mr-2" />
                      ) : (
                        <Clock size={20} className="text-yellow-600 mr-2" />
                      )}
                      <span className={selectedCandidate.hasLocation ? 'text-green-800' : 'text-yellow-800'}>
                        Lokal {selectedCandidate.locationInKrakow ? 'w Krakowie' : 'poza Krakowem'}
                      </span>
                    </div>
                    
                    <div className={`flex items-center p-3 rounded-lg ${selectedCandidate.hasGuarantor ? 'bg-green-50' : 'bg-blue-50'}`}>
                      {selectedCandidate.hasGuarantor ? (
                        <CheckCircle size={20} className="text-green-600 mr-2" />
                      ) : (
                        <FileText size={20} className="text-blue-600 mr-2" />
                      )}
                      <span className={selectedCandidate.hasGuarantor ? 'text-green-800' : 'text-blue-800'}>
                        {selectedCandidate.hasGuarantor ? 'Poręczyciel' : 'Blokada rachunku'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Notatki</h3>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedCandidate.notes}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowAI(true)}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <Sparkles size={16} className="inline mr-2" />
                    Asystent AI
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Mail size={16} className="inline mr-2" />
                    Wyślij email
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Download size={16} className="inline mr-2" />
                    Dokumenty
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Assistant Modal */}
      {showAI && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Sparkles className="mr-3" size={28} />
                  <div>
                    <h2 className="text-2xl font-bold">Asystent AI</h2>
                    <p className="text-purple-100 mt-1">Pomoc w przygotowaniu dokumentów i odpowiedzi</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAI(false);
                    setAiPrompt('');
                    setAiResponse('');
                  }}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {selectedCandidate && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900">
                    Kontekst: {selectedCandidate.firstName} {selectedCandidate.lastName}
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    {selectedCandidate.pkdCode} | {selectedCandidate.points} pkt | {selectedCandidate.requestedAmount} zł
                  </p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold mb-2">Szybkie polecenia:</label>
                <div className="grid grid-cols-2 gap-2">
                  {quickPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => setAiPrompt(prompt)}
                      className="text-left p-2 text-sm bg-gray-100 hover:bg-purple-100 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Twoje zapytanie:</label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full p-3 border rounded-lg h-32"
                  placeholder="Np. Napisz email przypominający o brakujących listach intencyjnych..."
                />
              </div>
              
              <button
                onClick={generateAIResponse}
                disabled={aiLoading || !aiPrompt.trim()}
                className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {aiLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generuję...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Generuj odpowiedź
                  </>
                )}
              </button>
              
              {aiResponse && (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold">Odpowiedź AI:</label>
                    <button
                      onClick={() => copyToClipboard(aiResponse)}
                      className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                    >
                      <Copy size={14} className="mr-1" />
                      Kopiuj
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <div className="text-sm whitespace-pre-wrap">{aiResponse}</div>
                  </div>
                </div>
              )}
              
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-xs">
                <strong>Wskazówka:</strong> Asystent AI używa kontekstu wybranego kandydata do generowania spersonalizowanych odpowiedzi. Zawsze sprawdź wygenerowaną treść przed wysłaniem do klienta.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}