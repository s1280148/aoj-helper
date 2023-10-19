import { Mutex } from 'async-mutex';

const apiCallMutex = new Mutex();

export const callApi = async (name: string, parameters: object) => {

  const release = await apiCallMutex.acquire();

  return new Promise((resolve, reject) => {

    const apiListener = (event: MessageEvent) => {

      const message = event.data;
      
      if (message.type !== name) {
        return;
      }

      window.removeEventListener("message", apiListener);

      release();

      switch (message.status) {
        case "success": {
          resolve(message.response);
          break;
        }
        case "error": {
          reject();
          break;
        }
      }
    }

    window.addEventListener("message", apiListener);

    vscode.postMessage({
      type: name,
      parameters: parameters
    });
  });
}