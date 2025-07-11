      // This function runs when the button is clicked
      function greetUser() {
        let name = prompt("What's your name? \n ཁྱེད་རང་གི་མིང་ལ་ག་རེ་རེད།");
        if (name) {
          alert("Tashi Delek བཀྲ་ཤིས་བདེ་ལེགས།, " + name + "! 🐶");
        } else {
          alert("You didn't enter a name.");
        }
      }
  const map = L.map('map').setView([28.3949, 84.1240], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const tracePoints = [
      [31.9058, 102.206],   // Barkham
      [28.2096, 83.9595],  // Pokhara
      [12.4026,75.9812],  // Bylakuppe
      [37.9161,-122.3108],  // El Cerrito
          ];

    const pathLine = L.polyline(tracePoints, { color: 'red' }).addTo(map);
    
    map.fitBounds(pathLine.getBounds());

    L.marker(tracePoints[0]).addTo(map).bindPopup('Barkham');
    L.marker(tracePoints[1]).addTo(map).bindPopup('Pokhara');
    L.marker(tracePoints[2]).addTo(map).bindPopup('Bylakuppe');
    L.marker(tracePoints[3]).addTo(map).bindPopup('El Cerrito');
