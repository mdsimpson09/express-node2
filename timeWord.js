// Turn a string of 24h time into words.

// You can trust that you’ll be given a valid string (it will always have a two-digit hour 00-23, and a two-digit minute 00-59). Hours 0-11 are am, and hours 12-23 are pm.

// Examples of the output we’d like:

// Input	Expected Output
// 00:00	midnight
// 00:12	twelve twelve am
// 01:00	one o’clock am
// 06:01	six oh one am
// 06:10	six ten am
// 06:18	six eighteen am
// 06:30	six thirty am
// 10:34	ten thirty four am
// 12:00	noon
// 12:09	twelve oh nine pm
// 23:23	eleven twenty three pm
// Write tests for these cases and make sure your code passes these.

// Also, do this without the aid of any external packages. The goal here is to have you think about how you’d solve the problem, not have you show us how good you are at finding third-party libraries.

function timeWord(time) {

  const hours = [
    'midnight', 'one', 'two', 'three', 'four', 'five', 
    'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'
  ];

  const minutes = [
    'o’clock', 'oh one', 'oh two', 'oh three', 'oh four', 'oh five',
    'oh six', 'oh seven', 'oh eight', 'oh nine', 'ten', 'eleven', 'twelve',
    'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 
    'twenty', 'twenty one', 'twenty two', 'twenty three', 'twenty four', 'twenty five', 
    'twenty six', 'twenty seven', 'twenty eight', 'twenty nine' 
  ];

  const [hourStr, minuteStr] = time.split(":");
  const hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  let output = "";

  if (minute === 0) {
    if (hour === 0) {
      output = hours[0]; 
    } else if (hour === 12) {
      output = hours[hour] + " " + minutes[0];
    } else {
      output = hours[hour] + " " + minutes[0] + " " + (hour < 12 ? "am" : "pm");
    }
  } else if (minute <= 30) {
    if (minute === 15) {
      output = hours[hour] + " " + "quarter";
    } else if (minute === 30) {
      output = hours[hour] + " " + "half";
    } else {
      output = hours[hour] + " " + minutes[minute];
      if (minute <= 9) {
        output += " " + minutes[minute];  
      } else {
        output += " " + minutes[minute] + "s";
      }
    }
    output += " " + (hour < 12 ? "am" : "pm");
  } else {
    const remainingMinutes = 60 - minute;
    if (remainingMinutes === 15) {
      output = hours[hour + 1] + " " + "quarter";
    } else {
      output = hours[hour + 1] + " " + minutes[remainingMinutes] + "s"; 
    }
    output += " " + (hour < 11 ? "am" : "pm");
  }

  return output;

}

module.exports = timeWord;

// function timeWord(time) {
//     const [hours, minutes] = time.split(':').map(Number);
    
//     const numToWord = [
//       'midnight', 'one', 'two', 'three', 'four', 'five',
//       'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'
//     ];
  
//     const minuteToWord = [
//       'o’clock', 'oh one', 'oh two', 'oh three', 'oh four', 'oh five',
//       'oh six', 'oh seven', 'oh eight', 'oh nine', 'ten', 'eleven', 'twelve',
//       'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
//       'twenty', 'twenty one', 'twenty two', 'twenty three', 'twenty four', 'twenty five',
//       'twenty six', 'twenty seven', 'twenty eight', 'twenty nine'
//     ];
  
//     let output = "";
  
//     if (minutes === 0) {
//       output = hours === 0 ? numToWord[0] : numToWord[hours] + ' ' + minuteToWord[0];
//     } else if (minutes <= 30) {
//       const minuteStr = minutes <= 9 ? minuteToWord[minutes] : minuteToWord[minutes] + 's';
//       output = `${numToWord[hours]} ${minuteStr} ${hours < 12 ? 'am' : 'pm'}`;
//     } else {
//       const remainingMinutes = 60 - minutes;
//       const minuteStr = remainingMinutes === 15 ? 'quarter' : minuteToWord[remainingMinutes] + 's';
//       output = `${numToWord[hours + 1]} ${minuteStr} ${hours < 11 ? 'am' : 'pm'}`;
//     }
  
//     return output;
//   }
  
  module.exports = timeWord;