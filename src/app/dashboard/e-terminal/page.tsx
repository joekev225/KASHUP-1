'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Notification from '../../components/Notification';
import { loadStripe } from '@stripe/stripe-js';

// Remplacez par votre clé publique Stripe
const stripePromise = loadStripe('votre_cle_publique_stripe');

export default function VirtualTerminalPage() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [bookingReference, setBookingReference] = useState('');
  const [platform, setPlatform] = useState('Booking.com');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Créez un token de carte avec Stripe
      const cardElement = stripe.elements().create('card'); // Utilisez l'élément de carte Stripe ici
      const { token, error } = await stripe.createToken(
        cardElement, // Utilisez l'élément de carte Stripe ici
        {
          // ... autres options si nécessaire
        }
      );

      if (error) throw error;

      // Envoyez le token à votre serveur pour traiter le paiement
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token.id,
          amount: parseFloat(amount) * 100, // Convertir en centimes
          bookingReference,
          platform,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setNotification({ message: 'Paiement réussi!', type: 'success' });
        // Réinitialiser le formulaire
        setCardNumber('');
        setExpiry('');
        setCvv('');
        setAmount('');
        setBookingReference('');
      } else {
        throw new Error(result.message || 'Une erreur est survenue');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue';
      setNotification({ message: errorMessage, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {notification && <Notification message={notification.message} type={notification.type} />}
      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-6">Terminal Virtuel KASHUP</h2>
        
        <div className="bg-white rounded shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Débiter une carte virtuelle</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2" htmlFor="card-number">Numéro de carte virtuelle</label>
              <input 
                type="text" 
                id="card-number" 
                className="w-full border rounded p-2" 
                placeholder="1234 5678 9012 3456" 
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="expiry-date">Date d'expiration</label>
              <input 
                type="text" 
                id="expiry-date" 
                className="w-full border rounded p-2" 
                placeholder="MM/AA" 
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="cvv">CVV</label>
              <input 
                type="text" 
                id="cvv" 
                className="w-full border rounded p-2" 
                placeholder="123" 
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="amount">Montant à débiter (FCFA)</label>
              <input 
                type="number" 
                id="amount" 
                className="w-full border rounded p-2" 
                placeholder="Entrez le montant" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="booking-reference">Référence de réservation</label>
              <input 
                type="text" 
                id="booking-reference" 
                className="w-full border rounded p-2" 
                placeholder="ex: BOOK123456" 
                value={bookingReference}
                onChange={(e) => setBookingReference(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="platform">Plateforme</label>
              <select 
                id="platform" 
                className="w-full border rounded p-2"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option>Booking.com</option>
                <option>Expedia</option>
                <option>Autre</option>
              </select>
            </div>
            <button type="submit" className="bg-kashup-blue text-white px-4 py-2 rounded">Débiter la carte</button>
          </form>
        </div>
        
        {/* ... Le reste de votre composant ... */}
      </main>
    </div>
  );
}