export interface BiliInputDescriptor {
  [key: string]: string;
}

export const input = (
  input: string | BiliInputDescriptor = 'src/index.js',
): BiliInputDescriptor => {
  const out: BiliInputDescriptor = {};

  if (typeof input === 'string') {
    out.index = input;
  } else if (Array.isArray(input)) {
    for (const fileName of input) {
      const name = fileName
        .replace(/\.[a-z]{2,3}$/gi, '')
        .split('/')
        .pop();
      out[name] = fileName;
    }
  }

  return out;
};
