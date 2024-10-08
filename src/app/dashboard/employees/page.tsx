import Header from '../../components/Header';

export default function EmployeesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-6">Gestion des Employés</h2>
        
        <div className="bg-white rounded shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Ajouter un nouvel employé</h3>
          <form className="space-y-4">
            <div>
              <label className="block mb-2" htmlFor="employee-name">Nom de l'employé</label>
              <input type="text" id="employee-name" className="w-full border rounded p-2" placeholder="Nom complet" />
            </div>
            <div>
              <label className="block mb-2" htmlFor="employee-email">Email</label>
              <input type="email" id="employee-email" className="w-full border rounded p-2" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block mb-2" htmlFor="employee-role">Rôle</label>
              <select id="employee-role" className="w-full border rounded p-2">
                <option>Administrateur</option>
                <option>Gestionnaire</option>
                <option>Comptable</option>
                <option>Support client</option>
              </select>
            </div>
            <button type="submit" className="bg-kashup-blue text-white px-4 py-2 rounded">Ajouter l'employé</button>
          </form>
        </div>
        
        <div className="bg-white rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Liste des employés</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Nom</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Rôle</th>
                <th className="p-2 text-left">Statut</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">John Doe</td>
                <td className="p-2">john@example.com</td>
                <td className="p-2">Administrateur</td>
                <td className="p-2 text-green-500">Actif</td>
                <td className="p-2">
                  <button className="text-blue-500 mr-2">Modifier</button>
                  <button className="text-red-500">Désactiver</button>
                </td>
              </tr>
              <tr>
                <td className="p-2">Jane Smith</td>
                <td className="p-2">jane@example.com</td>
                <td className="p-2">Comptable</td>
                <td className="p-2 text-green-500">Actif</td>
                <td className="p-2">
                  <button className="text-blue-500 mr-2">Modifier</button>
                  <button className="text-red-500">Désactiver</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
