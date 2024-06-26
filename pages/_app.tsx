import Header from "@/components/Header";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import client from "../apollo-client";
import { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Toaster />
        <div className="h-screen overflow-y-scroll bg-slate-200">
          <Header />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ApolloProvider>
  );
}
