import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Base L2 Token Monitor</h1>
      <p className="text-xl mb-8 max-w-2xl text-center">
        Advanced monitoring and analytics for tokens on the Base L2 blockchain
      </p>

      <div className="flex gap-4 mt-4">
        <Link 
          href="/dashboard" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Launch Dashboard
        </Link>
        <Link 
          href="/auth" 
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Connect Wallet
        </Link>
      </div>
    </main>
  );
}
