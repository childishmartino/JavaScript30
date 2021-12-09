const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

function makeGreen() {
    const p = document.querySelector('p');
    p.style.color = '#BADA55';
    p.style.fontSize = '50px';
}
// Regular
console.log('hello');

// Interpolated
console.log('Hello I am %s string', ':)');

// Styled
console.log('%c i am some great text', 'font-size: 50px; background:red;');

// warning!
console.warn("oh no!");

// Error :|
console.error('shit');

// Info
console.info('crocodiles eat 3-4 people per year');

// Testing
const p = document.querySelector('p');

console.assert(p.classList.contains('ouch'), 'That is wrong');

// clearing
console.clear();

// Viewing DOM Elements
console.log(p); // shows the actual element
console.dir(p); // all stuff that lives on the element

console.clear()
// Grouping together
dogs.forEach(dog => {
    console.group(`${dog.name}`)
    console.log(`This is ${dog.name}`)
    console.log(`${dog.name} is ${dog.age} years old`)
    console.log(`${dog.name} is ${dog.age * 7} dog years old`)
    console.groupEnd(`${dog.name}`)
});

// counting
console.count('Chris');
console.count('Bree');
console.count('Mia');
console.count('Erik');
console.count('Chris');
console.count('Chris');
console.count('Bree');
console.count('Mia');
console.count('Erik');

// timing
console.time('fetching data');
fetch('https://api.github.com/users/childishmartino')
    .then(response => response.json())
    .then(data => {
        console.timeEnd('fetching data');
        console.log(data)
    });

//table
console.table(dogs);