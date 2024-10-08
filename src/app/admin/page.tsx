'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';

interface PendingRegistration {
  id: string;
  email: string;
  businessName: string;
  registrationDate: string;
}

interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [pendingRegistrations, setPendingRegistrations] = useState<PendingRegistration[]>([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if ((session?.user as { role?: string })?.role !== 'admin') {
      router.push('/dashboard');
    } else {
      fetchPendingRegistrations();
      fetchWithdrawalRequests();
    }
  }, [session, status, router]);

  const fetchPendingRegistrations = async () => {
    const response = await fetch('/api/admin/pending-registrations');
    if (response.ok) {
      const data = await response.json();
      setPendingRegistrations(data.pendingRegistrations);
    }
  };

  const fetchWithdrawalRequests = async () => {
    const response = await fetch('/api/admin/withdrawal-requests');
    if (response.ok) {
      const data = await response.json();
      setWithdrawalRequests(data.withdrawalRequests);
    }
  };

  const approveRegistration = async (id: string) => {
    const response = await fetch(`/api/admin/approve-registration/${id}`, { method: 'POST' });
    if (response.ok) {
      fetchPendingRegistrations();
    }
  };

  const processWithdrawal = async (id: string, action: 'approve' | 'reject') => {
    const response = await fetch(`/api/admin/process-withdrawal/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    });
    if (response.ok) {
      fetchWithdrawalRequests();
    }
  };

  if (status === 'loading') {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6">Panneau d'administration</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Inscriptions en attente</h2>
          <ul>
            {pendingRegistrations.map((registration) => (
              <li key={registration.id} className="bg-white p-4 rounded shadow mb-4">
                <p>Email: {registration.email}</p>
                <p>Entreprise: {registration.businessName}</p>
                <p>Date d'inscription: {new Date(registration.registrationDate).toLocaleDateString()}</p>
                <button 
                  onClick={() => approveRegistration(registration.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  Approuver
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Demandes de retrait</h2>
          <ul>
            {withdrawalRequests.map((request) => (
              <li key={request.id} className="bg-white p-4 rounded shadow mb-4">
                <p>ID Utilisateur: {request.userId}</p>
                <p>Montant: {request.amount} FCFA</p>
                <p>Statut: {request.status}</p>
                <p>Date de demande: {new Date(request.requestDate).toLocaleDateString()}</p>
                {request.status === 'pending' && (
                  <div>
                    <button 
                      onClick={() => processWithdrawal(request.id, 'approve')}
                      className="bg-green-500 text-white px-4 py-2 rounded mt-2 mr-2"
                    >
                      Approuver
                    </button>
                    <button 
                      onClick={() => processWithdrawal(request.id, 'reject')}
                      className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                    >
                      Rejeter
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
