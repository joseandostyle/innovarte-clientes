/* Catálogo de muestra de Electro House, común a la web y al panel de administración.
   Productos, precios, taras, clases energéticas, medidas y fichas técnicas son de muestra;
   con el catálogo real salen de la ficha oficial del fabricante (EPREL).
   marca: [x, y, tamaño] de la tara, en % de la caja cuadrada de la foto (la misma en web y panel). */
var CATS={
  lavado:{n:"Lavado",d:"Lavadoras, secadoras y lavavajillas",f:"lavadora-1"},
  frio:{n:"Frío",d:"Frigoríficos y combis",f:"frigorifico-combi"},
  coccion:{n:"Cocción",d:"Hornos, placas, campanas y microondas",f:"horno"},
  pequeno:{n:"Pequeño electrodoméstico",d:"Freidoras de aire y cafeteras",f:"freidora-1"},
  clima:{n:"Climatización",d:"Aire acondicionado portátil",f:"aire"},
  canapes:{n:"Canapés",d:"Canapés abatibles de madera",f:"canape"}
};
var P=[
 {id:"lavadora-9kg",n:"Lavadora 9 kg carga frontal",c:"lavado",f:"lavadora-1",p:349,a:499,e:"A",med:[85,60,55],tara:"Rozadura en el lateral izquierdo. Instalada no se ve.",marca:[22,50,24],desc:"Lavadora de carga frontal de 9 kg con motor inverter, 15 programas, lavado rápido e inicio diferido.",tec:[["Capacidad","9 kg"],["Centrifugado","1.400 rpm"],["Clase energética","A"],["Programas","15"],["Motor","Inverter"],["Inicio diferido","Sí"]],syn:"lavar ropa"},
 {id:"frigorifico-combi-no-frost",n:"Frigorífico combi No Frost 186 cm",c:"frio",f:"frigorifico-combi",p:499,a:699,e:"D",med:[186,60,66],tara:"Pequeño golpe en la puerta de abajo.",marca:[50,72,26],desc:"Combi No Frost de 186 cm en acero, con cajón de frescos y luz LED.",tec:[["Capacidad total","308 l"],["No Frost","Sí"],["Clase energética","D"],["Puertas","2"],["Color","Acero"],["Luz interior","LED"]],syn:"nevera frigo refrigerador combi"},
 {id:"microondas-grill-25l",n:"Microondas con grill 25 L",c:"coccion",f:"microondas-1",p:69,a:99,med:[39,59,32],tara:"Arañazo leve en la parte de arriba.",marca:[50,30,20],desc:"Microondas integrable de 25 litros con grill y descongelación automática.",tec:[["Capacidad","25 l"],["Potencia","900 W"],["Grill","Sí"],["Instalación","Integrable"]],syn:"micro grill"},
 {id:"horno-multifuncion",n:"Horno multifunción",c:"coccion",f:"horno",p:279,a:399,e:"A",med:[60,60,55],tara:"Solo la caja dañada: el aparato está perfecto.",marca:[50,30,20],desc:"Horno multifunción integrable con aire caliente y limpieza fácil.",tec:[["Capacidad","71 l"],["Clase energética","A"],["Funciones","8"],["Instalación","Integrable"]],syn:"horno pirolitico"},
 {id:"lavavajillas-60-13",n:"Lavavajillas 60 cm, 13 servicios",c:"lavado",f:"lavavajillas",p:329,a:459,e:"E",med:[85,60,60],tara:"Marca en el panel frontal, junto al asa.",marca:[50,20,22],desc:"Lavavajillas de libre instalación de 60 cm para 13 servicios, con inicio diferido.",tec:[["Servicios","13"],["Clase energética","E"],["Programas","6"],["Ancho","60 cm"]],syn:"friegaplatos lavaplatos"},
 {id:"frigorifico-4-puertas",n:"Frigorífico 4 puertas",c:"frio",f:"frigorifico-4p",p:899,a:1199,e:"E",med:[182,84,70],tara:"Abolladura pequeña en el lateral.",marca:[38,60,22],desc:"Frigorífico de cuatro puertas No Frost con zona de temperatura variable.",tec:[["Capacidad total","540 l"],["No Frost","Sí"],["Clase energética","E"],["Puertas","4"]],syn:"nevera frigo refrigerador americano"},
 {id:"secadora-8kg",n:"Secadora 8 kg",c:"lavado",f:"secadora",p:389,a:549,e:"B",med:[85,60,60],tara:"Rozadura en la tapa de arriba.",marca:[50,18,22],desc:"Secadora de 8 kg con bomba de calor y sensor de humedad.",tec:[["Capacidad","8 kg"],["Tecnología","Bomba de calor"],["Clase energética","B"]],syn:"secar ropa"},
 {id:"aire-portatil",n:"Aire acondicionado portátil",c:"clima",f:"aire",p:259,a:349,e:"A",med:[70,35,35],tara:"Caja abierta, sin estrenar.",marca:[50,50,22],desc:"Aire acondicionado portátil con deshumidificador y mando a distancia.",tec:[["Potencia frío","2.250 frigorías"],["Clase energética","A"],["Deshumidificador","Sí"]],syn:"climatizador frio aire acondicionado"},
 {id:"freidora-aire-5-5l",n:"Freidora de aire 5,5 L",c:"pequeno",f:"freidora-1",p:79,a:109,tara:"Caja abierta, sin estrenar.",marca:[50,45,24],med:[33,29,36],desc:"Freidora de aire de 5,5 litros con programas automáticos.",tec:[["Capacidad","5,5 l"],["Programas","7"]],syn:"airfryer air fryer freidora aire sin aceite"},
 {id:"freidora-aire-4l",n:"Freidora de aire 4 L",c:"pequeno",f:"freidora-2",p:59,med:[30,27,33],desc:"Freidora de aire de 4 litros con cesta antiadherente.",tec:[["Capacidad","4 l"]],syn:"airfryer air fryer freidora aire sin aceite"},
 {id:"cafetera-superautomatica",n:"Cafetera superautomática",c:"pequeno",f:"cafetera",p:229,a:299,med:[35,24,43],desc:"Cafetera superautomática con molinillo y vaporizador.",tec:[["Molinillo","Integrado"],["Vaporizador","Sí"]],syn:"cafe expreso espresso"},
 {id:"placa-induccion-3",n:"Placa de inducción 3 zonas",c:"coccion",f:"placa",p:249,med:[6,59,52],desc:"Placa de inducción de 3 zonas con control táctil.",tec:[["Zonas","3"],["Control","Táctil"],["Ancho","60 cm"]],syn:"induccion vitro vitroceramica fuegos"},
 {id:"campana-60",n:"Campana extractora 60 cm",c:"coccion",f:"campana",p:149,e:"C",med:[64,60,50],desc:"Campana decorativa de pared de 60 cm con luz LED.",tec:[["Ancho","60 cm"],["Clase energética","C"],["Luz","LED"]],syn:"extractor humos"},
 {id:"microondas-20l",n:"Microondas 20 L",c:"coccion",f:"microondas-2",p:79,med:[26,45,34],desc:"Microondas de 20 litros con 5 niveles de potencia.",tec:[["Capacidad","20 l"],["Potencia","700 W"]],syn:"micro"},
 {id:"lavadora-8kg",n:"Lavadora 8 kg",c:"lavado",f:"lavadora-2",p:399,e:"A",med:[85,60,57],desc:"Lavadora de 8 kg con motor inverter y programa rápido.",tec:[["Capacidad","8 kg"],["Centrifugado","1.200 rpm"],["Clase energética","A"]],syn:"lavar ropa"},
 {id:"canape-madera",n:"Canapé abatible de madera",c:"canapes",f:"canape",p:199,desde:true,syn:"canape somier cama abatible"}
];
var EXT={secadora:"png","hero-frigorifico-combi":"png","hero-lavavajillas":"png","hero-freidora-1":"png"};
var RAIZ_FOTOS=window.RAIZ_FOTOS||"fotos/";
function src(f){ return /^data:/.test(f)?f:RAIZ_FOTOS+f+"."+(EXT[f]||"jpg"); }
var PANEL_CLAVE="eh-panel-v1";
function leerPanel(){ try{ return JSON.parse(localStorage.getItem(PANEL_CLAVE)||"{}"); }catch(e){ return {}; } }
function guardarPanel(d){ localStorage.setItem(PANEL_CLAVE,JSON.stringify(d)); }
/* Lo que se cambia en el panel (en este mismo navegador) se aplica a la web */
function aplicarPanel(lista){
  var d=leerPanel(), c=d.cambios||{}, v=new Set(d.vendidos||[]);
  lista.forEach(function(x){ if(c[x.id]) Object.assign(x,c[x.id]); });
  (d.nuevos||[]).forEach(function(n){ lista.push(n); });
  for(var k=lista.length-1;k>=0;k--) if(v.has(lista[k].id)) lista.splice(k,1);
  return lista;
}

