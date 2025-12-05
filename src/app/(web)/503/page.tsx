export default function ServiceUnavailable() {
    return (
        <div className="h-screen flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-bold text-yellow-600 mb-4">503 - Service Unavailable</h1>
            <p className="text-gray-600 mb-6">The system is temporarily overloaded or under maintenance.<br />Please come back in a few minutes.</p>
            <a href="/" className="px-4 py-2 bg-green-500 text-white rounded-md">Return to home page</a>
        </div>
    );
}
