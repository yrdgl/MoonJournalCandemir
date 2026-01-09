import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import JournalPage from './pages/DailyJournals';
import StudentLogin from './StudentLogin'; // YENİ EKLENEN

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Sayfa yüklendiğinde LocalStorage'ta öğrenci var mı kontrol et
    const savedStudent = localStorage.getItem('moonJournalStudent');
    if (savedStudent) {
      setStudentData(JSON.parse(savedStudent));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (student) => {
    setStudentData(student);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('moonJournalStudent');
    setIsLoggedIn(false);
    setStudentData(null);
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
          <Route path="/" element={<HomePage studentData={studentData} />} />
          <Route path="/candemirin-ay-gunlugu" element={<JournalPage studentData={studentData} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
