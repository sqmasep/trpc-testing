import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import { createTheme, ThemeProvider } from "@mui/material";
import { trpc } from "./trpc";
import { httpBatchLink } from "@trpc/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";

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
    <ThemeProvider theme={theme}>
      <trpc.Provider client={trpcClient} queryClient={client}>
        <QueryClientProvider client={client}>
          <ReactQueryDevtools />
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  );
};

export default App;
