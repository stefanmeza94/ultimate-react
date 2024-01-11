import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

function App() {
  const [value, setValue] = useState("");
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("USD");
  const [output, setOutput] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchResults() {
      setIsLoading(true);
      const result = await fetch(
        `https://api.frankfurter.app/latest?amount=${value}&from=${firstCurrency}&to=${secondCurrency}`,
        { signal: controller.signal }
      );
      const data = await result.json();

      setIsLoading(false);
      setOutput(data.rates[secondCurrency]);
    }

    if (!value || firstCurrency === secondCurrency) return;

    fetchResults();

    return function () {
      controller.abort();
    };
  }, [value, firstCurrency, secondCurrency]);

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} disabled={isLoading} />
      <select value={firstCurrency} onChange={(e) => setFirstCurrency(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={secondCurrency} onChange={(e) => setSecondCurrency(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{isLoading ? "Loading..." : value ? output : 0 + " " + secondCurrency}</p>
    </div>
  );
}

export default App;
