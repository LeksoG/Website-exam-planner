// api/config.js
export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // These environment variables don't need NEXT_PUBLIC_ prefix
  // since they're only used server-side
  const config = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
  };

  // Optional: Add some basic security checks
  const requiredFields = [
    'GOOGLE_CLIENT_ID', 
    'GOOGLE_API_KEY', 
    'EMAILJS_SERVICE_ID', 
    'EMAILJS_TEMPLATE_ID', 
    'EMAILJS_PUBLIC_KEY'
  ];
  
  const missingFields = requiredFields.filter(field => !config[field]);
  if (missingFields.length > 0) {
    return res.status(500).json({ 
      message: 'Configuration error', 
      missingFields 
    });
  }

  res.status(200).json(config);
}