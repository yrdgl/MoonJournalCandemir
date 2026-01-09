import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import JournalPage from './pages/DailyJournals';
import StudentLogin from './StudentLogin';
import DailyJournalForm from './DailyJournalForm'; // YENİ EKLENDİ

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    // Sayfa yüklendiğinde LocalStorage'ta öğrenci var mı kontrol et
    const savedStudent = localStorage.getItem('moonJournalStudent');
    if (savedStudent) {
      const student = JSON.parse(savedStudent);
      setStudentData(student);
      setIsLoggedIn(true);
      
      // Bu öğrenciye ait günlükleri yükle
      const savedJournals = localStorage.getItem('moonJournalEntries');
      if (savedJournals) {
        const allJournals = JSON.parse(savedJournals);
        const studentJournals = allJournals.filter(entry => 
          entry.studentId === student.id
        );
        setJournalEntries(studentJournals);
      }
    }
  }, []);

  const handleLogin = (student) => {
    setStudentData(student);
    setIsLoggedIn(true);
    
    // Öğrenci giriş yaptığında günlüklerini yükle
    const savedJournals = localStorage.getItem('moonJournalEntries');
    if (savedJournals) {
      const allJournals = JSON.parse(savedJournals);
      const studentJournals = allJournals.filter(entry => 
        entry.studentId === student.id
      );
      setJournalEntries(studentJournals);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('moonJournalStudent');
    setIsLoggedIn(false);
    setStudentData(null);
    setJournalEntries([]);
  };

  const handleJournalSave = (newEntry) => {
    const updatedEntries = [...journalEntries, newEntry];
    setJournalEntries(updatedEntries);
  };

  // Öğrenci giriş yapmamışsa giriş ekranını göster
  if (!isLoggedIn) {
    return <StudentLogin onLogin={handleLogin} />;
  }

  // Öğrenci giriş yapmışsa normal uygulamayı göster
  return (
    <div className="App">
      <BrowserRouter>
        <Header studentData={studentData} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
              {/* ÜST BAR */}
              <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">🌙</div>
                    <div>
                      <h1 className="text-xl font-bold">Ay Günlüğü - 5. Sınıf</h1>
                      <p className="text-sm text-gray-300">
                        Hoş geldin, {studentData?.name} {studentData?.surname} ({studentData?.class})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/10 px-3 py-1 rounded-lg text-sm">
                      📊 {journalEntries.length} gözlem
                    </div>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              </header>

              {/* ANA İÇERİK */}
              <main className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                  
                  {/* GÜNLÜK YAZMA FORMU */}
                  <div className="mb-8">
                    <DailyJournalForm 
                      studentData={studentData} 
                      onSave={handleJournalSave}
                    />
                  </div>

                  {/* GEÇMİŞ GÖZLEMLER */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">📚 Geçmiş Gözlemlerin</h2>
                      <span className="bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-sm">
                        {journalEntries.length} kayıt
                      </span>
                    </div>
                    
                    {journalEntries.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">📖</div>
                        <p className="text-xl text-gray-300 mb-2">Henüz gözlem kaydın yok</p>
                        <p className="text-gray-400">İlk gözlemini yukarıdaki formu doldurarak kaydet!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {journalEntries
                          .sort((a, b) => new Date(b.date) - new Date(a.date))
                          .map((entry, index) => (
                            <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="text-3xl">{entry.moonPhase}</div>
                                  <div>
                                    <div className="font-bold">{entry.moonPhaseName}</div>
                                    <div className="text-sm text-gray-400">
                                      {new Date(entry.date).toLocaleDateString('tr-TR', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </div>
                                  </div>
                                </div>
                                <button 
                                  className="text-red-400 hover:text-red-300 text-sm"
                                  onClick={() => {
                                    if (window.confirm('Bu gözlemi silmek istediğine emin misin?')) {
                                      const updatedEntries = journalEntries.filter((_, i) => i !== index);
                                      setJournalEntries(updatedEntries);
                                      localStorage.setItem('moonJournalEntries', JSON.stringify(updatedEntries));
                                    }
                                  }}
                                >
                                  Sil
                                </button>
                              </div>
                              <div className="mt-3 p-3 bg-black/20 rounded-lg">
                                <p className="text-gray-300">{entry.observation}</p>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    )}
                  </div>
                </div>
              </main>

              {/* ALT BİLGİ */}
              <footer className="mt-12 py-6 text-center text-gray-400 text-sm border-t border-white/10">
                <p>Ay Günlüğü • 5. Sınıf Fen Bilimleri Projesi • {new Date().getFullYear()}</p>
                <p className="mt-1">Öğrenci: {studentData?.name} {studentData?.surname} • Sınıf: {studentData?.class}</p>
              </footer>
            </div>
          } />
          <Route path="/candemirin-ay-gunlugu" element={<JournalPage studentData={studentData} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
