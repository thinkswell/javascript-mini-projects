import ExtractorForm from "@/components/ExtractorForm";

function App() {
  return (
    <main className="grid place-content-center p-5 min-h-screen text-center bg-stone-300">
      {/* Card */}
      <h1 className="mb-10 text-3xl font-semibold text-gray-400">InstaUser</h1>
      <ExtractorForm />
    </main>
  );
}

export default App;
