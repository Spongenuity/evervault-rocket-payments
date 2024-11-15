'use client';

import { useState } from 'react';
import { Card } from './Card';

export function PaymentForm() {
  const [cardData, setCardData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!cardData) return;
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          card: cardData,
          amount: 1000,
          currency: 'GBP'
        })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Payment Demo</h2>
      {success ? (
        <div className="bg-green-100 p-4 rounded">
          Payment successful!
        </div>
      ) : (
        <div className="space-y-4">
          <Card onChange={(e) => setCardData(e.card)} />
          
          <button
            onClick={handleSubmit}
            disabled={!cardData || loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Pay £10.00'}
          </button>

          {error && (
            <div className="bg-red-100 p-4 rounded text-red-700">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
