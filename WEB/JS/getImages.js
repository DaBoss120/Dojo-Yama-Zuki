async function getImagesFromJson(){
    try {
        const response = await fetch('galleryImages.json');

        const images = await response.json();

        let html = '';
        images.forEach(onePhoto => {
            html += `<img src="../IMG/gallery/${onePhoto.url}" alt="${onePhoto.title}" />`;
        });
        document.querySelector('.all-photos').innerHTML = html;
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

async function getImages() {
    try {
        const response = await fetch('../WEB/php/getImages.php');
        // const response = await fetch('http://localhost:3000/WEB/php/getImages.php');
        const images = await response.json();
        let html = '';
        images.forEach(onePhoto => {
            html += `<img src="../WEB/IMG/gallery/${onePhoto}" alt="photo" />`;
        });
        document.querySelector('.all-photos').innerHTML = html;
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}
// Load images only when gallery tab opened
if (window.location.pathname.endsWith('/galerie/') || window.location.pathname.endsWith('/galerie/index.html')) {
    window.addEventListener('DOMContentLoaded', getImages);
    // window.addEventListener('DOMContentLoaded', function () {
    //     let html = '';
    //     getImages.forEach(onePhoto => {
    //         html +=`<img src="../IMG/gallery/${onePhoto}" alt="photo" />`
    //     });
    //     document.getElementsByClassName('all-photos').innerHTML = html;
    // });
}


// async function getImages() {
//     try {
//         const response = await fetch('api/getImages');//https://files-539462895857.europe-west1.run.app
//         const images = await response.json();
//         let html = '';
//         images.forEach(onePhoto => {
//             html += `<img src="../IMG/gallery/${onePhoto}" alt="photo" />`;
//         });
//         document.querySelector('.all-photos').innerHTML = html;
//     } catch (error) {
//         console.error('Error fetching images:', error);
//     }

//     // const imageDir = path.join(__dirname, '../img/gallery');
//     // fs.readdir(imageDir, (err, files) => {
//     //     if (err) {
//     //         console.error(err);
//     //         return;
//     //     }
//     //     const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
//     //     console.log(images);
//     // });
// }