/* Extra JavaScript for BFT Learning Path */
/* Handles MathJax/KaTeX rendering, Mermaid initialization, and interactive elements */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Mermaid diagrams
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: document.body.getAttribute('data-md-color-scheme') === 'slate' ? 'dark' : 'default',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      },
      sequence: {
        useMaxWidth: true,
        actorMargin: 50,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        mirrorActors: true
      }
    });

    // Reinitialize Mermaid when theme changes
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'data-md-color-scheme') {
          const theme = document.body.getAttribute('data-md-color-scheme') === 'slate' ? 'dark' : 'default';
          mermaid.initialize({ theme: theme });
          // Reload diagrams
          document.querySelectorAll('.mermaid').forEach(function(element) {
            const graphDefinition = element.textContent;
            element.removeAttribute('data-processed');
            element.innerHTML = graphDefinition;
          });
          mermaid.init(undefined, '.mermaid');
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-md-color-scheme']
    });
  }

  // Initialize KaTeX auto-render
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(document.body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
      ],
      throwOnError: false
    });
  }

  // Checkpoint interactive feedback (simple version)
  document.querySelectorAll('.checkpoint details').forEach(function(detail) {
    detail.addEventListener('toggle', function() {
      if (detail.open) {
        // Track checkpoint engagement (future: could send analytics)
        console.log('Checkpoint answer revealed');
      }
    });
  });

  // Add keyboard navigation to interactive diagrams
  document.querySelectorAll('.interactive-viz').forEach(function(viz) {
    viz.setAttribute('tabindex', '0');
    viz.setAttribute('role', 'img');
    viz.setAttribute('aria-label', viz.getAttribute('data-description') || 'Interactive diagram');
  });

  // Progressive enhancement: Add copy button to code blocks
  document.querySelectorAll('pre > code').forEach(function(codeBlock) {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');

    button.addEventListener('click', function() {
      if (!navigator.clipboard) {
        // Fallback for non-HTTPS or unsupported browsers
        button.textContent = 'Copy not supported';
        setTimeout(function() {
          button.textContent = 'Copy';
        }, 2000);
        return;
      }

      navigator.clipboard.writeText(codeBlock.textContent).then(function() {
        button.textContent = 'Copied!';
        setTimeout(function() {
          button.textContent = 'Copy';
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy:', err);
        button.textContent = 'Copy failed';
        setTimeout(function() {
          button.textContent = 'Copy';
        }, 2000);
      });
    });

    const pre = codeBlock.parentNode;
    pre.style.position = 'relative';
    button.style.position = 'absolute';
    button.style.top = '0.5em';
    button.style.right = '0.5em';
    pre.appendChild(button);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Set focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });

  // Print optimization: Expand all details elements before printing
  window.addEventListener('beforeprint', function() {
    document.querySelectorAll('details').forEach(function(detail) {
      detail.setAttribute('open', '');
    });
  });

  window.addEventListener('afterprint', function() {
    document.querySelectorAll('details').forEach(function(detail) {
      detail.removeAttribute('open');
    });
  });
});

// Lazy load D3.js visualizations (only load on pages that need it)
function loadD3Visualization(containerId, visualizationScript) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Check if D3 is loaded
  if (typeof d3 === 'undefined') {
    console.error('D3.js not loaded. Include D3 script in page.');
    return;
  }

  // Run the visualization script
  if (typeof visualizationScript === 'function') {
    visualizationScript(container);
  }
}

// Accessibility: Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);

  setTimeout(function() {
    document.body.removeChild(announcement);
  }, 1000);
}

// Module progress tracking (future enhancement - requires backend)
// For now, use localStorage for client-side tracking
function markModuleComplete(moduleId) {
  if (typeof localStorage !== 'undefined') {
    const progress = JSON.parse(localStorage.getItem('bft-learning-progress') || '{}');
    progress[moduleId] = {
      completed: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('bft-learning-progress', JSON.stringify(progress));
    announceToScreenReader('Module marked as complete');
  }
}

function getModuleProgress() {
  if (typeof localStorage !== 'undefined') {
    return JSON.parse(localStorage.getItem('bft-learning-progress') || '{}');
  }
  return {};
}

// Expose utilities globally for use in individual pages
window.BFTLearning = {
  loadD3Visualization: loadD3Visualization,
  announceToScreenReader: announceToScreenReader,
  markModuleComplete: markModuleComplete,
  getModuleProgress: getModuleProgress
};
