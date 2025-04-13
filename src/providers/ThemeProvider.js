'use client';

import React, { createContext, useContext } from 'react';
import colors from '@/styles/colors';

// Create context for theme colors
const ThemeContext = createContext(colors);

// Theme provider component
export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={colors}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme in components
export function useTheme() {
  return useContext(ThemeContext);
}