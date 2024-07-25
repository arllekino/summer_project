export class Sound
{
    constructor(name, volume)
    {
        this.name = name;
        this.audio;
        this.volume = volume;
        this.initAudio()
    }

    async initAudio()
    {
        // const audioContext = new window.AudioContext;
        // const response = await fetch("/../../music/test.mp3");
        // const arrayBuffer = await response.arrayBuffer();
        // const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        // const source = audioContext.createBufferSource();
        // source.buffer = audioBuffer;
        // source.connect(audioContext.destination)
        // source.start();
        // var sound = new Howl({
        //     src: ['/../../music/test.mp3'],
        //     volume: 0.5,
        //     loop: true,
        // });
        // sound.play();
        this.audio = new Audio();
        this.audio.muted = true;
        this.audio.preload = 'auto';
        this.audio.src = `/../../music/${this.name}.mp3`;
        this.audio.volume = this.volume;
    }

    async load()
    {
        await this.audio.load();
    }

    repeating(flag)
    {
        if (this.audio)
        {
            this.audio.loop = flag;
        }
    }

    play()
    {
        this.audio.muted = false;
        this.audio.play();
    }

    stop() {
        this.audio.muted = true;
        this.audio.pause();
        this.audio.currentTime = 0.0;
    }
      
}