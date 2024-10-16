// src/app/page.tsx
import { useEffect, useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchBroadcasters = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                broadcasters {
                  id
                  deposit
                  reserve
                }
              }
            `,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setData(result.data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBroadcasters();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {data?.broadcasters.map((broadcaster: any) => (
        <div key={broadcaster.id}>
          <p>ID: {broadcaster.id}</p>
          <p>Deposit: {broadcaster.deposit}</p>
          <p>Reserve: {broadcaster.reserve}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
