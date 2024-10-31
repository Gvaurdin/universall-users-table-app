import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return <>
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Приложение с таблицей пользователей</h1>
      </header>
      <Component {...pageProps} />
    </div>
  </>
}
