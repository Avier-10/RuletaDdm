// Convierte coordenadas polares a coordenadas cartesianas para SVG.
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

// Describe un arco de rueda en formato de ruta SVG.
function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${x} ${y}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

function WheelSection({ section }) {
  const CENTER = 300;
  const RADIUS = 300;
  const TEXT_RADIUS = 180;

  const startAngle = section.degree;
  const endAngle = section.degree + section.size;
  const path = describeArc(CENTER, CENTER, RADIUS, startAngle, endAngle);
  const textAngle = startAngle + section.size / 2;
  const textPosition = polarToCartesian(CENTER, CENTER, TEXT_RADIUS, textAngle);

  return (
    <g>
      <path d={path} fill={section.color} stroke="black" strokeWidth="2" />
      <text
        x={textPosition.x}
        y={textPosition.y}
        fill="white"
        fontSize="20"
        fontWeight="bold"
        textAnchor="middle"
        alignmentBaseline="middle"
        transform={`rotate(${textAngle} ${textPosition.x} ${textPosition.y})`}
      >
        {section.label}
      </text>
    </g>
  );
}

export default WheelSection;
