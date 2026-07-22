import { useEffect, useState } from "react";
import { ClientPage } from "./pages/ClientPage";
import { EditorPage } from "./pages/EditorPage";

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return path.replace(/\/$/, "") === "/edit" ? <EditorPage /> : <ClientPage />;
}

export default App;
