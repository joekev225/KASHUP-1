'use client';

import { useSession } from "next-auth/react";
import Link from 'next/link';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-gradient-to-r from-kashup-blue to-kashup-dark-blue p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">KASHUP</h1>
        <div className="space-x-4">
          <Link href="/dashboard" className="text-white hover:text-kashup-yellow transition duration-300">Accueil</Link>
          <Link href="/dashboard/settings" className="text-white hover:text-kashup-yellow transition duration-300">Paramètres</Link>
          <Link href="/profile" className="bg-kashup-yellow text-kashup-blue px-4 py-2 rounded-md hover:bg-yellow-400 transition duration-300">Profil</Link>
          <Link href="/logout" className="bg-white text-kashup-blue px-4 py-2 rounded-md hover:bg-gray-100 transition duration-300">Déconnexion</Link>
          <Link href="/dashboard/support" className="text-white hover:text-kashup-yellow transition duration-300">Support</Link>
          <Link href="/dashboard/employees" className="text-white hover:text-kashup-yellow transition duration-300">Employés</Link>
          <Link href="/dashboard/withdrawals" className="text-white hover:text-kashup-yellow transition duration-300">Retraits</Link>
          <Link href="/dashboard/reports" className="text-white hover:text-kashup-yellow">Rapports</Link>
          {(session?.user as { role?: string })?.role === 'admin' && (
            <Link href="/admin/merchants" className="text-white hover:text-kashup-yellow">
              Admin
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}