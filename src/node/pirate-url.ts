function productId(url: URL): string {
  if (url.hostname !== 'www.dmm.co.jp') throw new Error('Incorrect URL. Use a Fanza URL')

  const path = url.pathname.split('/');
  const target = path.find(s => s.startsWith('cid='));

  if (!target) throw new Error('"cid" does not exist in this URL.');

  return target.slice(4).replace(/^\d?(\w+?)0*(\d{3})$/, '$1-$2');
}

export function pirateUrl(url: URL): string {
  return url.hostname === 'missav.com' ? url.href : `https://missav.com/ja/${productId(url)}`;
}
