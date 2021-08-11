import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
      },
    },
  });
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = async () => {
    const token = await Cookies.get("token");
    const excludedRouts = ["/login", "/signup"];
    if (!token && !excludedRouts.includes(window.location.pathname)) {
      window.location.href = "/login";
    }
    if (token && window.location.pathname == "/login") {
      window.location.href = "/";
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
