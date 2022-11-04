import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { trpc } from "./trpc";
import { httpBatchLink } from "@trpc/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import Navbar from "./layouts/Navbar";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#02A4FF",
    },
  },
  typography: {
    fontFamily: "Readex Pro",
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        size: "large",
      },
    },
  },
});

const client = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3001/trpc",
    }),
  ],
});

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Navbar />
        <ThemeProvider theme={theme}>
          <trpc.Provider client={trpcClient} queryClient={client}>
            <QueryClientProvider client={client}>
              <ReactQueryDevtools />
              <Routes>
                <Route path='/' element={<Home />} />
              </Routes>
            </QueryClientProvider>
          </trpc.Provider>
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
