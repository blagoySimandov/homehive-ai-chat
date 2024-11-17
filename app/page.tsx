import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
            Real Estate Assistant
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Chat with our AI to find your perfect property
          </p>
        </div>
        <ChatInterface />
      </div>
    </main>
  );
}