import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  FileCheck2,
  GraduationCap,
  IdCard,
  Landmark,
  MapPin,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import type { Service } from "../../data/services";
import { SectionTitle } from "../../components/SectionTitle";
import { ServiceCard } from "../../components/ServiceCard";
import { WhatsAppButton } from "../../components/WhatsAppButton";
import { GovernmentLogosCarousel } from "../../components/GovernmentLogosCarousel";

const homeServices: Service[] = [
  { id: "home-residence-visa", category: "home", icon: FileCheck2, en: { title: "Residence Visa Processing", description: "Support with residence visa applications, renewals and paperwork." }, ar: { title: "معالجة تأشيرات الإقامة", description: "دعم في طلبات تأشيرات الإقامة وتجديدها وتجهيز المستندات." } },
  { id: "home-medical-insurance", category: "home", icon: Stethoscope, en: { title: "Medical Applications & Health Insurance", description: "Assistance with medical applications and health insurance documentation." }, ar: { title: "الطلبات الطبية والتأمين الصحي", description: "مساعدة في الطلبات الطبية ومستندات التأمين الصحي." } },
  { id: "home-emirates-id", category: "home", icon: IdCard, en: { title: "Emirates ID Services", description: "Help with Emirates ID applications, renewals and required documents." }, ar: { title: "خدمات الهوية الإماراتية", description: "مساعدة في طلبات الهوية الإماراتية وتجديدها والمستندات المطلوبة." } },
  { id: "home-business-setup", category: "home", icon: BriefcaseBusiness, en: { title: "License and Business Setup", description: "Guidance with business setup and licence documentation." }, ar: { title: "إعداد الأعمال والتراخيص", description: "إرشاد بشأن تأسيس الأعمال ومستندات التراخيص." } },
  { id: "home-ministry-interior", category: "home", icon: Landmark, en: { title: "Ministry of Interior Transactions", description: "Document support for selected Ministry of Interior transactions." }, ar: { title: "معاملات وزارة الداخلية", description: "دعم المستندات لبعض معاملات وزارة الداخلية." } },
  { id: "home-equivalency-attestation", category: "home", icon: GraduationCap, en: { title: "Equivalency Certificate & Certificate Attestation", description: "Assistance with certificate equivalency applications and attestation documents." }, ar: { title: "معادلة الشهادات وتصديقها", description: "مساعدة في طلبات معادلة الشهادات ومستندات التصديق." } },
];

export function Home() {
  const { t } = useLanguage();
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{t.home.eyebrow}</span>
            <h1>{t.home.title}</h1>
            <p className="hero-subtitle">{t.home.subtitle}</p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/services">
                {t.common.exploreServices}
                <ArrowRight size={17} />
              </Link>
              <Link className="button button-outline" to="/contact">
                {t.common.contactUs}
              </Link>
            </div>
            <div className="hero-note">
              <span className="note-line" />
              {t.home.heroNote}
            </div>
          </div>
          <div className="hero-visual">
            <img
              src={`${import.meta.env.BASE_URL}assets/office-hero.png`}
              alt="Professional documentation assistance in a Sharjah office"
            />
            {/* <div className="hero-float-card">
              <span className="float-icon">
                <ShieldCheck size={18} />
              </span>
              <div>
                <strong>{t.common.established}</strong>
                <small>{t.common.sharjah}</small>
              </div>
            </div>
            <div className="hero-stamp">
              RA<span>·</span>2022
            </div> */}
          </div>
        </div>
      </section>
      <section className="highlights">
        <div className="container highlights-grid">
          <div className="highlight-intro">
            <span className="eyebrow">{t.home.highlightsTitle}</span>
            <p>{t.home.highlightsText}</p>
          </div>
          <div className="highlight-item">
            <FileCheck2 />
            <strong>{t.common.established}</strong>
            <span>{t.home.servingCommunity}</span>
          </div>
          <div className="highlight-item">
            <MapPin />
            <strong>{t.common.sharjah}</strong>
            <span>{t.home.locationNote}</span>
          </div>
          <div className="highlight-item">
            <Clock3 />
            <strong>{t.common.openHours}</strong>
            <span>{t.common.open}</span>
          </div>
        </div>
      </section>
      <GovernmentLogosCarousel />
      <section className="section services-overview">
        <div className="container">
          <SectionTitle
            eyebrow={t.home.servicesEyebrow}
            title={t.home.servicesTitle}
            text={t.home.servicesText}
          />
          <div className="service-grid">
            {homeServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
          <div className="center-action">
            <Link className="button button-quiet" to="/services">
              {t.common.viewAll}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section why-section">
        <div className="container why-grid">
          <div className="why-visual">
            <img
              src={`${import.meta.env.BASE_URL}assets/why-ramz.jpg`}
              alt="A documentation consultant helping a customer review visa paperwork in a modern Sharjah office"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <SectionTitle eyebrow={t.home.whyEyebrow} title={t.home.whyTitle} />
            <div className="value-list">
              <div>
                <b>01</b>
                <span>
                  <strong>{t.home.valueReliable}</strong>
                  <small>{t.home.valueReliableText}</small>
                </span>
              </div>
              <div>
                <b>02</b>
                <span>
                  <strong>{t.home.valueProfessional}</strong>
                  <small>{t.home.valueProfessionalText}</small>
                </span>
              </div>
              <div>
                <b>03</b>
                <span>
                  <strong>{t.home.valueConvenient}</strong>
                  <small>{t.home.valueConvenientText}</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section about-preview">
        <div className="container about-preview-inner">
          <div>
            <SectionTitle
              eyebrow={t.home.aboutEyebrow}
              title={t.home.aboutTitle}
              text={t.home.aboutText}
            />
            <Link className="text-link" to="/about">
              {t.common.learnMore}
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="about-quote">
            <span>“</span>
            <p>{t.about.commitment}</p>
            <small>— Ramz Al Rahmaniah</small>
          </div>
        </div>
      </section>
      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            {/* <span className="eyebrow">{t.common.contactUs}</span> */}
            <h2>{t.home.ctaTitle}</h2>
            <p>{t.home.ctaText}</p>
          </div>
          <div className="cta-actions">
            <Link className="button button-light" to="/contact">
              {t.common.contactUs}
              <ArrowRight size={17} />
            </Link>
            <WhatsAppButton label={t.common.whatsappNow} />
          </div>
        </div>
      </section>
    </div>
  );
}
