class DrumKit {
    constructor() {
      this.pads = document.querySelectorAll(".pad");
      this.playBtn = document.querySelector(".play");
      this.currentKick = "./sounds/kick-classic.wav";
      this.currentSnare = "./sounds/snare-acoustic01.wav";
      this.currentHihat = "./sounds/hihat.acoustic01.wav";
      this.kickAudio = document.querySelector(".kick-sound");
      this.snareAudio = document.querySelector(".snare-sound");
      this.hihatAudio = document.querySelector(".hihat-sound");
      this.index = 0;
      this.bpm = 150;
      this.isPlaying = null;
      this.selects = document.querySelectorAll("select");
      this.muteBtns = document.querySelectorAll(".mute");
      this.tempoSlider = document.querySelector(".tempo-slider");
    }
  
    activePad(){
        //console.log(this); will click on the class with b0
        this.classList.toggle("active");
        //refers to class kickpad active and other actives
    }
    repeat(){
        let step = this.index % 8;
        //when we arrive to 8, the step will be 0 again to create a loop
        const activeBars = document.querySelectorAll(`.b${step}`);
        //above will grab all the b1s, then b2s, then so on
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            //this is what adds animation to the squares one by one
            if (bar.classList.contains("active")) {
                //seeing what pads are active 
                //check each sounds
                if (bar.classList.contains("kick-pad")) {
                    //checks which bar IN kickpads is active
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                  }
                  if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                  }
                  if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                  }
                }
              });
              this.index++;
    }
    start() {
        const interval = (60 / this.bpm) * 1000;
        //Check if it's playing
    
        if (this.isPlaying) {
           //set isplaying to the interval and set it to null in the else to stop it
            //when we click play a second time it will clear the interval and stop
          clearInterval(this.isPlaying);
          console.log(this.isPlaying);
          this.isPlaying = null;
        } else {
          this.isPlaying = setInterval(() => {
               //this works with the arrow function
            this.repeat();
          }, interval);
          //will increment index every second 
        }
      }
    updateBtn(){
        if(!this.isPlaying){
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add('active');
        }
        else{
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove('active');
        }
    }
    changeSound(e){
         //getting access to the event
        const selectionName = e.target.name; 
        //when changing select menu it will grab which one is selected and put it in variable
        const selectionValue = e.target.value;
        //grabs the value we set in the html
        switch (selectionName) {
            case "kick-select":
              this.kickAudio.src = selectionValue;
              break;
            case "snare-select":
              this.snareAudio.src = selectionValue;
              break;
            case "hihat-select":
              this.hihatAudio.src = selectionValue;
              break;
          }
        }
    mute(e){
        const muteIndex = e.target.getAttribute('data-track');
        //we set data-track in html to 1
        e.target.classList.toggle('active');
        if(e.target.classList.contains('active')){
            //if it contains active then we want to mute
            switch (muteIndex) {
                case "0":
                  this.kickAudio.volume = 0;
                  break;
                case "1":
                  this.snareAudio.volume = 0;
                  break;
                case "2":
                  this.hihatAudio.volume = 0;
                  break;
                }
        }
        else{
            switch(muted){
            case "0": 
                this.kickAudio.volume = 1;
                //if its not active then we want to add the sound back
                break;
            case "1":
                this.snareAudio.volume = 1;
                break;
            case "2":
                this.hihatAudio.volume = 1;
                break;
            }
        }
    }
    changeTempo(e) {
        const tempoText = document.querySelector(".tempo-nr");
    
        tempoText.innerText = e.target.value;
      }
      updateTempo(e) {
        this.bpm = e.target.value; //newly updated bpm after scrolling and changing it
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if (playBtn.classList.contains("active")) {
          this.start();
        }
      }
}

const drumKit = new DrumKit();

//Event Listeners

drumKit.pads.forEach(pad => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function() {
    this.style.animation = "";
    //this refers to pad above this line
  });
});

drumKit.playBtn.addEventListener("click", function() {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach(select => {
  select.addEventListener("change", function(e) {
    drumKit.changeSound(e);
  });
});
drumKit.muteBtns.forEach(btn => {
  btn.addEventListener("click", function(e) {
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function(e) {
  drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener("change", function(e) {
  drumKit.updateTempo(e);
});