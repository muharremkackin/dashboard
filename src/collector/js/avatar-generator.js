function generateAvatar(element, name) {
  var colours = [
    "#1abc9c",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#34495e",
    "#16a085",
    "#27ae60",
    "#2980b9",
    "#8e44ad",
    "#2c3e50",
    "#f1c40f",
    "#e67e22",
    "#e74c3c",
    "#95a5a6",
    "#f39c12",
    "#d35400",
    "#c0392b",
    "#bdc3c7",
    "#7f8c8d",
  ];

  var nameSplit = name.split(" "),
    initials =
      nameSplit[0].charAt(0).toUpperCase() +
      nameSplit[1].charAt(0).toUpperCase();

  var charIndex = initials.charCodeAt(0) - 65,
    colourIndex = charIndex % 19;

  $(element).css('background-color', colours[colourIndex]);

  $(element).html(`<span class="text-white text-2xl">${initials}</span>`);
}
