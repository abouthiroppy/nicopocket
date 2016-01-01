window.onload = () => {
  const player       = document.getElementById('external_nicoplayer');
  const videoId      = location.href.split('/')[4].split('?')[0];
  const resetButton  = document.createElement('button');
  const recordButton = document.createElement('button');

  let time = 0;

  chrome.storage.sync.get(videoId, item => {

    let text = '時間データがありません';

    if (Object.keys(item).length) {
      const m = Math.round(item[videoId] / 60) - 1;
      const s = Math.round(item[videoId] % 60);

      text = `${m}:${s}辺りから再生`;

      recordButton.addEventListener('click', () => {
        player.ext_setPlayheadTime(item[videoId]);
        player.ext_play(true);
      });


      resetButton.addEventListener('click', () => {
        chrome.storage.local.remove(videoId, () => {
          document.getElementById('playerNicoplayer').removeChild(resetButton);
        });
      });

      resetButton.appendChild(document.createTextNode('✕'));
      document.getElementById('playerNicoplayer').appendChild(resetButton);
      recordButton.appendChild(document.createTextNode('時間データがありません'));
    }

    recordButton.appendChild(document.createTextNode(text));
    document.getElementById('playerNicoplayer').appendChild(recordButton);
  });

  setInterval(() => {
    const currentTime = player.ext_getPlayheadTime();
    if (player.ext_getStatus() === 'playing') {
      recordButton.textContent = '記録中';
    }

    if (time !== currentTime) {
      chrome.storage.sync.set({
        [videoId]: player.ext_getPlayheadTime()
      });
      time = currentTime;
    }
  }, 5000);
};
