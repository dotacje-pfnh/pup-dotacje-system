import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfiguracja Vite - narzędzia które kompiluje naszą aplikację React
export default defineConfig({
  plugins: [react()],
  // Ustawienie base URL - ważne jeśli hostujesz w podfolderze
  base: '/',
})