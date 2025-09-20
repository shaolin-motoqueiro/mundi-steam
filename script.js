// Substitua pelo seu token Mapbox
mapboxgl.accessToken = "pk.eyJ1Ijoic2FtdWVsc2YiLCJhIjoiY21mcXVieTc3MDJpdzJscTIxanp2eWYyYSJ9.8Ddz49VSmr0mjUa3rGAU7g";

// Cria o mapa base em projeção globo
const defaultStyle = "mapbox://styles/mapbox/satellite-streets-v12";
const map = new mapboxgl.Map({
  container: "map",
  style: defaultStyle,
  center: [10, 50],
  zoom: 4,
  projection: "globe"
});

// Troca o estilo do mapa ao selecionar
document.getElementById('mapStyleSelect').addEventListener('change', function(e) {
  map.setStyle(e.target.value);
});

// Controle de zoom customizado
const zoomSlider = document.getElementById('zoomSlider');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');

// Atualiza o slider quando o zoom do mapa muda
map.on('zoom', () => {
  zoomSlider.value = map.getZoom().toFixed(1);
});

// Slider controla o zoom do mapa
zoomSlider.addEventListener('input', (e) => {
  map.zoomTo(Number(e.target.value));
});

// Botões + e - controlam o zoom
zoomInBtn.addEventListener('click', () => {
  map.zoomTo(map.getZoom() + 1);
});
zoomOutBtn.addEventListener('click', () => {
  map.zoomTo(map.getZoom() - 1);
});

// Adiciona marcadores HTML/CSS ao carregar o estilo do mapa
const siteList = [];

