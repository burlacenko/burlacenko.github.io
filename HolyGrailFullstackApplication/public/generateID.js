
// https://gist.github.com/6174/6062387
const allCapsAlpha = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]; 
const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"]; 
const allUniqueChars = [..."!@#$%^&*()_+-=[]\{}|;:,./<>?"];
const allNumbers = [..."0123456789"];

// const base = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha, ...allUniqueChars];
const base = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha];

const generateID = (len) => {
   return [...Array(len)]
     .map(i => base[Math.random()*base.length|0])
     .join('');
};

// example:
// console.log('OUTPUT: ', generator(base, 28));
// OUTPUT: )ne]iGl'XBX%(FPCU:4JRnV'#mS=
// OUTPUT: kRY.}PZ~]Q|LQ1;qJ1Gnh>,zC{T@
