// brain.js - Brain outline and neuron mesh setup for ASI Saga
// Provides function to add a stylized brain outline and neuron spheres to the scene

export function setupBrain() {
  // Use embedded SVG via <object> in HTML
  const container = document.getElementById('brain-container');
  if (!container) {
    console.error('Missing #brain-container element. Ensure the page includes the brain container and stylesheet.');
    return;
  }

  // The SVG is embedded using <object id="brain-object"> in the page
  const obj = container.querySelector('#brain-object');
  if (!obj) {
    console.error('Missing #brain-object <object> element inside #brain-container.');
    return;
  }

  obj.addEventListener('load', () => {
    try {
      const svgDoc = obj.contentDocument;
      if (!svgDoc) {
        console.error('Unable to access SVG document inside #brain-object');
        return;
      }
      const svg = svgDoc.querySelector('svg');
      if (!svg) return;

      // Visual styling for the embedded SVG is provided by assets/css/brain.css

      // Example animation: pulse effect
      svg.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.05)' },
        { transform: 'scale(1)' }
      ], {
        duration: 2000,
        iterations: Infinity
      });

      // SVG neuron flash animation logic (moved from thoughts.js)
      const svgNeurons = Array.from(svg.querySelectorAll('[id*="neuron"]'));
      const neuronFlashTimers = Array(svgNeurons.length).fill(0).map(() => Math.random() * 2.5);
      function animateNeurons() {
        for (let i = 0; i < svgNeurons.length; i++) {
          neuronFlashTimers[i] -= 0.016;
          if (neuronFlashTimers[i] <= 0) {
            const neuron = svgNeurons[i];
            neuron.style.fill = '#ffff00';
            neuron.style.opacity = '1';
            setTimeout(() => {
              neuron.style.fill = '';
              neuron.style.opacity = '';
            }, 200);
            neuronFlashTimers[i] = 0.15 + Math.random() * 2.5;
          }
        }
        requestAnimationFrame(animateNeurons);
      }
      if (svgNeurons.length) animateNeurons();

    } catch (err) {
      console.error('Error initializing embedded SVG animations', err);
    }
  });
}
