function toggleLanguage(lang) {
  const elements = document.querySelectorAll('[data-en]');
  elements.forEach(el => {
    const text = lang === 'es' ? el.getAttribute('data-es') : el.getAttribute('data-en');
    if (el.tagName === 'OPTION') {
      el.textContent = text;
    } else {
      el.innerText = text;
    }
  });

  // Update form title
  document.getElementById('form-title').textContent =
    lang === 'es' ? 'Formulario del Centro de Llamadas' : 'Call Center Intake Form';

  // Update button labels
  document.querySelector('button[type="submit"]').textContent =
    lang === 'es' ? 'Enviar' : 'Submit';
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("intake-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
      fullname: this.fullname.value.trim(),
      zipcode: this.zipcode.value.trim(),
      phone: this.phone.value.trim(),
      issue: this.issue.value,
      description: this.description.value.trim(),
    };

    if (!data.zipcode.match(/^\d{5}$/)) {
      alert("Invalid ZIP Code.");
      return;
    }

    console.log("Form submitted:", data);
    alert("Thank you! Your request has been submitted.");
    this.reset();
  });
});
