const passwordInput = document.getElementById('password');
const showPasswordIcon = document.getElementById('show-password');

if (passwordInput && showPasswordIcon) {
  showPasswordIcon.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      showPasswordIcon.innerHTML = '<i class="fa fa-eye"></i>'; 
    } else {
      passwordInput.type = 'password';
      showPasswordIcon.innerHTML = '<i class="fa fa-eye-slash"></i>'; 
    }
  });
} else {
  console.error('Не удалось найти элементы passwordInput или showPasswordIcon!');
}