window.addEventListener('load', () => {
    setBackgroundImage();
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

function toggleCategoriesMenu() {
    const element = document.getElementsByClassName('categories-nav')[0];
    if (element.classList.contains('show')) {
        element.classList.remove('show');
    } else {
        element.classList.add('show');
    }
}

