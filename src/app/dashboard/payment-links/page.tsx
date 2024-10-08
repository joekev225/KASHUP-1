import Link from 'next/link';

export default function PaymentLinksPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-kashup-blue p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">KASHUP</h1>
          <div className="space-x-4">
            <Link href="/dashboard" className="text-white hover:text-kashup-yellow">Tableau de bord</Link>
            <Link href="/profile" className="bg-kashup-yellow text-kashup-blue px-4 py-2 rounded-md hover:bg-yellow-400">Profil</Link>
            <Link href="/logout" className="bg-white text-kashup-blue px-4 py-2 rounded-md hover:bg-gray-100">Déconnexion</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-4">Liens de paiement</h2>
        
        <div className="bg-white rounded shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Créer un nouveau lien de paiement</h3>
          <form className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2" htmlFor="amount">Montant</label>
              <input type="number" id="amount" className="w-full border rounded p-2" placeholder="Entrez le montant" />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2" htmlFor="currency">Devise</label>
              <select id="currency" className="w-full border rounded p-2">
                <option>FCFA</option>
                <option>EUR</option>
                <option>USD</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block mb-2" htmlFor="description">Description</label>
              <input type="text" id="description" className="w-full border rounded p-2" placeholder="Description du paiement" />
            </div>
            <div className="col-span-2">
              <button type="submit" className="bg-kashup-blue text-white px-6 py-2 rounded">Créer le lien de paiement</button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Liens de paiement actifs</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Montant</th>
                <th className="p-2 text-left">Date de création</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Paiement pour service A</td>
                <td className="p-2">5000 FCFA</td>
                <td className="p-2">15/04/2023</td>
                <td className="p-2">
                  <button className="text-blue-500 mr-2">Copier le lien</button>
                  <button className="text-red-500">Supprimer</button>
                </td>
              </tr>
              <tr>
                <td className="p-2">Facture mensuelle B</td>
                <td className="p-2">10000 FCFA</td>
                <td className="p-2">10/04/2023</td>
                <td className="p-2">
                  <button className="text-blue-500 mr-2">Copier le lien</button>
                  <button className="text-red-500">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
