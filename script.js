// This function runs when the button is clicked
/*      function greetUser() {
        let name = prompt("What's your name? \n ཁྱེད་རང་གི་མིང་ལ་ག་རེ་རེད།");
        if (name) {
          alert("Tashi Delek བཀྲ་ཤིས་བདེ་ལེགས།, " + name + "! 👋");
        } else {
          alert("You didn't enter a name.");
        }
      }
      */
// Initialize the map centered near village
  // Initialize the map centered near MIT
  const map = L.map('map').setView([30.5, 85], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  const village= [29.1035, 92.5066];
  const MIT = [42.3601,71.0942];
  const dharamsala = [32.2207, 76.3203]; 


  const storyPanel = document.getElementById('story-panel');

  // Marker for village
  L.marker(Methok's village).addTo(map)
    .bindPopup("Methok's village")
    .on('click', () => {
      storyPanel.innerHTML = `
        <h2>Methok's village</h2>
        <p>Methok's village where she was born and raised.
      `;
    });

  // Marker for MIT
  L.marker(MIT).addTo(map)
    .bindPopup("MIT")
    .on('click', () => {
      storyPanel.innerHTML = `
        <h2>MIT</h2>
        <p>MIT is a world leading private university in Cambridge, Massachusetts, best known for excellence in STEM fields, including Computer Science.
      `;
    });
    // Marker for Dharamsala
      L.marker(dharamsala).addTo(map)
        .bindPopup("📍 Dharamshala")
        .on('click', () => {
          storyPanel.innerHTML = `
            <h2>📖 Dharamshala</h2>
            <p>After the 1959 uprising in Lhasa, His Holiness the 14th Dalai Lama fled Tibet and found refuge in Dharamsala, India. There, the Tibetan Government-in-Exile was established — not just as a political structure, but as a cultural lifeline. In this Himalayan town, Tibetans rebuilt schools, monasteries, and institutions to preserve their language, religion, and identity. Though far from their homeland, Dharamsala has become the third symbolic capital of Tibet — a place where memory, resilience, and hope continue to thrive. </p>
          `;
        });
  const path = L.polyline([Methok's village, MIT, dharamsala], {
    color: 'red',
    weight: 4
  }).addTo(map);

  map.fitBounds(path.getBounds(), {
    paddingTopLeft: [50, 50],
    paddingBottomRight: [50, 50],
    maxZoom: 7
  });


// My image slide with captions
      const slides = document.querySelectorAll('.carousel-slide');
      let current = 0;

      document.querySelector('.next-btn').addEventListener('click', () => {
        slides[current].classList.add('hidden');
        current = (current + 1) % slides.length;
        slides[current].classList.remove('hidden');
      });

      document.querySelector('.prev-btn').addEventListener('click', () => {
        slides[current].classList.add('hidden');
        current = (current - 1 + slides.length) % slides.length;
        slides[current].classList.remove('hidden');
      });

// Three capitals story block
     const storyBlocks = document.querySelectorAll('.story-block');

    const revealOnScroll = () => {
      storyBlocks.forEach(block => {
        const top = block.getBoundingClientRect().top;
        const bottom = block.getBoundingClientRect().bottom;

        if (top < window.innerHeight * 0.85 && bottom > 0) {
          block.classList.add('revealed');
        } else {
          block.classList.remove('revealed'); // Remove on scroll out
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
