import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to EcoJourney 🌍</h1>
        <p className="mb-6">Please login or register to continue</p>
        <div className="space-y-3">
          <Link
            to="/login"
            className="block bg-blue-600 text-white p-2 rounded"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block bg-green-600 text-white p-2 rounded"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
