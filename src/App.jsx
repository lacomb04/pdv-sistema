import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCatalog() {
    try {
      setLoading(true);

      // --- CORREÇÃO AQUI ---
      // Mudamos de .from("products") para .from("catalog")
      const { data, error } = await supabase
        .from("catalog")
        .select("*")
        .order("description"); // Ordenar alfabeticamente

      if (error) throw error;

      setItems(data);
    } catch (error) {
      console.error("Erro ao buscar catálogo:", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCatalog();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Frente de Caixa (Teste)
      </h1>

      {loading ? (
        <p className="text-blue-600">Carregando catálogo...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500"
            >
              {/* CORREÇÃO AQUI: No banco é 'description', não 'name' */}
              <h2 className="font-bold text-gray-800 uppercase text-sm mb-2">
                {item.description}
              </h2>

              <div className="flex justify-between items-center">
                <span className="text-blue-700 font-extrabold text-xl">
                  {/* Formatação de Moeda Brasileira */}
                  {item.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <span className="text-xs text-gray-400">ID: {item.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