/* Lo que la tienda puede cambiar desde el panel (textos, portada, datos, envíos, fotos). */
var WEB_DEFECTO={
  barra:"Envíos a toda la provincia de Alicante y Murcia",
  titulo:["Outlet de","electrodomésticos"],
  sello:["24/48 H","Pídelo hoy y lo tienes en 24/48 h"],
  subtitulo:"Nuevos, de las mejores marcas, con una tara estética de exposición. Te la enseñamos en foto antes de comprar.",
  ventajas:["Medimos gratis","Te lo subimos gratis","Instalación gratis","Envío en 24/48 h"],
  marcas:"Balay, AEG, Candy, LG, Bosch, Electrolux, Fagor, Hoover, Grundig, Edesa, Aristón, Junkers, Braun",
  escaparate:["frigorifico-combi-no-frost","lavavajillas-60-13","freidora-aire-5-5l"],
  destacados:["lavadora-8kg","placa-induccion-3","cafetera-superautomatica","campana-60","microondas-20l","freidora-aire-4l"],
  tienda:{telefono:"865 53 59 40",whatsapp:"",direccion:"C/ Obispo Rocamora, 32",cp:"03300 Orihuela (Alicante)",horario:""},
  envios:{zonas:[{n:"Orihuela y Vega Baja",precio:"",plazo:"24/48 h"},{n:"Resto de Alicante",precio:"",plazo:"24/48 h"},{n:"Región de Murcia",precio:"",plazo:"24/48 h"}],retirada:"",horaLimite:"",gratisDesde:""},
  financiacion:"",
  cocinas:[],
  descanso:{colchones:[],sofas:[],muebles:[]},
  canapes:[{m:"90 × 190",p:""},{m:"105 × 190",p:""},{m:"135 × 190",p:""},{m:"150 × 190",p:""},{m:"160 × 200",p:""}]
};
function webConfig(){
  var w=leerPanel().web||{}, D=WEB_DEFECTO, r=Object.assign({},D,w);
  r.tienda=Object.assign({},D.tienda,w.tienda||{});
  r.envios=Object.assign({},D.envios,w.envios||{});
  r.descanso=Object.assign({},D.descanso,w.descanso||{});
  return r;
}
/* Los pedidos, reservas y presupuestos de la web llegan al panel */
function anotar(tipo,datos){
  var d=leerPanel(); d.pedidos=d.pedidos||[];
  d.pedidos.unshift(Object.assign({id:"P"+Date.now().toString(36).toUpperCase(),tipo:tipo,fecha:new Date().toISOString(),estado:"nuevo"},datos));
  try{ guardarPanel(d); }catch(e){}
}
function telLink(t){ var n=String(t||"").replace(/\D/g,"").replace(/^34(?=\d{9}$)/,""); return n?"+34"+n:""; }
