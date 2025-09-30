export default function handler(req, res) {
    console.log('🔧 Config API called');
    console.log('🔧 Environment variables check:');
    console.log('- GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
    console.log('- GOOGLE_CLIENT_ID exists:', !!process.env.GOOGLE_CLIENT_ID);
    console.log('- GOOGLE_API_KEY exists:', !!process.env.GOOGLE_API_KEY);
    
    const config = {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
       GEMINI_API_KEY: process.env.GEMINI_API_KEY,
        EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
        EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY
    };
    
    console.log('🔧 Sending config (keys only):', Object.keys(config));
    
    res.status(200).json(config);
}



