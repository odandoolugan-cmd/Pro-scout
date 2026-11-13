// 🧬 INYECTOR AUTOMÁTICO DEL PANEL DE AUTO-EVOLUCIÓN
(function() {
    console.log("🧬 AutoEvolucion UI cargado. Esperando análisis...");
    
    // Observamos los cambios en el contenedor de la tarjeta del jugador
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Verificamos si ya existe el panel de AutoEvolución
                if (document.getElementById('auto-evolucion-panel')) return;
                
                // Verificamos si hay una tarjeta de jugador
                const playerCard = document.querySelector('.player-card-big');
                if (playerCard && window.AutoEvolucion && window.currentPlayer) {
                    try {
                        const stats = window.AutoEvolucion.getStats();
                        const evoHTML = `
                        <div id="auto-evolucion-panel" style="margin-top:10px; padding:12px; border-radius:10px; background:rgba(15, 23, 42, 0.9); border:1px solid #334155; font-family:'Courier New', Courier, monospace; border-left:4px solid #8b5cf6;">
                            <div style="font-size:0.7rem; color:#94a3b8; text-transform:uppercase; margin-bottom:5px;">🧬 AUTO-EVOLUCIÓN</div>
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <div>
                                    <div style="font-size:0.6rem; color:#64748b;">PRECISIÓN</div>
                                    <div style="font-size:1.1rem; font-weight:bold; color:#10b981;">${stats.precision}%</div>
                                </div>
                                <div>
                                    <div style="font-size:0.6rem; color:#64748b;">GENERACIÓN</div>
                                    <div style="font-size:1.1rem; font-weight:bold; color:#f59e0b;">${stats.generacion}</div>
                                </div>
                                <div>
                                    <div style="font-size:0.6rem; color:#64748b;">ANÁLISIS</div>
                                    <div style="font-size:1.1rem; font-weight:bold; color:#3b82f6;">${stats.total}</div>
                                </div>
                            </div>
                            <div style="font-size:0.55rem; color:#64748b; margin-top:8px;">
                                El sistema aprende de cada análisis. A mayor precisión, más fiable es su recomendación.
                            </div>
                        </div>`;
                        playerCard.parentNode.insertBefore(evoHTML, playerCard.nextSibling);
                        console.log("🧬 Panel de AutoEvolución añadido.");
                    } catch(e) { console.error('Error AutoEvolucion UI:', e); }
                }
            }
        });
    });

    // Empezamos a observar el contenedor principal
    const container = document.getElementById('playerInfoContainer');
    if (container) {
        observer.observe(container, { childList: true, subtree: true });
    } else {
        console.warn("🧬 playerInfoContainer no encontrado. Reintentando en 1s...");
        setTimeout(() => {
            const c = document.getElementById('playerInfoContainer');
            if (c) observer.observe(c, { childList: true, subtree: true });
        }, 1000);
    }
})();
