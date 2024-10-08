import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-kashup-blue to-purple-600">
      <header className="bg-kashup-blue p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">KASHUP</h1>
          <div className="space-x-4">
            <Link href="/about" className="text-white hover:text-kashup-yellow">À propos</Link>
            <Link href="/solutions" className="text-white hover:text-kashup-yellow">Solutions</Link>
            <Link href="/pricing" className="text-white hover:text-kashup-yellow">Tarifs</Link>
            <Link href="/contact" className="text-white hover:text-kashup-yellow">Contact</Link>
            <Link href="/login" className="bg-kashup-yellow text-kashup-blue px-4 py-2 rounded-md hover:bg-yellow-400">CONNEXION</Link>
            <Link href="/signup" className="bg-white text-kashup-blue px-4 py-2 rounded-md hover:bg-gray-100">S'INSCRIRE</Link>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto mt-16 text-center text-white">
        <h2 className="text-5xl font-bold mb-4">Révolutionnez vos paiements en Afrique avec KASHUP</h2>
        <p className="text-xl mb-8">Notre terminal de paiement innovant transforme la façon dont les entreprises africaines reçoivent des paiements. Partenaire privilégié de Booking.com, nous sommes spécialisés dans les solutions pour l'industrie hôtelière.</p>
        <div className="space-x-4">
          <Link href="/discover" className="bg-kashup-yellow text-kashup-blue px-6 py-3 rounded-md text-lg font-semibold hover:bg-yellow-400">DÉCOUVRIR NOTRE TERMINAL DE PAIEMENT</Link>
          <Link href="/signup" className="bg-white text-kashup-blue px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-100">S'INSCRIRE MAINTENANT</Link>
        </div>
      </main>
    </div>
  );
}