export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark ${compact ? 'compact' : ''}`}>
      <img
        className="brand-logo-image"
        src={`${import.meta.env.BASE_URL}assets/ramzalrahmaniah.png`}
        alt="Ramz Al Rahmaniah Typing and Documents Copying"
      />
      <span className="brand-copy">
        <strong>RAMZ</strong>
        <small>AL RAHMANIAH</small>
        <em>TYPING &amp; DOCUMENTS COPYING</em>
      </span>
    </span>
  );
}
