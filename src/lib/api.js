// src/lib/api.js
import axios from "axios";

// Use /api in prod; fallback to localhost only for local dev
const API_BASE =
  (import.meta.env.VITE_API_BASE && import.meta.env.VITE_API_BASE.trim()) ||
  "http://localhost:5000";

export const http = axios.create({
  baseURL: API_BASE,   // in production this will be "/api"
  withCredentials: true,
});

// Optional helper to build URLs
export const api = (p) => `${API_BASE}${p}`;
