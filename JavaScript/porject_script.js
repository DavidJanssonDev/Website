const GAME_OPTIONS_AREA_GALLERY = document.getElementById("game-area");

const PATH_TO_GAME_INDEX = {
  GAME_1: "../games/game_1/index.html",
  GAME_2: "../games/game_2/index.html",
  GAME_3: "../games/game_3/index.html",
  GAME_4: "../games/game_4/index.html",
  GAME_5: "../games/game_5/index.html",
  GAME_6: "../games/game_6/index.html",
  GAME_7: "../games/game_7/index.html",
  GAME_8: "../games/game_8/index.html",
  GAME_9: "../games/game_9/index.html",
};

const PATH_TO_GAME_PICTURE = {
  GAME_PICTURE_1: "../games/game_1/pic/game_picture",
  GAME_PICTURE_2: "../games/game_2/pic/game_picture",
  GAME_PICTURE_3: "../games/game_3/pic/game_picture",
  GAME_PICTURE_4: "../games/game_4/pic/game_picture",
  GAME_PICTURE_5: "../games/game_5/pic/game_picture",
  GAME_PICTURE_6: "../games/game_6/pic/game_picture",
  GAME_PICTURE_7: "../games/game_7/pic/game_picture",
  GAME_PICTURE_8: "../games/game_8/pic/game_picture",
  GAME_PICTURE_9: "../games/game_9/pic/game_picture",
};

const FULL_ELEMENT_OBJECT = {};

for (const key of Object.keys(PATH_TO_GAME_INDEX)) {
  const indexFile = PATH_TO_GAME_INDEX[key];
  const picture = PATH_TO_GAME_PICTURE[`GAME_PICTURE_${key.slice(-1)}`];
  FULL_ELEMENT_OBJECT[key] = { index_file: indexFile, picture };
}

const AMOUNT_OF_GAMES = Object.keys(FULL_ELEMENT_OBJECT).length;


const testURL = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', url);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject();
        }
      }
    };
    xhr.send();
  });
};


const makeElements = async () => {
  for (const [key, value] of Object.entries(FULL_ELEMENT_OBJECT)) {
    const { index_file, picture } = value;

    try {
      await testURL(index_file);
      const htmlString = elementLink(index_file, picture, key);
      GAME_OPTIONS_AREA_GALLERY.insertAdjacentHTML("beforeend", htmlString);
      console.log(`Game ${key.slice(-1)} index.html found. Picture loaded successfully.`);
    } catch {
      const htmlString = elementImage("../images/IMG/COMING SOO SCREAN.png", key);
      GAME_OPTIONS_AREA_GALLERY.insertAdjacentHTML("beforeend", htmlString);
      console.log(`Game ${key.slice(-1)} index.html not found. Loading fallback image.`);
    }
  }
};

const elementLink = (index_file, picture, key) => {
  return `
  <a href="${index_file}" target="_blank" title="Click to play game ${key.slice(-1)}" style="grid-area: game-${key.slice(-1)}">
    <img src="${picture}" alt="Game ${key.slice(-1)}" draggable="false" />
  </a>`;
};

const elementImage = (picture, key) => {
  return `
  <img src="${picture}" alt="Game ${key.slice(-1)} Coming Soon" style="grid-area:game-${key.slice(-1)}" draggable="false"/>`;
};


const getDeviceType = () => {
  const mobileBreakpoint = 425;
  const tabletBreakpoint = 1000;
  const userDeviceWidth = window.innerWidth;

  if (userDeviceWidth > tabletBreakpoint) {
    return "desktop";
  } else if (userDeviceWidth <= mobileBreakpoint) {
    return "mobile";
  } else {
    return "tablet";
  }
};


const desktopPattern = (number) => {
  let pattern = '". . . . ."\n';

  for (let i = 1; i <= number; i += 3) {
    pattern += '". game-' + i + ' game-' + (i + 1) + ' game-' + (i + 2) + ' ."';
  }

  pattern += '". . . . ."';

  return pattern;
};

const tabletPattern = (number) => {
  let pattern = '". . . ."\n';

  for (let i = 1; i <= number; i += 2) {
    pattern += '". game-' + i + ' game-' + (i + 1) + ' ."';
  }

  pattern += '". . . ."';

  return pattern;
}

const mobilePattern = (number) => {
  let pattern = '". . ."\n';

for (let i = 1; i <= number; i++) {
  pattern += '". game-' + i + ' ."';
}

pattern += '". . ."';

return pattern;
}

const chocesWhatPattern = (device) => {

  if (device === 'desktop') return desktopPattern(AMOUNT_OF_GAMES);
  else if (device === 'tablet') return tabletPattern(AMOUNT_OF_GAMES);
  if (device === 'mobile') return mobilePattern(AMOUNT_OF_GAMES);
} 



const changeGridVariableInCss = (pattern) => {
  document.documentElement.style.setProperty("--game-grid", pattern);
  document.documentElement.style.setProperty("--amount-of-rows", AMOUNT_OF_GAMES);
};

// RUNNING EVERYTHING
window.addEventListener("load", () => {
  let device = getDeviceType();
  makeElements();
  let pattern = chocesWhatPattern(device);
  changeGridVariableInCss(pattern);
});

