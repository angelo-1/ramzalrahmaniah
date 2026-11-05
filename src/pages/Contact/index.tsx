import { FormEvent, useState } from "react";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { services } from "../../data/services";
import {
  BUSINESS_ADDRESS,
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_EMBED_URL,
} from "../../data/businessLocation";
import { whatsappUrl } from "../../components/WhatsAppButton";
export function Contact() {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const service = String(data.get("service") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (
      !name ||
      !phone ||
      !service ||
      !message ||
      !/^\S+@\S+\.\S+$/.test(email)
    ) {
      setStatus("error");
      return;
    }
    const body = `Hello Ramz Al Rahmaniah, my name is ${name}.\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`;
    window.open(whatsappUrl(body), "_blank", "noopener,noreferrer");
    setStatus("success");
    e.currentTarget.reset();
  }
  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h1>{t.contact.title}</h1>
          <p>{t.contact.text}</p>
        </div>
      </section>
      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-details">
            <div className="contact-detail">
              <span>
                <Phone />
              </span>
              <div>
                <small>{t.contact.phone}</small>
                <a href="tel:+971522550225">+971 52 255 0225</a>
              </div>
            </div>
            <div className="contact-detail">
              <span>
                <Mail />
              </span>
              <div>
                <small>{t.contact.email}</small>
                <a href="mailto:RAMZTTDC@GMAIL.COM">RAMZTTDC@GMAIL.COM</a>
              </div>
            </div>
            <div className="contact-detail">
              <span>
                <MapPin />
              </span>
              <div>
                <small>{t.contact.address}</small>
                <p>{BUSINESS_ADDRESS}</p>
              </div>
            </div>
            <div className="contact-detail">
              <span>
                <Clock3 />
              </span>
              <div>
                <small>{t.contact.hours}</small>
                <p>7:00 AM – 12:00 AM</p>
              </div>
            </div>
            <div className="contact-map">
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                title="Map showing Ramz Typing near Sharjah Immigration, Al Rahmania, Sharjah"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <a
                className="contact-map-open"
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={15} />
                {t.contact.map}
              </a>
            </div>
          </div>
          <form className="enquiry-form" onSubmit={submit} noValidate>
            <h2>{t.contact.formTitle}</h2>
            <div className="form-row">
              <label>
                {t.contact.name}
                <input name="name" required placeholder={t.contact.name} />
              </label>
              <label>
                {t.contact.phoneField}
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+971 50 000 0000"
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                {t.contact.email}
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                />
              </label>
              <label>
                {t.contact.service}
                <select name="service" required defaultValue="">
                  <option value="" disabled>
                    {t.contact.select}
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s[language].title}>
                      {s[language].title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              {t.contact.message}
              <textarea
                name="message"
                required
                rows={5}
                placeholder={t.contact.message}
              />
            </label>
            <button className="button button-primary" type="submit">
              {t.contact.send}
            </button>
            {status === "success" && (
              <p className="form-success">{t.contact.success}</p>
            )}
            {status === "error" && (
              <p className="form-error">{t.contact.error}</p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
