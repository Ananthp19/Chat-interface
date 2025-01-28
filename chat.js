// netlify/functions/chat.js
const fetch = require('node-fetch'); // Add this at the top

exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Parse the incoming request
    const body = JSON.parse(event.body);

    // Make request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: body.model || "gpt-3.5-turbo",
        messages: body.messages,
        temperature: 0.7
      })
    });

    // Get the response from OpenAI
    const data = await response.json();

    // Return the response
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.log('Error:', error); // This will show in Netlify functions log
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        error: "An error occurred",
        details: error.message 
      })
    };
  }
};
