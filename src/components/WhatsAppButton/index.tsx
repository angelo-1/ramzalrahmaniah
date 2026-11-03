import { MessageCircle } from 'lucide-react';
export const WHATSAPP_NUMBER = '971522550225';
export function whatsappUrl(message: string) { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`; }
export function WhatsAppButton({ label, floating=false }: { label?: string; floating?: boolean }) { const text = label || 'WhatsApp'; return <a className={floating?'whatsapp-float':'button button-whatsapp'} href={whatsappUrl('Hello Ramz Al Rahmaniah, I would like to enquire about your services. Please provide more information.')} target="_blank" rel="noreferrer" aria-label="Contact us on WhatsApp"><MessageCircle size={18}/>{!floating && text}</a>; }
