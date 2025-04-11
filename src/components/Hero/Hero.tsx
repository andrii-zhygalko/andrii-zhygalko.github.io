import { motion, Variants } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';
import css from './Hero.module.css';
import linkedin from '@/assets/linkedin.svg';
import githubIcon from '@/assets/github.svg';
import whatsapp from '@/assets/whatsapp.svg';
import Hello from '@/assets/Hello.gif';
import telegram from '@/assets/telegram.svg';

interface SocialLink {
  href: string;
  icon: string;
  alt: string;
}

const socialLinks: SocialLink[] = [
  {
    href: 'https://github.com/andrii-zhygalko/',
    icon: githubIcon,
    alt: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/andrii-zhygalko',
    icon: linkedin,
    alt: 'Linkedin',
  },
  { href: 'https://t.me/andrii_web_dev', icon: telegram, alt: 'telegram' },
  {
    href: 'https://api.whatsapp.com/send/?phone=%2B393201836658&text=Hello+Andrii',
    icon: whatsapp,
    alt: 'Whatsapp',
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Hero: React.FC = () => {
  return (
    <section id='home' className={`${css.container} container`}>
      <motion.div
        className={css.heroText}
        variants={container}
        initial='hidden'
        animate='show'>
        <motion.p variants={item}>
          Hello <img src={Hello} alt='Hello' width='20px' />, I'm
        </motion.p>
        <motion.h1 variants={item}>Andrii</motion.h1>
        <motion.div variants={item} className={`${css.button} button`}>
          <HashLink smooth to='#contacts'>
            Contact
          </HashLink>
        </motion.div>
        <motion.div className={css.socialMedia} variants={item}>
          {socialLinks.map(({ href, icon, alt }) => (
            <a key={alt} href={href} target='_blank' rel='noreferrer'>
              <img src={icon} alt={alt} />
            </a>
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className={css.specializationText}>
        <motion.p variants={item} className={css.experience}>
          One year of hands-on experience as
        </motion.p>
        <motion.h3 variants={item}>Full Stack Developer</motion.h3>
      </motion.div>
    </section>
  );
};

export default Hero;
