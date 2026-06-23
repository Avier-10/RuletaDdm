import "../../styles/modal.css";

function ModalShell({ title, children, footer, className = "" }) {
  const classes = ["modal", className].filter(Boolean).join(" ");

  return (
    <div className="modal-overlay" role="presentation">
      <div className={classes} role="dialog" aria-modal="true">
        {title ? <h2 className="modal-title">{title}</h2> : null}
        {children}
        {footer ? <div className="modal-buttons">{footer}</div> : null}
      </div>
    </div>
  );
}

export default ModalShell;
