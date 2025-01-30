import React, { useState } from 'react';
import { Building2, Globe, FileText } from 'lucide-react';
import type { OrganizationData, WebpageStatus } from '../types';

interface Props {
  onComplete: (data: OrganizationData) => void;
}

const DUMMY_WEBPAGES: WebpageStatus[] = [
  {
    url: '/about',
    status: 'scraped',
    chunks: [
      'BeyondChats is a leading chatbot company.',
      'We help businesses automate customer support.',
    ],
  },
  {
    url: '/features',
    status: 'pending',
  },
  {
    url: '/pricing',
    status: 'detected',
  },
];

export function OrganizationForm({ onComplete }: Props) {
  const [data, setData] = useState<OrganizationData>({
    companyName: '',
    websiteUrl: '',
    description: '',
  });
  const [selectedPage, setSelectedPage] = useState<WebpageStatus | null>(null);
  const [showScrapingStatus, setShowScrapingStatus] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showScrapingStatus) {
      setShowScrapingStatus(true);
      return;
    }
    onComplete(data);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Setup Organization
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="BeyondChats Inc."
                  value={data.companyName}
                  onChange={e =>
                    setData({ ...data, companyName: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com"
                  value={data.websiteUrl}
                  onChange={e => setData({ ...data, websiteUrl: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <textarea
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Tell us about your company..."
                value={data.description}
                onChange={e =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </div>
          </div>

          {showScrapingStatus && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Website Scraping Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Detected Pages
                  </h4>
                  <ul className="space-y-2">
                    {DUMMY_WEBPAGES.map(page => (
                      <li
                        key={page.url}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedPage?.url === page.url
                            ? 'bg-blue-50 border-blue-200'
                            : 'hover:bg-gray-50 border-gray-100'
                        } border`}
                        onClick={() => setSelectedPage(page)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-800">{page.url}</span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              page.status === 'scraped'
                                ? 'bg-green-100 text-green-800'
                                : page.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {page.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedPage && selectedPage.chunks && (
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-3">
                      Scraped Content from {selectedPage.url}
                    </h4>
                    <ul className="space-y-2">
                      {selectedPage.chunks.map((chunk, index) => (
                        <li
                          key={index}
                          className="p-3 bg-gray-50 rounded-lg text-gray-700"
                        >
                          {chunk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showScrapingStatus ? 'Continue to Integration' : 'Start Scraping'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}