const R = require('ramda');

const formatDecimals = (decimalsCount, value) =>
  `${value}${"0".repeat(decimalsCount - value.length)}`;

const formatInteger = (separator, value) => R.compose(
  R.join(separator),
  R.reverse,
  R.map(R.reverse),
  R.splitEvery(3),
  R.reverse
)(value);

const formatter = (groupingSymbol, separator, decimals) => R.compose(
  R.join(separator),
  R.filter(value => value),
  value => [
    formatInteger(groupingSymbol, value.split('.')[0]),
    formatDecimals(decimals, value.split('.')[1] || '')
  ],
  R.toString
);

const formatNumber = ((shouldRound, decimals, separator, groupingSymbol, value) => R.compose(
  formatter(groupingSymbol, separator, decimals),
  value => value / Math.pow(10, decimals),
  Math.floor,
  accumulator => (value => value + accumulator)(shouldRound ? 0.5 : 0),
  value => Math.pow(10, decimals) * value
)(value));

const main = (value, format, shouldRoundValue = true) => {
  const regExp = /\d\[(.*)\]\d\[(.*)\](\d*)/;
  const matches = format.toString().match(regExp);

  if (!matches) {
    console.log('Could not match against format', format); // eslint-disable-line
    return null;
  }

  const [thousandSeperator, decimalSeparator, decimals] = matches.slice(1);
  const decimalsCount = decimals.length;

  return formatNumber(shouldRoundValue, decimalsCount, decimalSeparator, thousandSeperator, value)
}

// main(100.6, '0[.]0[.]00');
module.exports = main;
