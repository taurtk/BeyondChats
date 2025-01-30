import React, { useState } from 'react';
import { Bot, Code, Mail, CheckCircle2, Share2 } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export function IntegrationForm({ onComplete }: Props) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTestBot, setShowTestBot] = useState(false);

  const handleTestIntegration = () => {
    setShowSuccess(true);
  };

  const dummyCode = `<script>
  window.BEYONDCHATS_CONFIG = {
    botId: 'your-bot-id',
    theme: 'light'
  };
</script>
<script src="https://cdn.beyondchats.com/widget.js"></script>`;

  if (showSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Integration Successful!
            </h2>
            <p className="text-gray-600">
              Your chatbot is now ready to assist your customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={onComplete}
            >
              <Bot className="w-5 h-5" />
              Explore Admin Panel
            </button>
            <button className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">
              <Bot className="w-5 h-5" />
              Start Talking to Bot
            </button>
          </div>

          <div className="border-t pt-6">
            <p className="text-sm text-gray-600 mb-4">Share your success</p>
            <div className="flex justify-center gap-4">
              <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showTestBot) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="relative border rounded-lg overflow-hidden" style={{ height: '600px' }}>
            <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
              <span>Your Website Preview</span>
              <button
                className="text-sm bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400 transition-colors"
              >
                Chatbot not working? Share feedback
              </button>
            </div>
            <div className="absolute bottom-4 right-4 w-80">
              <div className="bg-white rounded-lg shadow-lg">
                <div className="bg-blue-600 text-white p-3 rounded-t-lg">
                  <h3 className="font-medium">Chat with us</h3>
                </div>
                <div className="p-4 h-96 bg-gray-50">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-lg p-3 ml-4">
                        <p>Hello! How can I help you today?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => handleTestIntegration()}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Chatbot Integration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setShowTestBot(true)}
            className="p-6 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <Bot className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-medium text-gray-800 mb-2">Test Chatbot</h3>
            <p className="text-sm text-gray-600">
              Preview how your chatbot will look and function
            </p>
          </button>

          <div className="p-6 border rounded-lg">
            <Code className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-medium text-gray-800 mb-2">
              Integration Instructions
            </h3>
            <div className="mt-4">
              <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                {dummyCode}
              </pre>
            </div>
          </div>

          <button
            onClick={() => handleTestIntegration()}
            className="p-6 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <Mail className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-medium text-gray-800 mb-2">
              Email Instructions
            </h3>
            <p className="text-sm text-gray-600">
              Send integration guide to your developer
            </p>
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => handleTestIntegration()}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test Integration
          </button>
        </div>
      </div>
    </div>
  );
}