chrome.runtime.onMessage.addListener((request, _, sendResonse) => {
  const url: string = request.message;

  chrome.storage.local.get(['filter'], (storage) => {
    if (storage.filter != null) {
      const filters: string[] = storage.filter
        .split('\n')
        .filter((v: string) => v !== '');
      const querySelector: string = '#video-title';

      let targetElement: HTMLElement | null | undefined = null;

      if (
        ~url.indexOf('/feed/subscriptions') ||
        url === 'https://www.youtube.com/'
      ) {
        targetElement = document.getElementById('contents');
      } else if (~url.indexOf('/watch?')) {
        targetElement = document
          .getElementById('related')
          ?.querySelector('#items');
      }

      if (targetElement != null) {
        const removeElement = remove(querySelector)(filters);
        removeElement(targetElement.childNodes as NodeListOf<HTMLElement>);
        observe(removeElement, targetElement);
      }
    }
  });

  sendResonse();

  return;
});

const remove: (
  querySelector: string
) => (filters: string[]) => (targetNodes: NodeListOf<HTMLElement>) => void =
  (querySelector) => (filtres) => (targetNodes) => {
    targetNodes.forEach((node) => {
      node.querySelectorAll(querySelector).forEach((titleElement) => {
        filtres.forEach((filter) => {
          if (~titleElement.innerHTML.indexOf(filter)) {
            node.remove();
          }
        });
      });
    });
  };

function observe(
  func: (nodeList: NodeListOf<HTMLElement>) => void,
  targetElement: Node
) {
  const mutationObserver = new MutationObserver((mr) => {
    func(mr[0].addedNodes as NodeListOf<HTMLElement>);
  });

  const observeConfig: object = {
    attributes: false,
    attributeOldValue: false,
    characterData: false,
    characterDataOldValue: false,
    childList: true,
    subtree: false,
  };

  mutationObserver.observe(targetElement, observeConfig);
}
