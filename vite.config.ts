import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { enquiryApi } from './src/server/viteEnquiries';
import { jayLogoAsset } from './src/server/viteJayLogo';

export default defineConfig({ plugins: [react(), enquiryApi(), jayLogoAsset()] });
