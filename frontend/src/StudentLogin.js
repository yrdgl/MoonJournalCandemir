import React, { useState } from 'react';

function StudentLogin({ onLogin }) {
  const [studentName, setStudentName] = useState('');
  const [studentSurname, setStudentSurname] = useState('');
  const [classCode, setClassCode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!studentName.trim() || !studentSurname.trim() || !classCode.trim()) {
      setError('Lütfen tüm alanları doldurun!');
      return;
    }

    // LocalStorage'a öğrenci bilgisini kaydet
    const studentData = {
      id: `${studentName.toLowerCase()}${studentSurname.toLowerCase()}${classCode}`,
      name: studentName,
      surname: studentSurname,
      classCode: classCode,
      loginDate: new Date().toISOString()
    };

    localStorage.setItem('moonJournalStudent', JSON.stringify(studentData));
    
    // Ana sayfaya yönlendir
    onLogin(studentData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🌙</div>
          <h1 className="text-3xl font-bold text-white">Ay Günlüğü</h1>
          <p className="text-gray-300 mt-2">Öğrenci Girişi</p>
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
            <label className="block text-gray-300 mb-2">Sınıf Kodu</label>
            <input
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value.toUpperCase())}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Öğretmeninizin verdiği kodu girin"
            />
            <p className="text-gray-400 text-sm mt-1">
              Öğretmeninizden aldığınız kodu yazın (örn: 6A2024AY)
            </p>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 mt-6"
          >
            Günlüğümü Aç
          </button>

          <div className="text-center text-gray-400 text-sm mt-6">
            <p>Öğretmen misiniz? <button className="text-purple-300 hover:text-purple-200">Öğretmen Girişi</button></p>
            <p className="mt-2">Henüz kodunuz yok mu? Öğretmeninizden sınıf kodu isteyin.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
