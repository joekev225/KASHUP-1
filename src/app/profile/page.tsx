import Link from 'next/link';

export default function ProfilePage() {
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
        <h2 className="text-2xl font-bold mb-4">Profil utilisateur</h2>
        
        <div className="bg-white rounded shadow p-6">
          <form className="grid grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2" htmlFor="firstName">Prénom</label>
              <input type="text" id="firstName" className="w-full border rounded p-2" placeholder="Votre prénom" />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2" htmlFor="lastName">Nom</label>
              <input type="text" id="lastName" className="w-full border rounded p-2" placeholder="Votre nom" />
            </div>
            <div className="col-span-2">
              <label className="block mb-2" htmlFor="email">Adresse e-mail</label>
              <input type="email" id="email" className="w-full border rounded p-2" placeholder="votre@email.com" />
            </div>
            <div className="col-span-2">
              <label className="block mb-2" htmlFor="phone">Numéro de téléphone</label>
              <input type="tel" id="phone" className="w-full border rounded p-2" placeholder="+XXX XXXXXXXXX" />
            </div>
            <div className="col-span-2">
              <label className="block mb-2" htmlFor="businessName">Nom de l'entreprise</label>
              <input type="text" id="businessName" className="w-full border rounded p-2" placeholder="Nom de votre entreprise" />
            </div>
            <div className="col-span-2">
              <label className="block mb-2" htmlFor="businessAddress">Adresse de l'entreprise</label>
              <textarea id="businessAddress" className="w-full border rounded p-2" rows={3} placeholder="Adresse complète de votre entreprise"></textarea>
            </div>
            <div className="col-span-2">
              <button type="submit" className="bg-kashup-blue text-white px-6 py-2 rounded">Mettre à jour le profil</button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-white rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Changer le mot de passe</h3>
          <form className="grid grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2" htmlFor="currentPassword">Mot de passe actuel</label>
              <input type="password" id="currentPassword" className="w-full border rounded p-2" />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2" htmlFor="newPassword">Nouveau mot de passe</label>
              <input type="password" id="newPassword" className="w-full border rounded p-2" />
            </div>
            <div className="col-span-2">
              <button type="submit" className="bg-kashup-blue text-white px-6 py-2 rounded">Changer le mot de passe</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
