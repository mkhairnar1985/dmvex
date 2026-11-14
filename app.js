(function() {
    // Default Company Profile Data
    const defaultProducts = [
        {
            title: "Continuous-Thread Studs",
            standard: "ASME B18.31.2 / ASTM A193 B7",
            image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
            description: "Inch-series continuous threaded rods used in high-pressure and high-temperature petrochemical flanges."
        },
        {
            title: "Petrochemical Grade Bolting (B7/B7M)",
            standard: "ASTM A193 / A194",
            image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=800&q=80",
            description: "Heavy-duty alloy steel studs and matching nuts designed for extreme temperature and pressure services."
        },
        {
            title: "Hex Nuts, Square & Flange Nuts",
            standard: "ASME B18.2.2 / ASTM A194",
            image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
            description: "Precision-formed industrial nuts including heavy hex, coupling nuts, and hex-flange varieties."
        },
        {
            title: "Structural Bolts & Nuts",
            standard: "ASTM F3125 / Grades A325 & A490",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
            description: "High-strength structural bolting assemblies certified for demanding structural steel connections."
        },
        {
            title: "Double-End & Flange Bolting Studs",
            standard: "ASME B18.31.2",
            image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80",
            description: "Accurately dimensioned studs with threaded ends tailored for valve and piping flange connections."
        },
        {
            title: "Precision Machined Components",
            standard: "Custom Customer Drawings",
            image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
            description: "Custom-manufactured precision machined parts adhering strictly to customer dimensional tolerances."
        }
    ];

    const defaultGallery = [
        { caption: "B7 Petrochemical Stud Bolts", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" },
        { caption: "Precision Threaded Fasteners", image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=800&q=80" },
        { caption: "Fluorocarbon Coated Bolting Assemblies", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" },
        { caption: "Industrial Heavy Hex Nuts & Fasteners", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" },
        { caption: "High-Strength Structural Fasteners", image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80" },
        { caption: "Specialized Machined Components", image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80" }
    ];

    const coatingsList = [
        "Zinc Plating & Zinc-Nickel", "Nickel Plating", "Hot-Dip Galvanizing", 
        "Cadmium Plating", "Bi-Chromating", "Fluorocarbon Coating", 
        "Neoprene Coating", "Polyolefin Coating", "Zinc Phosphate", "Zylon 103 Coating"
    ];

    // Global app initializer triggered when Firebase is loaded
    // Global app initializer triggered when Firebase is loaded
    window.initAppAfterFirebase = async function() {
        await loadProductsFromFirestore();
        await loadGalleryFromFirestore();
        await loadEnquiriesFromFirestore(); // Load enquiries on admin or index page
    };

    // --- ENQUIRIES FETCH & RENDER FUNCTIONS ---

    async function loadEnquiriesFromFirestore() {
        if (!window.db) return;
        try {
            const { collection, getDocs } = window.dbCollections;
            const querySnapshot = await getDocs(collection(window.db, "dmvex_enquiries"));
            let enquiries = [];
            querySnapshot.forEach((docSnap) => {
                enquiries.push({ id: docSnap.id, ...docSnap.data() });
            });

            renderAdminEnquiries(enquiries);
        } catch (error) {
            console.error("Error loading enquiries:", error);
        }
    }

    function renderAdminEnquiries(enquiries) {
        const list = document.getElementById('admin-enquiries-list');
        if (!list) return; // If we are on index.html instead of admin.html, skip safely

        if (enquiries.length === 0) {
            list.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-500">No customer enquiries received yet.</td></tr>`;
            return;
        }

        list.innerHTML = enquiries.map(enq => `
            <tr class="hover:bg-slate-800/40 transition-colors">
                <td class="p-3 font-semibold text-white">${enq.name || 'N/A'}</td>
                <td class="p-3 text-blue-400"><a href="mailto:${enq.email}">${enq.email || 'N/A'}</a></td>
                <td class="p-3">${enq.standard || 'General'}</td>
                <td class="p-3 text-slate-400 max-w-xs truncate" title="${enq.details || ''}">${enq.details || 'N/A'}</td>
                <td class="p-3 text-right">
                    <button onclick="deleteEnquiry('${enq.id}')" class="text-red-400 hover:text-red-300 px-3 py-1 bg-red-950/50 border border-red-900 rounded text-xs">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    window.deleteEnquiry = async function(id) {
        if (confirm('Are you sure you want to delete this enquiry record?')) {
            try {
                const { doc, deleteDoc } = window.dbCollections;
                await deleteDoc(doc(window.db, "dmvex_enquiries", id));
                loadEnquiriesFromFirestore();
            } catch (err) {
                console.error("Error deleting enquiry:", err);
                alert("Error deleting record.");
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderCoatings();
        renderProducts(defaultProducts);
        renderGallery(defaultGallery);

        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        }
    });

    async function loadProductsFromFirestore() {
        if (!window.db) return;
        try {
            const { collection, getDocs, addDoc } = window.dbCollections;
            const querySnapshot = await getDocs(collection(window.db, "dmvex_products"));
            let products = [];
            querySnapshot.forEach((docSnap) => {
                products.push({ id: docSnap.id, ...docSnap.data() });
            });

            if (products.length === 0) {
                for (let p of defaultProducts) {
                    await addDoc(collection(window.db, "dmvex_products"), p);
                }
                return loadProductsFromFirestore();
            }

            renderProducts(products);
            renderAdminProducts(products);
        } catch (error) {
            console.error("Error loading products:", error);
            renderProducts(defaultProducts);
        }
    }

    async function loadGalleryFromFirestore() {
        if (!window.db) return;
        try {
            const { collection, getDocs, addDoc } = window.dbCollections;
            const querySnapshot = await getDocs(collection(window.db, "dmvex_gallery"));
            let gallery = [];
            querySnapshot.forEach((docSnap) => {
                gallery.push({ id: docSnap.id, ...docSnap.data() });
            });

            if (gallery.length === 0) {
                for (let g of defaultGallery) {
                    await addDoc(collection(window.db, "dmvex_gallery"), g);
                }
                return loadGalleryFromFirestore();
            }

            renderGallery(gallery);
            renderAdminGallery(gallery);
        } catch (error) {
            console.error("Error loading gallery:", error);
            renderGallery(defaultGallery);
        }
    }

    function renderProducts(products) {
        const grid = document.getElementById('product-grid');
        if (!grid) return;
        grid.innerHTML = products.map(p => `
            <div class="product-card bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                <div class="h-48 overflow-hidden relative">
                    <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
                    <span class="absolute top-3 right-3 bg-slate-900/95 border border-slate-700 text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-md">
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

    function renderGallery(gallery) {
        const grid = document.getElementById('gallery-grid');
        if (!grid) return;
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

    function renderCoatings() {
        const grid = document.getElementById('coating-grid');
        if (!grid) return;
        grid.innerHTML = coatingsList.map((c, index) => `
            <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold text-xs">0${index + 1}</div>
                <span class="text-sm font-medium text-slate-200">${c}</span>
            </div>
        `).join('');
    }

    window.handleAddProduct = async function(e) {
        e.preventDefault();
        if (!window.db) return alert('Firebase not connected yet.');
        
        const title = document.getElementById('prod-title').value;
        const standard = document.getElementById('prod-standard').value;
        const image = document.getElementById('prod-img').value;
        const description = document.getElementById('prod-desc').value;

        try {
            const { collection, addDoc } = window.dbCollections;
            await addDoc(collection(window.db, "dmvex_products"), { title, standard, image, description });
            document.getElementById('add-product-form').reset();
            alert('Product successfully added to Firestore!');
            loadProductsFromFirestore();
        } catch (err) {
            console.error(err);
            alert('Error adding product.');
        }
    }

    window.handleAddGallery = async function(e) {
        e.preventDefault();
        if (!window.db) return alert('Firebase not connected yet.');

        const caption = document.getElementById('gal-caption').value;
        const image = document.getElementById('gal-img').value;

        try {
            const { collection, addDoc } = window.dbCollections;
            await addDoc(collection(window.db, "dmvex_gallery"), { caption, image });
            document.getElementById('add-gallery-form').reset();
            alert('Image successfully added to Firestore gallery!');
            loadGalleryFromFirestore();
        } catch (err) {
            console.error(err);
            alert('Error adding image.');
        }
    }

    window.deleteProduct = async function(id) {
        if (confirm('Delete this product from Firestore?')) {
            const { doc, deleteDoc } = window.dbCollections;
            await deleteDoc(doc(window.db, "dmvex_products", id));
            loadProductsFromFirestore();
        }
    }

    window.deleteGallery = async function(id) {
        if (confirm('Delete this image from Firestore?')) {
            const { doc, deleteDoc } = window.dbCollections;
            await deleteDoc(doc(window.db, "dmvex_gallery", id));
            loadGalleryFromFirestore();
        }
    }

    function renderAdminProducts(products) {
        const list = document.getElementById('admin-products-list');
        if (!list) return;
        list.innerHTML = products.map(p => `
            <tr>
                <td class="p-3"><img src="${p.image}" class="w-12 h-12 object-cover rounded-lg border border-slate-700"></td>
                <td class="p-3 font-semibold text-white">${p.title}</td>
                <td class="p-3 text-blue-400">${p.standard}</td>
                <td class="p-3 text-right">
                    <button onclick="deleteProduct('${p.id}')" class="text-red-400 hover:text-red-300 px-3 py-1 bg-red-950/50 border border-red-900 rounded text-xs">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    function renderAdminGallery(gallery) {
        const list = document.getElementById('admin-gallery-list');
        if (!list) return;
        list.innerHTML = gallery.map(g => `
            <div class="relative bg-slate-950 border border-slate-800 rounded-xl overflow-hidden group">
                <img src="${g.image}" class="w-full h-24 object-cover">
                <div class="p-2 text-[11px] text-slate-300 truncate">${g.caption}</div>
                <button onclick="deleteGallery('${g.id}')" class="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    window.switchTab = function(tabId) {
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

    window.handleEnquiry = async function(e) {
    e.preventDefault();
    
    // Get form input values
    const formInputs = e.target.elements;
    const name = formInputs[0].value; // Company or contact name
    const email = formInputs[1].value; // Email address
    const standard = formInputs[2].value; // Standard / Grade
    const details = formInputs[3].value; // Requirement details & quantity

    const successMsg = document.getElementById('enquiry-success');
    const submitBtn = e.target.querySelector('button[type="submit"]');

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        // Check if Firebase is initialized
        if (window.db && window.dbCollections) {
            const { collection, addDoc } = window.dbCollections;
            // Save to Firestore collection 'dmvex_enquiries'
            await addDoc(collection(window.db, "dmvex_enquiries"), {
                name,
                email,
                standard,
                details,
                timestamp: new Date()
            });
        }

        // Reset form and show success banner
        e.target.reset();
        successMsg.classList.remove('hidden');
        setTimeout(() => {
            successMsg.classList.add('hidden');
        }, 5000);

    } catch (err) {
        console.error("Error saving enquiry:", err);
        alert("There was an error submitting your enquiry. Please try emailing dmvexglobal@gmail.com directly.");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Enquiry";
    }
}
})();