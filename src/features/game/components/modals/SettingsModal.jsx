import { updateProbability } from "../../logic/probabilityLogic";
import ModalShell from "./ModalShell.jsx";

function SettingsModal({ sections, setSections, onClose }) {
  const handleChangeProbability = (id, value) => {
    setSections((prevSections) => updateProbability(prevSections, id, value));
  };

  const total = sections.reduce((acc, section) => acc + section.probability, 0);

  return (
    <ModalShell title="Configuración de la ruleta" className="modal--settings">
      <div className="settingsModalHeader">
        <p>Nombre</p>
        <p>Probabilidad (%)</p>
      </div>

      <div className="settingsModalGrid">
        {sections.map((section) => (
          <div key={section.id} className="settingsModalRow">
            <label htmlFor={`prob-${section.id}`}>{section.label}</label>
            <input
              id={`prob-${section.id}`}
              type="number"
              value={section.probability}
              onChange={(e) =>
                handleChangeProbability(section.id, e.target.value)
              }
            />
          </div>
        ))}
      </div>

      <p className="settingsModalTotal">
        Total: <span>{total}%</span>
      </p>

      <div className="modal-buttons">
        <button type="button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </ModalShell>
  );
}

export default SettingsModal;