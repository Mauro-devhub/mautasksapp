export const filterByElement = <T>(attr: any, obj: any, el: any): T[] => {
  if (Array.isArray(obj)) {    
    return obj.filter(
      (e) => String(e[attr]).toLowerCase().includes(String(el.toLowerCase()))
    );
  }

  return obj;
}

export const filterByExpirationDateOrderDesc = (items: any[]) => {
  return items.sort((a, b) => {
    const dateA = new Date(a.dateExpire);
    const dateB = new Date(b.dateExpire);
    
    return dateB.getTime() - dateA.getTime();
  });
}