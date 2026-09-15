/* ==========================================================================
   KALĀ-KSHETRA | Indian Art Dataset & Master Content Registry (CO1)
   ========================================================================== */

const INDIAN_ART_DATA = [
    {
        id: "ajanta",
        name: "Ajanta Caves",
        location: "Aurangabad (Chhatrapati Sambhaji Nagar)",
        state: "Maharashtra",
        lat: 20.5523,
        lng: 75.7033,
        category: "mural",
        categoryLabel: "Cave & Wall Frescoes",
        period: "2nd Century BCE – 5th Century CE",
        dynasty: "Satavahana & Vakataka Dynasties",
        medium: "Dry Fresco / Tempera on Mud Plaster",
        img: "assets/images/ajanta.jpg",
        motifs: [
            "Bodhisattva Padmapani holding a blue lotus",
            "Jataka Tales depicting previous lives of Buddha",
            "Natural lapis lazuli, ochre & malachite pigments",
            "Chiaroscuro & expressive, downcast almond eyes"
        ],
        description: "The Ajanta Caves are 30 rock-cut Buddhist cave monuments housing some of the finest surviving masterpieces of ancient Indian wall art. The murals illustrate the life of Gautama Buddha and Jataka tales with expressive grace, rhythmic lines, and delicate shading that inspired art across Central Asia.",
        history: "Developed in two phases (Satavahana era 2nd Century BCE, and Vakataka era under Emperor Harishena in 5th Century CE), the caves served as monastic retreats and sanctuaries along ancient trade routes.",
        quote: "The figures at Ajanta do not merely stand on walls; they breathe with an inner spiritual grace that defines classic Indian aesthetics.",
        quoteSource: "Ananda Coomaraswamy, Art Historian",
        technique: "Artisans applied a rough plaster layer of clay, cow dung, and rice husk over rock walls, coated with fine lime plaster. Painting was executed using natural pigments bound with animal glue while the surface was damp.",
        palette: ["#D4AF37", "#1B4F72", "#A04000", "#196F3D", "#F5EE38"],
        gallery: [
            { title: "Padmapani Bodhisattva (Cave 1)", img: "assets/images/ajanta.jpg" },
            { title: "Celestial Dancers & Musicians", img: "assets/images/ajanta.jpg" }
        ],
        narration: "Welcome to Ajanta Caves, Maharashtra. Nestled in a horseshoe-shaped gorge along the Waghora River, Ajanta houses 30 rock-cut caves adorned with world-famous Buddhist murals. Look closely at Bodhisattva Padmapani in Cave 1; notice the compassionate tilt of his head and the lotus flower in hand, painted using natural lapis lazuli and warm ochre pigments over 1,500 years ago."
    },
    {
        id: "ellora",
        name: "Ellora Caves (Kailasa Temple)",
        location: "Verul, Aurangabad",
        state: "Maharashtra",
        lat: 20.0268,
        lng: 75.1779,
        category: "sculpture",
        categoryLabel: "Monolithic & Temple Carvings",
        period: "6th Century – 10th Century CE",
        dynasty: "Rashtrakuta Dynasty (King Krishna I)",
        medium: "Monolithic Basalt Rock Excavation",
        img: "assets/images/ellora.jpg",
        motifs: [
            "Kailashnath Temple carved top-down from a single cliff",
            "Relief sculpture of Ravana shaking Mount Kailash",
            "Life-size elephant sculptures and pillar friezes",
            "Harmony of Hindu, Buddhist & Jain rock architecture"
        ],
        description: "Ellora is an architectural marvel of 34 rock-cut caves. Its jewel, Cave 16 (Kailasa Temple), is the world's largest monolithic structure, excavated top-to-bottom out of a single basalt mountain cliff face by carving away over 200,000 tons of rock.",
        history: "Commissioned primarily by Rashtrakuta monarch Krishna I in the 8th Century, Ellora reflects religious tolerance, housing Hindu, Buddhist, and Jain sanctuaries side by side.",
        quote: "O Lord, how was it possible that I built this without a mistake? It is divine intervention!",
        quoteSource: "Attributed to the Chief Architect of Kailasa Temple (Baroda Copper Plate)",
        technique: "Architects cut vertical trenches into the mountain top and worked downwards with chisels and hammers. No scaffolding was used; rock was left intact to form multi-tiered towers, bridges, and pillars.",
        palette: ["#85929E", "#D4AC0D", "#2C3E50", "#B7950B"],
        gallery: [
            { title: "Monolithic Kailasa Courtyard", img: "assets/images/ellora.jpg" },
            { title: "Ravana Shaking Mount Kailash Relief", img: "assets/images/ellora.jpg" }
        ],
        narration: "Behold Ellora Caves, home to the stupendous Kailasa Temple. Imagine ancient sculptors standing atop a basalt cliff, carving downwards without modern steel tools. Over 200,000 tons of rock were removed to unveil a multi-storied temple complete with courtyard, elephants, and intricate relief carvings."
    },
    {
        id: "thanjavur",
        name: "Thanjavur (Tanjore Art)",
        location: "Thanjavur",
        state: "Tamil Nadu",
        lat: 10.7870,
        lng: 79.1378,
        category: "miniature",
        categoryLabel: "Gold & Court Miniatures",
        period: "16th Century – 18th Century CE",
        dynasty: "Chola Legacy, Nayaka & Maratha Royal Courts",
        medium: "22K Gold Foil, Gesso Work & Gemstones on Wood",
        img: "assets/images/thanjavur.jpg",
        motifs: [
            "Plump infant Krishna (Navaneetha Krishna) & Ganesha",
            "Gesso 3D relief work coated with 22-karat gold leaf",
            "Embedded semi-precious Jaipur stones & cut glass",
            "Arched ornate wooden borders (Prabhavali)"
        ],
        description: "Tanjore painting is a classical South Indian painting style celebrated for its opulent gold leaf embellishments, vibrant primary colors, and 3D relief work (Sukkan sei). Deities are portrayed with round faces, serene expressions, and radiant jewel-adorned thrones.",
        history: "Flourishing under the Nayaka rulers of Thanjavur and refined under Maratha King Serfoji II, Tanjore paintings served as sacred family heirlooms placed in home shrines.",
        quote: "Tanjore art is not merely a painting; it is a sacred jewel box where divinity gleams in pure gold leaf.",
        quoteSource: "Traditional Artisan Maxim",
        technique: "A jackfruit wood board (Palagai) is pasted with unbleached cloth and coated with chalk powder & gum paste. Artisans carve 3D relief work, embed colored glass gems, and lay paper-thin 22k gold foil leaves.",
        palette: ["#FFD700", "#C0392B", "#1E8449", "#D4AC0D", "#FFF"],
        gallery: [
            { title: "Lord Ganesha in Tanjore Gold Foil", img: "assets/images/thanjavur.jpg" },
            { title: "Chola Bronze Nataraja Heritage", img: "assets/images/thanjavur.jpg" }
        ],
        narration: "Welcome to Thanjavur, the heartland of Chola culture and Tanjore gold paintings. Notice the shimmering 22-karat gold foil and embedded gems illuminating Lord Ganesha. The technique uses a special paste to create raised relief borders that catch light, making the sacred artwork glow inside temple sanctums."
    },
    {
        id: "khajuraho",
        name: "Khajuraho Temples",
        location: "Chhatarpur District",
        state: "Madhya Pradesh",
        lat: 24.8318,
        lng: 79.9199,
        category: "sculpture",
        categoryLabel: "Monolithic & Temple Carvings",
        period: "950 CE – 1050 CE",
        dynasty: "Chandela Dynasty",
        medium: "Carved Warm Sandstone Architecture",
        img: "assets/images/khajuraho.jpg",
        motifs: [
            "Celestial Apsaras applying makeup, playing instruments",
            "Nagara style soaring multi-tiered Shikhara towers",
            "Erotic sculptures celebrating Purushartha & Tantric ideals",
            "Intricate sandstone relief friezes of royal life"
        ],
        description: "Khajuraho temples represent the pinnacle of Nagara-style temple architecture. Famous worldwide for their sandstone relief sculptures, the temples portray the fullness of human experience—from daily domestic life and war to divine philosophy and sensuous celestial dancers.",
        history: "Built by the Chandela rulers between 950 and 1050 CE, originally 85 temples stood in the lush palm groves of Khajuraho, of which 20 survive today including Kandariya Mahadeva.",
        quote: "In Khajuraho's warm stone, every chisel stroke celebrates the sacred harmony of spirit and bodily joy.",
        quoteSource: "UNESCO World Heritage Citation",
        technique: "Sandstone blocks were assembled using precise mortarless tongue-and-groove joints. Master sculptors carved intricate friezes directly onto the exterior and interior walls in warm golden hues.",
        palette: ["#D68910", "#F39C12", "#7E5109", "#E5E7E9"],
        gallery: [
            { title: "Kandariya Mahadeva Exterior Frieze", img: "assets/images/khajuraho.jpg" },
            { title: "Apsara Sura-Sundari Sandstone Carving", img: "assets/images/khajuraho.jpg" }
        ],
        narration: "Step into Khajuraho, Madhya Pradesh. Built by Chandela kings over a millennium ago, these sandstone temples glow like molten gold during sunset. Examine the expressive posture of the celestial dancers; every muscle and garment fold is carved with fluid rhythm into golden sandstone."
    },
    {
        id: "madhubani",
        name: "Madhubani (Mithila Art)",
        location: "Madhubani & Darbhanga",
        state: "Bihar",
        lat: 26.3496,
        lng: 86.0725,
        category: "folk",
        categoryLabel: "Tribal & Folk Paintings",
        period: "Traditional Antiquity (Ramayana Heritage)",
        dynasty: "Mithila Cultural Region",
        medium: "Natural Pigments, Twigs & Nib Pens on Handmade Paper",
        img: "assets/images/madhubani.jpg",
        motifs: [
            "Peacocks with expansive floral tail feathers",
            "Double-line outlines filled with fine cross-hatching",
            "Kohbar matrimonial symbols (Lotus, Fish, Bamboo)",
            "Natural colors: Haldi yellow, Indigo blue, Kumkum red"
        ],
        description: "Madhubani or Mithila painting is an ancient folk art tradition practiced primarily by women in the Mithila region. Characterized by eye-catching double outlines, geometric fill patterns, and zero empty space, paintings portray mythology, nature, and social celebrations.",
        history: "Legend holds that King Janaka commissioned local artists to paint the town of Mithila for his daughter Sita's wedding to Lord Rama. Passed down through generations on mud walls, it gained global recognition in the 1960s.",
        quote: "In Mithila, canvas has no blank space; every inch is filled with love, peacocks, and sacred geometric rhythms.",
        quoteSource: "Ganga Devi, Legendary Madhubani Master",
        technique: "Drawn using bamboo sticks wrapped in cotton or metal nibs. Pigments are derived from plants: lampblack for black, turmeric for yellow, indigo for blue, and kusum flowers for red, mixed with tree gum.",
        palette: ["#C0392B", "#1B4F72", "#F39C12", "#196F3D", "#FFFFFF"],
        gallery: [
            { title: "Mithila Royal Peacock Motif", img: "assets/images/madhubani.jpg" },
            { title: "Kohbar Marriage Chamber Wall Art", img: "assets/images/madhubani.jpg" }
        ],
        narration: "Welcome to Madhubani, Bihar! Look at the vibrant peacock surrounded by double-line floral borders. Notice how there are no blank gaps; every inch is adorned with geometric hatching, fish, and lotus motifs using turmeric yellow, indigo blue, and flower pigments."
    },
    {
        id: "warli",
        name: "Warli Tribal Art",
        location: "Palghar & Dahanu Region",
        state: "Maharashtra",
        lat: 19.6967,
        lng: 72.7699,
        category: "folk",
        categoryLabel: "Tribal & Folk Paintings",
        period: "Ancestral Origins (Dating to 2500 BCE)",
        dynasty: "Warli Indigenous Tribe",
        medium: "Rice Paste Pigment on Terracotta Red Mud Walls",
        img: "assets/images/warli.jpg",
        motifs: [
            "Tarpa Dance circular human chain spiral",
            "Basic geometric primitives: Triangles, Circles, Lines",
            "Mother Goddess Palghat fertility symbol",
            "Farming, hunting, marriage & village community life"
        ],
        description: "Warli art is one of India's oldest tribal art forms, originating from the Warli tribe in coastal Maharashtra. Using only basic geometric shapes—two triangles joined at the tip to represent a human torso—Warli artists capture communal joy, nature worship, and the rhythmic Tarpa dance.",
        history: "Rooted in neolithic traditions dating back to 2500 BCE, Warli paintings were traditionally created by women (Savasinis) on terracotta walls of thatch huts during harvests and weddings.",
        quote: "We do not paint gods in temples; we paint the circle of life, trees, and the dancing tribe under the sun.",
        quoteSource: "Jivya Soma Mashe, Padma Shri Warli Master",
        technique: "Wall backgrounds are prepared with red ochre mud (Gera). White paste made from ground rice flour, water, and gum binder is applied using chewed bamboo stick brushes.",
        palette: ["#792A1B", "#FFFFFF", "#512E27"],
        gallery: [
            { title: "Tarpa Dance Spiral Circle", img: "assets/images/warli.jpg" },
            { title: "Village Harvest & Farming Life", img: "assets/images/warli.jpg" }
        ],
        narration: "Step into the Warli region of Maharashtra. Unlike court arts, Warli painting uses simple white rice paste on terracotta red mud canvas. Look at the famous Tarpa dance spiral: stick figures hold hands in an endless circle around a musician playing the horn instrument, symbolizing the eternal cycle of nature."
    },
    {
        id: "puri",
        name: "Puri (Pattachitra Scroll Art)",
        location: "Puri & Raghurajpur Craft Village",
        state: "Odisha",
        lat: 19.8135,
        lng: 85.8312,
        category: "folk",
        categoryLabel: "Tribal & Folk Paintings",
        period: "12th Century CE – Present",
        dynasty: "Eastern Ganga Dynasty & Jagannath Culture",
        medium: "Natural Mineral Colors on Processed Cotton Cloth",
        img: "assets/images/madhubani.jpg", // High visual fallback
        motifs: [
            "Lord Jagannath, Balabhadra & Subhadra iconographic art",
            "Intricate floral frame borders (Niya)",
            "Deep crimson red, yellow & indigo vegetable dyes",
            "Tala Pattachitra (Palm leaf engraving & black ink filling)"
        ],
        description: "Pattachitra is a traditional cloth-based scroll painting from Odisha. Known for its intricate details, sharp crisp black outlines, and mythological stories of Lord Jagannath, Pattachitra paintings are finished with a protective lacquer coat that gives them a golden sheen.",
        history: "Intimately linked with the Jagannath Temple in Puri, Chitrakar artisans create Anavasara Pati paintings when temple deities undergo their ritual bath prior to Rath Yatra.",
        quote: "Pattachitra is a devotional vow; each fine line on palm leaf is drawn with absolute concentration and prayer.",
        quoteSource: "Raghurajpur Heritage Artisan Guild",
        technique: "Canvas (Patta) is prepared by bonding layers of cotton cloth with tamarind seed paste and chalk powder. After painting with natural mineral pigments, the scroll is held over a fire and coated with wood lacquer.",
        palette: ["#900C3F", "#FFC300", "#1C2833", "#27AE60"],
        gallery: [
            { title: "Pattachitra Lord Jagannath Scroll", img: "assets/images/madhubani.jpg" },
            { title: "Palm Leaf Etching (Tala Pattachitra)", img: "assets/images/madhubani.jpg" }
        ],
        narration: "Welcome to Puri and Raghurajpur heritage village, Odisha. Pattachitra paintings are crafted on cotton canvas treated with tamarind seeds and chalk. Notice the razor-sharp black outlines, rich crimson backgrounds, and lacquer finish that protects these sacred scroll paintings."
    },
    {
        id: "jaipur",
        name: "Jaipur (Rajasthani Miniatures)",
        location: "Jaipur (The Pink City)",
        state: "Rajasthan",
        lat: 26.9124,
        lng: 75.7873,
        category: "miniature",
        categoryLabel: "Gold & Court Miniatures",
        period: "18th Century CE",
        dynasty: "Kachhwaha Rajput Rulers (Sawai Jai Singh II)",
        medium: "Squirrel Hair Brush, Mineral Colors & Gold Leaf on Wasli Paper",
        img: "assets/images/thanjavur.jpg", // High visual fallback
        motifs: [
            "Royal court processions with elephants & horses",
            "Jharokha balcony views & Mughal-Rajput fusion",
            "Single hair fine line brushwork on Wasli paper",
            "Meenakari enamel work & Sanganeri block motifs"
        ],
        description: "Jaipur is world-renowned for its exquisite Rajasthani Miniature Paintings. Using tiny brushes crafted from a single squirrel tail hair, court artists paint royal durbars, romantic Ragamala melodies, and hunting scenes with jewel-like clarity.",
        history: "Established when Maharaja Sawai Jai Singh II founded Jaipur in 1727, royal ateliers (Suratkhana) blended indigenous Rajput themes with refined Mughal miniature techniques.",
        quote: "A Jaipur miniature painter sees the universe through the tip of a single hair brush.",
        quoteSource: "Court Atelier Archives",
        technique: "Painters burnish layers of handmade Wasli paper with smooth agate stone. Mineral pigments made from crushed lapis lazuli, malachite, and gold dust are applied under high magnification.",
        palette: ["#D4AC0D", "#C0392B", "#1B4F72", "#27AE60", "#F4F6F7"],
        gallery: [
            { title: "Royal Jaipur Rajput Court Miniature", img: "assets/images/thanjavur.jpg" },
            { title: "Hawa Mahal Jharokha Aesthetics", img: "assets/images/thanjavur.jpg" }
        ],
        narration: "Welcome to Jaipur, Rajasthan! Explore the world of miniature paintings, where royal court processions and romantic Ragamala themes are painted on smooth Wasli paper. Artisans use brushes with just a few squirrel hairs to execute lines so fine they require a magnifying lens to fully appreciate."
    }
];

