const GAME_OPTIONS_AREA_GALLERY = document.getElementById("game-area");

// CONSTS AND LETS

const AMOUNT_OF_GAMES = 0; // This number is hard coded for now but in the future it's not

const PATH_TO_GAME_INDEX = {
  GAME_1: "../games/game_1/index.html",
  GAME_2: "../games/game_2/index.html",
  GAME_3: "../games/game_3/index.html",
  GAME_4: "../games/game_4/index.html",
};

const PATH_TO_GAME_PICTURE = {
  GAME_PICTURE_1: "../games/game_1/pic/game_picture",
  GAME_PICTURE_2: "../games/game_2/pic/game_picture",
  GAME_PICTURE_3: "../games/game_3/pic/game_picture",
  GAME_PICTURE_4: "../games/game_4/pic/game_picture"
};

const FULL_ELEMENT_OBJECT = {};

// Making an object so all the information that needs to be known can make an object
Object.keys(PATH_TO_GAME_INDEX).forEach(key => {
  FULL_ELEMENT_OBJECT[key] = {
    index_file: PATH_TO_GAME_INDEX[key],
    picture: PATH_TO_GAME_PICTURE[`GAME_PICTURE_${key.slice(-1)}`]
  };
});

testImage = (url, fallbackUrl) => {
  return new Promise((resolve, reject) => {
    const imgElement = new Image();

    imgElement.addEventListener('load', function imgOnLoad() {resolve(this);});

    imgElement.addEventListener('error', function imgOnError() {
      const fallbackImgElement = new Image();
      fallbackImgElement.addEventListener('load', function fallbackOnLoad() {
        resolve(fallbackImgElement);
      });
      fallbackImgElement.addEventListener('error', function fallbackOnError() {
        reject();
      });
      fallbackImgElement.src = fallbackUrl;
    });

    imgElement.src = url;
  });
};

making_the_elements = () => {
  Object.keys(FULL_ELEMENT_OBJECT).forEach((key, index) => {
    const { index_file, picture } = FULL_ELEMENT_OBJECT[key];

    testImage(picture, "../images/IMG/COMING SOO SCREAN.png")
      .then(img => {
        const htmlString = element_link(index_file, img.src, index);
        GAME_OPTIONS_AREA_GALLERY.insertAdjacentHTML("beforeend", htmlString);
        console.log(`Game ${index + 1} picture loaded successfully.`);
      })
      .catch(() => {
        const htmlString = element_link(index_file, "../images/IMG/COMING SOO SCREAN.png", index);
        GAME_OPTIONS_AREA_GALLERY.insertAdjacentHTML("beforeend", htmlString);
        console.log(`Game ${index + 1} picture not found. Loading fallback picture.`);
      });
  });
};

element_link = (index_file, picture, index) => {
  return `
  <a href="${index_file}" target="_blank" title="Click to play game ${index + 1}">
    <img src="${picture}"/>
  </a>`;
};

making_the_elements();