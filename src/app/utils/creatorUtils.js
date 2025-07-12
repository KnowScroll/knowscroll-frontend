// src/app/utils/creatorUtils.js

/**
 * Format numbers for display (e.g., 1500 -> 1.5K, 1000000 -> 1M)
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
   * Generate a slug from a display name
   */
  export const generateSlug = (displayName) => {
    return displayName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };
  
  /**
   * Validate if a username is valid
   */
  export const isValidUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    return usernameRegex.test(username) && username.length >= 3 && username.length <= 30;
  };
  
  /**
   * Get time since account creation
   */
  export const getTimeSinceJoined = (joinedDate) => {
    const now = new Date();
    const joined = new Date(joinedDate);
    const diffTime = Math.abs(now - joined);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  };
  
  /**
   * Mock API functions for future backend integration
   */
  export const creatorAPI = {
    // Get creator by username
    getByUsername: async (username) => {
      // TODO: Replace with actual API call
      // return await fetch(`/api/creators/${username}`).then(res => res.json());
      console.log(`Fetching creator: ${username}`);
      return null;
    },
    
    // Follow/unfollow creator
    toggleFollow: async (creatorId, isFollowing) => {
      // TODO: Replace with actual API call
      // return await fetch(`/api/creators/${creatorId}/follow`, {
      //   method: isFollowing ? 'POST' : 'DELETE'
      // }).then(res => res.json());
      console.log(`Toggle follow for creator ${creatorId}: ${isFollowing}`);
      return { success: true };
    },
    
    // Get creator's content
    getCreatorContent: async (username, page = 1, limit = 20) => {
      // TODO: Replace with actual API call
      // return await fetch(`/api/creators/${username}/content?page=${page}&limit=${limit}`)
      //   .then(res => res.json());
      console.log(`Fetching content for ${username}, page: ${page}`);
      return { content: [], hasMore: false };
    }
  };