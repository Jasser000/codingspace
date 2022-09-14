//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const indiceContainer=document.getElementById("indice-container")
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
//Options values for buttons
let options = {
    Hardware : [
    ["Motherboard","It holds and allows communication between many system components","Motherboard is the main printed circuit board in computers."],
    ["Processor","Performs operations on an external data source","Processor is the logic circuitry that responds to and processes the basic instructions that drive a computer."],
    ["CMOS","known as memory battery","The CMOS battery powers your laptop's BIOS firmware"],
    ["FPGA","An integrated circuit","FPGAs have a remarkable role in embedded system development due to their capability to start system software development simultaneously with hardware"],
    ["Keyboard","A peripheral input device","Keyboard is an input device modeled after the typewriter keyboard"],
    ["Mainframe","A tpe of computers","Mainframe is used primarily by large organizations for critical applications like bulk data processing"],
    ["NVMe","Storage protocol","is a new storage access and transport protocol for flash and next-generation solid-state drives "],
    ["RaspberryPi","A micro-computer","The Raspberry Pi is a low cost, credit-card sized computer that plugs into a computer monitor or TV, and uses a standard keyboard and mouse."],
    ["Chipset","An integrated circuit","Chipset isa highly integrated circuit on the motherboard of a computer that controls many of its data transfer functions"],
    ["Heatpipe","Included in cooling","A heatpipe is a heat-transfer device that employs phase transition to transfer heat between two solid interfaces"],    
  ],
  Software: [
  ["Blender","Used for 3D modelling ","Blender is a free and open-source 3D computer graphics software tool"],
  ["Windows","Manages computer hardware ","Windows is a desktop operating system developed by Microsoft"],
  ["Android","Based on a modified version of the Linux kernel ","Android is a mobile operating system"]
  ["LibreOffice","Consists of programs for word processing","LibreOffice is a free and open-source office productivity software suite"],
  ["Fedora","A linux distribution","Fedora is a Linux distribution developed by the Fedora Project"],
  ["Bios","Responsible for the booting process","Basic Input/Output System  is firmware used to provide runtime services for operating systems"],
  ["Qtcreator","Used in GUI apps","Qt Creator is a cross-platform C++, JavaScript and QML integrated development environment"],
  ["Opera","A web browser","Opera is a multi-platform web browser developed by its namesake company Opera"],
  ["Brave","A web browser","Brave is a free and open-source web browser developed by Brave Software"],
  ["Mcafee","An antivirus software"," McAfee LiveSafe integrates antivirus, firewall and anti-spyware"],
  ["Ccleaner","A utility software","Ccleaner is used to clean potentially unwanted files and invalid Windows Registry entries"],
],
  Networking: [
    ["Internet","is an interconnection","Internet is a global computer network providing a variety of information and communication facilities"],
    ["Router","A networking device","A router is a device that connects two or more packet-switched networks or subnetworks"],
    ["Server","Provides data","A server is a computer designed to act as central repository and help in providing various resources like hardware access, disk space, printer access, etc,. to other computers in the network."],
    ["Client","Receives data","A computer that connects to the server is called a client."],
    ["Protocol","Allows commucation between devices","A network protocol is an established set of rules that determine how data is transmitted between different devices in the same network"],
    ["Cable","Insures a type of connection ","Network cables are necessary to connect and transfer data and other information between computers, routers, and storage systems."],
    ["Gateway","A network node","A gateway is a node that connects disparate networks by translating communications from one protocol to another."],
    ["Localhost","Is an alias for the IP address 127.0. 0.1","When a computer pings this IP address, it is communicating with itself"],
    ["Cloud","An increasingly popular service","Cloud computing is the delivery of different services through the Internet, including data storage, servers, databases, networking, and software."],
    ["Html","A formatting system for displaying material retrieved over the Internet.","HTML, in full hypertext markup language, a formatting system for displaying material retrieved over the Internet."],
    ["Bittorrent","A file transfer protocol","Bittorrent is a file transfer protocol which enables users to upload and download large files on the internet"],
    ["Https","Used for exchanging files on the World Wide Web","HTTP, in full HyperText Transfer Protocol, standard application-level protocol used for exchanging files on the World Wide Web."],

  ],
};
//count
let winCount = 0;
let count = 0;
let chosenWord = "";
let chosenWordIndice = "";
let chosenWordDef = "";
let chosenWordData=[];
//Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};
//Block all the Buttons
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");
    //disable all options
    optionsButtons.forEach((button) => {
      button.disabled = true;
    });
    //disable all letters
    letterButtons.forEach((button) => {
      button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
  };


//Word Generator
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    //If optionValur matches the button innerText then highlight the button
    optionsButtons.forEach((button) => {
      if (button.innerText.toLowerCase() === optionValue) {
        button.classList.add("active");
      }
      button.disabled = true;
    });
    //initially hide letters, clear previous word
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";
    let optionArray = options[optionValue];
    //choose random word
    chosenWordData = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenWord = chosenWordData[0].toUpperCase();
    chosenWordIndice=chosenWordData[1];
    chosenWordDef = chosenWordData[2];
    //replace every letter with span containing dash
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
    //Display each element as span
    userInputSection.innerHTML = displayItem;
  };
  //Initial Function (Called when page loads/user presses new game)
