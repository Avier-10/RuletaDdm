function LoaderColumn({ icon, className }) {
  const icons = Array.from({ length: 40 });

  return (
    <div className={`container ${className}`}>
      <div className="carousel">
        {icons.map((_, i) => (
          <img
            key={i}
            src={icon}
            alt=""
            className="loaderIcon"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}

export default LoaderColumn;
