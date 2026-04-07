export function requestAsync(options) {
  return new Promise((resolve, reject) => {
    my.request({
      ...options,
      success: (res) => resolve(res),
      fail: (err) => reject(err),
    });
  });
}
