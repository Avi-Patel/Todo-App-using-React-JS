export const Button = ({ label, onClick, extraClasses }) => (
  <button className={`green-btn mar8 ${extraClasses}`} onClick={onClick}>
    {label}
  </button>
);
