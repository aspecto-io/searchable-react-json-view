export default function split(value, delimiter) {
    const split = value.split(delimiter);
    const toReturn = [];
    split.forEach((item, i) => {
        toReturn.push(item);
        if (i < split.length - 1) toReturn.push(delimiter);
    });

    return toReturn;
}