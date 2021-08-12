chrome.tabs.onUpdated.addListener((_, info, tab) => {
  const url: string = tab.url ?? '';

  if (info.status === 'complete' && 0 < url.indexOf('www.youtube.com')) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentUrl: string | undefined = tabs[0]?.url;
      const tabid: number | undefined = tabs[0]?.id;
      if (currentUrl != null && tabid != null) {
        chrome.tabs.sendMessage(tabid, { message: currentUrl });
      }
    });
  }
});
