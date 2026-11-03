import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { BrandMark } from '../BrandMark';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { WhatsAppButton } from '../WhatsAppButton';
export function Header() { const { t } = useLanguage(); 
const [open,setOpen]=useState(false); 
const links=[['/',t.nav.home],['/about',t.nav.about],['/services',t.nav.services],['/contact',t.nav.contact]]; 
return <header className="site-header"><div className="container nav-wrap"><Link to="/" className="brand-link" onClick={()=>setOpen(false)}><BrandMark compact/></Link><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button><nav className={open?'nav-links open':'nav-links'}>{links.map(([to,label])=><NavLink key={to} to={to} onClick={()=>setOpen(false)}>{label}</NavLink>)}<LanguageSwitcher/><WhatsAppButton label={t.common.whatsapp}/></nav></div></header>; }
