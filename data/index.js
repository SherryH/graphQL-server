const videoA = {
  id: 'a',
  title: 'server video',
  duration: '60',
  watched: true
};

const videoB = {
  id: 'b',
  title: 'client video',
  duration: '30',
  watched: false
};
const videos = [videoA, videoB];

const getVideoById = id =>
  new Promise(resolve => {
    const [video] = videos.filter(video => video.id === id);
    resolve(video);
  });

const getVideos = () => new Promise(resolve => resolve(videos));

exports.getVideoById = getVideoById;
exports.getVideos = getVideos;
