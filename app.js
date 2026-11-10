// Default Company Profile Data extracted from the Document
const defaultProducts = [
    {
        id: 1,
        title: "Continuous-Thread Studs",
        standard: "ASME B18.31.2 / ASTM A193 B7",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        description: "Inch-series continuous threaded rods used in high-pressure and high-temperature petrochemical flanges."
    },
    {
        id: 2,
        title: "Petrochemical Grade Bolting (B7/B7M)",
        standard: "ASTM A193 / A194",
        image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=800&q=80",
        description: "Heavy-duty alloy steel studs and matching nuts designed for extreme temperature and pressure services."
    },
    {
        id: 3,
        title: "Hex Nuts, Square & Flange Nuts",
        standard: "ASME B18.2.2 / ASTM A194",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
        description: "Precision-formed industrial nuts including heavy hex, coupling nuts, and hex-flange varieties."
    },
    {
        id: 4,
        title: "Structural Bolts & Nuts",
        standard: "ASTM F3125 / Grades A325 & A490",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
        description: "High-strength structural bolting assemblies certified for demanding structural steel connections."
    },
    {
        id: 5,
        title: "Double-End & Flange Bolting Studs",
        standard: "ASME B18.31.2",
        image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80",
        description: "Accurately dimensioned studs with threaded ends tailored for valve and piping flange connections."
    },
    {
        id: 6,
        title: "Precision Machined Components",
        standard: "Custom Customer Drawings",
        image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
        description: "Custom-manufactured precision machined parts adhering strictly to customer dimensional tolerances."
    }
];

const defaultGallery = [
    {
        id: 1,
        caption: "B7 Petrochemical Stud Bolts",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        caption: "Precision Threaded Fasteners",
        image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        caption: "Fluorocarbon Coated Bolting Assemblies",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        caption: "Industrial Heavy Hex Nuts & Fasteners",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        caption: "High-Strength Structural Fasteners",
        image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        caption: "Specialized Machined Components",
        image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80"
    }
];

const coatingsList = [
    "Zinc Plating & Zinc-Nickel",
    "Nickel Plating",
    "Hot-Dip Galvanizing",
    "Cadmium Plating",
    "Bi-Chromating",
    "Fluorocarbon Coating",
    "Neoprene Coating",
    "Polyolefin Coating",
    "Zinc Phosphate",
    "Zylon 103 Coating"
];

// Initialize LocalStorage Data if not present
if (!localStorage.getItem('dmvex_products')) {
    localStorage.setItem('dmvex_products', JSON.stringify(defaultProducts));
}
if (!localStorage.getItem('dmvex_gallery')) {
    localStorage.setItem('dmvex_gallery', JSON.stringify(defaultGallery));
}

// DOM Loaded Handlers
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderGallery();
    renderCoatings();
    renderAdminTables();

    // Mobile menu toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// Render Products on Index
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    const products = JSON.parse(localStorage.getItem('dmvex_products')) || defaultProducts;
    
    grid.innerHTML = products.map(p => `
        <div class="product-card bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
            <div class="h-48 overflow-hidden relative">
                <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
                <span class="absolute top-3 right-3 bg-slate-900/90 backdrop-blur border border-slate-700 text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-md">
                    ${p.standard}
                </span>
            </div>
            <div class="p-6 flex flex-col flex-grow justify-between">
                <div>
                    <h3 class="text-xl font-bold text-white mb-2">${p.title}</h3>
                    <p class="text-slate-400 text-sm mb-6">${p.description}</p>
                </div>
                <a href="#contact" class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm">
                    Enquire for this range <i class="fas fa-arrow-right text-xs"></i>
                </a>
            </div>
        </div>
    `).join('');
}

