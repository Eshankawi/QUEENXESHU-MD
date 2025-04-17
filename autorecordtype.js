const { cmd } = require('../lib');

// Keep track of auto-send settings
let autoRecordType = {
  audio: false,
  video: false
};

// Toggle auto-send behavior
cmd({
  pattern: 'autorecordtype ?(.*)',
  desc: 'Toggle automatic recording type (audio/video)',
  category: 'settings',
  use: '[audio|video|off]',
  filename: __filename
}, async (m, text) => {
  const type = text.toLowerCase().trim();
  if (type === 'audio') {
    autoRecordType.audio = true;
    autoRecordType.video = false;
    return m.reply('✅ Auto record type set to *voice note (PTT)*.');
  } else if (type === 'video') {
    autoRecordType.audio = false;
    autoRecordType.video = true;
    return m.reply('✅ Auto record type set to *round video*.');
  } else if (type === 'off') {
    autoRecordType.audio = false;
    autoRecordType.video = false;
    return m.reply('❌ Auto record type turned *off*.');
  } else {
    return m.reply('Usage: .autorecordtype [audio | video | off]');
  }
});

// Send audio using current auto type
cmd({
  pattern: 'sendaudio ?(.*)',
  desc: 'Send audio with current record type',
  category: 'tools',
  filename: __filename
}, async (m, text) => {
  const audio = './media/sample.mp3'; // Replace with your audio path or fetch logic
  await m.send(audio, {
    ptt: autoRecordType.audio,
    mimetype: 'audio/mpeg'
  }, 'audio');
});

// Send video using current auto type
cmd({
  pattern: 'sendvideo ?(.*)',
  desc: 'Send video with current record type',
  category: 'tools',
  filename: __filename
}, async (m, text) => {
  const video = './media/sample.mp4'; // Replace with your video path or fetch logic
  await m.send(video, {
    mimetype: 'video/mp4',
    gifPlayback: autoRecordType.video
  }, 'video');
});
