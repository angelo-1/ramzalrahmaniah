import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { whatsappUrl } from '../WhatsAppButton';
import type { Service } from '../../data/services';
export function ServiceCard({ service }: { service: Service }) { const { language, t } = useLanguage(); const copy = service[language]; return <article className="service-card"><div className="service-icon"><service.icon size={21}/></div><div className="service-card-body"><h3>{copy.title}</h3><p>{copy.description}</p><a href={whatsappUrl(`Hello Ramz Al Rahmaniah, I would like to enquire about ${copy.title}. Please provide more information.`)} target="_blank" rel="noreferrer" className="text-link">{t.common.enquire}<ArrowUpRight size={16}/></a></div></article>; }
