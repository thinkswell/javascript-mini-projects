export function uniqueId(data: any[]) {
  let newId = 0;
  const dataArray = [...data];
  dataArray.forEach((doc) => {
    if (doc.id > newId) newId = doc.id;
  });
  return newId + 1;
}

export const setItemProp = (
  list: any[],
  id: number,
  prop: string,
  value: any
) => {
  list.forEach((item, index) => {
    if (item.id === id) list[index][prop] = value;
  });
};
