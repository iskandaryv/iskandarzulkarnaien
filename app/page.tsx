export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Cloud-Based REST API
        </h1>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">POST /api/data</h3>
              <p className="text-gray-600">Store JSON data in the database</p>
            </div>
            
            <div>
              <h3 className="font-semibold">GET /api/data</h3>
              <p className="text-gray-600">Retrieve all data with optional filtering</p>
            </div>
            
            <div>
              <h3 className="font-semibold">GET /api/data/[id]</h3>
              <p className="text-gray-600">Retrieve specific data by ID</p>
            </div>
            
            <div>
              <h3 className="font-semibold">DELETE /api/data/[id]</h3>
              <p className="text-gray-600">Delete specific data by ID</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Example Usage:</h3>
            <pre className="bg-gray-800 text-white p-4 rounded text-xs overflow-x-auto">
{`curl -X POST http://localhost:3000/api/data \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'`}
            </pre>
          </div>
        </div>
      </div>
    </main>
  )
}
