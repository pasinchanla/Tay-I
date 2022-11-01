import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState({ text: '' });
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const download = async () => {

    await fetch('/api/download', {
      body: JSON.stringify({
        lyrics: data.text
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
  };

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true);
        const res = await fetch(`/api/openai`, {
          body: JSON.stringify({
            name: search
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })
        const data = await res.json();
        setData(data);
        console.log(data)
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Tay-I</title>
        <link rel="icon" href="/song-lyrics.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Tay-I</a>
        </h1>

        <p className={styles.description}>Lyrics Like Taylor Swift</p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Enter Keyword:</h3>
            <input
              type="text"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
            <button
              class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              type="button"
              onClick={() =>
                setSearch(query)
              }
            >
              Generate
            </button>
            
            <h4>Lyrics</h4>
            {isLoading ? (
              <div>Loading ...</div>
            ) : (
              <span>
                {data.text}
              </span>
            )}

          </div>
        </div>
        <a href={'http://localhost:3000/api/download?lyrics=' + data.text} rel={'noreferrer'} target={'_blank'}
        class="bg-sky-500 hover:bg-sky-700 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Save as Text
        </a>
      </main>
    </div>
  );
}