const initializer = () => {
    winCount = 0;
    count = 0;
    //Initially erase all content and hide letteres and new game button
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    indiceContainer.innerHTML ="";
   // indiceContainer.classList.add("hide");
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    //For creating letter buttons
    for (let i = 65; i < 91; i++) {
      let button = document.createElement("button");
      button.classList.add("letters");
      //Number to ASCII[A-Z]
      button.innerText = String.fromCharCode(i);
      //character button click
      button.addEventListener("click", () => {
        let charArray = chosenWord.split("");
        let dashes = document.getElementsByClassName("dashes");
        //if array contains clciked value replace the matched dash with letter else dram on canvas
        if (charArray.includes(button.innerText)) {
          charArray.forEach((char, index) => {
            //if character in array is same as clicked button
            if (char === button.innerText) {
              //replace dash with letter
              dashes[index].innerText = char;
              //increment counter
              winCount += 1;
              //if winCount equals word lenfth
              if (winCount == charArray.length) {
                resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><h2 class='win-msg'>Spin The Wheel Of Fortune!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                //block all buttons
                blocker();
              }
            }
          });
        } else {
          //lose count
          count += 1;
          //for drawing man
          drawMan(count);
          if (count==3){
            indiceContainer.classList.remove("hide");
            indiceContainer.innerHTML =`<h5 class='win-msg'>Help:</h5><p><span>${chosenWordIndice}</span></p>`;
          }
          //Count==6 because head,body,left arm, right arm,left leg,right leg
          if (count == 6) {
            resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><h5><span>${chosenWordDef}</span></h5>`;
            blocker();
          }
        }
        //disable clicked button
        button.disabled = true;
      });
      letterContainer.append(button);
    }
    displayOptions();
    //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
    let { initialDrawing } = canvasCreator();
    //initialDrawing would draw the frame
    initialDrawing();
  };
//Canvas
const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;
    //For drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();
    };
    const head = () => {
      context.beginPath();
      context.arc(70, 30, 10, 0, Math.PI * 2, true);
      context.stroke();
    };
    const body = () => {
      drawLine(70, 40, 70, 80);
    };
    const leftArm = () => {
      drawLine(70, 50, 50, 70);
    };
    const rightArm = () => {
      drawLine(70, 50, 90, 70);
    };
    const leftLeg = () => {
      drawLine(70, 80, 50, 110);
    };
    const rightLeg = () => {
      drawLine(70, 80, 90, 110);
    };
    //initial frame
    const initialDrawing = () => {
      //clear canvas
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      //bottom line
      drawLine(10, 130, 130, 130);
      //left line
      drawLine(10, 10, 10, 131);
      //top line
      drawLine(10, 10, 70, 10);
      //small top line
      drawLine(70, 10, 70, 20);
    };
    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
  };
  //draw the man
  const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
      case 1:
        head();
        break;
      case 2:
        body();
        break;
      case 3:
        leftArm();
        break;
      case 4:
        rightArm();
        break;
      case 5:
        leftLeg();
        break;
      case 6:
        rightLeg();
        break;
      default:
        break;
    }
  };
//New Game
//newGameButton.addEventListener("click", initializer);
window.onload = initializer;