import { ContentLine } from "./types";

export const getPageContent = async (): Promise<ContentLine[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([

        { type: 'heading', data: 'Welcome to the Index PageNNN', action: '' },
        { type: 'text', data: 'MMMMSON.', action: '' },
        { type: 'text', data: 'WWWWWWW', action: '' },
        { type: 'button', data: 'WWWWWWW', action: 'dothis' },
      ]);
    }, 1000); // Simulate delay
  });
};