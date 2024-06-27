let trilho = document.getElementById('trilho');
let body = document.querySelector('body');
let sectionsToToggle = document.querySelectorAll('.container, .containerbox, .depoimentos, .msg, .apresentacao, header, .footer');
let logo = document.getElementById('logo');

trilho.addEventListener('click', () => {
    trilho.classList.toggle('dark');
    body.classList.toggle('dark');
    sectionsToToggle.forEach(section => {
        section.classList.toggle('dark');
    });


    if (body.classList.contains('dark')) {
        logo.src = 'src/image/footerLogo.png'; 
    } else {
        logo.src = 'src/image/soundline-logoPreto.png'; 
    }
});