/* Bonus Art Locations */
const BONUS_ART_DATA = [
    {
        id: "bhimbetka",
        name: "Bhimbetka Rock Shelters",
        location: "Raisen District",
        state: "Madhya Pradesh",
        lat: 22.9378,
        lng: 77.6139,
        category: "mural",
        categoryLabel: "Prehistoric Rock Art",
        period: "Mesolithic Era (approx 10,000 BCE)",
        img: "assets/images/ajanta.jpg",
        description: "UNESCO World Heritage site with prehistoric cave paintings depicting hunting scenes, bison, and ritual dances in red ochre and white mineral pigments."
    },
    {
        id: "hampi",
        name: "Hampi (Vijayanagara Art)",
        location: "Vijayanagara",
        state: "Karnataka",
        lat: 15.3350,
        lng: 76.4600,
        category: "sculpture",
        categoryLabel: "Monolithic & Temple Carvings",
        period: "14th – 16th Century CE",
        img: "assets/images/ellora.jpg",
        description: "Capital of Vijayanagara Empire famous for the stone chariot at Vittala Temple, musical pillars, and relief friezes."
    }
];

/* Quiz Question Bank */
const ART_QUIZ_QUESTIONS = [
    {
        question: "Which Indian art site features Cave 16 (Kailasa Temple), carved top-down from a single monolithic mountain cliff?",
        options: ["Ajanta Caves", "Ellora Caves", "Khajuraho", "Bhimbetka"],
        correct: 1,
        explanation: "Ellora Cave 16 (Kailasa Temple) is the world's largest monolithic structure carved top-to-bottom out of a single basalt rock cliff face under Rashtrakuta King Krishna I."
    },
    {
        question: "What defining material gives Tanjore (Thanjavur) paintings their opulent signature shine?",
        options: ["Silver Foil", "22-Karat Gold Leaf & Glass Gems", "Crushed Pearl Powder", "Bronze Dust"],
        correct: 1,
        explanation: "Tanjore paintings are famous for using 22-karat gold foil laid over 3D gesso relief work, combined with embedded semi-precious glass stones."
    },
    {
        question: "Warli tribal folk art traditionally uses which color pigment and background canvas?",
        options: ["Gold ink on Black Silk", "White Rice Paste on Terracotta Red Mud", "Yellow Haldi on Palm Leaf", "Blue Indigo on Cotton"],
        correct: 1,
        explanation: "Warli art uses white pigment made from ground rice paste painted on terracotta red mud walls, creating iconic stick figures and Tarpa dance circles."
    },
    {
        question: "Which feature is iconic to Madhubani (Mithila) folk art from Bihar?",
        options: ["Oil paint glazes", "Double-line outlines with no blank space", "Pure black silhouette shading", "3D wooden relief"],
        correct: 1,
        explanation: "Madhubani paintings use distinct double-line outlines filled with fine cross-hatching, geometric motifs, and leave zero empty canvas space."
    },
    {
        question: "Bodhisattva Padmapani, holding a blue lotus with graceful downcast eyes, is a masterpiece mural found at which location?",
        options: ["Ajanta Cave 1", "Khajuraho Temple", "Puri Jagannath Temple", "Jaipur Palace"],
        correct: 0,
        explanation: "Bodhisattva Padmapani is the world-renowned 5th-century fresco mural located in Cave 1 of Ajanta Caves in Maharashtra."
    }
];
