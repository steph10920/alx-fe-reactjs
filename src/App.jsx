import React, { useState, useEffect } from 'react';
import currencyData from './currencyData';
import './App.css';

const App = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/435b2037c217583e7cb6633b/latest/${fromCurrency}`);
        const data = await response.json();

        if (data.result === 'error') {
          setError(data['error-type']);
        } else {
          setExchangeRate(data.conversion_rates[toCurrency]);
          setLastUpdated(data.time_last_update_utc);
          setError(null);
        }
      } catch (error) {
        setError('Failed to fetch exchange rates');
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleConvert = () => {
    return (amount * exchangeRate).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="text-center py-6 bg-blue-500 dark:bg-blue-800 text-white">
        <h1 className="text-3xl font-bold">SMART CURRENCY CONVERTER</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 py-10 space-y-6">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-lg">
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 dark:text-gray-300">Amount:</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-gray-700 dark:text-gray-300">From:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencyData.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.name} ({currency.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-700 dark:text-gray-300">To:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currencyData.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.name} ({currency.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 text-center">
            {exchangeRate ? (
              <>
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                  {amount} {fromCurrency} = {handleConvert()} {toCurrency}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Exchange Rate: {exchangeRate}
                </p>
                {lastUpdated && (
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Last updated: {new Date(lastUpdated).toLocaleString()}
                  </p>
                )}
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Loading exchange rate...</p>
            )}
            {error && <p className="text-red-500 dark:text-red-400 mt-2">{error}</p>}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 bg-blue-500 dark:bg-blue-800 text-white">
        <p>&copy; 2024 SMART CURRENCY CONVERTER. Designed by: Stephen Ashioya</p>
        
      </footer>
    </div>
  );
};

export default App;
