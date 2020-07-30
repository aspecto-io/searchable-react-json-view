export default function split(value, delimiter) {
    if (!delimiter) return [value];
    return value.split(new RegExp(`(${delimiter.toLowerCase()})`, 'gi'));
}