// For more information, see https://crawlee.dev/
import { PlaywrightCrawler } from 'crawlee';
import { router, startUrls } from './routes.js';

const crawler = new PlaywrightCrawler({

    launchContext: {
        // Here you can set options that are passed to the playwright .launch() function.
        launchOptions: {
            headless: true,
        },
    },

    requestHandler: router,

    // Comment this option to scrape the full website.
    //maxRequestsPerCrawl: 20,

    // This function is called if the page processing failed more than maxRequestRetries+1 times.
    failedRequestHandler({ request, log }) {
        log.info(`Request ${request.url} failed too many times.`);
    },
});

await crawler.run(startUrls);

console.log('Crawler finished.');
