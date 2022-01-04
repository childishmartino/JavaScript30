const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
const bandList = document.getElementById('bands');

const removeArticles = (bandName) => {
    const band = bandName.toLowerCase().split(" ");
    if(band.length <= 1) {
        return band.join(" ");
    } else if( band[0] == 'a' || band[0] == 'the' || band[0] == 'an' ) {
        return band.splice(1).join(" ");
    } else {
    return band.join(" ");
    }
}

const alphabetize = (a, b) => {
    const bandA = removeArticles(a);
    const bandB = removeArticles(b);
    if (bandA < bandB) {
        return -1
    } else if ( bandA > bandB) {
        return 1
    } else {
        return 0
    }
}

const sortedBands = bands.sort(alphabetize)

const writeBands = () => {
    bandList.innerHTML = sortedBands.map(band => `<li>${band}</li>`).join('')
};


writeBands(sortedBands)