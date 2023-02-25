import '@jxa/global-type';
import { run } from '@jxa/run';
import { outputArgs, pickupArgs } from '../browser/intercept-download-url';

export async function getArgs(url: string): Promise<string[]> {
  return await run((url) => {
    const app = Application('Safari');
    const window = app.windows[app.Document.make().name()];
    const tab = window.currentTab();
    const opt = { in: tab };
    tab.url = url;

    delay(5);

    return (function repeat(): string[] {
      app.doJavaScript(outputArgs, opt);
      delay(5);
      const command = app.doJavaScript(pickupArgs, opt);
      return command ? command : repeat();
    })();
  }, url);
}
