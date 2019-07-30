export enum TYPES {
    Skin = "skin",
    Mapres = "mapres",
    Gameskin = "gameskin",
    Emoticon = "emoticon",
    Particle = "particle",
    Cursor = "cursor",
}

export enum EXTENSIONS {
    PNG = "png",
}

export const placeholderImage = "/img/placeholder.png";
export const maxFilesizeInMB = 10;

export class AssetService {

    public lazyLoadImages() {
        document.addEventListener("DOMContentLoaded", function() {
            const lazyImagess: any = document.querySelectorAll("img.lazy");
            var lazyImages: any = [].slice.call(lazyImagess);
          
            if ("IntersectionObserver" in window) {
              let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                  if (entry.isIntersecting) {
                    let lazyImage: any = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                  }
                });
              });
          
              lazyImages.forEach(function(lazyImage) {
                lazyImageObserver.observe(lazyImage);
              });
            } else {
              console.log("failed to initalize lazyload");
            }
          });
    }
}