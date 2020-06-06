'use strict';

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
  $.ajax('./data/page-1.json').then(data => {
    data.forEach(item => {
      let animal = new HornedAnimal(item);
      console.log(animal);
      animal.render();
    });
  });
};

$(() => HornedAnimal.readJson());







// Dog.prototype.render = function () {
//   let $dogClone = $('.dog-template').clone();
//   $('main').append($dogClone);
//   $dogClone.find('h2').text(this.name);
//   $dogClone.find('img').attr('src', this.image_url);
//   $dogClone.find('p').text(this.hobbies);
//   $dogClone.removeClass('dog-template');
//   $dogClone.attr('class', this.name);
// };

// Dog.readJson = () => {

//   $.ajax('data.json').then(data => {
//     data.forEach(item => {
//       let dog = new Dog(item);
//       console.log(dog);
//       dog.render();
//     });
//   });
// };

// $(() => Dog.readJson());








