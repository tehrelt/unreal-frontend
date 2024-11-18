export const FOLDER_NAMES: Record<string, string> = {
  "\\Drafts": "Черновики",
  "\\Trash": "Корзина",
  "\\Junk": "Спам",
  "\\Spam": "Спам",
  "\\Sent": "Отправленные",
  "\\Inbox": "Входящие",
};

export const localFolder = (attributes: string[]) => {
  const intersection = getIntersection(Object.keys(FOLDER_NAMES), attributes);

  if (intersection.length == 0) {
    return;
  }

  return FOLDER_NAMES[intersection.at(0) as string];
};

function getIntersection<T>(a: T[], b: T[]) {
  const set = new Set(b);
  const intersection = a.filter((el) => set.has(el));
  return intersection;
}
