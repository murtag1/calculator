export default function prettifyNumber(number) {
   const reverseString = String(number).split('').reverse().join('');
   const prettyReverseNumber = reverseString.replace(/(\d{3})/ig, '$1 ');
   const prettyNumber = prettyReverseNumber.split('').reverse().join('').replace(/^\s/ig, '');
   return prettyNumber;
}
