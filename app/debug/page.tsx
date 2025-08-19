export default function Debug() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Debug ENV</h1>
      <p>NEXT_PUBLIC_APP_URL: {process.env.NEXT_PUBLIC_APP_URL || "(vide)"}</p>
    </main>
  );
}
