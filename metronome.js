var metronome = {

    counter: 0,
    timer: function(){},
    audio: new Audio('Ping.m4a'),
    soundTrueFalse: true,
    DOMelForNumber: document.getElementsByClassName('container')[0],

    setUpUI: function () {
        this.DOMelForNumber.onclick = this.reset;
    },

    updateUI: function (numToDisplay) {

        this.DOMelForNumber.innerText = numToDisplay;

    },

    playSound: function () {

            console.log('play sound function has been called');

            var audio = metronome.audio;

            var promise = audio.play();
    
            if (promise !== undefined) {
                promise.then(_ => {
                  // Autoplay started!
                }).catch(error => {
                    // Autoplay was prevented so add an event listener?  a bit shit really.
                    // The event listener should be added anyway!  Also this code doesn't 
                    // fucking work properly.   
                    document.querySelector('.sound-toggle')
                        .addEventListener('click', function() {

                            // true to false and false to true
                            metronome.soundTrueFalse =
                            metronome.soundTrueFalse ?
                            false : true;

                            // play the sound (the promise) if sound is on or return null if off
                            return metronome.soundTrueFalse ? promise : null;
                            
                    });
                
                })
            };
 
    },

    reset: function () {

        console.log('Reset button has been pressed');

        metronome.updateUI(0);

        clearTimeout(metronome.timer);

        metronome.start(0);

    },

    start: function (num) {

        this.setUpUI();

        if (this.soundTrueFalse){this.playSound()};

        num = num ? num : this.counter;

        this.timer = window.setInterval(function () {
            num = num + 1;
            console.log(num);
            metronome.updateUI(num);
            metronome.playSound();
        }, 1000);

    }

}


metronome.start(-20);