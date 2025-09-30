var style = document.createElement('style');
style.textContent = `
  #lang-toggle {
    position: fixed; 
    top: 10px; 
    right: 10px; 
    z-index: 9999;
    background: #111; 
    color: #fff; 
    padding: 8px 10px;
    border-radius: 6px; 
    text-decoration: none; 
    font-weight: 600;
  }
  #lang-toggle:hover { opacity: .9; }
`;
document.head.appendChild(style);
