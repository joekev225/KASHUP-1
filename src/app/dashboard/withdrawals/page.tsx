'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Notification from '../../components/Notification';

export default function WithdrawalsPage() {
  const [amount, setAmount] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/process-withdrawal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100, // Convertir en centimes
          bankAccount,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setNotification({ message: 'Demande de retrait envoyée avec succès!', type: 'success' });
        setAmount('');
        setBankAccount('');
      } else {
        throw new Error(result.message || 'Une erreur est survenue');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setNotification({ message: error.message, type: 'error' });
      } else {
        setNotification({ message: 'Une erreur inconnue est survenue', type: 'error' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {notification && <Notification message={notification.message} type={notification.type} />}
      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-6">Gestion des Retraits</h2>
        
        <div className="bg-white rounded shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Solde disponible</h3>
          <p className="text-3xl font-bold text-kashup-blue">1,250,000 FCFA</p>
        </div>

        <div className="bg-white rounded shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Demander un retrait</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2" htmlFor="withdrawal-amount">Montant à retirer (FCFA)</label>
              <input 
                type="number" 
                id="withdrawal-amount" 
                className="w-full border rounded p-2" 
                placeholder="Entrez le montant" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="bank-account">Compte bancaire de destination</label>
              <select 
                id="bank-account" 
                className="w-full border rounded p-2"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                required
              >
                <option value="">Sélectionnez un compte</option>
                <option value="account_1">Banque A - **** 1234</option>
                <option value="account_2">Banque B - **** 5678</option>
              </select>
            </div>
            <button type="submit" className="bg-kashup-blue text-white px-4 py-2 rounded">Demander le retrait</button>
          </form>
        </div>
        
        {/* ... Le reste de votre composant (historique des retraits) ... */}
      </main>
    </div>
  );
}