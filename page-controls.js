const chapters = [...document.querySelectorAll('main details')];
document.getElementById('expand-all').addEventListener('click', () => {
  chapters.forEach(chapter => { chapter.open = true; });
});
document.getElementById('collapse-all').addEventListener('click', () => {
  chapters.forEach(chapter => { chapter.open = false; });
});

const viewer = document.getElementById('image-viewer');
const viewerImage = viewer.querySelector('img');
const viewerCaption = document.getElementById('image-viewer-caption');
document.querySelectorAll('main figure img').forEach(img => {
  const caption = img.closest('figure').querySelector('figcaption')?.textContent.trim() || img.alt;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'photo-zoom';
  button.setAttribute('aria-label', `Phóng to ảnh: ${caption}`);
  img.before(button);
  button.append(img);
  button.addEventListener('click', () => {
    viewerImage.src = img.currentSrc || img.src;
    viewerImage.alt = img.alt;
    viewerCaption.textContent = caption;
    viewer.showModal();
  });
});
document.getElementById('close-image-viewer').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  if (event.target !== viewer) return;
  const rect = viewer.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) viewer.close();
});
