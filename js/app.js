'use strict';

// let animalKeywords = [];
let $gallery = $('section');
let $filterDropDown = $('.filter');


function HornedAnimal(animal) {
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  this.image_url = animal.image_url;
}

HornedAnimal.prototype.render = function () {
  let $animalClone = $('.photo-template').clone();
  $animalClone.removeClass('.photo-template');
  $animalClone.find('h2').text(this.title);
  $animalClone.find('img').attr('src', this.image_url);
  $animalClone.find('img').attr('alt', this.title);
  $animalClone.find('p').text(this.description);
  $animalClone.attr('class', this.title);
  $gallery.append($animalClone);
};

HornedAnimal.readJson = () => {
  $.ajax('./data/page-1.json')
    .then(data => {
      let keywordsArr = new Set;
      data.forEach(item => {
        let animal = new HornedAnimal(item);
        keywordsArr.add(animal.keyword);
        animal.render();
      });
      generateDropDown(keywordsArr);
    });
};

function generateDropDown(arr) {
  arr.forEach(item => {
    $filterDropDown.append(`<option value=${item}>${item}</option>`);
  });
}

$filterDropDown.on('change', filterHorns);

function filterHorns() {
  let keyword = $(this).val();
  console.log(keyword);
  $('div').hide();
  if (keyword) {
    $(`.${keyword}`).fadeIn();
  }
}

$(() => HornedAnimal.readJson());

