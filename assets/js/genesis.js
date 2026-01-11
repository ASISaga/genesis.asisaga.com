// Genesis JavaScript - Entry point for genesis-related pages
// Import all genesis JavaScript modules

import './genesis/foundation.js';
import './genesis/sacred-interactions.js';
import './genesis/backend-placeholders.js';

// Dynamically load page-specific scripts based on current page
const currentPath = window.location.pathname;

if (currentPath.includes('/genesis/') && !currentPath.includes('/community') && !currentPath.includes('/scoring') && !currentPath.includes('/governance')) {
  import('./genesis/genesis-page.js');
} else if (currentPath.includes('/community')) {
  import('./genesis/community-page.js');
} else if (currentPath.includes('/governance')) {
  import('./genesis/governance-page.js');
}
