'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { ActivityTable } from '../../components/ActivityTable';

interface Activity {
  id: string;
  date: string;
  description: string;
  type: 'credit' | 'debit';
  amount: number;
  balance: number;
}

export default function ActivityPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  const [activities, setActivities] = useState<Activity[]>([]);
  const [dateFilter, setDateFilter] = useState('7');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    if (session) {
      fetchActivities();
    }
  }, [session, dateFilter, typeFilter, currentPage]);

  const fetchActivities = async () => {
    const response = await fetch(`/api/get-activities?days=${dateFilter}&type=${typeFilter}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
    if (response.ok) {
      const data = await response.json();
      setActivities(data.activities);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
    }
  };

  const handleFilter = () => {
    setCurrentPage(1);
    fetchActivities();
  };

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-kashup-blue p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">KASHUP</h1>
          <div className="space-x-4">
            <Link href="/dashboard" className="text-white hover:text-kashup-yellow">Accueil</Link>
            <Link href="/profile" className="bg-kashup-yellow text-kashup-blue px-4 py-2 rounded-md hover:bg-yellow-400">Profil</Link>
            <Link href="/logout" className="bg-white text-kashup-blue px-4 py-2 rounded-md hover:bg-gray-100">Déconnexion</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-4">Activité du compte</h2>
        
        <div className="mb-4 flex space-x-4">
          <select 
            className="border p-2 rounded"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="7">7 derniers jours</option>
            <option value="30">30 derniers jours</option>
            <option value="90">3 derniers mois</option>
          </select>
          <select 
            className="border p-2 rounded"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">Tous types</option>
            <option value="credit">Crédits</option>
            <option value="debit">Débits</option>
          </select>
          <button 
            className="bg-kashup-blue text-white px-4 py-2 rounded"
            onClick={handleFilter}
          >
            Filtrer
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mr-2 bg-kashup-blue text-white rounded disabled:bg-gray-300"
          >
            Précédent
          </button>
          <span className="px-4 py-2">Page {currentPage} sur {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 ml-2 bg-kashup-blue text-white rounded disabled:bg-gray-300"
          >
            Suivant
          </button>
        </div>

        <ActivityTable activities={activities} />
      </main>
    </div>
  );
}