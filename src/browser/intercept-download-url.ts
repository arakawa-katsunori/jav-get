import { functionStringify } from '../node/function-stringify';

const id = 'yt-dlp-command'

async function generate() {

  function intercept(): Promise<string> {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!('initiatorType' in entry)) break;
          const { initiatorType, name } = entry;
          if (initiatorType !== 'xmlhttprequest') break;
          if (name.endsWith('.m3u8')) {
            resolve(name);
            observer.disconnect();
            return;
          }
        }
      });
      observer.observe({entryTypes: ["resource"]});
      document.querySelector<HTMLButtonElement>('button[data-plyr="quality"]')?.click();
      document.querySelector<HTMLButtonElement>('button[data-plyr="play"]')?.click();
    });
  }

  const title = document.getElementsByTagName('h1').item(0)?.innerText;
  const model = window.location.pathname.split('/').at(-1)?.toUpperCase() ?? '';
  const filename = title?.startsWith(model) ? title : `${model} ${title}`;
  const referer = window.location.origin + window.location.pathname;
  const userAgent = navigator.userAgent || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15';
  const source = await intercept();
  const args = [
    '-o',
    `"${filename}"`,
    '--add-header',
    `"Referer: ${referer}"`,
    '--add-header',
    `"User-Agent: ${userAgent}"`,
    `"${source}"`,
  ];

  const ul = document.body.appendChild(document.createElement('ul'));
  for (const str of args) {
    ul.appendChild(document.createElement('li')).innerText = str;
  }
  ul.id = id;
}

function pickup(): string[] | null {
  const ul = document.getElementById(id);
  return !ul ? null : Array.from(ul.children).map((li ) => (li as HTMLLIElement).innerText);
}

export const outputArgs = functionStringify(generate);
export const pickupArgs = functionStringify(pickup);
