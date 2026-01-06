document.addEventListener('DOMContentLoaded', () => {
  const criticalCSS = `
body {
  background-color: var(--bg);
  color: var(--fg);
}

header {
  text-align: center;
  padding: 2rem 0 3rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.2rem;
  border: 2px solid var(--border);
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 0.6rem;
  color: var(--fg);
}

.tagline {
  font-size: 1.1rem;
  color: var(--muted);
  margin-bottom: 1.2rem;
}

.about-text {
  max-width: 600px;
  margin: 0 auto 1.8rem;
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.7;
}

.btn-primary {
  display: inline-block;
  background-color: var(--link);
  color: white;
  padding: 0.6rem 1.4rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
  margin-top: 1rem;
}

.navbar {
  background-color: var(--bg);
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-logo {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--fg);
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 1.4rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s ease;
  padding: 0.3rem 0;
  line-height: 1.4;
}

.loading-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 80px);
  font-size: 1rem;
  color: var(--muted);
  font-weight: 500;
  animation: pulse 1.5s ease-in-out infinite;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

#loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.6s ease, visibility 0.6s ease, transform 0.6s ease;
}

.loader {
  width: 60px;
  height: 60px;
  position: relative;
  animation: pulse 1.5s ease-in-out infinite;
}

.loader::before,
.loader::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid transparent;
  animation: spin 1.5s linear infinite;
}

.loader::before {
  border-top-color: var(--link);
  border-right-color: var(--link);
  animation-delay: 0s;
}

.loader::after {
  border-bottom-color: var(--accent);
  border-left-color: var(--accent);
  animation-delay: 0.75s;
  width: 40px;
  height: 40px;
  top: 10px;
  left: 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

#loading-screen.hidden {
  opacity: 0;
  visibility: hidden;
  transform: scale(0.95);
  pointer-events: none;
}

#loading-screen.hidden .loading-text {
  opacity: 0;
  transform: translate(-50%, 70px);
}

#loading-screen.hidden .loader {
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
`;

  const styleElement = document.createElement('style');
  styleElement.textContent = criticalCSS;
  styleElement.setAttribute('data-critical', 'true');
  document.head.appendChild(styleElement);
  
  Utils.Logger.log('关键CSS已内联');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      const style = document.querySelector('style[data-critical]');
      if (style) {
        style.remove();
        Utils.Logger.log('关键CSS已移除');
      }
    }, 3000);
  });
});