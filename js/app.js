/* ==========================================================================
   KALĀ-KSHETRA | Main Application Logic & Interactivity (Leaflet + Web APIs)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Application State Variables
    let map;
    let markersLayerGroup;
    let currentTileLayer;
    let activeLocation = null;
    let isNarrationPlaying = false;
    let speechUtterance = null;
    
    // Audio Soundscape State
    let audioCtx = null;
    let soundscapeOscillators = [];
    let isSoundscapeActive = false;

    // DIY Canvas State
    let canvas, ctx;
    let isDrawing = false;
    let currentColor = '#FFFFFF';
    let currentBrushSize = 3;
    let canvasBg = 'warli';

    // Quiz State
    let currentQuizIndex = 0;
    let quizScore = 0;

    // Tile Layer Configurations
    const tileLayers = {
        dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }),
        parchment: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            maxZoom: 19
        }),
        osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }),
        satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            maxZoom: 18
        })
    };

    // Initialize Application
    initMap();
    renderLocationCards(INDIAN_ART_DATA);
    setupEventListeners();
    initDIYCanvas();
    populateSyllabusTable();

    /* ==========================================================================
       1. Map Setup & Marker Rendering
       ========================================================================== */
    function initMap() {
        // Center of India coordinates
        map = L.map('map', {
            center: [22.5937, 78.9629],
            zoom: 5,
            zoomControl: false
        });

        // Add default satellite layer
        currentTileLayer = tileLayers.satellite;
        currentTileLayer.addTo(map);

        // Position zoom control at top-right
        L.control.zoom({ position: 'topright' }).addTo(map);

        markersLayerGroup = L.layerGroup().addTo(map);

        // Render markers for main art data + bonus sites
        renderMarkers(INDIAN_ART_DATA);
    }

    function getCategoryColor(category) {
        switch (category) {
            case 'mural': return '#3498DB';
            case 'sculpture': return '#E67E22';
            case 'miniature': return '#F1C40F';
            case 'folk': return '#E74C3C';
            default: return '#D4AF37';
        }
    }

    function getCategoryIcon(category) {
        switch (category) {
            case 'mural': return 'fa-brush';
            case 'sculpture': return 'fa-monument';
            case 'miniature': return 'fa-gem';
            case 'folk': return 'fa-hands-holding-circle';
            default: return 'fa-palette';
        }
    }

    function renderMarkers(locations) {
        markersLayerGroup.clearLayers();

        locations.forEach(loc => {
            const catColor = getCategoryColor(loc.category);
            const iconClass = getCategoryIcon(loc.category);

            // Custom Leaflet DivIcon
            const customIcon = L.divIcon({
                className: 'custom-art-marker',
                html: `
                    <div class="art-marker-pin" style="--marker-glow-color: ${catColor}; border-color: ${catColor};" title="${loc.name}">
                        <i class="fa-solid ${iconClass}" style="color: ${catColor};"></i>
                        <span class="art-marker-label">${loc.name}</span>
                    </div>
                `,
                iconSize: [44, 44],
                iconAnchor: [22, 22]
            });

            const marker = L.marker([loc.lat, loc.lng], { icon: customIcon });

            // Popup HTML
            const popupContent = `
                <div class="popup-card">
                    <img class="popup-img" src="${loc.img}" alt="${loc.name}">
                    <div class="popup-body">
                        <h4>${loc.name}</h4>
                        <p>${loc.state} &bull; ${loc.categoryLabel}</p>
                        <button class="popup-btn" onclick="openDrawerForLocation('${loc.id}')">
                            <i class="fa-solid fa-eye"></i> Explore Art Details
                        </button>
                    </div>
                </div>
            `;

            marker.bindPopup(popupContent, { maxWidth: 240 });

            // Click event -> Fly to & open drawer
            marker.on('click', () => {
                map.flyTo([loc.lat, loc.lng], 8, { duration: 1.2 });
                openDrawer(loc);
            });

            markersLayerGroup.addLayer(marker);
        });
    }

    /* ==========================================================================
       2. Location Cards List & Filtering
       ========================================================================== */
    function renderLocationCards(locations) {
        const container = document.getElementById('location-cards-list');
        container.innerHTML = '';

        locations.forEach(loc => {
            const catColor = getCategoryColor(loc.category);
            const card = document.createElement('div');
            card.className = 'location-card-item';
            card.innerHTML = `
                <img class="location-card-thumb" src="${loc.img}" alt="${loc.name}">
                <div class="location-card-meta">
                    <h4>${loc.name}</h4>
                    <p>${loc.state}</p>
                    <span class="tag" style="background: ${catColor}22; color: ${catColor}; border: 1px solid ${catColor}44;">
                        ${loc.categoryLabel}
                    </span>
                </div>
            `;

            card.addEventListener('click', () => {
                map.flyTo([loc.lat, loc.lng], 8, { duration: 1.2 });
                openDrawer(loc);
            });

            container.appendChild(card);
        });

        // Update count badge
        document.getElementById('count-all').textContent = locations.length;
    }

    function filterLocations(category) {
        if (category === 'all') {
            renderMarkers(INDIAN_ART_DATA);
            renderLocationCards(INDIAN_ART_DATA);
            map.flyTo([22.5937, 78.9629], 5);
        } else {
            const filtered = INDIAN_ART_DATA.filter(loc => loc.category === category);
            renderMarkers(filtered);
            renderLocationCards(filtered);

            if (filtered.length > 0) {
                const group = L.featureGroup(filtered.map(l => L.marker([l.lat, l.lng])));
                map.fitBounds(group.getBounds().pad(0.3));
            }
        }
    }

    /* ==========================================================================
       3. Slide-in Glass Drawer Details & Audio Narration
       ========================================================================== */
    window.openDrawerForLocation = function(locationId) {
        const loc = INDIAN_ART_DATA.find(item => item.id === locationId);
        if (loc) {
            openDrawer(loc);
        }
    };

    function openDrawer(loc) {
        activeLocation = loc;

        document.getElementById('drawer-img').src = loc.img;
        document.getElementById('drawer-title').textContent = loc.name;
        document.getElementById('drawer-location-sub').textContent = `${loc.location}, ${loc.state}`;

        const badge = document.getElementById('drawer-category-badge');
        badge.textContent = loc.categoryLabel;
        badge.style.background = getCategoryColor(loc.category);

        // Metadata
        document.getElementById('meta-era').textContent = loc.period || 'Ancient Era';
        document.getElementById('meta-dynasty').textContent = loc.dynasty || 'Heritage Dynasty';
        document.getElementById('meta-medium').textContent = loc.medium || 'Traditional Pigments';
        document.getElementById('meta-state').textContent = loc.state;

        // Content
        document.getElementById('drawer-description').textContent = loc.description;
        document.getElementById('drawer-history-text').textContent = loc.history;
        document.getElementById('drawer-quote').textContent = `"${loc.quote}"`;
        document.getElementById('drawer-quote-source').textContent = `— ${loc.quoteSource}`;
        document.getElementById('drawer-technique-text').textContent = loc.technique;

        // Motifs List
        const motifsUl = document.getElementById('drawer-motifs-list');
        motifsUl.innerHTML = '';
        loc.motifs.forEach(motif => {
            const li = document.createElement('li');
            li.textContent = motif;
            motifsUl.appendChild(li);
        });

        // Palette Chips
        const paletteContainer = document.getElementById('drawer-palette-chips');
        paletteContainer.innerHTML = '';
        if (loc.palette) {
            loc.palette.forEach(colorHex => {
                const chip = document.createElement('div');
                chip.className = 'palette-chip';
                chip.style.backgroundColor = colorHex;
                chip.title = `Color: ${colorHex}`;
                paletteContainer.appendChild(chip);
            });
        }

        // Gallery
        const galleryGrid = document.getElementById('drawer-gallery-grid');
        galleryGrid.innerHTML = '';
        loc.gallery.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="gallery-item-title">${item.title}</div>
            `;
            galleryGrid.appendChild(div);
        });

        // Reset Tab to Overview
        switchDrawerTab('tab-overview');

        // Stop any running speech narration
        stopSpeechNarration();

        // Show Drawer
        document.getElementById('detail-drawer').classList.add('open');
    }

    function closeDrawer() {
        document.getElementById('detail-drawer').classList.remove('open');
        stopSpeechNarration();
    }

    function switchDrawerTab(tabId) {
        document.querySelectorAll('.drawer-tab').forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-tab') === tabId);
        });
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.toggle('active', panel.id === tabId);
        });
    }

    // Audio Speech Narration (Web Speech Synth)
    function playSpeechNarration() {
        if (!activeLocation || !activeLocation.narration) return;
        
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop existing

            speechUtterance = new SpeechSynthesisUtterance(activeLocation.narration);
            speechUtterance.rate = 0.92;
            speechUtterance.pitch = 1.0;

            speechUtterance.onstart = () => {
                isNarrationPlaying = true;
                document.getElementById('play-narration-btn').style.display = 'none';
                document.getElementById('stop-narration-btn').style.display = 'flex';
                document.getElementById('narrator-status').textContent = 'Playing audio commentary...';
            };

            speechUtterance.onend = () => {
                stopSpeechNarration();
            };

            speechUtterance.onerror = () => {
                stopSpeechNarration();
            };

            window.speechSynthesis.speak(speechUtterance);
        } else {
            alert('Speech Synthesis API is not supported in this browser.');
        }
    }

    function stopSpeechNarration() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        isNarrationPlaying = false;
        document.getElementById('play-narration-btn').style.display = 'flex';
        document.getElementById('stop-narration-btn').style.display = 'none';
        document.getElementById('narrator-status').textContent = 'Listen to historical breakdown';
    }

    /* ==========================================================================
       4. Web Audio Synthesizer (Indian Classical Drone Ambiance)
       ========================================================================== */
    function toggleAmbientSoundscape() {
        if (isSoundscapeActive) {
            stopAmbientSoundscape();
        } else {
            startAmbientSoundscape();
        }
    }

    function startAmbientSoundscape() {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();

            // Tanpura drone harmonic frequencies (C# drone: ~138.59 Hz, 277.18 Hz, 415.77 Hz)
            const frequencies = [138.59, 207.65, 277.18, 415.77];
            soundscapeOscillators = [];

            const masterGain = audioCtx.createGain();
            masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            masterGain.connect(audioCtx.destination);

            frequencies.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();

                osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

                // Gentle LFO swell
                const lfo = audioCtx.createOscillator();
                lfo.frequency.value = 0.2 + (idx * 0.1); // Slow breathing cycle
                const lfoGain = audioCtx.createGain();
                lfoGain.gain.value = 0.03;

                lfo.connect(lfoGain);
                lfoGain.connect(gain.gain);

                gain.gain.setValueAtTime(0.04, audioCtx.currentTime);

                osc.connect(gain);
                gain.connect(masterGain);

                osc.start();
                lfo.start();

                soundscapeOscillators.push(osc, lfo);
            });

            isSoundscapeActive = true;
            document.querySelector('.sound-wave-indicator').classList.add('active');
            document.getElementById('soundscape-btn').style.borderColor = '#2ECC71';
        } catch (e) {
            console.warn('Web Audio API not allowed or supported', e);
        }
    }

    function stopAmbientSoundscape() {
        if (soundscapeOscillators.length > 0) {
            soundscapeOscillators.forEach(osc => {
                try { osc.stop(); } catch(e) {}
            });
            soundscapeOscillators = [];
        }
        if (audioCtx) {
            try { audioCtx.close(); } catch(e) {}
            audioCtx = null;
        }
        isSoundscapeActive = false;
        document.querySelector('.sound-wave-indicator').classList.remove('active');
        document.getElementById('soundscape-btn').style.borderColor = 'var(--border-glass)';
    }

    /* ==========================================================================
       5. DIY Canvas Studio Logic (Warli/Madhubani Drawing Pad)
       ========================================================================== */
    function initDIYCanvas() {
        canvas = document.getElementById('art-canvas');
        ctx = canvas.getContext('2d');

        updateCanvasBackground('warli');

        // Canvas Drawing Listeners
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);

        // Touch support for tablets/mobile
        canvas.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });

        canvas.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });

        canvas.addEventListener('touchend', () => {
            const mouseEvent = new MouseEvent('mouseup', {});
            canvas.dispatchEvent(mouseEvent);
        });
    }

    function updateCanvasBackground(preset) {
        canvasBg = preset;
        switch (preset) {
            case 'warli':
                canvas.style.backgroundColor = '#792A1B'; // Terracotta Mud
                currentColor = '#FFFFFF';
                break;
            case 'madhubani':
                canvas.style.backgroundColor = '#F5EE38'; // Haldi Yellow Paper
                currentColor = '#17202A';
                break;
            case 'tanjore':
                canvas.style.backgroundColor = '#881B1B'; // Deep Crimson
                currentColor = '#D4AC0D';
                break;
            case 'parchment':
                canvas.style.backgroundColor = '#EAECEE'; // Antique Paper
                currentColor = '#1B4F72';
                break;
        }

        // Highlight active swatch matching current color
        document.querySelectorAll('.color-swatch').forEach(sw => {
            sw.classList.toggle('active', sw.getAttribute('data-color') === currentColor);
        });
    }

    function getCanvasCoords(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * (canvas.width / rect.width),
            y: (e.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    function startDrawing(e) {
        isDrawing = true;
        const coords = getCanvasCoords(e);
        ctx.beginPath();
        ctx.moveTo(coords.x, coords.y);
    }

    function draw(e) {
        if (!isDrawing) return;
        const coords = getCanvasCoords(e);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentBrushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
    }

    function stopDrawing() {
        if (isDrawing) {
            ctx.closePath();
            isDrawing = false;
        }
    }

    function stampStencil(stencilType) {
        const x = canvas.width / 2;
        const y = canvas.height / 2;

        ctx.strokeStyle = currentColor;
        ctx.fillStyle = currentColor;
        ctx.lineWidth = currentBrushSize;

        if (stencilType === 'warli-dancer') {
            // Draw Warli stick figure torso (two triangles)
            ctx.beginPath();
            ctx.moveTo(x, y - 20);
            ctx.lineTo(x - 15, y + 10);
            ctx.lineTo(x + 15, y + 10);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x, y + 40);
            ctx.lineTo(x - 15, y + 10);
            ctx.lineTo(x + 15, y + 10);
            ctx.closePath();
            ctx.stroke();

            // Head
            ctx.beginPath();
            ctx.arc(x, y - 30, 8, 0, Math.PI * 2);
            ctx.fill();

            // Arms & Legs
            ctx.beginPath();
            ctx.moveTo(x - 12, y - 5);
            ctx.lineTo(x - 30, y - 20);
            ctx.moveTo(x + 12, y - 5);
            ctx.lineTo(x + 30, y - 20);
            ctx.moveTo(x - 8, y + 35);
            ctx.lineTo(x - 20, y + 60);
            ctx.moveTo(x + 8, y + 35);
            ctx.lineTo(x + 20, y + 60);
            ctx.stroke();

        } else if (stencilType === 'lotus') {
            // Sacred Lotus petals
            for (let i = 0; i < 8; i++) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate((i * Math.PI) / 4);
                ctx.beginPath();
                ctx.ellipse(0, -30, 12, 30, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }
            ctx.beginPath();
            ctx.arc(x, y, 14, 0, Math.PI * 2);
            ctx.fill();

        } else if (stencilType === 'sun') {
            // Solar motif with rays
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2);
            ctx.stroke();

            for (let i = 0; i < 12; i++) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate((i * Math.PI) / 6);
                ctx.beginPath();
                ctx.moveTo(0, -28);
                ctx.lineTo(0, -45);
                ctx.stroke();
                ctx.restore();
            }
        } else if (stencilType === 'peacock') {
            // Madhubani Peacock outline
            ctx.beginPath();
            ctx.arc(x, y - 20, 16, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x + 10, y + 20, 30, 0, Math.PI);
            ctx.stroke();
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function downloadCanvas() {
        const link = document.createElement('a');
        link.download = 'kala-kshetra-artwork.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    /* ==========================================================================
       6. Art History Quiz System
       ========================================================================== */
    function startQuiz() {
        currentQuizIndex = 0;
        quizScore = 0;

        document.getElementById('quiz-intro').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'none';
        document.getElementById('quiz-questions-wrapper').style.display = 'block';

        renderQuizQuestion();
    }

    function renderQuizQuestion() {
        const q = ART_QUIZ_QUESTIONS[currentQuizIndex];

        document.getElementById('quiz-question-counter').textContent = `Question ${currentQuizIndex + 1} of ${ART_QUIZ_QUESTIONS.length}`;
        document.getElementById('quiz-score-display').textContent = `Score: ${quizScore}`;
        document.getElementById('quiz-progress-fill').style.width = `${((currentQuizIndex + 1) / ART_QUIZ_QUESTIONS.length) * 100}%`;

        document.getElementById('quiz-question-text').textContent = q.question;

        const optionsGrid = document.getElementById('quiz-options-grid');
        optionsGrid.innerHTML = '';

        document.getElementById('quiz-explanation-box').style.display = 'none';
        document.getElementById('quiz-next-btn').style.display = 'none';

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.textContent = `${String.fromCharCode(65 + idx)}. ${opt}`;

            btn.addEventListener('click', () => handleQuizAnswer(idx, btn));
            optionsGrid.appendChild(btn);
        });
    }

    function handleQuizAnswer(selectedIndex, selectedBtn) {
        const q = ART_QUIZ_QUESTIONS[currentQuizIndex];
        const allBtns = document.querySelectorAll('.quiz-option-btn');

        // Disable all buttons
        allBtns.forEach(btn => btn.style.pointerEvents = 'none');

        if (selectedIndex === q.correct) {
            selectedBtn.classList.add('correct');
            quizScore += 20;
        } else {
            selectedBtn.classList.add('wrong');
            allBtns[q.correct].classList.add('correct');
        }

        // Show explanation
        const expBox = document.getElementById('quiz-explanation-box');
        expBox.innerHTML = `<strong><i class="fa-solid fa-circle-info"></i> Insight:</strong> ${q.explanation}`;
        expBox.style.display = 'block';

        document.getElementById('quiz-next-btn').style.display = 'inline-flex';
    }

    function nextQuizQuestion() {
        currentQuizIndex++;
        if (currentQuizIndex < ART_QUIZ_QUESTIONS.length) {
            renderQuizQuestion();
        } else {
            showQuizResults();
        }
    }

    function showQuizResults() {
        document.getElementById('quiz-questions-wrapper').style.display = 'none';
        const resultsBox = document.getElementById('quiz-results');
        resultsBox.style.display = 'block';

        document.getElementById('quiz-final-score-text').textContent = `You scored ${quizScore} out of 100 points!`;

        let badge = 'Art Explorer of Bharat';
        if (quizScore === 100) {
            badge = '🏆 Master Curator of Indian Heritage';
        } else if (quizScore >= 60) {
            badge = '🥇 Scholar of Ancient Bharat Art';
        }
        document.getElementById('quiz-badge-earned').textContent = badge;
    }

    /* ==========================================================================
       7. Syllabus Checklist & Search Handling
       ========================================================================== */
    function populateSyllabusTable() {
        const tbody = document.getElementById('syllabus-table-body');
        tbody.innerHTML = '';

        INDIAN_ART_DATA.forEach(loc => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><i class="fa-solid fa-circle-check check-icon"></i></td>
                <td><strong>${loc.name}</strong></td>
                <td>${loc.categoryLabel}</td>
                <td>${loc.state}</td>
                <td>${loc.motifs[0]}</td>
                <td>
                    <button class="table-view-btn" onclick="openDrawerForLocation('${loc.id}')">
                        <i class="fa-solid fa-eye"></i> View
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    function handleSearch(query) {
        const q = query.trim().toLowerCase();
        const suggestionsBox = document.getElementById('search-suggestions');

        if (!q) {
            suggestionsBox.style.display = 'none';
            document.getElementById('clear-search').style.display = 'none';
            return;
        }

        document.getElementById('clear-search').style.display = 'block';

        const matches = INDIAN_ART_DATA.filter(loc => 
            loc.name.toLowerCase().includes(q) ||
            loc.state.toLowerCase().includes(q) ||
            loc.categoryLabel.toLowerCase().includes(q) ||
            loc.motifs.some(m => m.toLowerCase().includes(q))
        );

        if (matches.length > 0) {
            suggestionsBox.innerHTML = '';
            matches.forEach(loc => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.innerHTML = `
                    <i class="fa-solid fa-location-dot"></i>
                    <div>
                        <strong>${loc.name}</strong>
                        <small style="display:block; color:var(--text-secondary);">${loc.state} &bull; ${loc.categoryLabel}</small>
                    </div>
                `;
                item.addEventListener('click', () => {
                    map.flyTo([loc.lat, loc.lng], 8, { duration: 1.2 });
                    openDrawer(loc);
                    suggestionsBox.style.display = 'none';
                    document.getElementById('map-search').value = loc.name;
                });
                suggestionsBox.appendChild(item);
            });
            suggestionsBox.style.display = 'block';
        } else {
            suggestionsBox.style.display = 'none';
        }
    }

    /* ==========================================================================
       8. Global Event Listeners Registration
       ========================================================================== */
    function setupEventListeners() {
        // Search Input
        const searchInput = document.getElementById('map-search');
        searchInput.addEventListener('input', (e) => handleSearch(e.target.value));

        document.getElementById('clear-search').addEventListener('click', () => {
            searchInput.value = '';
            handleSearch('');
        });

        // Category Filter Pills
        document.getElementById('category-filters').addEventListener('click', (e) => {
            const pill = e.target.closest('.filter-pill');
            if (!pill) return;

            document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const category = pill.getAttribute('data-category');
            filterLocations(category);
        });

        // Map Canvas Style Selector
        document.querySelectorAll('.layer-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.layer-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const layerKey = btn.getAttribute('data-layer');
                if (currentTileLayer) {
                    map.removeLayer(currentTileLayer);
                }
                currentTileLayer = tileLayers[layerKey] || tileLayers.dark;
                currentTileLayer.addTo(map);
            });
        });

        // Guided Art Trails
        document.querySelectorAll('.trail-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const trailType = btn.getAttribute('data-trail');
                if (trailType === 'grand-tour') {
                    filterLocations('all');
                } else if (trailType === 'tribal-trail') {
                    filterLocations('folk');
                } else if (trailType === 'royal-sculptures') {
                    filterLocations('sculpture');
                }
            });
        });

        // Drawer Event Listeners
        document.getElementById('close-drawer').addEventListener('click', closeDrawer);

        document.querySelectorAll('.drawer-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                switchDrawerTab(tabId);
            });
        });

        document.getElementById('play-narration-btn').addEventListener('click', playSpeechNarration);
        document.getElementById('stop-narration-btn').addEventListener('click', stopSpeechNarration);

        document.getElementById('launch-canvas-for-site').addEventListener('click', () => {
            closeDrawer();
            document.getElementById('studio-modal').classList.add('open');
            if (activeLocation && activeLocation.id === 'warli') {
                updateCanvasBackground('warli');
            } else if (activeLocation && activeLocation.id === 'madhubani') {
                updateCanvasBackground('madhubani');
            } else if (activeLocation && activeLocation.id === 'thanjavur') {
                updateCanvasBackground('tanjore');
            }
        });

        // Header Buttons & Modals
        document.getElementById('soundscape-btn').addEventListener('click', toggleAmbientSoundscape);

        document.getElementById('studio-btn').addEventListener('click', () => {
            document.getElementById('studio-modal').classList.add('open');
        });
        document.getElementById('close-studio').addEventListener('click', () => {
            document.getElementById('studio-modal').classList.remove('open');
        });

        document.getElementById('quiz-btn').addEventListener('click', () => {
            document.getElementById('quiz-modal').classList.add('open');
            startQuiz();
        });
        document.getElementById('close-quiz').addEventListener('click', () => {
            document.getElementById('quiz-modal').classList.remove('open');
        });

        document.getElementById('syllabus-btn').addEventListener('click', () => {
            document.getElementById('syllabus-modal').classList.add('open');
        });
        document.getElementById('close-syllabus').addEventListener('click', () => {
            document.getElementById('syllabus-modal').classList.remove('open');
        });

        // DIY Studio Toolbar Listeners
        document.getElementById('canvas-preset-select').addEventListener('change', (e) => {
            updateCanvasBackground(e.target.value);
        });

        document.getElementById('studio-color-picker').addEventListener('click', (e) => {
            const swatch = e.target.closest('.color-swatch');
            if (!swatch) return;
            document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            currentColor = swatch.getAttribute('data-color');
        });

        document.getElementById('brush-size').addEventListener('input', (e) => {
            currentBrushSize = e.target.value;
            document.getElementById('brush-size-val').textContent = `${currentBrushSize}px`;
        });

        document.querySelectorAll('.stencil-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                stampStencil(btn.getAttribute('data-stencil'));
            });
        });

        document.getElementById('clear-canvas-btn').addEventListener('click', clearCanvas);
        document.getElementById('download-canvas-btn').addEventListener('click', downloadCanvas);

        // Quiz Buttons
        document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
        document.getElementById('quiz-next-btn').addEventListener('click', nextQuizQuestion);
        document.getElementById('restart-quiz-btn').addEventListener('click', startQuiz);

        // Toggle Legend
        document.getElementById('toggle-legend-btn').addEventListener('click', () => {
            const legendBody = document.getElementById('legend-body');
            const isHidden = legendBody.style.display === 'none';
            legendBody.style.display = isHidden ? 'flex' : 'none';
        });
    }
});
