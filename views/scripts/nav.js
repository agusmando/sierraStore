let logo = document.getElementById('logo')
if (window.location.href == window.location.origin + '/') {
    logo.href = '#'
} else {
    logo.href = '/'
}

const menu = document.querySelector('.menu-display');

//Para manejar la mecánica del dropdown que muestra el menú del usuario y sus interacciones
const userIsLogged = () => {
    if (document.querySelector('#check') != null) {
        const checkbox = document.querySelector('#check');
        //Oculta el dropdown on Scroll
        window.addEventListener('scroll', () => {
            checkbox.checked = false;
            setTimeout(() => {
                menu.setAttribute('style', 'display: none');
            }, 300);
        })
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                menu.setAttribute('style', 'display: block');
                //Oculta el dropdown cuando hago click en otro lado
                document.addEventListener('click', (e) => {
                    if (e.target != menu && e.target != checkbox && e.target != document.querySelector('.user-tab')) {
                        checkbox.checked = false;
                        setTimeout(() => {
                            menu.setAttribute('style', 'display: none');
                        }, 300);
                    }
                })
            } else {
                setTimeout(() => {
                    menu.setAttribute('style', 'display: none');
                }, 300);
            }
        })
    }
}

userIsLogged();