map.on("style.load", () => {
  // Limpa a lista de eventos para evitar duplicidade
  siteList.length = 0;
  const createMarker = (color, lng, lat, title = "", url = "#") => {
    // Container do marcador
    const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";

    // Bolinha do marcador
    const marker = document.createElement("div");
    marker.style.width = "28px";
    marker.style.height = "28px";
    marker.style.background = color;
    marker.style.borderRadius = "50%";
    marker.style.border = "3px solid #fff";
    marker.style.boxShadow = "0 0 8px #0008";
    marker.style.cursor = "pointer";

    // Nome do site/evento
    const label = document.createElement("span");
    label.textContent = title;
  label.style.background = "rgba(255,255,255,0.75)";
  label.style.color = "#222";
  label.style.fontSize = "14px";
  label.style.fontWeight = "bold";
  label.style.padding = "3px 8px";
  label.style.marginLeft = "0";
  label.style.marginBottom = "6px";
  label.style.marginTop = "0";
  label.style.textAlign = "center";
  label.style.borderRadius = "6px";
  label.style.boxShadow = "0 2px 12px #0004";
  label.style.whiteSpace = "pre-line";
  label.style.pointerEvents = "none";
  label.style.textShadow = "0 1px 4px #fff, 0 0 2px #0006";

    // Clique abre o link
    container.addEventListener("click", (e) => {
      e.stopPropagation();
      window.open(url, "_blank");
    });

    container.appendChild(marker);
    container.appendChild(label);

  // Altitude baixa (10 metros acima do solo)
  // Salva info para o menu suspenso
  siteList.push({ title, lng, lat });
  return new mapboxgl.Marker({element: container, anchor: 'bottom'}).setLngLat([lng, lat, 1]).addTo(map);
  };

  // Marcadores personalizados para eventos históricos
  createMarker("#d32f2f", 36.1900, 51.7300, "Batalha de Kursk (1943)", "https://batalha-de-kursk.netlify.app");
  createMarker("#1976d2", 28.9167, 30.8333, "Batalha de El Alamein (1942)", "https://batalha-de-el-alamein.netlify.app");
  createMarker("#fbc02d", 18.5700, 51.2206, "Bombardeio de Wieluń", "https://invasaopolonia.netlify.app/");
  createMarker("#388e3c", 18.6714, 54.4075, "Ataque a Westerplatte", "https://invasaopolonia.netlify.app/");
  createMarker("#7b1fa2", 21.0111, 52.2300, "Cerco a Varsóvia", "https://invasaopolonia.netlify.app/");
  createMarker("#ff9800", 4.678886593127387, 49.903444202617315, "Batalha de Ardenas", "https://batalha-de-ardenas.netlify.app/");
  createMarker("#607d8b", 23.6833, 52.0833, "Brest (Operação Barbarossa)", "https://operacaobarbarossa.netlify.app/");
  createMarker("#607d8b", 22.9333, 54.1000, "Suwałki (Operação Barbarossa)", "https://operacaobarbarossa.netlify.app/");
  createMarker("#607d8b", 24.0167, 49.8333, "Lvov/Lviv (Operação Barbarossa)", "https://operacaobarbarossa.netlify.app/");
  createMarker("#1565c0", -32.57614, 48.101652, "Batalha do Atlântico", "https://rafaelaavellardo.github.io/projetoMostraSteam/");
  createMarker("#388e3c", 121.47201493846363, 31.23940036572418, "China na Segunda Guerra Mundial (Xangai)", "https://china-segunda-guerra.netlify.app/");
  createMarker("#388e3c", 118.81166275739032, 32.0603252683089, "China na Segunda Guerra Mundial (Nanquim)", "https://china-segunda-guerra.netlify.app/");
  createMarker("#388e3c", 114.2946406978672, 30.62319570959683, "China na Segunda Guerra Mundial (Wuhan)", "https://china-segunda-guerra.netlify.app/");
  createMarker("#388e3c", 120.46088642339056, 29.17655265370726, "China na Segunda Guerra Mundial (Jinhua)", "https://china-segunda-guerra.netlify.app/");
  createMarker("#388e3c", 112.91996898487605, 28.243530325999973, "China na Segunda Guerra Mundial (Changsha)", "https://china-segunda-guerra.netlify.app/");
  createMarker("#388e3c", 96.42619462330937, 21.31670053060128, "China na Segunda Guerra Mundial (Myitkyina)", "https://china-segunda-guerra.netlify.app/");
  createMarker("#c62828", 44.5147, 48.7086, "Stalingrado", "https://pt.wikipedia.org/wiki/Batalha_de_Stalingrado");
  createMarker("#f44336", -157.94031607255053, 21.349201007316818, "Ataque a Pearl Harbor", "https://68c981fc0967fd40109825fb--preeminent-piroshki-aa4620.netlify.app/");
  createMarker("#ff5722", 141.324444, 24.780278, "Batalha de Iwo Jima e Okinawa", "https://68c9812f58960d3d6b3057e9--stupendous-melba-cc7d73.netlify.app/");
  createMarker("#3f51b5", 2.332946, 48.848120, "Batalha da França (Paris)", "https://batalhadafranca.netlify.app/");
  createMarker("#3f51b5", 2.327303, 51.042917, "Batalha da França (Dunquerque)", "https://batalhadafranca.netlify.app/");
  createMarker("#8d6e63", 160.1886, -9.6172, "Batalha de Guadalcanal", "https://batalha-guadalcanal.netlify.app/");
  createMarker("#0288d1", -177.3500, 28.2075, "Batalha de Midway", "https://batalha-midway.netlify.app/");
  createMarker("#455a64", 30.3192, 59.9303, "Cerco de Leningrado", "https://ocercodeleningrado.netlify.app/#home");
  createMarker("#ffb300", -0.8312, 49.4144, "Overlord Normandia (referência)", "https://overlord-marketgarden.netlify.app/");
  createMarker("#ffb300", -0.9390, 49.4141, "Overlord Praia de Utah", "https://overlord-marketgarden.netlify.app/");
  createMarker("#ffb300", -0.8868, 49.3764, "Overlord Praia de Omaha", "https://overlord-marketgarden.netlify.app/");
  createMarker("#ffb300", -0.5586, 49.3417, "Overlord Praia de Gold", "https://overlord-marketgarden.netlify.app/");
  createMarker("#ffb300", -0.4597, 49.3389, "Overlord Praia de Juno", "https://overlord-marketgarden.netlify.app/");
  createMarker("#ffb300", -0.2740, 49.2870, "Overlord Praia de Sword", "https://overlord-marketgarden.netlify.app/");
  createMarker("#43a047", 5.4697, 51.4416, "Market Garden Eindhoven", "https://overlord-marketgarden.netlify.app/");
  createMarker("#43a047", 5.8526, 51.8420, "Market Garden Nijmegen", "https://overlord-marketgarden.netlify.app/");
  createMarker("#212121", 13.3889, 52.5167, "Queda de Berlim", "https://quedadeberlim.netlify.app/");
  createMarker("#b71c1c", 19.174583, 50.037472, "Holocausto e Arte na Guerra", "https://holocausto-arte-guerra.netlify.app/");
  createMarker("#388e3c", 10.954222, 44.221806, "Brasil na 2ª Guerra", "https://febsegundaguerra.netlify.app/");
  createMarker("#388e3c", 10.94583, 44.26944, "Brasil na 2ª Guerra", "https://febsegundaguerra.netlify.app/");
  createMarker("#388e3c", 10.333, 43.867, "Brasil na 2ª Guerra", "https://febsegundaguerra.netlify.app/");
  createMarker("#388e3c", 10.300, 43.933, "Brasil na 2ª Guerra", "https://febsegundaguerra.netlify.app/");
  createMarker("#388e3c", 10.405556, 44.121944, "Brasil na 2ª Guerra", "https://febsegundaguerra.netlify.app/");
  createMarker("#388e3c", 10.833, 44.350, "Brasil na 2ª Guerra", "https://febsegundaguerra.netlify.app/");
  createMarker("#388e3c", 10.100, 44.683, "Brasil na 2ª Guerra", "https://febsegundaguerra.netlify.app/");

  // Preenche o menu suspenso de sites/eventos
  const siteJumpSelect = document.getElementById('siteJumpSelect');
  // Remove todas as opções exceto o placeholder
  while (siteJumpSelect.options.length > 1) siteJumpSelect.remove(1);
  siteList.forEach((site, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = site.title;
    opt.disabled = false;
    siteJumpSelect.appendChild(opt);
  });

  // Ao selecionar um evento/site, centraliza e faz zoom
  siteJumpSelect.onchange = function() {
    if (this.value !== "") {
      const site = siteList[Number(this.value)];
      map.flyTo({ center: [site.lng, site.lat], zoom: 6, speed: 1.2 });
      // Volta para o placeholder
      this.selectedIndex = 0;
    }
  };
});
