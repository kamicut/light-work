import Light from "@/components/light";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <h1 className="text-4xl font-bold mt-20 mb-4">Light Work</h1>
      <p className="text-2xl mb-4">♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜</p>
      <Light />
    </main>
  );
}
