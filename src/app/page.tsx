import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Token AI Analyzer</h1>
      <p className="text-xl mb-8 max-w-2xl text-center">
        AI-powered analysis and insights for any token
      </p>

      <div className="flex gap-4 mt-4">
        <Link 
          href="/analyze" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Go to Analyzer
        </Link>
      </div>
    </main>
  );
}
