import './GovernmentLogosCarousel.css';

type GovernmentLogo = {
  name: string;
  image?: string;
  abbreviation?: string;
};

const governmentLogos: GovernmentLogo[] = [
  // { name: 'UAE Government', abbreviation: 'UAE\nGovernment' },
  // { name: 'Dubai Police', abbreviation: 'Dubai\nPolice' },
  { name: 'ICP', image: '/assets/service-logos/federalauthority.png' },
  // { name: 'Emirates', abbreviation: 'Emirates' },
  { name: 'Amer', image: '/assets/service-logos/amer-seeklogo.png' },
  { name: 'RTA Dubai', image: '/assets/service-logos/rta.png' },
  // { name: 'MOHRE', abbreviation: 'MOHRE' },
  { name: 'Tasheel', image: '/assets/service-logos/tasheel.png' },
  // { name: 'Dubai Health Authority', abbreviation: 'DHA' },
  { name: 'Ministry of Health', image: '/assets/service-logos/ministryofhealth.png' },
  { name: 'Ministry of Foreign Affairs', image: '/assets/service-logos/ministryofforeign.png' },
  { name: 'Ministry of Interior', image: '/assets/service-logos/ministeryofinterior.png' },
  { name: 'Government of Sharjah', image: '/assets/service-logos/govermentofsharjah.png' },
  { name: 'Sharjah Municipality', image: '/assets/service-logos/sharjamuncipality.png' },
];

function LogoItem({ logo, duplicate = false }: { logo: GovernmentLogo; duplicate?: boolean }) {
  return (
    <li className="government-logos-carousel__item" aria-hidden={duplicate || undefined}>
      <div className="government-logos-carousel__circle">
        {logo.image ? (
          <img src={logo.image} alt={duplicate ? '' : logo.name} width="72" height="72" loading="lazy" />
        ) : (
          <span className="government-logos-carousel__text" aria-label={logo.name}>
            {logo.abbreviation?.split('\n').map((line) => (
              <span key={line}>{line}</span>
            ))}
          </span>
        )}
      </div>
      {/* {!duplicate && <span className="government-logos-carousel__label">{logo.name}</span>} */}
    </li>
  );
}

export function GovernmentLogosCarousel() {
  return (
    <section className="government-logos-carousel" aria-labelledby="government-logos-title">
      <div className="government-logos-carousel__container">
        <p className="government-logos-carousel__eyebrow">We Provide</p>
        <h2 id="government-logos-title">All Government Services</h2>
      </div>

      <div className="government-logos-carousel__viewport">
        <div className="government-logos-carousel__track">
          <ul className="government-logos-carousel__list">
            {governmentLogos.map((logo) => <LogoItem key={logo.name} logo={logo} />)}
          </ul>
          <ul className="government-logos-carousel__list" aria-hidden="true">
            {governmentLogos.map((logo) => <LogoItem key={`duplicate-${logo.name}`} logo={logo} duplicate />)}
          </ul>
        </div>
      </div>
    </section>
  );
}
