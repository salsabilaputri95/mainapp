export function getCookie(name) {
    if (typeof document === 'undefined') return null;
  
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`));
  
    return cookieValue ? cookieValue.split('=')[1] : null;
  }
  