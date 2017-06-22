# Shape number

Simple number shaping based on value and string a string template

## Installation
```
npm install shape-number
```

## How to use

```
const shapeNumber = require('shape-number');

shapeNumber(100, '0[.]0[,]00') // => '100,00'
shapeNumber(10000000, '0[.]0[,]00') // => '10.000.000,00'
```

## Parameters

```
shapeNumber(value, format, shouldRoundIfNeeded = true)
```

## The format

`0[s]0[d]00`

- `s` - defines how each third integer character should be separated. This can be zero or many characters.

- `d` - defines separation characters between the integer and decimal value. This can be zero or many characters.

- `00` - defines the amout of decimals. The amount of zeroes in the end defines the number.

  - `0[..]0[d]` - yields zero decimals

  - `0[..]0[d]0` - yields 1 decimal

  - `0[..]0[d]00000` - yields 5 decimals

