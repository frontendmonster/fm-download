#! /usr/bin/env node

require('dotenv').config({ silent: true });
const args = require('args');
const path = require('path');
const chalk = require('chalk');
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
    console.log(chalk.yellow('Logging in as'), chalk.bold(process.env.FM_USERNAME));
    const authed = await client.authenticate(process.env.FM_USERNAME, process.env.FM_PASSWORD);

    if (authed) {
      console.log(chalk.cyan('Logged in successfull'));
      const data = await client.downloadCourseInfo(course);
      console.log(chalk.yellow(data.title), 'course info fetched');
      client.skipLessons(skip);

      console.log(`Downloading ${chalk.yellow(client.downloadQueue.length)} videos`);
      await client.downloadCourse();
    } else {
      throw new Error('Authentication failed');
    }
  } catch (e) {
    console.error(e);
  }
}
run(userOptions);
