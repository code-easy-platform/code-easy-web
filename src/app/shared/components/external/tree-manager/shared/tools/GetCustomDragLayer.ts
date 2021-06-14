interface IOptions {
  color?: string;
  icon?: string;
}
export const getCustomDragLayer = (text: string, options?: IOptions): HTMLElement => {
  const container = document.createElement('label');

  container.style.padding = '4px';
  container.style.paddingTop = '2px';
  container.style.paddingRight = '8px';
  container.style.paddingBottom = '2px';

  container.style.backgroundColor = options?.color || 'green';
  container.style.fontSize = 'var(--font-size)';
  container.style.width = 'max-content';
  container.style.alignItems = 'center';
  container.style.borderRadius = '4px';
  container.style.position = 'fixed';
  container.style.display = 'flex';
  container.style.zIndex = '-100';
  container.style.left = '-100px';
  container.style.top = '-100px';

  
  if (options?.icon && options?.icon.includes('data')) {
    const icon = document.createElement('img');
    
    icon.width = 16;
    icon.alt = text;
    icon.height = 16;
    icon.src = options?.icon;
    icon.style.marginRight = '4px';
    icon.style.filter = 'brightness(2)';
    
    container.appendChild(icon);
  }
  
  container.appendChild(new Text(text));


  document.body.appendChild(container);

  return container;
}
