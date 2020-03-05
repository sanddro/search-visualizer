// Return store with toPromise function
export function withPromise(store) {
  return {
    ...store,
    toPromise: async () => {
      let unsub;
      const data = await new Promise((resolve, reject) => {
        unsub = store.subscribe(data => {
          resolve(data);
        });
      });
      unsub();
      return data;
    }
  };
}
