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

const getVideoById = id =>
  new Promise(resolve => {
    const videos = [videoA, videoB];
    const [video] = videos.filter(video => video.id === id);
    resolve(video);
  });

exports.getVideoById = getVideoById;
