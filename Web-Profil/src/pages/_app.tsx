import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/poppins"; // Poppins Bold

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="font-poppins text-black">
      <Component {...pageProps} />
    </main>
  );
}
