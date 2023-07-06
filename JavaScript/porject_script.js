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

Object.keys(PATH_TO_GAME_INDEX).forEach(key => {
  FULL_ELEMENT_OBJECT[key] = {
    index_file: PATH_TO_GAME_INDEX[key],
    picture: PATH_TO_GAME_PICTURE[`GAME_PICTURE_${key.slice(-1)}`]
  };
});

const AMOUNT_OF_GAMES = Object.keys(FULL_ELEMENT_OBJECT).length;

/*
Creating the element that contains the games and testing them out if they work or not, 
if they work they show the pictrue of the game if not they shows the comming soon screan
*/

test_URL = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', url);
    xhr.onreadystatechange = function () {
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

making_the_elements = () => {
  Object.keys(FULL_ELEMENT_OBJECT).forEach((key, index) => {
    const { index_file, picture } = FULL_ELEMENT_OBJECT[key];
    
    test_URL(index_file)
    .then(() => {
      const htmlString = element_link(index_file, picture, index);
        GAME_OPTIONS_AREA_GALLERY.insertAdjacentHTML("beforeend", htmlString);
        console.log(`Game ${index + 1} index.html found. Picture loaded successfully.`);
      })
      .catch(() => {
        const htmlString = element_image("../images/IMG/COMING SOO SCREAN.png", index);
        GAME_OPTIONS_AREA_GALLERY.insertAdjacentHTML("beforeend", htmlString);
        console.log(`Game ${index + 1} index.html not found. Loading fallback image.`);
      });
  });
};

element_link = (index_file, picture, index) => {
  return `
  <a href="${index_file}" target="_blank" title="Click to play game ${index + 1}" style="grid-area: game-${index}">
    <img src="${picture}" alt="Game ${index + 1}" draggable="false" />
  </a>`;
};

element_image = (picture, index) => {
  return `
  <img src="${picture}" alt="Game ${index + 1} Coming Soon" style="grid-area:game-${index+1}" draggable="false"/>`;
};



/*

Styling the grid in a way soo that thay are on the right place when the game elements are made

*/




 grid_patten = (number) => {
  let pattern = '". . . . ."\n';

  for (let i = 1; i <= number; i += 3) {
    pattern += '". game-' + i + ' game-' + (i + 1) + ' game-' + (i + 2) + ' ."';
  }

  pattern += '". . . . ."';

  return pattern;
}


change_grid_varible_in_css = () => {
  document.documentElement.style.setProperty("--game-grid", grid_patten(AMOUNT_OF_GAMES));
  document.documentElement.style.setProperty("--amout-of-rows", AMOUNT_OF_GAMES);
  
}


making_the_elements();
change_grid_varible_in_css()