// 🧬 MODO OJEADOR - VERSIÓN FINAL (LEE VALORES REALES)
(function() {
    console.log("🧬 Ojeador Final cargado.");
    
    function inyectarVeredicto() {
        const panelAnterior = document.getElementById('modo-ojeador-panel');
        if (panelAnterior) panelAnterior.remove();
        
        const playerCard = document.querySelector('.player-card-big');
        if (!playerCard || !window.currentPlayer) return;
        
        try {
            const p = window.currentPlayer;
            
            // Leer Setun directamente del panel (por el color del borde)
            const setunPanel = document.querySelector('[style*="NÚCLEO SETUN"]');
            let setunDecision = 'MANTENER (0)';
            if (setunPanel) {
                const texto = setunPanel.textContent;
                if (texto.includes('COMPRAR')) setunDecision = 'COMPRAR (1)';
                else if (texto.includes('VENDER')) setunDecision = 'VENDER (-1)';
                else setunDecision = 'MANTENER (0)';
            }
            
            // Leer BitNet directamente del panel
            const bitnetPanel = document.querySelector('[style*="SCOUT NEURONAL"]');
            let bitnetNivel = 'ROTACIÓN';
            if (bitnetPanel) {
                const texto = bitnetPanel.textContent;
                if (texto.includes('ÉLITE MUNDIAL')) bitnetNivel = 'ÉLITE MUNDIAL';
                else if (texto.includes('GALÁCTICO')) bitnetNivel = 'GALÁCTICO';
                else if (texto.includes('JUGADOR DESTACADO')) bitnetNivel = 'JUGADOR DESTACADO';
                else if (texto.includes('ROTACIÓN')) bitnetNivel = 'ROTACIÓN / PROMESA';
                else bitnetNivel = 'DESCARTE';
            }
            
            // Leer Finanzas
            const finanzasPanel = document.querySelector('[style*="SETUN FINANCIERO"]');
            let finanzasEstado = 'PRECIO JUSTO';
            if (finanzasPanel) {
                const texto = finanzasPanel.textContent;
                if (texto.includes('INFRAVALORADO')) finanzasEstado = 'INFRAVALORADO';
                else if (texto.includes('SOBREVALORADO')) finanzasEstado = 'SOBREVALORADO';
            }
            
            // Leer Lesiones
            const lesionesPanel = document.querySelector('[style*="RIESGO DE LESIÓN"]');
            let lesionesNivel = 'BAJO';
            if (lesionesPanel) {
                const texto = lesionesPanel.textContent;
                if (texto.includes('ALTO')) lesionesNivel = 'ALTO';
                else if (texto.includes('MEDIO')) lesionesNivel = 'MEDIO';
            }
            
            console.log(`🧬 OJEADOR DEBUG: Setun=${setunDecision} | BitNet=${bitnetNivel} | Finanzas=${finanzasEstado} | Lesiones=${lesionesNivel}`);
            
            // Generar veredicto
            let recomendacion, color, razon, inversion;
            
            if (setunDecision.includes('COMPRAR') && bitnetNivel.includes('ÉLITE') && lesionesNivel === 'BAJO') {
                recomendacion = 'FICHAJE PRIORITARIO'; color = '#10b981';
                razon = 'Rendimiento de élite, bajo riesgo físico y precio justo.';
                inversion = 'Inversión recomendada. Negociar en los próximos 15 días.';
            } else if (setunDecision.includes('COMPRAR') && !bitnetNivel.includes('ÉLITE')) {
                recomendacion = 'APUESTA TÁCTICA'; color = '#3b82f6';
                razon = 'Setun lo recomienda, pero BitNet no lo ve como élite. Puede ser un jugador de rotación valioso.';
                inversion = 'Inversión moderada. No pagar sobreprecio.';
            } else if (setunDecision.includes('MANTENER') && (bitnetNivel.includes('ROTACIÓN') || bitnetNivel.includes('DESTACADO'))) {
                recomendacion = 'SEGUIMIENTO ESTRECHO'; color = '#8b5cf6';
                razon = 'Jugador con potencial pero sin urgencia de fichaje. Seguir su evolución.';
                inversion = 'Esperar a final de temporada para evaluar.';
            } else if (setunDecision.includes('VENDER') || bitnetNivel.includes('DESCARTE')) {
                recomendacion = 'EVITAR FICHAJE'; color = '#ef4444';
                razon = 'Rendimiento insuficiente o riesgo elevado.';
                inversion = 'No invertir. Buscar alternativas.';
            } else {
                recomendacion = 'MANTENER'; color = '#f59e0b';
                razon = 'Perfil estándar. Sin urgencias.';
                inversion = 'Valorar según necesidad del equipo.';
            }
            
            console.log(`🧬 Veredicto: ${recomendacion}`);
            
            const panelHTML = `
            <div id="modo-ojeador-panel" style="margin-top:15px; padding:15px; border-radius:10px; background:linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95)); border:2px solid ${color}; font-family:'Inter', sans-serif; box-shadow:0 0 15px ${color}40;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <div style="font-size:0.8rem; color:#94a3b8; text-transform:uppercase; font-weight:bold;">🧠 VEREDICTO DEL OJEADOR</div>
                    <div style="font-size:0.6rem; color:${color}; border:1px solid ${color}; padding:2px 8px; border-radius:10px;">ANÁLISIS FINAL</div>
                </div>
                <div style="font-size:1.4rem; font-weight:bold; color:${color}; margin-bottom:8px;">${recomendacion}</div>
                <div style="font-size:0.8rem; color:#cbd5e1; margin-bottom:8px; line-height:1.4;">${razon}</div>
                <div style="font-size:0.75rem; color:#f59e0b; background:rgba(245,158,11,0.1); padding:6px; border-radius:6px; border-left:3px solid #f59e0b;">💡 ${inversion}</div>
                <div style="font-size:0.6rem; color:#64748b; margin-top:8px; border-top:1px solid #334155; padding-top:8px;">
                    Datos: Setun: ${setunDecision} | BitNet: ${bitnetNivel} | Finanzas: ${finanzasEstado} | Lesiones: ${lesionesNivel}
                </div>
            </div>`;
            
            playerCard.parentNode.insertBefore(document.createRange().createContextualFragment(panelHTML), playerCard.nextSibling);
            console.log("🧠 Veredicto del Ojeador añadido.");
        } catch(e) { console.error('Error ModoOjeador Final:', e); }
    }

    // Escuchar clic en el botón de buscar
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'searchBtn') {
            console.log("🔍 Búsqueda iniciada. Esperando a que se rendericen los paneles...");
            let intentos = 0;
            const interval = setInterval(function() {
                intentos++;
                // Verificar si los paneles de Setun y BitNet ya existen
                const setunPanel = document.querySelector('[style*="NÚCLEO SETUN"]');
                const bitnetPanel = document.querySelector('[style*="SCOUT NEURONAL"]');
                
                if (setunPanel && bitnetPanel && window.currentPlayer) {
                    clearInterval(interval);
                    console.log("✅ Paneles detectados después de " + intentos + " intentos.");
                    setTimeout(inyectarVeredicto, 500);
                }
                if (intentos > 30) {
                    clearInterval(interval);
                    console.warn("⚠️ No se pudieron detectar los paneles después de 15 segundos.");
                }
            }, 500);
        }
    });
})();
