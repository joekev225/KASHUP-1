import Header from '../../components/Header';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-6">Support Client</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-xl font-semibold mb-4">FAQ</h3>
            <ul className="space-y-4">
              <li>
                <h4 className="font-semibold">Comment puis-je retirer mes fonds ?</h4>
                <p className="text-gray-600">Vous pouvez retirer vos fonds en allant dans la section "Solde" de votre tableau de bord et en cliquant sur "Retirer des fonds".</p>
              </li>
              <li>
                <h4 className="font-semibold">Quels sont les frais de transaction ?</h4>
                <p className="text-gray-600">Les frais de transaction standard sont de 2.5% + 100 FCFA par transaction réussie.</p>
              </li>
              <li>
                <h4 className="font-semibold">Comment puis-je modifier mes informations bancaires ?</h4>
                <p className="text-gray-600">Vous pouvez modifier vos informations bancaires dans la section "Paramètres" de votre compte.</p>
              </li>
            </ul>
            <Link href="/faq" className="text-kashup-blue hover:underline mt-4 inline-block">Voir toutes les FAQ</Link>
          </div>
          
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Contactez-nous</h3>
            <p className="mb-4">Notre équipe de support est disponible 24/7 pour vous aider.</p>
            <ul className="space-y-2">
              <li>Email: support@kashup.com</li>
              <li>Téléphone: +225 XX XX XX XX</li>
              <li>WhatsApp: +225 XX XX XX XX</li>
            </ul>
            <button className="bg-kashup-blue text-white px-4 py-2 rounded mt-4">Ouvrir un ticket de support</button>
          </div>
        </div>
        
        <div className="bg-white rounded shadow p-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">Vos tickets de support</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Numéro de ticket</th>
                <th className="p-2 text-left">Sujet</th>
                <th className="p-2 text-left">Statut</th>
                <th className="p-2 text-left">Date de création</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">#1234</td>
                <td className="p-2">Problème de retrait</td>
                <td className="p-2 text-yellow-500">En cours</td>
                <td className="p-2">15/04/2023</td>
              </tr>
              <tr>
                <td className="p-2">#1235</td>
                <td className="p-2">Question sur les frais</td>
                <td className="p-2 text-green-500">Résolu</td>
                <td className="p-2">10/04/2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
