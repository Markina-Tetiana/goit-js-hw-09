const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

//запис в локалсторедж
const updateLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

//зчитування з локалсторедж
const loadFromLS = key => {
  try {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : undefined;
  } catch (error) {
    console.log(error);
  }
};

// автозаповнення при завантаженні стор
window.addEventListener('DOMContentLoaded', () => {
  const savedData = loadFromLS('feedback-form-state');
  if (savedData) {
    formData.email = savedData.email || '';
    formData.message = savedData.message || '';
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
});

// відстеження вводу тексту у формі
form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (name in formData) {
    formData[name] = value;
    updateLocalStorage('feedback-form-state', formData);
  }
});

// відправка форми
form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }
  console.log('Received data:', formData);

  // очищення форми, formData та локалсторедж
  form.reset();
  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
});
