// JavaScript de la página SOW / ATELIER

// Temas visuales y etiquetas accesibles de los cuatro carruseles.
// 1. Configuración visual de los carruseles de análisis.
// Tema visual y etiqueta de cada carrusel.
var stageThemes = {
  tiebreak: 'wheel-stage',
  'white-desert': 'expedition-stage',
  'trevor-noah': 'archive-stage',
  era: 'garden-stage'
};

var labels = {
  tiebreak: 'Ruleta de análisis · The Tie-break!',
  'white-desert': 'Cuaderno de expedición · White Desert',
  'trevor-noah': 'Archivo de identidad · Trevor Noah',
  era: 'Jardín de capítulos · ERA Residence'
};
// Busca el texto de análisis que sirve como fuente de datos del carrusel.
document.querySelectorAll('.case').forEach((card)=>{
  var source=card.querySelector('.analysis-text');
  if(!source)return;
  var blocks=[...source.querySelectorAll('h3')].map((heading)=>({
    title:heading.textContent, text:heading.nextElementSibling?.textContent||''
  }));
  if(blocks.length!==9)return;
  var id=card.id, stage=document.createElement('div');
  stage.className=`interactive-analysis ${stageThemes[id]||''}`;
  stage.setAttribute('aria-label',labels[id]||'Recorrido del análisis');
  stage.innerHTML=`<div class="atelier-stage"><div class="stage-content"><div class="stage-kicker">${labels[id]||'Lectura Atelier'}</div><h3 class="stage-title" aria-live="polite"></h3><p class="stage-text" aria-live="polite"></p><div class="stage-meta"><span class="stage-count"></span><div class="stage-controls"><button type="button" class="prev" aria-label="Apartado anterior">←</button><button type="button" class="next" aria-label="Siguiente apartado">→</button></div></div><div class="stage-dots" role="tablist" aria-label="Apartados del análisis"></div></div></div>`;
  source.before(stage);
  source.classList.add('is-enhanced');
  var title=stage.querySelector('.stage-title'), text=stage.querySelector('.stage-text'), count=stage.querySelector('.stage-count'), dots=stage.querySelector('.stage-dots');
  var index=0;
  blocks.forEach((block,i)=>{
    var dot=document.createElement('button');
    dot.type='button';
    dot.setAttribute('role','tab');
    dot.setAttribute('aria-label',block.title);
    dot.setAttribute('aria-selected','false');
    dot.addEventListener('click',()=>show(i));
    dots.append(dot)
  });
  // Actualiza el texto, el contador y el estado visual de los controles.
  function show(next){
    index=(next+blocks.length)%blocks.length;
    title.textContent=blocks[index].title;
    text.textContent=blocks[index].text;
    count.textContent=`${String(index+1).padStart(2,'0')} / 09`;
    dots.querySelectorAll('button').forEach((dot,i)=>{
      dot.classList.toggle('active',i===index);
      dot.setAttribute('aria-selected',String(i===index))
    });
  }
  stage.querySelector('.prev').addEventListener('click',()=>show(index-1));
  stage.querySelector('.next').addEventListener('click',()=>show(index+1));
  show(0);
});
// Las tarjetas finales resumen la promesa, el acierto y la pregunta abierta de cada web.
// Contenido de la síntesis final.
var synthesis = [
  [
    'The Tie-break!',
    'Descubrir jugando.',
    'Convierte la campaña en acción.',
    'Necesita una ruta accesible fuera del juego.'
  ],
  [
    'White Desert',
    'Acceder a lo extraordinario.',
    'Equilibra paisaje y datos operativos.',
    'Debe hacer más visible la responsabilidad ambiental.'
  ],
  [
    'Trevor Noah',
    'Entrar en una mente curiosa.',
    'Hace de la identidad una arquitectura.',
    'Debe cuidar estados de menú, movimiento y carga.'
  ],
  [
    'ERA Residence',
    'Encontrar un lugar al que volver.',
    'Une branding, arquitectura y conversión.',
    'Debe mostrar mejor los datos críticos del proyecto.'
  ]
];
// Se conserva la tabla HTML y se añade una presentación visual en tarjetas.
// Convierte la tabla comparativa en tarjetas visuales sin eliminar la tabla original.
var synthesisBox=document.querySelector('#sintesis .matrix');
if(synthesisBox){
  var cards=document.createElement('div');
  cards.className='synthesis-cards';
  synthesis.forEach(item=>{
    var card=document.createElement('article');
    card.className='synthesis-card';
    card.innerHTML=`<h3>${item[0]}</h3><p><strong>Promesa:</strong> ${item[1]}</p><p><strong>Acierto:</strong> ${item[2]}</p><p><strong>Pregunta abierta:</strong> ${item[3]}</p>`;
    cards.append(card)
  });
  synthesisBox.after(cards)
}
// Ilustraciones SVG decorativas para la sección de aprendizajes.
var art=[`<svg viewBox="0 0 140 120" aria-hidden="true"><ellipse cx="76" cy="72" rx="31" ry="27" fill="#fff" stroke="#c86e66" stroke-width="2"/><circle cx="54" cy="37" r="18" fill="#fff" stroke="#c86e66" stroke-width="2"/><circle cx="94" cy="38" r="18" fill="#fff" stroke="#c86e66" stroke-width="2"/><circle cx="59" cy="39" r="3" fill="#463a33"/><circle cx="88" cy="39" r="3" fill="#463a33"/><path d="M70 48q7 6 14 0M76 50v10M70 61q7 6 14 0" fill="none" stroke="#c86e66" stroke-width="2" stroke-linecap="round"/></svg>`,`<svg viewBox="0 0 140 120" aria-hidden="true"><path d="M70 116C67 90 69 66 70 50" fill="none" stroke="#82917f" stroke-width="3"/><path d="M70 76q-23-20-34 0 19 7 34 0M70 91q25-22 38-4-16 13-38 4" fill="#82917f"/><g fill="#c86e66" stroke="#fffaf2" stroke-width="2"><circle cx="70" cy="38" r="16"/><circle cx="54" cy="43" r="15"/><circle cx="86" cy="43" r="15"/><circle cx="60" cy="25" r="14"/><circle cx="80" cy="25" r="14"/></g><circle cx="70" cy="36" r="9" fill="#e5b755"/></svg>`,`<svg viewBox="0 0 140 120" aria-hidden="true"><path d="M70 8l12 35 37 1-29 22 10 37-30-21-31 21 11-37L21 44l37-1z" fill="#e5b755" stroke="#fffaf2" stroke-width="5"/><path d="M70 18v76M32 45h76" stroke="#f6e7b2" stroke-width="2" opacity=".8"/></svg>`];
// Reflexiones críticas que se muestran debajo de cada análisis.
var reflections={
  tiebreak:'Me quedo con una duda sencilla: ¿jugar nos ayuda a entender mejor la colección o solo consigue que pasemos más tiempo dentro? Una versión sin competición haría la propuesta más abierta.', 'white-desert':'La web habla de ciencia y cuidado, pero esas ideas aparecen después de la promesa de lujo. Me gustaría ver la huella del viaje con la misma fuerza que vemos el paisaje.', 'trevor-noah':'La página se siente cercana, aunque también convierte una persona en un catálogo de contenidos. La identidad funciona mejor cuando todavía deja espacio para la espontaneidad.', era:'La estética vende muy bien la idea de hogar, pero la información importante no debería quedar escondida detrás de las vistas y las flores.'
};
document.querySelectorAll('.case').forEach(card=>{
  var aside=card.querySelector('.critical');
  if(aside&&reflections[card.id])aside.innerHTML=`<strong>Reflexión de la lectura:</strong> ${reflections[card.id]}`
});
document.querySelectorAll('.takeaways article').forEach((card,i)=>{
  var artBox=document.createElement('div');
  artBox.className=`takeaway-art ${['bunny','flower','star'][i]}`;
  artBox.innerHTML=art[i];
  card.prepend(artBox)
});
// Rutas de las imágenes usadas en portada, carruseles y síntesis.
var flowerImage='../imagenes/cala-v2.png';
var starImage='../imagenes/tulipanes-v2.png';
var coverPhoto=document.createElement('div');
coverPhoto.className='cover-photo';
coverPhoto.innerHTML=`<img src="${flowerImage}" alt="Ilustración botánica floral en rosa y amarillo"><span>referencia floral</span>`;
document.querySelector('.cover-inner')?.append(coverPhoto);
document.querySelectorAll('.atelier-stage').forEach(stage=>{
  var photo=document.createElement('img');
  photo.className='stage-photo';
  photo.src=flowerImage;
  photo.alt='Ilustración floral decorativa';
  stage.append(photo)
});
document.querySelectorAll('.synthesis-card').forEach((card,i)=>{
  var image=document.createElement('div');
  image.className='synthesis-image';
  if(i===0){
    image.innerHTML=`<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="64" r="30" fill="#fff" stroke="#c86e66" stroke-width="3"/><circle cx="42" cy="30" r="18" fill="#fff" stroke="#c86e66" stroke-width="3"/><circle cx="78" cy="30" r="18" fill="#fff" stroke="#c86e66" stroke-width="3"/><circle cx="50" cy="61" r="3"/><circle cx="70" cy="61" r="3"/><path d="M55 72q5 5 10 0" fill="none" stroke="#c86e66" stroke-width="2"/></svg>`
  }
  else if(i===1){
    image.innerHTML=`<img src="${flowerImage}" alt="Flores botánicas rosas y amarillas">`
  }
  else if(i===2){
    image.innerHTML=`<img src="${starImage}" alt="Estrella amarilla ilustrada">`
  }
  else{
    image.innerHTML=`<img src="${flowerImage}" alt="Detalle floral decorativo">`
  }
  card.prepend(image)
});
var roseImage='../imagenes/lirio-v2.png';
var botanicalImage='../imagenes/cala-v2.png';
var starImage2='../imagenes/tulipanes-v2.png';
var cover=document.querySelector('.cover-photo');
if(cover){
  cover.querySelector('img').src=roseImage;
  cover.querySelector('img').alt='Ilustración vintage de una rosa';
  cover.querySelector('span')?.remove()
}
var stageImages=[roseImage,botanicalImage,starImage2,botanicalImage];
document.querySelectorAll('.stage-photo').forEach((img,i)=>{
  img.src=stageImages[i%stageImages.length];
  img.alt='Ilustración decorativa del apartado'
});
document.querySelectorAll('.synthesis-image img').forEach((img,i)=>{
  if(i===1){
    img.src=roseImage;
    img.alt='Rosa vintage'
  }
  if(i===2){
    img.src=starImage2;
    img.alt='Estrella vintage'
  }
  if(i===3){
    img.src=botanicalImage;
    img.alt='Flores botánicas'
  }
});
/* Referencias visuales */
// Imágenes finales descargadas y recortadas para el proyecto.
var referenceImages = {
  lily: '../imagenes/lirio-v2.png',
  calla: '../imagenes/cala-v2.png',
  cherries: '../imagenes/cerezas-v2.png',
  tulips: '../imagenes/tulipanes-v2.png',
  bunny: '../imagenes/conejito-v2.png',
  duck: '../imagenes/patito-v2.png'
};

