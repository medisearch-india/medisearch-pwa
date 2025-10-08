import React, { useState, useEffect } from 'react';
import './App.css';

// Mock medicine data
const MOCK_MEDICINES = [
  {
    id: 1,
    name: "Paracetamol",
    manufacturer: "Cipla Ltd",
    price: 25,
    benefits: "Reduces fever and relieves pain",
    sideEffects: "Nausea, stomach pain (in high doses)",
    relatedDiseases: ["Fever", "Headache", "Body Pain", "Cold"],
    type: "Tablet",
    composition: "Paracetamol 500mg",
    availability: "In Stock"
  },
  {
    id: 2,
    name: "Amoxicillin",
    manufacturer: "Sun Pharma",
    price: 150,
    benefits: "Treats bacterial infections",
    sideEffects: "Nausea, diarrhea, skin rash",
    relatedDiseases: ["Bacterial Infections", "Throat Infection", "Pneumonia"],
    type: "Capsule",
    composition: "Amoxicillin 250mg",
    availability: "In Stock"
  },
  {
    id: 3,
    name: "Cetirizine",
    manufacturer: "Dr. Reddy's",
    price: 45,
    benefits: "Relieves allergy symptoms",
    sideEffects: "Drowsiness, dry mouth, headache",
    relatedDiseases: ["Allergies", "Hay Fever", "Skin Rashes"],
    type: "Tablet",
    composition: "Cetirizine 10mg",
    availability: "In Stock"
  },
  {
    id: 4,
    name: "Omeprazole",
    manufacturer: "Lupin Ltd",
    price: 120,
    benefits: "Reduces stomach acid",
    sideEffects: "Headache, abdominal pain, nausea",
    relatedDiseases: ["Acidity", "GERD", "Ulcers"],
    type: "Capsule",
    composition: "Omeprazole 20mg",
    availability: "In Stock"
  },
  {
    id: 5,
    name: "Aspirin",
    manufacturer: "Bayer",
    price: 35,
    benefits: "Pain reliever, anti-inflammatory",
    sideEffects: "Stomach irritation, bleeding risk",
    relatedDiseases: ["Pain", "Inflammation", "Fever"],
    type: "Tablet",
    composition: "Aspirin 75mg",
    availability: "In Stock"
  },
  {
    id: 6,
    name: "Ibuprofen",
    manufacturer: "Johnson & Johnson",
    price: 55,
    benefits: "Reduces pain and inflammation",
    sideEffects: "Stomach upset, dizziness",
    relatedDiseases: ["Arthritis", "Pain", "Fever"],
    type: "Tablet",
    composition: "Ibuprofen 400mg",
    availability: "In Stock"
  }
];

