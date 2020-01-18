module.exports = function parseStringLowerCase(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim().toLocaleLowerCase());
}