// jsdom 30's undici dependency calls a Node 22 Web IDL helper. Keeping this
// small compatibility hook lets the pinned Node 20 deployment/test runtime run
// the DOM suite; marking as uncloneable is only advisory in these tests.
const workerThreads = require('node:worker_threads');
workerThreads.markAsUncloneable ??= () => {};