function App() {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Search medicines
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setLoading(true);
      setTimeout(() => {
        const filteredMedicines = MOCK_MEDICINES.filter(medicine =>
          medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          medicine.relatedDiseases.some(disease => 
            disease.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          medicine.composition.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setMedicines(filteredMedicines);
        setLoading(false);
      }, 800);
    }
  };

  // Clear search
  const handleClear = () => {
    setSearchQuery('');
    setMedicines([]);
  };

  // Quick search
  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    const filteredMedicines = MOCK_MEDICINES.filter(medicine =>
      medicine.name.toLowerCase().includes(query.toLowerCase()) ||
      medicine.relatedDiseases.some(disease => 
        disease.toLowerCase().includes(query.toLowerCase())
      )
    );
    setMedicines(filteredMedicines);
  };

  // Add to cart
  const handleAddToCart = (medicine) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === medicine.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...medicine, quantity: 1 }];
    });
    alert(`✅ ${medicine.name} added to cart!`);
  };

  // Remove from cart
  const handleRemoveFromCart = (medicineId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
  };

  // Calculate total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('🛒 Your cart is empty!');
      return;
    }
    
    const orderSummary = cart.map(item => 
      `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
    ).join('\n');
    
    alert(`🎉 Order Placed Successfully!\n\n${orderSummary}\n\nTotal: ₹${cartTotal}\n\nThank you for your order!`);
    setCart([]);
    setShowCart(false);
  };

  // Reset app
  const handleResetApp = () => {
    setMedicines([]);
    setSearchQuery('');
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 onClick={handleResetApp} style={{cursor: 'pointer'}}>
            💊 MedCare
          </h1>
          <p>Your Complete Healthcare Solution</p>
        </div>
        
        <div className="header-controls">
          <select 
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="language-dropdown"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
            <option value="ta">தமிழ்</option>
            <option value="te">తెలుగు</option>
            <option value="ml">മലയാളം</option>
          </select>
          
          <button 
            className="cart-btn"
            onClick={() => setShowCart(!showCart)}
          >
            🛒 Cart ({cart.length})
          </button>
        </div>
      </header>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="cart-sidebar">
          <div className="cart-header">
            <h3>🛒 Your Cart</h3>
            <button onClick={() => setShowCart(false)} className="close-cart">✕</button>
          </div>
          
          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>₹{item.price} x {item.quantity}</p>
                    <p className="item-total">₹{item.price * item.quantity}</p>
                  </div>
                  <button 
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="remove-btn"
                  >
                    ❌
                  </button>
                </div>
              ))
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <strong>Total: ₹{cartTotal}</strong>
              </div>
              <button onClick={handleCheckout} className="checkout-btn">
                🎉 Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="main-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h2>Find Medicines & Healthcare Solutions</h2>
            <p>Search from 10,000+ medicines with real-time prices and delivery</p>
            
            <div className="search-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="🔍 Search medicines, diseases, or symptoms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="search-input"
                />
                <div className="search-buttons">
                  <button 
                    onClick={handleSearch} 
                    className="search-btn"
                    disabled={loading}
                  >
                    {loading ? '🔍 Searching...' : 'Search'}
                  </button>
                  <button onClick={handleClear} className="clear-btn">
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Search */}
            <div className="quick-search">
              <p>Quick search for common conditions:</p>
              <div className="quick-search-buttons">
                <button onClick={() => handleQuickSearch('fever')}>🤒 Fever</button>
                <button onClick={() => handleQuickSearch('headache')}>🤕 Headache</button>
                <button onClick={() => handleQuickSearch('allergy')}>🤧 Allergy</button>
                <button onClick={() => handleQuickSearch('pain')}>😖 Pain</button>
                <button onClick={() => handleQuickSearch('infection')}>🦠 Infection</button>
                <button onClick={() => handleQuickSearch('cold')}>🥶 Cold</button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💊</div>
              <h3>Medicine Search</h3>
              <p>Find medicines with detailed information and prices</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <h3>Doctor Consult</h3>
              <p>Connect with certified doctors online</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🐾</div>
              <h3>Pet Care</h3>
              <p>Medicines and care for your pets</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Multi-Language</h3>
              <p>Available in 6 Indian languages</p>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="results-section">
          {medicines.length > 0 && (
            <div className="results-header">
              <h3>📦 Found {medicines.length} medicines</h3>
              <p>Best prices from trusted pharmacies</p>
            </div>
          )}
          
          <div className="medicines-grid">
            {medicines.map(medicine => (
              <div key={medicine.id} className="medicine-card">
                <div className="medicine-badge">{medicine.availability}</div>
                
                <div className="medicine-header">
                  <h4 className="medicine-name">{medicine.name}</h4>
                  <span className="medicine-type">{medicine.type}</span>
                </div>
                
                <div className="medicine-manufacturer">
                  By {medicine.manufacturer}
                </div>
                
                <div className="medicine-composition">
                  {medicine.composition}
                </div>
                
                <div className="medicine-price">
                  ₹{medicine.price}
                </div>
                
                <div className="medicine-details">
                  <div className="detail-item">
                    <strong>✅ Benefits:</strong>
                    <span>{medicine.benefits}</span>
                  </div>
                  
                  <div className="detail-item">
                    <strong>⚠️ Side Effects:</strong>
                    <span>{medicine.sideEffects}</span>
                  </div>
                  
                  <div className="detail-item">
                    <strong>🎯 Treats:</strong>
                    <div className="diseases-tags">
                      {medicine.relatedDiseases.map((disease, index) => (
                        <span key={index} className="disease-tag">{disease}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="medicine-actions">
                  <button 
                    className="cart-add-btn"
                    onClick={() => handleAddToCart(medicine)}
                  >
                    🛒 Add to Cart
                  </button>
                  <button className="order-now-btn">
                    ⚡ Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {medicines.length === 0 && searchQuery && !loading && (
            <div className="no-results">
              <h3>😔 No medicines found for "{searchQuery}"</h3>
              <p>Try searching with different keywords or check the spelling</p>
              <div className="suggestions">
                <p>Try: <strong>fever, headache, allergy, pain, infection, cold</strong></p>
              </div>
            </div>
          )}

          {!searchQuery && medicines.length === 0 && (
            <div className="welcome-message">
              <h3>👋 Welcome to MedCare!</h3>
              <p>Search for medicines above or use quick search buttons to get started.</p>
              <div className="welcome-features">
                <div className="welcome-item">✅ 10,000+ Medicines</div>
                <div className="welcome-item">✅ Best Prices</div>
                <div className="welcome-item">✅ Fast Delivery</div>
                <div className="welcome-item">✅ Doctor Support</div>
              </div>
            </div>
          )}
        </section>

        {/* Info Section */}
        <section className="info-section">
          <div className="info-card">
            <h3>🏥 Complete Healthcare Platform</h3>
            <div className="info-features">
              <div className="info-item">✅ FDA Approved Medicines</div>
              <div className="info-item">✅ Indian Government Certified</div>
              <div className="info-item">✅ Auto-updating Database</div>
              <div className="info-item">✅ Multi-language Support</div>
              <div className="info-item">✅ Real-time Price Comparison</div>
              <div className="info-item">✅ 24/7 Customer Support</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>💊 MedCare - Your Trusted Healthcare Partner</p>
          <div className="footer-links">
            <span>About Us</span>
            <span>Contact</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Doctors</span>
            <span>Pharmacies</span>
          </div>
          <p className="copyright">&copy; 2024 MedCare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
