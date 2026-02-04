import React, { useState } from 'react';
import OperatorPanel from './operator_panel';
import PUPVerificationForm from './pup_verification_form';

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  if (currentView === 'operator') {
    return (
      <div>
        <button 
          onClick={() => setCurrentView('home')}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg hover:bg-gray-50"
        >
          ← Powrót do menu
        </button>
        <OperatorPanel />
      </div>
    );
  }

  if (currentView === 'form') {
    return (
      <div>
        <button 
          onClick={() => setCurrentView('home')}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg hover:bg-gray-50"
        >
          ← Powrót do menu
        </button>
        <PUPVerificationForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            System Dotacji PUP Kraków
          </h1>
          <p className="text-xl text-blue-100">
            Fundacja Promocji Nowej Huty
          </p>
          <p className="text-blue-200 mt-2">
            Kompleksowy system zarządzania wnioskami o dotacje na działalność gospodarczą
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div 
            onClick={() => setCurrentView('operator')}
            className="bg-white rounded-2xl shadow-2xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-3xl"
          >
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Panel Operatora
            </h2>
            <p className="text-gray-600 mb-4">
              Zarządzanie kandydatami, śledzenie statusów, generowanie dokumentów i asystent AI do komunikacji z klientami.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                Zarządzanie
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                AI Asystent
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Statystyki
              </span>
            </div>
          </div>

          <div 
            onClick={() => setCurrentView('form')}
            className="bg-white rounded-2xl shadow-2xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-3xl"
          >
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Formularz Weryfikacyjny
            </h2>
            <p className="text-gray-600 mb-4">
              Wprowadź dane kandydata, sprawdź punktację, wygeneruj umowę i listę wymaganych dokumentów.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Weryfikacja
              </span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Punktacja
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Dokumenty
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-2">Informacje kontaktowe:</h3>
            <p>Email: dotacje@fundacjanh.org</p>
            <p className="text-sm text-blue-100 mt-2">
              System wspiera proces aplikacyjny o dotacje z PUP Kraków na rozpoczęcie działalności gospodarczej
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}