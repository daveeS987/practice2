'use strict';

let pageSelection = './data/page-1.json';
let sortSelection = 'byTitle';

function HornedAnimal(animal) {
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  this.image_url = animal.image_url;
}

function render(object) {
  let $template = $('#template').html();
  let rendered = Mustache.render($template, object);
  $('section').append(rendered);
}

HornedAnimal.readJson = () => {
  $.ajax(pageSelection)
    .then(data => {
      let keywordsArr = new Set;
      let animalsArr = [];
      data.forEach(item => {
        let animal = new HornedAnimal(item);
        keywordsArr.add(animal.keyword);
        animalsArr.push(animal);
      });
      if (sortSelection === 'byTitle') {
        animalsArr.sort(sortTitle);
      } else {
        animalsArr.sort(sortHorns);
      }
      animalsArr.forEach(item => {
        render(item);
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
  $(() => HornedAnimal.readJson());
}

// ********* Sort Option *************
let $sortOption = $('.sortOption');
$sortOption.on('change', handleSort);

function handleSort() {
  $('section').empty();
  $filterDropDown.empty();
  $('div').show();
  sortSelection = $(this).val();
  $(() => HornedAnimal.readJson());
}

function sortHorns(a, b) {
  return a.horns - b.horns;
}
function sortTitle(a, b) {
  var titleA = a.title.toUpperCase();
  var titleB = b.title.toUpperCase();
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;
}


$(() => HornedAnimal.readJson());
