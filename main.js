window.addEventListener('load', () => {
    setBackgroundImage();
    setCopyrightYear();
    linkProtector();
});

function setBackgroundImage() {
    const images = [
        'https://4.bp.blogspot.com/-l7HbfG2VbMA/W-N3ZK1sH5I/AAAAAAAAQTU/kZ1ZTF1NaZMMfNWvpaysbfUTaAYQ5tDAACLcBGAs/s5000/bg1.jpg',
        'https://4.bp.blogspot.com/-fh3WgAv7ezg/W-N3ZMMGK_I/AAAAAAAAQTQ/aXtMn3gFHf4ZwhLqdNBm37TEarktjs-rQCLcBGAs/s5000/bg2.jpg',
        'https://1.bp.blogspot.com/-NC2U-ExNez8/W-N3ZKpD0SI/AAAAAAAAQTY/HlfPTTbYOwE7lHBk24Z-SoZm7VVU13cfgCLcBGAs/s5000/bg3.jpg',
        'https://2.bp.blogspot.com/-cQ9B32pTVVA/W-N3Zv81xmI/AAAAAAAAQTc/oKK3OpcivRA9bN_xVuK112G8Ie3aB3ypgCLcBGAs/s5000/bg4.jpg'
    ];
    document.body.style.backgroundImage = `url(${images[Math.floor(Math.random() * images.length)]})`;
}

function setCopyrightYear() {
    document.getElementById('this_year').innerText = new Date().getFullYear().toString();
}

function toggleCategoriesMenu() {
    const element = document.getElementsByClassName('categories-nav')[0];
    if (element.classList.contains('show')) {
        element.classList.remove('show');
    } else {
        element.classList.add('show');
    }
}

function closeCategoriesMenu() {
    const element = document.getElementsByClassName('categories-nav')[0];
    element.classList.remove('show');
}

function replaceHttpLinks() {
    const elements = document.getElementsByTagName('a');
    for (let a of elements) {
        let link = a.href;
        if (link.includes('http://www.elitegta.com.br')) {
            link = link.replace('http://www.elitegta.com.br/', 'https://www.elitegta.com.br/')
            a.href = link;
        }
        if (link.includes('http://elitegta.com.br')) {
            link = link.replace('http://elitegta.com.br/', 'https://elitegta.com.br/')
            a.href = link;
        }
    }
}

function openSearch() {
    const element = document.getElementById('search');
    element.classList.add('active');
}

function closeSearch() {
    const element = document.getElementById('search');
    element.classList.remove('active');
}

function linkProtector() {
    const urluc = '/p/download.html?url=';

    if (top.location.href.includes(urluc) || document.location.href.includes(urluc)) {
        replaceHttpLinks();
    } else {
        let linkuc = document.getElementsByTagName('A');
        let locuc;

        try {
            locuc = (`${top.location.href}`).replace('http://', '').replace('https://', '').replace('www.', '');
        } catch (e) {
            locuc = (`${document.location.href}`).replace('http://', '').replace('https://', '').replace('www.', '');
        }

        let domain_urluc;
        for (let i = 0; i < linkuc.length; i++) {
            domain_urluc = (`${linkuc[i].href}`).replace(/^\s+/g, '').replace(/\s+$/g, '').replace('http://', '').replace('https://', '');
            if (duc(linkuc[i].href) && (((`${linkuc[i].href}`).indexOf(locuc) <= 0 || (`${linkuc[i].href}`).indexOf('http') <= 0) || (`${linkuc[i].href}`).lastIndexOf('http:') > 3) && (`${linkuc[i].href}`).indexOf('script:') <= 0 && (`${linkuc[i].href}`).indexOf('#') !== 1 && (`${linkuc[i].href}`).indexOf('mailto:') <= 0 && (`${linkuc[i].href}`).indexOf('file:') <= 0 && (`${linkuc[i].href}`).indexOf('#exit') <= 0 && !(!isNaN(parseInt(domain_urluc.substr(0, 1))) && (!isNaN(parseInt(domain_urluc.substr(0, 2))) || domain_urluc.substr(0, 2) === '.'))) {
                linkuc[i].href = `${urluc}${linkuc[i]}`;
            }
        }
    }
}

function duc(urluc) {
    const domainuc = 'elitegta,mediafire,mega,4shared,drive';
    const domainsuc = '';
    let params_to_skip;
    if (`${domainuc}` !== 'undefined' && domainuc !== '' && domainuc.replace(/\s/g, '') !== '' && urluc !== '') {
        if ((`${domainuc}`).indexOf(',') > 0) {
            params_to_skip = domainuc.split(',');
        } else {
            params_to_skip = new Array(domainuc);
        }
        for (let s = 0; s < params_to_skip.length; s++) {
            if ((`${urluc.toLowerCase()}`).indexOf(params_to_skip[s].toLowerCase()) > 0) {
                if (`${domainsuc}` !== 'undefined' && domainsuc !== '' && domainsuc.replace(/\s/g, '') !== '' && urluc !== '') {
                    if ((`${domainsuc}`).indexOf(',') > 0) {
                        params_to_skip = domainsuc.split(',');
                    } else {
                        params_to_skip = new Array(domainsuc);
                    }
                    for (let s = 0; s < params_to_skip.length; s++) {
                        if ((`${urluc.toLowerCase()}`).indexOf(params_to_skip[s].toLowerCase()) > 0) {
                            return false;
                        }
                    }
                    return true;
                } else {
                    return true;
                }
            }
        }
        return false;
    } else {
        return false;
    }
}
