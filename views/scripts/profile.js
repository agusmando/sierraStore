const picture = document.getElementById('avatar');
const reader = new FileReader();

picture.addEventListener('change', (e) => {
    reader.readAsDataURL(e.target.files[0]);
})

reader.addEventListener('load', () => {
    document.querySelector('.user-picture').src = reader.result;
})