import { PaymentForm } from '../components/PaymentForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Secure Payment Demo
        </h1>
        <PaymentForm />
      </div>
    </main>
  );
}
