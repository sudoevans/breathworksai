
export const replacePlaceholder = (text: string, name: string) => {

  return text.replace(/\[placeholder\]\,/g, name || '');
}