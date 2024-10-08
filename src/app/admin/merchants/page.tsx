'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AdminPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);

  useEffect(() => {
    if (session) {
      fetchPendingRegistrations();
      fetchWithdrawalRequests();
    }
  }, [session]);

  const fetchPendingRegistrations = async () => {
    // Appel API pour récupérer les inscriptions en attente
  };

  const fetchWithdrawalRequests = async () => {
    // Appel API pour récupérer les demandes de retrait
  };

  const approveRegistration = async (userId: string) => {
    // Appel API pour approuver une inscription
    await fetch(`/api/approve-merchant/${userId}`, { method: 'POST' });
  };

  const processWithdrawal = async (withdrawalId: string) => {
    // Appel API pour traiter une demande de retrait
    console.log(`Traitement du retrait ${withdrawalId}`);
  };

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-kashup-blue p-4">
        <h1 className="text-3xl font-bold text-white">KASHUP Admin</h1>
      </header>

      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-4">Inscriptions en attente</h2>
        {/* Liste des inscriptions en attente */}

        <h2 className="text-2xl font-bold mb-4 mt-8">Demandes de retrait</h2>
        {/* Liste des demandes de retrait */}
      </main>
    </div>
  );
}