import ModalShell from "../modals/ModalShell.jsx";

function InstructionsModal({ onClose }) {
  return (
    <ModalShell title="Cómo jugar">
      <div class="instructionsContent">
        <div class="instructionsSection">
          <h3 class="instructionsSectionTitle">🎯 Objetivo</h3>

          <p>
            Girá la ruleta y completá los desafíos que aparezcan. Administrá tus
            vidas, utilizá tus comodines en el momento adecuado y evitá quedar
            sin Shots.
          </p>
        </div>

        <div class="instructionsSection">
          <h3 class="instructionsSectionTitle">❓ Verdad</h3>

          <p>
            Deberás responder la pregunta con total sinceridad. Mentirle al
            juego es fácil, mentirle a Sandia no tanto.
          </p>
        </div>

        <div class="instructionsSection">
          <h3 class="instructionsSectionTitle">🔥 Reto</h3>

          <p>
            Deberás realizar la acción indicada por el desafío. Algunos retos
            son instantáneos y otros pueden extenderse durante varios turnos.
          </p>
        </div>

        <div class="instructionsSection">
          <h3 class="instructionsSectionTitle">🎲 Verdad y Reto (F)</h3>

          <p>
            Si la ruleta cae en <strong>F</strong>, deberás completar una
            <strong> Verdad</strong> y un <strong>Reto</strong>.
          </p>
        </div>

        <div class="instructionsSection">
          <h3 class="instructionsSectionTitle">💀 Saltar</h3>

          <p>
            Si no querés responder una Verdad o realizar un Reto, podés utilizar
            la opción <strong>"Saltar"</strong>.
          </p>

          <p>
            Al hacerlo perderás inmediatamente
            <strong> 1 vida (Shot)</strong>.
          </p>

          <p>
            Utilizá esta opción con cuidado, ya que las vidas son limitadas.
          </p>
        </div>

        <div class="instructionsSection">
          <h3 class="instructionsSectionTitle">❤️ Vidas (Shots)</h3>

          <p>Cada jugador dispone de una cantidad limitada de Shots.</p>

          <p>
            Cada vez que pierdas una vida estarás más cerca de la eliminación.
          </p>

          <p>
            <strong>
              Si tus Shots llegan a 0, perdés automáticamente la partida.
            </strong>
          </p>
        </div>

        <div class="instructionsSection">
          <h3 class="instructionsSectionTitle">🃏 Comodines</h3>

          <p>
            Cada jugador posee comodines especiales que pueden ayudarlo durante
            la partida.
          </p>

          <ul>
            <li>
              <strong>Reflejar:</strong> Envía el desafío actual al otro
              jugador.
            </li>

            <li>
              <strong>Cambiar:</strong> Convierte una Verdad en un Reto o un
              Reto en una Verdad.
            </li>
            <li>
              <strong>Proteccion:</strong> Una vez activado, el Escudo protege
              al jugador y le permite <strong>saltar</strong> sin ninguna
              consecuencia.
            </li>
          </ul>

          <p>
            Los comodines tienen usos limitados, por lo que conviene guardarlos
            para situaciones complicadas.
          </p>
        </div>

        <div class="instructionsSection">
          <h3 class="instructionsSectionTitle">⏳ Efectos por turno</h3>

          <p>Algunos retos permanecen activos durante varios turnos.</p>

          <p>
            Cuando te toque un desafío de este tipo, deberás presionar el botón
            <strong>"Completado"</strong> para activar el efecto y continuar
            jugando
          </p>

          <p>
            Mientras el efecto esté activo, aparecerá un indicador mostrando el
            jugador afectado y la cantidad de turnos restantes.
          </p>

          <p>
            El reto deberá seguir respetándose hasta que el contador llegue a
            cero.
          </p>

          <p>
            Los efectos por turno continúan contando incluso si la ruleta vuelve
            a asignarte nuevos desafíos.
          </p>
        </div>

        <div class="instructionsSection">
          <h3 class="instructionsSectionTitle">🔊 Audio</h3>

          <p>
            <em>
              (Si no se escucha el sonido de la ruleta, recargá la página. Esto
              puede afectar a los retos con audio).
            </em>
          </p>
        </div>

        <div className="modal-buttons">
          <button onClick={onClose}>Entendido</button>
        </div>
      </div>
    </ModalShell>
  );
}

export default InstructionsModal;
