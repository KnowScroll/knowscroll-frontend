'use client';

import { useEffect, useState } from 'react';

// This component ensures its children only render on the client side
// This prevents hydration mismatches caused by browser extensions or client-only code
export default function ClientOnly({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return children;
}