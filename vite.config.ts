import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { enquiryApi } from './src/server/viteEnquiries';

export default defineConfig({ plugins: [react(), enquiryApi()] });
