// Convert MM:SS.mmm to milliseconds
export const timeToMilliseconds = (timeString) => {
  const [minutes, secondsAndMs] = timeString.split(':');
  const [seconds, milliseconds] = secondsAndMs.split('.');
  
  return (
    parseInt(minutes) * 60 * 1000 +  // minutes to ms
    parseInt(seconds) * 1000 +       // seconds to ms
    parseInt(milliseconds)           // already in ms
  );
};

// Convert milliseconds to MM:SS.mmm
export const millisecondsToTime = (ms) => {
  const minutes = Math.floor(ms / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  const milliseconds = ms % 1000;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
};

// Validate time string format (MM:SS.mmm)
export const isValidTimeFormat = (timeString) => {
  const regex = /^[0-9]{2}:[0-5][0-9]\.[0-9]{3}$/;
  return regex.test(timeString);
};

export const formatDate = (dateString) => {
  const date = dateString.split('T')[0];  
  const [year, month, day] = date.split('-');
  return `${month}/${day}/${year%100}`;
};
