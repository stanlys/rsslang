// Inspired by: https://stackoverflow.com/a/68628580
const playAudioAsync = async (audio: HTMLAudioElement): Promise<void> => {
  return new Promise((resolve, reject) => {
    audio.addEventListener('ended', () => resolve());
    audio.play().catch((error) => reject(error));
  });
};

export default playAudioAsync;
