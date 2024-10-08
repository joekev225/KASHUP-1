'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FinancialSummary } from '../types'; // Ajustez le chemin d'importation selon votre structure de projet

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  date: string;
  description: string;
}

interface Activity {
  id: string;
  date: string;
  description: string;
  type: 'credit' | 'debit';
  amount: number;
  balance: number;
}

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary | null>(null);

  useEffect(() => {
    // Fetch balance
    fetch('/api/get-balance')
      .then(res => res.json())
      .then(data => setBalance(data.balance));

    // Fetch recent transactions
    fetch('/api/get-recent-transactions')
      .then(res => res.json())
      .then(data => setRecentTransactions(data.transactions));

    // Fetch recent activity
    fetch('/api/get-recent-activity')
      .then(res => res.json())
      .then(data => setRecentActivity(data.activity));

    // Fetch financial summary
    fetch('/api/get-financial-summary')
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch financial summary'))
      .then(data => setFinancialSummary(data))
      .catch(error => {
        console.error('Error fetching financial summary:', error);
        setFinancialSummary(null);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto mt-8 p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Solde actuel</h2>
            <p className="text-3xl font-bold mb-4">{balance.toLocaleString()} FCFA</p>
            <Link href="/dashboard/withdrawals" className="bg-kashup-blue text-white px-4 py-2 rounded">Retirer des fonds</Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Transactions récentes</h2>
            <ul>
              {recentTransactions && recentTransactions.length > 0 ? (
                recentTransactions.map(transaction => (
                  <li key={transaction.id}>
                    {transaction.type === 'credit' ? 'Crédit' : 'Débit'} - {transaction.amount} FCFA - {new Date(transaction.date).toLocaleDateString()}
                  </li>
                ))
              ) : (
                <li>Aucune transaction récente</li>
              )}
            </ul>
            <Link href="/dashboard/transactions" className="text-kashup-blue">Voir toutes les transactions</Link>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Outils rapides</h2>
            <Link href="/dashboard/e-terminal" className="bg-kashup-blue text-white px-4 py-2 rounded mb-2 w-full inline-block text-center">Ouvrir e-Terminal</Link>
            <Link href="/dashboard/payment-links" className="bg-kashup-blue text-white px-4 py-2 rounded w-full inline-block text-center">Créer un lien de paiement</Link>
          </div>
        </div>

        {financialSummary && (
          <div className="bg-white p-4 rounded shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Résumé financier</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600">Solde actuel</p>
                <p className="text-2xl font-bold">{financialSummary.currentBalance.toLocaleString()} FCFA</p>
              </div>
              <div>
                <p className="text-gray-600">Revenus du mois</p>
                <p className="text-2xl font-bold">{financialSummary.monthlyRevenue.toLocaleString()} FCFA</p>
              </div>
              <div>
                <p className="text-gray-600">Retraits en attente</p>
                <p className="text-2xl font-bold">
                  {(financialSummary as any).pendingWithdrawals?.toLocaleString() ?? '0'} FCFA
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-right">Montant</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map(activity => (
                <tr key={activity.id}>
                  <td className="p-2">{new Date(activity.date).toLocaleDateString()}</td>
                  <td className="p-2">{activity.description}</td>
                  <td className="p-2 text-right">{activity.type === 'credit' ? '+' : '-'}{activity.amount} FCFA</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/dashboard/activity" className="text-kashup-blue">Voir toute l'activité</Link>
        </div>
      </main>
    </div>
  );
}