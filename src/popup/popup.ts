window.onload = () => {
  const storageKey: string = 'filter';

  const textArea: HTMLInputElement = document.getElementById('filter') as HTMLInputElement;

  chrome.storage.local.get([storageKey], storage => {
    const filter: string = storage.filter;
    if (textArea != null && filter != null) {
      textArea.value = filter;
    }
  });

   const saveButton: HTMLElement | null = document.getElementById('saveButton');

  if (saveButton != null) {
    saveButton.addEventListener('click', () => storeInput('filter', textArea));
  }
};

const storeInput: (keyName: string, input: HTMLInputElement) => void = (keyName, input) => {
  const value: string = input.value;

  chrome.storage.local.set({ [keyName]: value });
};
