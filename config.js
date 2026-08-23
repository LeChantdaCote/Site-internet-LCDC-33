// Configuration simple du site de la chorale
const SITE_CONFIG = {
  nomChorale: "Chorale",
  emailContact: "contact@chorale-exemple.fr"
};

console.log("Site de la chorale chargé avec succès.");


// ===============================
// GALERIE AUTOMATIQUE PAR DOSSIER
// ===============================

// Extensions reconnues
const IMAGE_EXT = ["jpg", "jpeg", "png", "webp"];
const AUDIO_EXT = ["mp3", "wav", "ogg"];
const VIDEO_EXT = ["mp4", "webm", "mov"];

// Fonction utilitaire
function getExtension(filename) {
  return filename.split(".").pop().toLowerCase();
}

// Fonction principale : génère les galeries
async function generateGalleries() {
  const galleries = document.querySelectorAll(".auto-gallery");

  for (const gallery of galleries) {
    const folder = gallery.dataset.folder;

    try {
      // On récupère la liste des fichiers du dossier
      const response = await fetch(folder);
      const text = await response.text();

      // On extrait les noms de fichiers
      const files = [...text.matchAll(/href="([^"]+)"/g)].map(m => m[1]);

      files.forEach(file => {
        const ext = getExtension(file);
        const fullPath = `${folder}/${file}`;

        // Images
        if (IMAGE_EXT.includes(ext)) {
          const img = document.createElement("img");
          img.src = fullPath;
          img.className = "auto-img";
          gallery.appendChild(img);
        }

        // Audios
        else if (AUDIO_EXT.includes(ext)) {
          const audio = document.createElement("audio");
          audio.controls = true;
          audio.src = fullPath;
          audio.className = "auto-audio";
          gallery.appendChild(audio);
        }

        // Vidéos
        else if (VIDEO_EXT.includes(ext)) {
          const video = document.createElement("video");
          video.controls = true;
          video.src = fullPath;
          video.width = 400;
          video.className = "auto-video";
          gallery.appendChild(video);
        }
      });

    } catch (err) {
      console.error("Impossible de lire le dossier :", folder, err);
    }
  }
}

document.addEventListener("DOMContentLoaded", generateGalleries);
