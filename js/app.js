'use strict';

let animalKeywords = [];

function HornedAnimal(animal) {
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  this.image_url = animal.image_url;
}

HornedAnimal.prototype.render = function () {
  let $animalClone = $('.photo-template').clone();
  $('main').append($animalClone);
  $animalClone.find('h2').text(this.title);
  $animalClone.find('img').attr('src', this.image_url);
  $animalClone.find('img').attr('alt', this.title);
  $animalClone.find('p').text(this.description);
  $animalClone.removeClass('photo-template');
  $animalClone.attr('class', this.title);
};

HornedAnimal.readJson = () => {
  $.ajax('./data/page-1.json')
    .then(data => {
      let keywordsArr = new Set(animalKeywords);
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
    $('select').append(`<option value=${item}>${item}</option>`);
  });
}



$(document).ready(function () {

  $(() => HornedAnimal.readJson());

  $('select').on('change', function () {
    $('div').slideUp();
    let selectedValue = $(this).val();
    $(`div[class=${selectedValue}]`).fadeIn();
  });

});
