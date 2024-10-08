import Header from '../../components/Header';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-6">Paramètres du compte</h2>
        
        <div className="bg-white rounded shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Notifications par e-mail</span>
              <input type="checkbox" className="form-checkbox h-5 w-5 text-kashup-blue" />
            </div>
            <div className="flex items-center justify-between">
              <span>Notifications SMS</span>
              <input type="checkbox" className="form-checkbox h-5 w-5 text-kashup-blue" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Sécurité</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Authentification à deux facteurs</span>
              <input type="checkbox" className="form-checkbox h-5 w-5 text-kashup-blue" />
            </div>
            <button className="bg-kashup-blue text-white px-4 py-2 rounded">Changer le mot de passe</button>
          </div>
        </div>

        <div className="bg-white rounded shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Préférences de paiement</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-2" htmlFor="default-currency">Devise par défaut</label>
              <select id="default-currency" className="w-full border rounded p-2">
                <option>FCFA</option>
                <option>EUR</option>
                <option>USD</option>
              </select>
            </div>
            <div>
              <label className="block mb-2" htmlFor="payout-frequency">Fréquence des versements</label>
              <select id="payout-frequency" className="w-full border rounded p-2">
                <option>Quotidien</option>
                <option>Hebdomadaire</option>
                <option>Mensuel</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Informations bancaires</h3>
          <form className="space-y-4">
            <div>
              <label className="block mb-2" htmlFor="bank-name">Nom de la banque</label>
              <input type="text" id="bank-name" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block mb-2" htmlFor="account-number">Numéro de compte</label>
              <input type="text" id="account-number" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block mb-2" htmlFor="swift-code">Code SWIFT</label>
              <input type="text" id="swift-code" className="w-full border rounded p-2" />
            </div>
            <button type="submit" className="bg-kashup-blue text-white px-4 py-2 rounded">Mettre à jour les informations bancaires</button>
          </form>
        </div>
      </main>
    </div>
  );
}