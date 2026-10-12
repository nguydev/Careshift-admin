const debouncedSetter = debounce((setter, value, name) => {
  setter((c) => ({ ...c, page: 1, [name || "search"]: value }));
}, 500);

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export const debounceSearch = ({ setter, newValue, name }) => {
  debouncedSetter(setter, newValue, name); // Execute the debounced function
};
