// netlify/functions/chat.js

// This is the main function that Netlify will call
const handler = async (event) => {
  try {
    // Make a request to OpenAI's API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Uses the API key from Netlify environment variables
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      // Forward the request body from your frontend
      body: event.body
    });

    // Get the response from OpenAI
    const data = await response.json();

    // Return success response to your frontend
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {
    // Return error response if something goes wrong
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

// Export the handler function for Netlify
module.exports = { handler };