var imageData = [
  [referenceImages.lily, 'Ilustración de dos lirios rosas con tallos verdes'],
  [referenceImages.calla, 'Ilustración botánica de calas rosadas'],
  ['../imagenes/analisis-03-orquidea-azul-hd.png', 'Orquídea azul recortada sin fondo'],
  ['../imagenes/analisis-04-flor-verde-hd.png', 'Flor verde recortada sin fondo']
];
var setImage=(img,data)=>{
  img.src=data[0];
  img.alt=data[1];
  img.removeAttribute('style')
};
var finalCoverPhoto=document.querySelector('.cover-photo');
if(finalCoverPhoto){
  finalCoverPhoto.innerHTML='<img alt="">';
  setImage(finalCoverPhoto.querySelector('img'),[referenceImages.lily,'Ilustración de dos lirios rosas con tallos verdes']);
  finalCoverPhoto.querySelector('img').src='../imagenes/portada-pin-2-hd.png';
  finalCoverPhoto.querySelector('img').alt='Composición vertical de orquídeas y flores rosas y amarillas recortada sin fondo';
}
document.querySelectorAll('.stage-photo').forEach((img,i)=>setImage(img,imageData[i%imageData.length]));
document.querySelectorAll('.synthesis-card').forEach((card,i)=>{
  card.querySelectorAll('.synthesis-image').forEach((old)=>old.remove());
  var box=document.createElement('div');
  box.className='synthesis-image';
  var img=document.createElement('img');
  var finalImages = [
    [referenceImages.bunny, 'Conejito blanco con lazo rosa'],
    [referenceImages.calla, 'Ilustración de calas rosas'],
    [referenceImages.duck, 'Patito ilustrado con pajarita rosa'],
    [referenceImages.tulips, 'Ramo de tulipanes rosas']
  ];
  setImage(img,finalImages[i%finalImages.length]);
  box.append(img);
  card.prepend(box);
});
document.querySelectorAll('.takeaways article').forEach((card,i)=>{
  card.querySelectorAll('.takeaway-art').forEach((old)=>old.remove());
  var box=document.createElement('div');
  box.className='takeaway-art reference-art';
  var img=document.createElement('img');
  setImage(img,[[referenceImages.bunny,'Conejito blanco con lazo rosa'],['../imagenes/tres-ideas-02-flor-blanca-hd.png','Flor blanca y amarilla recortada sin fondo'],[referenceImages.duck,'Patito ilustrado con pajarita rosa']][i]);
  box.append(img);
  card.prepend(box);
});
document.querySelectorAll('.inspiration img').forEach((img,i)=>setImage(img,[[referenceImages.cherries,'Ilustración vintage de cerezas'],[referenceImages.calla,'Ilustración botánica de calas rosadas']][i%2]));
