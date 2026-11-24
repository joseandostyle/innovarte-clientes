// Formulario de preguntas de Lismartsa (lo usan el briefing y el cuestionario de trabajo).
// Guarda lo escrito en el dispositivo, cuenta lo contestado y lo envía al correo de Innovarte
// con Web3Forms (clave pública: solo sirve para recibir el formulario). Si falla, ofrece WhatsApp.
// Uso: montarFormulario({ contenedor, clave, asunto, deQuien, bloques, alEnviar })
//   pregunta = { id, t, a, tipo: "texto" | "una" | "varias", opciones:[…], nota:"texto del campo extra", enlaces:true }
(function(){
const WEB3FORMS_KEY = "8e45e3b3-1498-48a4-8e11-3e9857dc0dc4";
const WA = "34634452534";
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

window.montarFormulario = function(cfg){
  const raiz = document.querySelector(cfg.contenedor);
  const TODAS = cfg.bloques.flatMap(b => b.preguntas);
  const ENVIADO = cfg.clave + "-enviado";
  let estado = {};
  try { estado = JSON.parse(localStorage.getItem(cfg.clave) || "{}"); } catch(e) {}
  const guardar = () => { try { localStorage.setItem(cfg.clave, JSON.stringify(estado)); } catch(e) {} };

  function htmlPregunta(p, n){
    let h = `<div class="preg" data-id="${p.id}"><div class="preg-cab"><span class="n" aria-hidden="true">${n}</span>
      <div class="preg-t"><p class="t" id="${p.id}_t">${esc(p.t)}</p>${p.a?`<p class="ayuda" id="${p.id}_a">${esc(p.a)}</p>`:""}</div></div><div class="campo">`;
    if (p.tipo === "una" || p.tipo === "varias"){
      const tipo = p.tipo === "una" ? "radio" : "checkbox";
      h += `<div class="chips" role="group" aria-labelledby="${p.id}_t">` + p.opciones.map((o,i) =>
        `<label class="chip"><input type="${tipo}" name="${p.id}" value="${esc(o)}" id="${p.id}_${i}"><span>${esc(o)}</span></label>`).join("") + `</div>`;
      if (p.nota) h += `<label class="extra" for="${p.id}_mas">${esc(p.nota)}</label><textarea id="${p.id}_mas" name="${p.id}_mas" rows="2" placeholder="Opcional"></textarea>`;
    } else {
      h += `<textarea id="${p.id}" name="${p.id}" aria-labelledby="${p.id}_t" ${p.a?`aria-describedby="${p.id}_a"`:""} placeholder="${esc(p.ph||"Vuestra respuesta…")}"></textarea>`;
    }
    if (p.enlaces) h += `<label class="extra" for="${p.id}_enlaces">Enlaces (webs, Instagram…), opcional</label><input type="text" id="${p.id}_enlaces" name="${p.id}_enlaces" inputmode="url" placeholder="Pegad aquí los enlaces">
      <p class="nota-wa">¿Fotos o capturas? Mandádnoslas por <a href="https://wa.me/${WA}?text=${encodeURIComponent(cfg.asunto+" (pregunta "+n+")")}">WhatsApp</a>.</p>`;
    return h + `</div></div>`;
  }

  function pintar(){
    let n = 0, h = `<div class="quien"><p class="eti">Antes de empezar</p><div class="fila">
      <div><label for="${cfg.clave}-nombre">Nombre <span class="req">*</span></label><input type="text" id="${cfg.clave}-nombre" name="nombre" autocomplete="name" required></div>
      <div><label for="${cfg.clave}-cargo">Qué hacéis en Lismartsa (opcional)</label><input type="text" id="${cfg.clave}-cargo" name="cargo" placeholder="Gerencia, administración, supervisión…"></div>
    </div></div>`;
    cfg.bloques.forEach((b, i) => {
      h += `<div class="sub"><p class="eti">${cfg.bloques.length > 1 ? `${i+1} de ${cfg.bloques.length} · ` : ""}${esc(b.titulo)}</p>`;
      for (const p of b.preguntas) h += htmlPregunta(p, ++n);
      h += `</div>`;
    });
    h += `<div class="final">
      <h3>¿Listo?</h3>
      <p>Lo que dejéis en blanco lo hablamos en persona. Podéis cerrar la página y volver: lo escrito se queda guardado en este dispositivo.</p>
      <input type="checkbox" name="botcheck" class="oculto" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button type="button" class="btn" data-r="enviar">Enviar respuestas</button>
      <div class="confirma" data-r="confirma" aria-live="polite">
        <p><b>¿Lo enviamos ya?</b> Después no se podrán cambiar desde aquí (siempre podéis contarnos algo más por WhatsApp).</p>
        <div class="fila"><button type="button" class="btn sec" data-r="repasar">Repasar antes</button><button type="button" class="btn" data-r="si">Sí, enviar</button></div>
      </div>
      <div class="estado" data-r="estado" aria-live="polite"></div>
    </div>`;
    const form = document.createElement("form");
    form.noValidate = true; form.innerHTML = h;
    raiz.innerHTML = ""; raiz.appendChild(form);
    // Rellenar lo guardado
    for (const el of form.elements){
      if (!el.name || el.name === "botcheck" || estado[el.name] === undefined) continue;
      if (el.type === "radio" || el.type === "checkbox") el.checked = [].concat(estado[el.name]).includes(el.value);
      else el.value = estado[el.name];
    }
    return form;
  }

  function leer(form){
    const d = {};
    for (const el of form.elements){
      if (!el.name || el.name === "botcheck") continue;
      if (el.type === "radio" || el.type === "checkbox"){
        if (!el.checked) continue;
        d[el.name] = el.type === "radio" ? el.value : (d[el.name] || []).concat(el.value);
      } else if (el.value.trim()) d[el.name] = el.value.trim();
    }
    return d;
  }
  const contestada = (d, p) => d[p.id] !== undefined || d[p.id+"_mas"] !== undefined;

  function contar(form){
    const d = leer(form); let hechas = 0;
    for (const p of TODAS){ const ok = contestada(d, p); if (ok) hechas++; form.querySelector(`.preg[data-id="${p.id}"]`).classList.toggle("hecha", ok); }
    if (cfg.alContar) cfg.alContar(hechas, TODAS.length);
  }

  function texto(d){
    const lin = [`Nombre: ${d.nombre||"-"}`, `En Lismartsa: ${d.cargo||"-"}`, ""]; let n = 0;
    for (const b of cfg.bloques){
      lin.push(`== ${b.titulo.toUpperCase()} ==`, "");
      for (const p of b.preguntas){
        n++; lin.push(`${n}. ${p.t}`);
        const v = d[p.id];
        lin.push(v === undefined ? "(en blanco)" : [].concat(v).join(", "));
        if (d[p.id+"_mas"]) lin.push(`${p.nota||"Más"}: ${d[p.id+"_mas"]}`);
        if (d[p.id+"_enlaces"]) lin.push(`Enlaces: ${d[p.id+"_enlaces"]}`);
        lin.push("");
      }
    }
    return lin.join("\n");
  }

  function pintarHecho(d, fecha){
    let n = 0;
    const res = d ? `<div class="resumen">` + TODAS.map(p => { n++; const v = d[p.id]; const extra = [d[p.id+"_mas"], d[p.id+"_enlaces"]].filter(Boolean);
      return v !== undefined || extra.length ? `<div><b>${n}. ${esc(p.t)}</b>${esc([v===undefined?"":[].concat(v).join(", ")].concat(extra).filter(Boolean).join("\n"))}</div>` : ""; }).join("") + `</div>` : "";
    raiz.innerHTML = `<div class="hecho"><p class="eti">Recibido</p><h3>Gracias, ya nos ha llegado.</h3>
      <p>Enviado${fecha?` el ${esc(fecha)}`:""}. Si queréis añadir o cambiar algo, o mandarnos fotos, escribidnos por <a href="https://wa.me/${WA}">WhatsApp (634 45 25 34)</a>.</p>${res}</div>`;
    if (cfg.alEnviar) cfg.alEnviar();
  }

  let ya = null;
  try { ya = JSON.parse(localStorage.getItem(ENVIADO) || "null"); } catch(e) {}
  if (ya) { pintarHecho(ya.respuestas, ya.fecha); return; }

  const form = pintar();
  const $ = r => form.querySelector(`[data-r="${r}"]`);
  contar(form);
  form.addEventListener("input", () => { estado = leer(form); guardar(); contar(form); });
  form.addEventListener("change", () => { estado = leer(form); guardar(); contar(form); });
  form.addEventListener("submit", e => e.preventDefault());
  $("enviar").addEventListener("click", () => {
    const est = $("estado"); est.textContent = ""; est.className = "estado";
    const nombre = form.elements.nombre;
    if (!nombre.value.trim()){
      est.textContent = "Falta vuestro nombre (al principio del formulario)."; est.className = "estado err";
      nombre.focus({preventScroll:true}); nombre.scrollIntoView({behavior:"smooth", block:"center"}); return;
    }
    $("confirma").classList.add("on"); $("confirma").scrollIntoView({behavior:"smooth", block:"nearest"});
  });
  $("repasar").addEventListener("click", () => { $("confirma").classList.remove("on"); raiz.scrollIntoView({behavior:"smooth"}); });
  $("si").addEventListener("click", async ev => {
    const btn = ev.currentTarget, est = $("estado");
    if (form.elements.botcheck.checked) return;
    btn.disabled = true; btn.textContent = "Enviando…";
    const d = leer(form), t = texto(d);
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method:"POST",
        headers:{ "Content-Type":"application/json", "Accept":"application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: cfg.asunto + " (" + (d.nombre||"") + ")", from_name: cfg.deQuien, respuestas: t }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.success) throw new Error(j.message || ("Error " + r.status));
      const fecha = new Date().toLocaleString("es-ES", {dateStyle:"long", timeStyle:"short"});
      try { localStorage.setItem(ENVIADO, JSON.stringify({fecha, respuestas:d})); } catch(e) {}
      pintarHecho(d, fecha);
      raiz.scrollIntoView({behavior:"smooth"});
    } catch(err){
      btn.disabled = false; btn.textContent = "Sí, enviar";
      est.className = "estado err";
      const wa = "https://wa.me/" + WA + "?text=" + encodeURIComponent(cfg.asunto + "\n\n" + t);
      est.innerHTML = `No se ha podido enviar (puede ser la conexión). Probad otra vez en un momento o <a href="${wa}">mandádnoslas por WhatsApp</a>; no se pierde nada de lo escrito.`;
    }
  });
};
})();
