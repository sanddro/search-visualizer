// Converts writable to promise


export async function toPromise(store) {
  let unsub;
  const data = await new Promise((resolve, reject) => {
    unsub = store.subscribe(data => {
      resolve(data);
    });
  });
  unsub();
  return data;
}

