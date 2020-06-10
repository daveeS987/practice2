'use strict';

let pageSelection = './data/page-1.json';

function HornedAnimal(animal) {
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  this.image_url = animal.image_url;
}

HornedAnimal.prototype.render = function () {
  let $animalClone = $('.photo-template').clone();
  $animalClone.removeClass('photo-template');
  $animalClone.find('h2').text(this.title);
  $animalClone.find('img').attr('src', this.image_url);
  $animalClone.find('img').attr('alt', this.title);
  $animalClone.find('p').text(this.description);
  $animalClone.addClass(this.keyword);
  $('section').append($animalClone);
};

HornedAnimal.readJson = () => {
  console.log('readJson:', pageSelection);
  $.ajax(pageSelection)
    .then(data => {
      let keywordsArr = new Set;
      data.forEach(item => {
        let animal = new HornedAnimal(item);
        keywordsArr.add(animal.keyword);
        animal.render();
      });
      $('.photo-template').hide();
      generateDropDown(keywordsArr);
    });
};

function generateDropDown(arr) {
  arr.forEach(item => {
    $filterDropDown.append(`<option value=${item}>${item}</option>`);
  });
}

// ******* Dropdown *********
let $filterDropDown = $('.filter');
$filterDropDown.on('change', filterKeywords);

function filterKeywords() {
  let choice = $(this).val();
  console.log(choice);
  if (choice) {
    $('.photo').hide();
    $(`.${choice}`).fadeIn();
  }
}

// ********* Page Option ***********
let $pageOption = $('.pageOption');
$pageOption.on('change', handlePageOption);

function handlePageOption() {
  $('section').empty();
  $filterDropDown.empty();
  $('div').show();
  pageSelection = $(this).val();
  console.log('handlePageOption:', pageSelection);
  $(() => HornedAnimal.readJson());
}


$(() => HornedAnimal.readJson());