// Render Gallery on Index
function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    const gallery = JSON.parse(localStorage.getItem('dmvex_gallery')) || defaultGallery;

    grid.innerHTML = gallery.map(g => `
        <div class="gallery-card bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group">
            <div class="h-64 overflow-hidden relative">
                <img src="${g.image}" alt="${g.caption}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80"></div>
                <div class="absolute bottom-4 left-4 right-4">
                    <p class="text-white font-medium text-sm">${g.caption}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Coatings Grid
function renderCoatings() {
    const grid = document.getElementById('coating-grid');
    if (!grid) return;

    grid.innerHTML = coatingsList.map((c, index) => `
        <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-3 hover:border-blue-500/50 transition-colors">
            <div class="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold text-xs">
                0${index + 1}
            </div>
            <span class="text-sm font-medium text-slate-200">${c}</span>
        </div>
    `).join('');
}

// Tab Switching for Standards
function switchTab(tabId) {
    const threadedTab = document.getElementById('tab-threaded');
    const nutsTab = document.getElementById('tab-nuts');
    const btnThreaded = document.getElementById('btn-tab-threaded');
    const btnNuts = document.getElementById('btn-tab-nuts');

    if (tabId === 'tab-threaded') {
        threadedTab.classList.remove('hidden');
        nutsTab.classList.add('hidden');
        btnThreaded.className = "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all bg-blue-600 text-white shadow-md shadow-blue-600/30";
        btnNuts.className = "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all bg-slate-800 text-slate-300 hover:bg-slate-700";
    } else {
        nutsTab.classList.remove('hidden');
        threadedTab.classList.add('hidden');
        btnNuts.className = "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all bg-blue-600 text-white shadow-md shadow-blue-600/30";
        btnThreaded.className = "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all bg-slate-800 text-slate-300 hover:bg-slate-700";
    }
}

// Enquiry Form Simulation
function handleEnquiry(e) {
    e.preventDefault();
    document.getElementById('enquiry-form').reset();
    const successMsg = document.getElementById('enquiry-success');
    successMsg.classList.remove('hidden');
    setTimeout(() => {
        successMsg.classList.add('hidden');
    }, 5000);
}

// Admin Functions
function renderAdminTables() {
    const prodList = document.getElementById('admin-products-list');
    const galList = document.getElementById('admin-gallery-list');
    
    if (prodList) {
        const products = JSON.parse(localStorage.getItem('dmvex_products')) || defaultProducts;
        prodList.innerHTML = products.map(p => `
            <tr>
                <td class="p-3"><img src="${p.image}" class="w-12 h-12 object-cover rounded-lg border border-slate-700"></td>
                <td class="p-3 font-semibold text-white">${p.title}</td>
                <td class="p-3 text-blue-400">${p.standard}</td>
                <td class="p-3 text-right">
                    <button onclick="deleteProduct(${p.id})" class="text-red-400 hover:text-red-300 px-3 py-1 bg-red-950/50 border border-red-900 rounded text-xs">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    if (galList) {
        const gallery = JSON.parse(localStorage.getItem('dmvex_gallery')) || defaultGallery;
        galList.innerHTML = gallery.map(g => `
            <div class="relative bg-slate-950 border border-slate-800 rounded-xl overflow-hidden group">
                <img src="${g.image}" class="w-full h-24 object-cover">
                <div class="p-2 text-[11px] text-slate-300 truncate">${g.caption}</div>
                <button onclick="deleteGallery(${g.id})" class="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
}

function handleAddProduct(e) {
    e.preventDefault();
    const title = document.getElementById('prod-title').value;
    const standard = document.getElementById('prod-standard').value;
    const image = document.getElementById('prod-img').value;
    const description = document.getElementById('prod-desc').value;

    const products = JSON.parse(localStorage.getItem('dmvex_products')) || defaultProducts;
    const newProduct = {
        id: Date.now(),
        title,
        standard,
        image,
        description
    };

    products.push(newProduct);
    localStorage.setItem('dmvex_products', JSON.stringify(products));
    document.getElementById('add-product-form').reset();
    renderAdminTables();
    alert('Product added successfully to catalog!');
}

function handleAddGallery(e) {
    e.preventDefault();
    const caption = document.getElementById('gal-caption').value;
    const image = document.getElementById('gal-img').value;

    const gallery = JSON.parse(localStorage.getItem('dmvex_gallery')) || defaultGallery;
    const newItem = {
        id: Date.now(),
        caption,
        image
    };

    gallery.push(newItem);
    localStorage.setItem('dmvex_gallery', JSON.stringify(gallery));
    document.getElementById('add-gallery-form').reset();
    renderAdminTables();
    alert('Image added successfully to gallery!');
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        let products = JSON.parse(localStorage.getItem('dmvex_products')) || defaultProducts;
        products = products.filter(p => p.id !== id);
        localStorage.setItem('dmvex_products', JSON.stringify(products));
        renderAdminTables();
    }
}

function deleteGallery(id) {
    if (confirm('Are you sure you want to delete this gallery image?')) {
        let gallery = JSON.parse(localStorage.getItem('dmvex_gallery')) || defaultGallery;
        gallery = gallery.filter(g => g.id !== id);
        localStorage.setItem('dmvex_gallery', JSON.stringify(gallery));
        renderAdminTables();
    }
}

function resetDefaultData() {
    if (confirm('Reset all catalog and gallery items back to default profile settings?')) {
        localStorage.setItem('dmvex_products', JSON.stringify(defaultProducts));
        localStorage.setItem('dmvex_gallery', JSON.stringify(defaultGallery));
        renderAdminTables();
        alert('Data reset successfully!');
    }
}