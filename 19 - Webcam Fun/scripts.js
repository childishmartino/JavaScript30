const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.srcObject = localMediaStream;
            video.play()
        })
        .catch(err => {
            console.error(`OH NO!!`, err);
        })
}

const paintToCanvas = () => {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        //taking out pixel data
        let pixels = ctx.getImageData(0, 0, width, height);
        // handing the pixel data to a function to change it
        // pixels = redEffect(pixels);
        // pixels = rgbSplit(pixels);
        pixels = greenScreen(pixels);
        // handing back the new pixel data
        ctx.putImageData(pixels, 0, 0);
    }, 16)
}

const redEffect = (pixels) => {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i] = pixels.data[i] + 100; //Red
        pixels.data[i + 1] = pixels.data[i + 1] - 50 //Green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5 //Blue
    }
    return pixels;
}

const rgbSplit = (pixels) => {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 150] = pixels.data[i]; //Red
        pixels.data[i + 500] = pixels.data[i + 1]//Green
        pixels.data[i - 150] = pixels.data[i + 2]//Blue
    }
    return pixels;
}

const greenScreen = (pixels) => {
    const levels = {}

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    })

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
                pixels.data[i +3] = 0;
            }
    }

    return pixels
}

const takePhoto = () => {
    snap.currentTime = 0;
    snap.play();
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="handsome" />`
    strip.insertBefore(link, strip.firstChild)
}

getVideo()

video.addEventListener('canplay', paintToCanvas)