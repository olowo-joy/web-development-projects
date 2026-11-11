// ===============================
// app.js (Weather + News + Jokes)
// ===============================

function $(sel) { return document.querySelector(sel); }
function escapeHtml(str){
  return str.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ================= WEATHER =================
const weatherDescriptions = {
  0: "☀️ Clear sky",
  1: "🌤 Mainly clear",
  2: "⛅ Partly cloudy",
  3: "☁️ Overcast",
  45: "🌫 Fog",
  48: "🌫 Rime fog",
  51: "🌦 Light drizzle",
  53: "🌦 Moderate drizzle",
  55: "🌧 Heavy drizzle",
  61: "🌧 Slight rain",
  63: "🌧 Moderate rain",
  65: "🌧 Heavy rain",
  71: "❄️ Light snow",
  73: "❄️ Moderate snow",
  75: "❄️ Heavy snow",
  80: "🌦 Showers (slight)",
  81: "🌦 Showers (moderate)",
  82: "🌧 Showers (violent)",
  95: "⛈ Thunderstorm",
  96: "⛈ Thunderstorm + hail",
  99: "⛈ Severe thunderstorm + hail"
};

async function fetchWeather(city){
  const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
  const geoData = await geoRes.json();
  if (!geoData.length) throw new Error("City not found");
  const { lat, lon, display_name } = geoData[0];

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch failed");
  const data = await res.json();
  data.location_name = display_name;
  return data;
}

function renderWeather(data){
  if (!data.current_weather) return `<p>No forecast available.</p>`;
  const w = data.current_weather;
  const description = weatherDescriptions[w.weathercode] || `Code ${w.weathercode}`;
  return `
    <h2>📍 ${escapeHtml(data.location_name)}</h2>
    <p>${description}</p>
    <p>🌡 Temp: ${w.temperature}°F</p>
    <p>💨 Wind: ${w.windspeed} mph</p>
  `;
}

function initWeather(){
  const form = $('#weather-form');
  const box = $('#forecast-output');
  if (!form || !box) return;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const city = $('#city-input').value.trim();
    if (!city){ box.innerHTML = 'Enter a city.'; return; }
    box.innerHTML = 'Loading... ⏳';
    try{
      const data = await fetchWeather(city);
      box.innerHTML = renderWeather(data);
    }catch(err){
      box.innerHTML = '❌ Error loading weather.';
    }
  });
}

function initQuickWeather(){
  const form = $('#quick-weather-form');
  const box = $('#quick-weather-output');
  if (!form || !box) return;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const city = $('#quick-city').value.trim();
    if (!city){ box.innerHTML = 'Enter a city.'; return; }
    box.innerHTML = 'Loading... ⏳';
    try{
      const data = await fetchWeather(city);
      box.innerHTML = renderWeather(data);
    }catch(err){
      box.innerHTML = '❌ Error loading weather.';
    }
  });
}

// ================= NEWS =================
// Using Spaceflight News API (no key required)
async function fetchHeadlines(){
  const url = "https://api.spaceflightnewsapi.net/v4/articles/?limit=10";
  const res = await fetch(url);
  if (!res.ok) throw new Error("News fetch failed");
  const data = await res.json();
  return data.results || [];
}

function renderNewsList(list){
  return list.map(a => {
    const date = new Date(a.published_at).toLocaleDateString();
    return `
      <article class="news-card">
        <h3>📰 ${escapeHtml(a.title)}</h3>
        <p>${escapeHtml(a.summary || "No description")}</p>
        <p class="small">📅 ${date}</p>
        <a href="${a.url}" target="_blank">🔗 Read more</a>
      </article>
    `;
  }).join('');
}

async function initNews(){
  const box = $('#news-results') || $('#news-preview');
  if (!box) return;
  box.innerHTML = 'Loading headlines... ⏳';
  try{
    const items = await fetchHeadlines();
    box.innerHTML = renderNewsList(items);
  }catch(err){
    box.innerHTML = '❌ Error loading news.';
    console.error(err);
  }
}

// ================= JOKES =================
async function fetchJoke(){
  const url = 'https://official-joke-api.appspot.com/random_joke';
  const res = await fetch(url);
  if(!res.ok) throw new Error('Joke API failed');
  return await res.json();
}

function initJokes(){
  const box = $('#joke-box');
  const btn = $('#new-joke');
  if (!box || !btn) return;
  async function loadJoke(){
    box.innerHTML = 'Loading... ⏳';
    try{
      const j = await fetchJoke();
      box.innerHTML = `😂 ${escapeHtml(j.setup)}<br><strong>${escapeHtml(j.punchline)}</strong>`;
    }catch(err){
      box.innerHTML = '❌ Error loading joke.';
    }
  }
  btn.addEventListener('click', loadJoke);
  loadJoke();
}

// ================= INIT =================
document.addEventListener('DOMContentLoaded', ()=>{
  initWeather();
  initQuickWeather();
  initNews();
  initJokes();
});
