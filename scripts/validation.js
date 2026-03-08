document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('feedbackForm');
  if (!form) return;

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    document.querySelectorAll('.input-error').forEach(el => {
      el.classList.remove('input-error');
    });
    document.querySelectorAll('.error-text').forEach(el => {
      el.textContent = '';
      el.classList.remove('error-text');
    });
    let isValid = true;
    const fullnameInput = document.getElementById('fullname');
    const fullnameValue = fullnameInput.value.trim();
    
    if (fullnameValue === '') {
      showError(fullnameInput, 'Введите ФИО');
      isValid = false;
    } else if (fullnameValue.split(' ').filter(w => w.length > 0).length < 2) {
      showError(fullnameInput, 'Введите фамилию и имя (минимум 2 слова)');
      isValid = false;
    }
    const phoneInput = document.getElementById('phone');
    const phoneValue = phoneInput.value.trim();
    const phoneDigits = phoneValue.replace(/\D/g, '');
    
    if (phoneValue === '') {
      showError(phoneInput, 'Введите номер телефона');
      isValid = false;
    } else if (phoneDigits.length < 10) {
      showError(phoneInput, 'Введите минимум 10 цифр');
      isValid = false;
    }
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim();
    
    if (emailValue === '') {
      showError(emailInput, 'Введите email');
      isValid = false;
    } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
      showError(emailInput, 'Введите корректный email');
      isValid = false;
    }
    if (isValid) {
      const formData = {
        fullname: fullnameValue,
        phone: phoneValue,
        email: emailValue,
        message: document.getElementById('message').value.trim() || '(не заполнено)',
        timestamp: new Date().toLocaleString()
      };
      const customEvent = new CustomEvent('formValid', { detail: formData });
      document.dispatchEvent(customEvent);
      
      alert('Форма успешно отправлена! Откройте консоль (F12) для просмотра данных.');
      form.reset();
    }
  });

  function showError(input, message) {
    input.classList.add('input-error');
    const helpText = document.getElementById(input.id + 'Help');
    if (helpText) {
      helpText.textContent = message;
      helpText.classList.add('error-text');
    }
  }

  document.querySelectorAll('#feedbackForm input, #feedbackForm textarea').forEach(input => {
    input.addEventListener('input', function() {
      this.classList.remove('input-error');
      const helpText = document.getElementById(this.id + 'Help');
      if (helpText) {
        helpText.textContent = '';
        helpText.classList.remove('error-text');
      }
    });
  });
});