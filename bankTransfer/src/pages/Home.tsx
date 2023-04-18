import { useEffect, useState } from "react";
import { Transaction } from "../components/home/transactions/Transaction";
import { Loader } from "../components/loader/Loader";
import { NavBar } from "../components/navBar/NavBar";
import { AuthProvider } from "../context/AuthContext";

export function Home() {

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);


  return (
    <>

      {isLoaded ?
        <>
          <NavBar />
          <main>
            <Transaction />
          </main>
        </>
        : <Loader />}

    </>
  );
}