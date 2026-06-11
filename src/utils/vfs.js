const FS_KEY = 'alttre_fs';

const INITIAL_FS = {
  'Documents': {
    type: 'folder',
    contents: {
      'welcome.txt': { type: 'file', content: 'Welcome to alttre.os! This is a real virtual file system.' },
      'todo.txt': { type: 'file', content: '- Finish Stardance project\n- Win Outpost' }
    }
  },
  'Images': {
    type: 'folder',
    contents: {}
  },
  'Downloads': {
    type: 'folder',
    contents: {}
  }
};

export const getFS = () => {
  const saved = localStorage.getItem(FS_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  localStorage.setItem(FS_KEY, JSON.stringify(INITIAL_FS));
  return INITIAL_FS;
};

export const saveFS = (newFs) => {
  localStorage.setItem(FS_KEY, JSON.stringify(newFs));
};

export const getFolderByPath = (fs, pathArray) => {
  let current = fs;
  for (const folder of pathArray) {
    if (current[folder] && current[folder].type === 'folder') {
      current = current[folder].contents;
    } else {
      return null; // Path invalid
    }
  }
  return current;
};

export const readFile = (pathArray, filename) => {
  const fs = getFS();
  const folder = getFolderByPath(fs, pathArray);
  if (folder && folder[filename] && folder[filename].type === 'file') {
    return folder[filename].content;
  }
  return null;
};

export const writeFile = (pathArray, filename, content) => {
  const fs = getFS();
  const folder = getFolderByPath(fs, pathArray);
  if (folder) {
    folder[filename] = { type: 'file', content };
    saveFS(fs);
    return true;
  }
  return false;
};

export const deleteItem = (pathArray, name) => {
  const fs = getFS();
  const folder = getFolderByPath(fs, pathArray);
  if (folder && folder[name]) {
    delete folder[name];
    saveFS(fs);
    return true;
  }
  return false;
};

export const createFolder = (pathArray, name) => {
  const fs = getFS();
  const folder = getFolderByPath(fs, pathArray);
  if (folder && !folder[name]) {
    folder[name] = { type: 'folder', contents: {} };
    saveFS(fs);
    return true;
  }
  return false;
};
