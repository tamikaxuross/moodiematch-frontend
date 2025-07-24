export default function PageWrapper({ children }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow max-w-xl w-full">
        {children}
      </div>
    </div>
  );
}