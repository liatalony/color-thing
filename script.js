window.addEventListener("DOMContentLoaded", init);

function init() {
  const palate = document.querySelector("input");
  let red, green, blue;
  palate.addEventListener("input", getHex);

  function getHex() {
    const hex = document.querySelector(".hex");
    hex.textContent = palate.value;
    getRGB();
  }
  function getRGB() {
    red = Number.parseInt(palate.value.substring(1, 3), 16);
    green = Number.parseInt(palate.value.substring(3, 5), 16);
    blue = Number.parseInt(palate.value.substring(5), 16);
    document.querySelector(".rgb").textContent = `(${red}, ${green}, ${blue})`;

    red /= 255;
    green /= 255;
    blue /= 255;
    let h, s, l;

    const min = Math.min(red, green, blue);
    const max = Math.max(red, green, blue);

    if (max === min) {
      h = 0;
    } else if (max === red) {
      h = 60 * (0 + (green - blue) / (max - min));
    } else if (max === green) {
      h = 60 * (2 + (blue - red) / (max - min));
    } else if (max === blue) {
      h = 60 * (4 + (red - green) / (max - min));
    }

    if (h < 0) {
      h = h + 360;
    }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
      s = 0;
    } else {
      s = (max - l) / Math.min(l, 1 - l);
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;

    h = Math.round(h);
    s = Math.round(s);
    l = Math.round(l);

    document.querySelector(".hsl").textContent = `(${h}, ${s}, ${l})`;
    console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  }
}
