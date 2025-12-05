export default function InternalServerError() {
    return (
        <div className="h-screen flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-bold text-yellow-600 mb-4">500 Internal Server Error</h1>
            <p className="text-gray-600 mb-6">cloudflare.</p>
        </div>
    );
}