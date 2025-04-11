import { FC } from 'react';
import css from './Footer.module.css';
import reactIcon from '@/assets/react-icon.svg';
import linkedin from '@/assets/linkedin.svg';
import githubIcon from '@/assets/github.svg';
import whatsapp from '@/assets/whatsapp.svg';
import telegram from '@/assets/telegram.svg';

interface SocialMediaLink {
  href: string;
  icon: string;
  alt: string;
  ariaLabel?: string;
}

interface FooterProps {
  className?: string;
}

const socialMediaLinks: readonly SocialMediaLink[] = [
  {
    href: 'https://www.linkedin.com/in/andrii-zhygalko',
    icon: linkedin,
    alt: 'Linkedin',
    ariaLabel: 'Visit my LinkedIn profile',
  },
  {
    href: 'https://github.com/andrii-zhygalko/',
    icon: githubIcon,
    alt: 'GitHub',
    ariaLabel: 'Visit my GitHub profile',
  },
  {
    href: 'https://api.whatsapp.com/send/?phone=%2B393201836658&text=Hello+Andrii',
    icon: whatsapp,
    alt: 'Whatsapp',
    ariaLabel: 'Contact me on WhatsApp',
  },
  {
    href: 'https://t.me/andrii_web_dev',
    icon: telegram,
    alt: 'Telegram',
    ariaLabel: 'Contact me on Telegram',
  },
] as const;

const Footer: FC<FooterProps> = ({ className }) => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className={`${css.footer} ${className ?? ''}`}>
      <div className={`${css.container} container`}>
        <a
          href='https://projects.zhygalko.dev'
          className={css.logo}
          aria-label='Go to projects homepage'>
          <span>projects.zhygalko.dev</span>
        </a>

        <div className={css.content}>
          <p>
            This website is made with{' '}
            <img src={reactIcon} alt='React' width='26' height='26' />{' '}
            {currentYear}
          </p>
        </div>

        <div className={css.socialMedia}>
          {socialMediaLinks.map(({ href, icon, alt, ariaLabel }) => (
            <a
              key={alt}
              href={href}
              target='_blank'
              rel='noreferrer'
              aria-label={ariaLabel}>
              <img src={icon} alt={alt} width='30' height='30' />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
