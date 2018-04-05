#! /usr/bin/env node

require('dotenv').config({ silent: true });
const args = require('args');
const path = require('path');
const FrontendMasters = require('./lib/client');

args
  .option('course', 'Slug for the course download (ex.: javascript-hard-parts')
  .option('skip', 'Number of videos to skip (ex.: 5, would start download on video number 6', 0)
  .option('format', 'webm or mp4', 'mp4')
  .option('dir', 'Download directory', 'download')
  .option('resolution', '720 or 1080', 720);

const userOptions = args.parse(process.argv);
async function run(options) {
  const { format, resolution, course, skip, dir } = options;

  try {
    const client = new FrontendMasters(format, resolution, dir);
    const authed = await client.authenticate(process.env.FM_USERNAME, process.env.FM_PASSWORD);

    if (authed) {
      console.log(`${process.env.FM_USERNAME} Logged in.`);
      const data = await client.downloadCourseInfo(course);
      console.log(`"${data.title}" course info downloaded`);
      client.skipLessons(skip);
      console.log(`"Downloading ${client.downloadQueue.length} videos`);
      await client.downloadCourse();
    } else {
      console.log('Authentication failed');
    }
  } catch (e) {
    console.error(e);
  }
}
run(userOptions);
