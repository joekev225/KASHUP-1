import Header from '../../components/Header';

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-6">Rapports et Statistiques</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Total des transactions</h3>
            <p className="text-3xl font-bold text-kashup-blue">1,250,000 FCFA</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Nombre de transactions</h3>
            <p className="text-3xl font-bold text-kashup-blue">87</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Moyenne par transaction</h3>
            <p className="text-3xl font-bold text-kashup-blue">14,368 FCFA</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Taux de réussite</h3>
            <p className="text-3xl font-bold text-green-500">98.5%</p>
          </div>
        </div>

        <div className="bg-white rounded shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Transactions par plateforme</h3>
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Graphique à implémenter ici</p>
          </div>
        </div>
        
        <div className="bg-white rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Transactions récentes</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Montant</th>
                <th className="p-2 text-left">Plateforme</th>
                <th className="p-2 text-left">Référence</th>
                <th className="p-2 text-left">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">15/04/2023</td>
                <td className="p-2">150,000 FCFA</td>
                <td className="p-2">Booking.com</td>
                <td className="p-2">BOOK123456</td>
                <td className="p-2 text-green-500">Réussi</td>
              </tr>
              <tr>
                <td className="p-2">14/04/2023</td>
                <td className="p-2">200,000 FCFA</td>
                <td className="p-2">Expedia</td>
                <td className="p-2">EXP789012</td>
                <td className="p-2 text-green-500">Réussi</td>
              </tr>
              <tr>
                <td className="p-2">13/04/2023</td>
                <td className="p-2">100,000 FCFA</td>
                <td className="p-2">Booking.com</td>
                <td className="p-2">BOOK654321</td>
                <td className="p-2 text-red-500">Échoué</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}