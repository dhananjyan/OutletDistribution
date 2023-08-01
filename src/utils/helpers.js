export function formatNumberWithTwoDecimals(number) {
    // Check if the number has a decimal part
    if (Number.isInteger(number)) {
        return number || 0; // If the number is an integer, return it as it is
    } else {
        return Number(number || 0).toFixed(2); // If the number has decimal part, round it to 2 decimal places
    }
}