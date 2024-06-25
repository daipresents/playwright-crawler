import { createPlaywrightRouter, EnqueueStrategy } from 'crawlee';

const baseDomain = 'daipresents.com'
const baseUrl = `https://${baseDomain}/test-2/`;

export const startUrls = [baseUrl];
export const router = createPlaywrightRouter();

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
    log.info(`enqueueing new URLs`);
    await enqueueLinks({
        // domain settings
        strategy: EnqueueStrategy.All,

        // target url
        //globs: [`http?(s)://${baseDomain}/**`],

        // limitation
        //limit: 100,

        // using by addHandler
        label: 'detail',
    });
});

router.addHandler('detail', async ({ request, page, log, pushData }) => {
    const title = await page.title();
    log.info(`${title}`, { url: request.loadedUrl });

    //console.log(request.errorMessages);
    //console.log(page);

    await pushData({
        url: request.loadedUrl,
        title,
    });
});
