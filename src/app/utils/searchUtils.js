// Search utilities for the search page

/**
 * Debounce function to limit API calls while typing
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  /**
   * Search API functions - replace these with your actual API endpoints
   */
  export const searchAPI = {
    // Search for personalized reels
    getPersonalizedReels: async (userId) => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/reels/personalized/${userId}`);
        // return await response.json();
        console.log('Fetching personalized reels for user:', userId);
        return { success: true, data: [] };
      } catch (error) {
        console.error('Error fetching personalized reels:', error);
        return { success: false, error: error.message };
      }
    },
  
    // Search for playlists
    searchPlaylists: async (query, filters = {}) => {
      try {
        // TODO: Replace with actual API call
        // const params = new URLSearchParams({ q: query, ...filters });
        // const response = await fetch(`/api/search/playlists?${params}`);
        // return await response.json();
        console.log('Searching playlists:', query, filters);
        return { success: true, data: [], total: 0 };
      } catch (error) {
        console.error('Error searching playlists:', error);
        return { success: false, error: error.message };
      }
    },
  
    // General search
    search: async (query, type = 'all', page = 1, limit = 20) => {
      try {
        // TODO: Replace with actual API call
        // const params = new URLSearchParams({ 
        //   q: query, 
        //   type, 
        //   page: page.toString(), 
        //   limit: limit.toString() 
        // });
        // const response = await fetch(`/api/search?${params}`);
        // return await response.json();
        console.log('Searching:', { query, type, page, limit });
        return {
          success: true,
          data: {
            reels: [],
            playlists: [],
            creators: [],
            total: 0
          }
        };
      } catch (error) {
        console.error('Error performing search:', error);
        return { success: false, error: error.message };
      }
    },
  
    // Get search suggestions
    getSuggestions: async (query) => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
        // return await response.json();
        console.log('Getting suggestions for:', query);
        return { success: true, data: [] };
      } catch (error) {
        console.error('Error getting suggestions:', error);
        return { success: false, error: error.message };
      }
    },
  
    // Save search to history
    saveSearch: async (userId, query) => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/search/history', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ userId, query })
        // });
        // return await response.json();
        console.log('Saving search to history:', { userId, query });
        return { success: true };
      } catch (error) {
        console.error('Error saving search:', error);
        return { success: false, error: error.message };
      }
    },
  
    // Get trending topics
    getTrendingTopics: async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/search/trending');
        // return await response.json();
        console.log('Fetching trending topics');
        return { 
          success: true, 
          data: ['AI Ethics', 'Web3', 'DevOps', 'TypeScript', 'Flutter'] 
        };
      } catch (error) {
        console.error('Error fetching trending topics:', error);
        return { success: false, error: error.message };
      }
    }
  };
  
  /**
   * Format search results for display
   */
  export const formatSearchResults = (results) => {
    return {
      reels: results.reels?.map(reel => ({
        ...reel,
        formattedViews: formatNumber(reel.views),
        formattedDuration: formatDuration(reel.duration)
      })) || [],
      playlists: results.playlists?.map(playlist => ({
        ...playlist,
        formattedEnrolled: formatNumber(playlist.enrolledCount),
        formattedDuration: formatDuration(playlist.totalDuration)
      })) || [],
      creators: results.creators?.map(creator => ({
        ...creator,
        formattedFollowers: formatNumber(creator.followers)
      })) || []
    };
  };
  
  /**
   * Format numbers for display (e.g., 1000 -> 1K)
   */
  export const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  };
  
  /**
   * Format duration from seconds to readable format
   */
  export const formatDuration = (seconds) => {
    if (typeof seconds === 'string') return seconds; // Already formatted
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  /**
   * Filter and sort search results
   */
  export const filterResults = (results, filters) => {
    let filtered = { ...results };
  
    // Filter by category
    if (filters.category && filters.category !== 'All') {
      filtered.reels = filtered.reels?.filter(reel => 
        reel.category === filters.category
      ) || [];
      filtered.playlists = filtered.playlists?.filter(playlist => 
        playlist.category === filters.category
      ) || [];
    }
  
    // Filter by difficulty
    if (filters.difficulty && filters.difficulty !== 'All') {
      filtered.reels = filtered.reels?.filter(reel => 
        reel.difficulty === filters.difficulty
      ) || [];
      filtered.playlists = filtered.playlists?.filter(playlist => 
        playlist.difficulty === filters.difficulty
      ) || [];
    }
  
    // Sort results
    if (filters.sortBy) {
      const sortFunction = getSortFunction(filters.sortBy);
      filtered.reels = filtered.reels?.sort(sortFunction) || [];
      filtered.playlists = filtered.playlists?.sort(sortFunction) || [];
    }
  
    return filtered;
  };
  
  /**
   * Get sort function based on sort type
   */
  const getSortFunction = (sortBy) => {
    switch (sortBy) {
      case 'relevance':
        return (a, b) => (b.relevance || 0) - (a.relevance || 0);
      case 'date':
        return (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'views':
        return (a, b) => (b.views || 0) - (a.views || 0);
      case 'rating':
        return (a, b) => (b.rating || 0) - (a.rating || 0);
      default:
        return (a, b) => 0;
    }
  };
  
  /**
   * Local storage utilities for search history
   */
  export const searchStorage = {
    // Save recent search
    saveRecentSearch: (query) => {
      if (typeof window === 'undefined') return;
      
      try {
        const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        const updated = [query, ...recent.filter(s => s !== query)].slice(0, 10);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving recent search:', error);
      }
    },
  
    // Get recent searches
    getRecentSearches: () => {
      if (typeof window === 'undefined') return [];
      
      try {
        return JSON.parse(localStorage.getItem('recentSearches') || '[]');
      } catch (error) {
        console.error('Error getting recent searches:', error);
        return [];
      }
    },
  
    // Clear recent searches
    clearRecentSearches: () => {
      if (typeof window === 'undefined') return;
      
      try {
        localStorage.removeItem('recentSearches');
      } catch (error) {
        console.error('Error clearing recent searches:', error);
      }
    }
  };