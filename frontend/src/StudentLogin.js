import React, { useState } from 'react';

function StudentLogin({ onLogin }) {
  const [studentName, setStudentName] = useState('');
  const [studentSurname, setStudentSurname] = useState('');
  const [studentClass, setStudentClass] = useState('5-A');
  const [error, setError] = useState('');

  const classes = ['5-A', '5-B', '5-C', '5-D', '5-E'];

  const handleLogin = () => {
    if (!studentName.trim() || !studentSurname.trim()) {
      setError('Lütfen adınızı ve soyadınızı girin!');
      return;
    }

    // Öğrenci ID'sini oluştur (benzersiz)
    const studentId = `${studentName.toLowerCase()}-${studentSurname.toLowerCase()}-${studentClass.toLowerCase()}`;
    
    const studentData = {
      id: studentId,
      name: studentName,
      surname: studentSurname,
      class: studentClass,
      loginDate: new Date().toISOString()
    };

    localStorage.setItem('moonJournalStudent', JSON.stringify(studentData));
    onLogin(studentData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🌙</div>
          <h1 className="text-3xl font-bold text-white">Ay Günlüğü</h1>
          <p className="text-gray-300 mt-2">5. Sınıf Fen Bilimleri Projesi</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Adınız</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ahmet"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Soyadınız</label>
            <input
              type="text"
              value={studentSurname}
              onChange={(e) => setStudentSurname(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Yılmaz"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Sınıfınız</label>
            <select
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {classes.map((cls) => (
                <option key={cls} value={cls} className="bg-gray-900">
                  {cls}
                </option>
              ))}
            </select>
            <p className="text-gray-400 text-sm mt-1">
              5. sınıf öğrencisi olduğunuzu doğrulayın
            </p>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 mt-6"
          >
            🌙 Günlüğümü Aç
          </button>

          <div className="text-center text-gray-400 text-sm mt-6">
            <p className="mb-2">📚 5. Sınıf "Dünya ve Evren" Ünitesi</p>
            <p>Ay'ın evrelerini gözlemleyip kaydedeceğiz!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
