import { useState, useEffect, useCallback } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import css from './Header.module.css';

interface VisibleSection {
  id: string;
  ratio: number;
  distanceFromTop: number;
}

interface NavLink {
  to: string;
  label: string;
  isHashLink: boolean;
  isButton?: boolean;
}

const navLinks: NavLink[] = [
  { to: '#home', label: 'Home', isHashLink: true },
  { to: '#about', label: 'About me', isHashLink: true },
  { to: '#projects', label: 'Projects', isHashLink: true },
  { to: '#contacts', label: 'Contacts', isHashLink: true },
  { to: '/cv', label: 'View CV', isHashLink: false, isButton: true },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isLightTheme, setIsLightTheme] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'light';
  });

  const createObserver = useCallback((): IntersectionObserver => {
    const observerOptions: IntersectionObserverInit = {
      rootMargin: '-40% 0px -50% 0px',
    };

    return new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      const visibleSections: VisibleSection[] = entries
        .filter(entry => entry.isIntersecting)
        .map(entry => ({
          id: entry.target.id,
          ratio: entry.intersectionRatio,
          distanceFromTop: entry.boundingClientRect.top,
        }));

      if (visibleSections.length > 0) {
        const mostVisible = visibleSections.reduce((prev, current) => {
          if (current.ratio > prev.ratio + 0.2) return current;
          if (Math.abs(current.ratio - prev.ratio) <= 0.2) {
            return current.distanceFromTop < prev.distanceFromTop
              ? current
              : prev;
          }
          return prev;
        });

        setActiveSection(mostVisible.id);
      }
    }, observerOptions);
  }, []);

  useEffect(() => {
    if (isLightTheme) {
      document.documentElement.classList.add('light');
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    }
  }, []);

  useEffect(() => {
    let observer = createObserver();
    let retryCount = 0;
    const maxRetries = 5;
    const retryInterval = 1000;

    const setupObserver = (): boolean => {
      const sections = document.querySelectorAll('section[id]');

      if (sections.length > 0) {
        sections.forEach(section => observer.observe(section));
        return true;
      }
      return false;
    };

    if (!setupObserver() && retryCount < maxRetries) {
      const retryTimer = setInterval(() => {
        if (setupObserver() || retryCount >= maxRetries) {
          clearInterval(retryTimer);
        }
        retryCount++;
      }, retryInterval);

      return () => {
        clearInterval(retryTimer);
      };
    }

    return () => {
      observer.disconnect();
    };
  }, [createObserver]);

  const toggleTheme = (): void => {
    const html = document.documentElement;
    const newTheme = html.classList.contains('light') ? 'dark' : 'light';

    if (newTheme === 'light') {
      html.classList.add('light');
      setIsLightTheme(true);
    } else {
      html.classList.remove('light');
      setIsLightTheme(false);
    }

    localStorage.setItem('theme', newTheme);
  };

  const closeMenu = (): void => {
    setMenuOpen(false);
  };

  return (
    <motion.header
      className={css.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}>
      <div className={`${css.container} container`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}>
          <HashLink smooth to='#home' className={css.logo}>
            <span className={css.symbol}>{'<'}</span>
            <span>{'Andrii'}</span>
            <span className={css.surname}>{'Zhygalko'}</span>
            <span className={css.symbol}>{'/>'}</span>
          </HashLink>
        </motion.div>

        <input
          onChange={toggleTheme}
          className={css.themeToggle}
          type='checkbox'
          id='switch'
          name='mode'
          checked={isLightTheme}
        />
        <label htmlFor='switch' className={css.themeLabel}>
          Toggle
        </label>

        <motion.nav
          className={clsx('nav', css.nav, menuOpen && css.active)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}>
          {navLinks.map(({ to, label, isHashLink, isButton }) => {
            if (isHashLink) {
              return (
                <HashLink
                  key={to}
                  to={to}
                  smooth
                  onClick={closeMenu}
                  className={clsx(
                    isButton && [css.button, 'button'],
                    !isButton && activeSection === to.slice(1) && css.activeLink
                  )}>
                  {label}
                </HashLink>
              );
            }
            return (
              <Link
                key={to}
                to={to}
                className={clsx(isButton && [css.button, 'button'])}>
                {label}
              </Link>
            );
          })}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          aria-expanded={menuOpen ? 'true' : 'false'}
          aria-haspopup='true'
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className={clsx(
            'menuButton',
            css.menuButton,
            menuOpen && ['active', css.menuActive]
          )}
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>
    </motion.header>
  );
};

export default Header;
