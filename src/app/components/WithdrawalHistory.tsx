import React, { useState, useEffect } from 'react';

interface WithdrawalRequest {
  id: string;
  amount: number;
  status: string;
  requestDate: string;
  bankAccount: string;
}

const WithdrawalHistory: React.FC = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWithdrawalRequests();
  }, []);

  const fetchWithdrawalRequests = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/get-withdrawals');
      const data = await response.json();
      setWithdrawalRequests(data.withdrawals);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique des demandes de retrait:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Historique des demandes de retrait</h3>
      {isLoading ? (
        <p>Chargement de l'historique...</p>
      ) : withdrawalRequests.length > 0 ? (
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
            {withdrawalRequests.map((request) => (
              <tr key={request.id}>
                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                <td>{request.amount.toLocaleString()} FCFA</td>
                <td>{request.bankAccount}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune demande de retrait effectuée pour le moment.</p>
      )}
    </div>
  );
};

export default WithdrawalHistory;
