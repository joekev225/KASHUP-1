import React, { useState, useEffect } from 'react';

interface Withdrawal {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  bankAccount: string;
}

const WithdrawalHistory: React.FC = () => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/get-withdrawals');
      const data = await response.json();
      setWithdrawals(data.withdrawals);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique des retraits:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Historique des retraits</h3>
      {isLoading ? (
        <p>Chargement de l'historique...</p>
      ) : withdrawals.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Date</th>
              <th className="text-left">Montant</th>
              <th className="text-left">Compte bancaire</th>
              <th className="text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal) => (
              <tr key={withdrawal.id}>
                <td>{new Date(withdrawal.date).toLocaleDateString()}</td>
                <td>{withdrawal.amount.toLocaleString()} FCFA</td>
                <td>{withdrawal.bankAccount}</td>
                <td>{withdrawal.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun retrait effectué pour le moment.</p>
      )}
    </div>
  );
};

export default WithdrawalHistory;
