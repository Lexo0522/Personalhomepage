const Utils = {
  DOM: {
    $(selector) {
      return document.querySelector(selector);
    },

    $$(selector) {
      return document.querySelectorAll(selector);
    },

    createElement(tag, attributes = {}, children = []) {
      const element = document.createElement(tag);
      
      Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
          element.className = value;
        } else if (key === 'dataset') {
          Object.entries(value).forEach(([dataKey, dataValue]) => {
            element.dataset[dataKey] = dataValue;
          });
        } else {
          element.setAttribute(key, value);
        }
      });

      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else if (child instanceof HTMLElement) {
          element.appendChild(child);
        }
      });

      return element;
    },

    addClass(element, ...classes) {
      if (typeof element === 'string') {
        element = this.$(element);
      }
      if (element) {
        element.classList.add(...classes);
      }
    },

    removeClass(element, ...classes) {
      if (typeof element === 'string') {
        element = this.$(element);
      }
      if (element) {
        element.classList.remove(...classes);
      }
    },

    toggleClass(element, className, force) {
      if (typeof element === 'string') {
        element = this.$(element);
      }
      if (element) {
        return element.classList.toggle(className, force);
      }
    },

    hasClass(element, className) {
      if (typeof element === 'string') {
        element = this.$(element);
      }
      return element ? element.classList.contains(className) : false;
    }
  },

  Event: {
    on(element, event, handler, options = {}) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }
      if (element) {
        element.addEventListener(event, handler, options);
      }
    },

    off(element, event, handler) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }
      if (element) {
        element.removeEventListener(event, handler);
      }
    },

    delegate(parent, selector, event, handler) {
      if (typeof parent === 'string') {
        parent = document.querySelector(parent);
      }
      if (parent) {
        parent.addEventListener(event, (e) => {
          const target = e.target.closest(selector);
          if (target && parent.contains(target)) {
            handler.call(target, e);
          }
        });
      }
    }
  },

  Animation: {
    fadeIn(element, duration = 300) {
      if (typeof element === 'string') {
        element = this.$(element);
      }
      if (element) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        element.style.display = 'block';
        
        requestAnimationFrame(() => {
          element.style.opacity = '1';
        });
      }
    },

    fadeOut(element, duration = 300) {
      if (typeof element === 'string') {
        element = this.$(element);
      }
      if (element) {
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        element.style.opacity = '0';
        
        setTimeout(() => {
          element.style.display = 'none';
        }, duration);
      }
    },

    scrollTo(element, duration = 300, offset = 0) {
      const targetElement = typeof element === 'string' ? this.$(element) : element;
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          
          window.scrollTo(0, startPosition + distance * this.easeInOutQuad(progress));
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        };

        requestAnimationFrame(animation);
      }
    },

    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
  },

  Data: {
    isValidUrl(string) {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    },

    truncateText(text, maxLength) {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    },

    formatDate(dateString, locale = 'zh-CN') {
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString(locale, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch {
        return dateString;
      }
    },

    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    throttle(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  },

  Storage: {
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch {
        return defaultValue;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    }
  },

  Logger: {
    log(message, data = null) {
      console.log(`[${new Date().toISOString()}] ${message}`, data || '');
    },

    warn(message, data = null) {
      console.warn(`[${new Date().toISOString()}] WARNING: ${message}`, data || '');
    },

    error(message, error = null) {
      console.error(`[${new Date().toISOString()}] ERROR: ${message}`, error || '');
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}